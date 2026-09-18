# Website Lead Capture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the NIFS dashboard an honest total-leads picture by logging every WhatsApp click site-wide and saving the callback form as the visitor types, without any new popup or friction.

**Architecture:** Two new Postgres tables/columns in the existing shared Supabase `nifs` schema, two small Next.js API routes, one site-wide client component (event delegation, mounted once in the root layout — covers all ~60 existing `wa.me` links across the site with zero per-page edits), and a debounced `watch()` hook added to the existing enquiry form. Dashboard reads both new data sources and stops showing the hardcoded fake `500` WhatsApp number.

**Tech Stack:** Next.js App Router, Drizzle ORM (`nifs` Postgres schema on Supabase project `cirwtkrwzqipuhmqxbwp`), react-hook-form, vitest.

## Global Constraints

- Database is a shared Supabase project (`vyzma-agency`, id `cirwtkrwzqipuhmqxbwp`) — every migration must be scoped to the `nifs` schema only, applied as raw SQL (never `drizzle-kit push` non-interactively — it has previously offered to drop unrelated clients' tables). See `drizzle.config.ts` comment and `migrations/job-application-limit-trigger.sql` for precedent.
- No popup or extra click for the visitor — every change here must be invisible to them (per approved spec `docs/superpowers/specs/2026-09-19-website-lead-capture-design.md`).
- No call-tracking number, no WhatsApp Business API/message-content capture, no cookie-based ad attribution — all explicitly out of scope for this plan.
- This project's test suite (`vitest`, no jsdom config) only unit-tests pure functions — DOM/component behavior is not part of the existing test convention here, so keep DOM-touching code as thin, untested glue around a pure, tested function wherever there's real branching logic.
- Follow existing code style: no semicolon-heavy verbose diffs, match the file's current formatting conventions exactly (see `enquiry-form.tsx`'s existing multi-line JSX attribute style).

---

### Task 1: Database schema — `whatsapp_clicks` table + `enquiries.status` column

**Files:**
- Create: `migrations/website-lead-capture.sql`
- Modify: `src/lib/db/schema.ts:65-71` (the `enquiries` table) and add a new `whatsappClicks` export after it

**Interfaces:**
- Produces: `whatsappClicks` Drizzle table (`id`, `pagePath`, `linkLabel`, `createdAt`) and `enquiries.status` column (`"draft" | "submitted"`, default `"submitted"`) — every later task reads/writes through these.

- [ ] **Step 1: Write the migration SQL**

Create `migrations/website-lead-capture.sql`:

```sql
-- Logs every click on a wa.me WhatsApp link anywhere on the site (see
-- src/components/analytics/whatsapp-click-tracker.tsx) — previously
-- invisible to the dashboard entirely.
CREATE TABLE nifs.whatsapp_clicks (
  id SERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  link_label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Lets the callback form save a draft while the visitor is still typing
-- (see /api/enquiry/draft), so an abandoned form still leaves a callable
-- lead. 'submitted' is the default so every existing row is unaffected.
ALTER TABLE nifs.enquiries
  ADD COLUMN status TEXT NOT NULL DEFAULT 'submitted';
```

- [ ] **Step 2: Apply the migration to the live database**

Use the Supabase MCP tool `mcp__claude_ai_Supabase__apply_migration` (or `execute_sql` if `apply_migration` is unavailable in this session) against project id `cirwtkrwzqipuhmqxbwp`, running the exact SQL from Step 1. Do not use `drizzle-kit push`.

- [ ] **Step 3: Verify the migration landed**

Run via `mcp__claude_ai_Supabase__execute_sql` against project `cirwtkrwzqipuhmqxbwp`:

```sql
SELECT column_name FROM information_schema.columns
WHERE table_schema = 'nifs' AND table_name = 'enquiries';

SELECT table_name FROM information_schema.tables
WHERE table_schema = 'nifs' AND table_name = 'whatsapp_clicks';
```

Expected: first query includes a `status` row; second query returns one row (`whatsapp_clicks`).

- [ ] **Step 4: Update `schema.ts` to match**

In `src/lib/db/schema.ts`, change the `enquiries` table (currently lines 65-71) to add the `status` column, and add the new `whatsappClicks` table right after it:

```typescript
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  course: text("course").notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("submitted"), // "draft" | "submitted"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Logged by /api/track/whatsapp-click — every wa.me link on the site is
// wired through WhatsAppClickTracker (see
// src/components/analytics/whatsapp-click-tracker.tsx), so this counts
// real click volume even though we never see what gets typed in WhatsApp.
export const whatsappClicks = pgTable("whatsapp_clicks", {
  id: serial("id").primaryKey(),
  pagePath: text("page_path").notNull(),
  linkLabel: text("link_label").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

- [ ] **Step 5: Commit**

```bash
git add migrations/website-lead-capture.sql src/lib/db/schema.ts
git commit -m "feat(db): add whatsapp_clicks table and enquiries.status column"
```

---

### Task 2: WhatsApp click logging endpoint

**Files:**
- Create: `src/lib/whatsapp-click.ts`
- Create: `src/lib/whatsapp-click.test.ts`
- Create: `src/app/api/track/whatsapp-click/route.ts`

**Interfaces:**
- Consumes: `whatsappClicks` table from Task 1.
- Produces: `isWhatsAppLink(href: string): boolean` and `POST /api/track/whatsapp-click` accepting `{ pagePath: string; linkLabel?: string }`, returning `{ ok: true }` — Task 3's tracker component calls this endpoint.

- [ ] **Step 1: Write the failing test for the pure link-matching function**

Create `src/lib/whatsapp-click.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { isWhatsAppLink } from "./whatsapp-click";

describe("isWhatsAppLink", () => {
  it.each([
    "https://wa.me/918374340999",
    "https://wa.me/918374340999?text=hello",
    "http://wa.me/918374340999",
  ])("accepts %s", (href) => {
    expect(isWhatsAppLink(href)).toBe(true);
  });

  it.each([
    "https://api.whatsapp.com/send?phone=918374340999",
    "tel:+918374340999",
    "https://example.com",
    "",
    "/courses/adis",
  ])("rejects %s", (href) => {
    expect(isWhatsAppLink(href)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/whatsapp-click.test.ts`
Expected: FAIL — `whatsapp-click.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `src/lib/whatsapp-click.ts`:

```typescript
// Matches any wa.me link — the format every WhatsApp CTA on the site uses.
// Deliberately narrow: api.whatsapp.com/send links aren't used anywhere in
// this codebase today, so treating them as WhatsApp too would be
// unverified scope creep.
export function isWhatsAppLink(href: string): boolean {
  try {
    const url = new URL(href, "https://nifsindia.net");
    return url.hostname === "wa.me";
  } catch {
    return false;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/whatsapp-click.test.ts`
Expected: PASS (9 tests)

- [ ] **Step 5: Write the API route**

Create `src/app/api/track/whatsapp-click/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { whatsappClicks } from "@/lib/db/schema";

// Fire-and-forget target for WhatsAppClickTracker — logs a click on any
// wa.me link anywhere on the site. Never blocks the WhatsApp link itself
// from opening, so a failure here must never surface to the visitor.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { pagePath?: unknown; linkLabel?: unknown }
    | null;
  const pagePath = typeof body?.pagePath === "string" ? body.pagePath : "";
  if (!pagePath) {
    return NextResponse.json({ error: "pagePath is required" }, { status: 400 });
  }
  const linkLabel = typeof body?.linkLabel === "string" ? body.linkLabel.slice(0, 200) : "";
  await db.insert(whatsappClicks).values({ pagePath: pagePath.slice(0, 500), linkLabel });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/whatsapp-click.ts src/lib/whatsapp-click.test.ts src/app/api/track/whatsapp-click/route.ts
git commit -m "feat(api): add whatsapp-click logging endpoint"
```

---

### Task 3: Site-wide WhatsApp click tracker (covers all ~60 existing links, zero per-page edits)

**Files:**
- Create: `src/components/analytics/whatsapp-click-tracker.tsx`
- Modify: `src/app/layout.tsx:126` (mount the tracker next to `<DevAnnotations />`)

**Interfaces:**
- Consumes: `isWhatsAppLink` from Task 2 (`src/lib/whatsapp-click.ts`), `POST /api/track/whatsapp-click` from Task 2.
- Produces: `<WhatsAppClickTracker />` — a single client component, mounted once.

Rather than editing every one of the ~60 files with a `wa.me` link (course pages, all 54 center pages, header, footer, blog, chatbot widget — confirmed via `grep -rn "wa.me/918374340999" src/`), this task adds one document-level click listener that catches every WhatsApp link automatically, including ones added later.

- [ ] **Step 1: Write the component**

Create `src/components/analytics/whatsapp-click-tracker.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { isWhatsAppLink } from "@/lib/whatsapp-click";

// Mounted once in the root layout. Listens for clicks bubbling up from any
// wa.me link on the site — there are ~60 of them scattered across course
// pages, all 54 center pages, the header, footer and chatbot widget — and
// logs them without touching any of those files individually. Never blocks
// or delays the WhatsApp link opening in its new tab.
export function WhatsAppClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor || !isWhatsAppLink(anchor.href)) return;
      const payload = JSON.stringify({
        pagePath: window.location.pathname,
        linkLabel: anchor.textContent?.trim().slice(0, 200) ?? "",
      });
      fetch("/api/track/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Logging must never interrupt the visitor's WhatsApp click.
      });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount it in the root layout**

In `src/app/layout.tsx`, add the import near the top (alongside the `DevAnnotations` import on line 1):

```typescript
import { WhatsAppClickTracker } from "@/components/analytics/whatsapp-click-tracker";
```

Then in the `<body>` (currently ending at line 126-127):

```typescript
        <DevAnnotations />
        <WhatsAppClickTracker />
      </body>
```

- [ ] **Step 3: Manually verify in the browser**

Run `npm run dev`, open any page with a WhatsApp link (e.g. `/courses/adis`), open DevTools Network tab, click a WhatsApp button. Expected: a `POST /api/track/whatsapp-click` request fires with status 200, and WhatsApp still opens in a new tab exactly as before with no visible delay.

- [ ] **Step 4: Commit**

```bash
git add src/components/analytics/whatsapp-click-tracker.tsx src/app/layout.tsx
git commit -m "feat(analytics): log every site-wide WhatsApp click via one shared tracker"
```

---

### Task 4: Enquiry draft auto-save endpoints

**Files:**
- Create: `src/lib/enquiry-draft.ts`
- Create: `src/lib/enquiry-draft.test.ts`
- Create: `src/app/api/enquiry/draft/route.ts`
- Create: `src/app/api/enquiry/draft/[id]/route.ts`

**Interfaces:**
- Consumes: `enquiries` table (with `status` column) from Task 1.
- Produces: `isDraftWorthy(name: string, phone: string): boolean`; `POST /api/enquiry/draft` accepting `{ name: string; phone: string; course?: string }` returning `{ ok: true; id: number }`; `PATCH /api/enquiry/draft/:id` accepting the same body, returning `{ ok: true }`. Task 5 (the form) calls both.

- [ ] **Step 1: Write the failing test for the loose validation helper**

Create `src/lib/enquiry-draft.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { isDraftWorthy } from "./enquiry-draft";

describe("isDraftWorthy", () => {
  it.each([
    ["Teja", "9876543210"],
    ["Jo", "+91 98765 43210"],
    ["A Very Long Name Here", "09876543210"],
  ])("accepts name=%s phone=%s", (name, phone) => {
    expect(isDraftWorthy(name, phone)).toBe(true);
  });

  it.each([
    ["", "9876543210"],
    ["T", "9876543210"],
    ["Teja", ""],
    ["Teja", "98765"],
    ["Teja", "abcdefghij"],
  ])("rejects name=%s phone=%s", (name, phone) => {
    expect(isDraftWorthy(name, phone)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/enquiry-draft.test.ts`
Expected: FAIL — `enquiry-draft.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `src/lib/enquiry-draft.ts`:

```typescript
// Looser than enquirySchema (src/lib/enquiry.ts) on purpose — this runs
// mid-typing, before the visitor has necessarily finished, so it only
// checks "is there enough here to be worth saving as a callable draft",
// not "is this submit-ready".
export function isDraftWorthy(name: string, phone: string): boolean {
  const digitCount = phone.replace(/\D/g, "").length;
  return name.trim().length >= 2 && digitCount >= 10;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/enquiry-draft.test.ts`
Expected: PASS (8 tests)

- [ ] **Step 5: Write the draft create endpoint**

Create `src/app/api/enquiry/draft/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { isDraftWorthy } from "@/lib/enquiry-draft";

// Called a couple seconds after the visitor stops typing in the callback
// form, before they submit — see enquiry-form.tsx. Saves a real, callable
// lead even if they abandon the form for WhatsApp instead of hitting
// Submit. Never validates as strictly as the real submit endpoint
// (/api/enquiry) — a draft is allowed to be rough.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { name?: unknown; phone?: unknown; course?: unknown }
    | null;
  const name = typeof body?.name === "string" ? body.name : "";
  const phone = typeof body?.phone === "string" ? body.phone : "";
  if (!isDraftWorthy(name, phone)) {
    return NextResponse.json({ error: "not enough to save yet" }, { status: 400 });
  }
  const course = typeof body?.course === "string" ? body.course : "";
  const [row] = await db
    .insert(enquiries)
    .values({ name: name.trim(), phone: phone.trim(), course, status: "draft" })
    .returning({ id: enquiries.id });
  return NextResponse.json({ ok: true, id: row.id });
}
```

- [ ] **Step 6: Write the draft update endpoint**

Create `src/app/api/enquiry/draft/[id]/route.ts`:

```typescript
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { isDraftWorthy } from "@/lib/enquiry-draft";

// Updates the same draft row as the visitor keeps typing, instead of
// inserting a new row on every debounced save.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const draftId = Number(id);
  if (!Number.isInteger(draftId)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const body = (await request.json().catch(() => null)) as
    | { name?: unknown; phone?: unknown; course?: unknown }
    | null;
  const name = typeof body?.name === "string" ? body.name : "";
  const phone = typeof body?.phone === "string" ? body.phone : "";
  if (!isDraftWorthy(name, phone)) {
    return NextResponse.json({ error: "not enough to save yet" }, { status: 400 });
  }
  const course = typeof body?.course === "string" ? body.course : "";
  await db
    .update(enquiries)
    .set({ name: name.trim(), phone: phone.trim(), course })
    .where(eq(enquiries.id, draftId));
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/enquiry-draft.ts src/lib/enquiry-draft.test.ts src/app/api/enquiry/draft
git commit -m "feat(api): add enquiry draft create/update endpoints"
```

---

### Task 5: Wire auto-save into the enquiry form + convert draft on real submit

**Files:**
- Modify: `src/components/sections/enquiry-form.tsx`
- Modify: `src/app/api/enquiry/route.ts`

**Interfaces:**
- Consumes: `POST /api/enquiry/draft`, `PATCH /api/enquiry/draft/:id` from Task 4; existing `useForm` from `enquiry-form.tsx:54-61`.
- Produces: real submit now converts an existing draft to `status: "submitted"` instead of always inserting a new row — Task 6's dashboard query relies on `status` being accurate.

- [ ] **Step 1: Update the submit endpoint to accept an optional draft id**

In `src/app/api/enquiry/route.ts`, replace the whole file:

```typescript
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/enquiry";

// Public endpoint hit by the admissions "Request Call Back" form. Stores the
// lead directly in Postgres instead of routing through formsubmit.co, whose
// AJAX endpoint silently rejects every submission until someone finds and
// clicks an "Activate Form" email — a failure mode invisible from the site.
export async function POST(request: NextRequest) {
  const raw = (await request.json().catch(() => null)) as
    | (Record<string, unknown> & { draftId?: unknown })
    | null;
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  const { name, phone, course } = parsed.data;
  const draftId = typeof raw?.draftId === "number" ? raw.draftId : null;
  if (draftId !== null) {
    // Visitor already had a draft saved from auto-save — update that row
    // to "submitted" instead of inserting a second one.
    await db
      .update(enquiries)
      .set({ name, phone, course: course || "General Enquiry", status: "submitted" })
      .where(eq(enquiries.id, draftId));
  } else {
    await db.insert(enquiries).values({ name, phone, course: course || "General Enquiry" });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Update `submitEnquiry` to accept and send the draft id**

In `src/lib/enquiry.ts`, replace `submitEnquiry`:

```typescript
export async function submitEnquiry(values: EnquiryValues, draftId?: number): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(draftId ? { ...values, draftId } : values),
    });
    if (!response.ok) throw new Error("Enquiry was not accepted");
    const ack = (await response.json().catch(() => null)) as { ok?: unknown } | null;
    if (!ack || ack.ok !== true) throw new Error("Enquiry was not accepted");
  } finally {
    clearTimeout(timeout);
  }
}
```

- [ ] **Step 3: Update the existing `enquiry.test.ts` call sites**

`src/lib/enquiry.test.ts` calls `submitEnquiry(values)` with one argument in every test — this still works unchanged since `draftId` is optional. Run `npx vitest run src/lib/enquiry.test.ts` to confirm: Expected PASS, no changes needed to that file.

- [ ] **Step 4: Add the debounced auto-save to the form**

In `src/components/sections/enquiry-form.tsx`, change the `useForm` destructure (currently lines 54-61) to also pull `watch`:

```typescript
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.input<typeof enquirySchema>, unknown, EnquiryValues>({
    resolver: zodResolver(enquirySchema),
  });
```

Add a new ref and effect right after the existing `pending`/`status` declarations (after line 47, before the `fastTrackCourse` state):

```typescript
  const draftId = useRef<number | null>(null);
  const watchedName = watch("name");
  const watchedPhone = watch("phone");

  useEffect(() => {
    const name = watchedName ?? "";
    const phone = watchedPhone ?? "";
    if (!isDraftWorthy(name, phone)) return;
    const timer = setTimeout(() => {
      const body = JSON.stringify({ name, phone, course: watch("course") || "" });
      if (draftId.current === null) {
        fetch("/api/enquiry/draft", { method: "POST", headers: { "Content-Type": "application/json" }, body })
          .then((res) => res.json())
          .then((data: { id?: number }) => { if (typeof data.id === "number") draftId.current = data.id; })
          .catch(() => {});
      } else {
        fetch(`/api/enquiry/draft/${draftId.current}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body }).catch(() => {});
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [watchedName, watchedPhone, watch]);
```

Add the two new imports at the top of the file:

```typescript
import { useEffect, useId, useRef, useState } from "react";
```

(replacing the existing `import { useId, useRef, useState } from "react";` on line 6)

```typescript
import { isDraftWorthy } from "@/lib/enquiry-draft";
```

(added to the existing import block, alongside the `@/lib/enquiry` import)

- [ ] **Step 5: Pass the draft id on real submit and reset it after success**

In the existing `onSubmit` function (currently lines 63-79), change the `submitEnquiry` call and add a reset:

```typescript
  const onSubmit = async (values: EnquiryValues) => {
    if (pending.current) return;
    pending.current = true;
    setStatus("submitting");
    trackEnquiry("enquiry_attempt");
    try {
      await submitEnquiry(values, draftId.current ?? undefined);
      draftId.current = null;
      setStatus("success");
      reset();
      trackEnquiry("enquiry_accepted");
    } catch {
      setStatus("error");
      trackEnquiry("enquiry_error", "delivery");
    } finally {
      pending.current = false;
    }
  };
```

- [ ] **Step 6: Manually verify in the browser**

Run `npm run dev`, open the enquiry form, type a name and a 10-digit phone number, wait 2+ seconds, check Network tab for a `POST /api/enquiry/draft` returning `{ ok: true, id: <number> }`. Keep typing (e.g. edit the phone number) and confirm the next request is a `PATCH /api/enquiry/draft/<same id>`. Submit the form and confirm the `POST /api/enquiry` request body includes `draftId`.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/enquiry-form.tsx src/app/api/enquiry/route.ts src/lib/enquiry.ts
git commit -m "feat(enquiry): auto-save form as draft while typing, convert to submitted on real submit"
```

---

### Task 6: Dashboard — real WhatsApp click count + draft tags

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Modify: `src/app/dashboard/enquiries/page.tsx`

**Interfaces:**
- Consumes: `whatsappClicks` table (Task 1), `enquiries.status` column (Task 1).
- Produces: real `whatsappCount` passed to `InboundChannelsCard` (replacing the hardcoded `500` default at `inbound-channels-card.tsx:34` and the hardcoded `whatsappCount={500}` call site at `dashboard/page.tsx:183`); a "Draft" tag in the enquiries table.

- [ ] **Step 1: Add the WhatsApp click count query**

In `src/app/dashboard/page.tsx`, add `whatsappClicks` to the schema import (currently line 21):

```typescript
import { enquiries, jobApplications, jobs, posts, whatsappClicks } from "@/lib/db/schema";
```

Add a new query to the `Promise.all` array (currently lines 58-96) — insert after the `sourcesRes` entry:

```typescript
    getSourceBreakdown().catch(() => []),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(whatsappClicks)
      .catch(() => [{ count: 0 }]),
```

Add the matching destructured name in the array on the left (currently lines 43-57) — after `sourcesRes`:

```typescript
    sourcesRes,
    whatsappClicksRes,
  ] = await Promise.all([
```

Add the derived count near the other `total*` derivations (currently around line 101):

```typescript
  const totalWhatsappClicks = whatsappClicksRes[0]?.count ?? 0;
```

- [ ] **Step 2: Feed the real count into `InboundChannelsCard`**

In `src/app/dashboard/page.tsx`, change the existing call (currently lines 182-187):

```typescript
      <InboundChannelsCard
        whatsappCount={totalWhatsappClicks}
        instagramCount={instagramTraffic}
        websiteEnquiriesCount={totalEnquiries}
        emailApplicationsCount={totalApplications}
      />
```

- [ ] **Step 3: Remove the fake default from the component itself**

In `src/components/dashboard/inbound-channels-card.tsx`, change the props destructure (currently lines 33-38) to make `whatsappCount` required, since every caller now passes a real value:

```typescript
interface InboundChannelsCardProps {
  whatsappCount: number;
  instagramCount?: number;
  websiteEnquiriesCount: number;
  emailApplicationsCount: number;
}

export function InboundChannelsCard({
  whatsappCount,
  instagramCount = 185,
  websiteEnquiriesCount,
  emailApplicationsCount,
}: InboundChannelsCardProps) {
```

Also drop the trailing `+` on the WhatsApp number display (currently line 89, `{whatsappCount.toLocaleString()}+`) since it's now an exact count, not a rounded-up guess:

```typescript
              <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {whatsappCount.toLocaleString()}
              </div>
```

- [ ] **Step 4: Add a Draft tag to the enquiries list**

In `src/app/dashboard/enquiries/page.tsx`, add `status` to the header row (currently line 21):

```typescript
                <th className="px-4 py-2 font-medium">Received</th>
                <th className="px-4 py-2 font-medium"></th>
```

Add the tag cell to each row (currently the row ends after the "Received" `<td>` on line 34):

```typescript
                  <td className="px-4 py-2 text-[var(--dash-text-muted)]">
                    {row.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-2">
                    {row.status === "draft" && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                        Draft
                      </span>
                    )}
                  </td>
```

- [ ] **Step 5: Manually verify in the browser**

Run `npm run dev`, log into `/dashboard`, confirm the "WhatsApp" card no longer always reads a suspiciously round `500+` and instead reflects real click count (0 until Task 3's tracker logs some clicks). Visit `/dashboard/enquiries` and confirm any draft rows (from Task 5 testing) show the "Draft" tag.

- [ ] **Step 6: Commit**

```bash
git add src/app/dashboard/page.tsx src/app/dashboard/enquiries/page.tsx src/components/dashboard/inbound-channels-card.tsx
git commit -m "feat(dashboard): show real WhatsApp click count and draft-lead tags"
```
