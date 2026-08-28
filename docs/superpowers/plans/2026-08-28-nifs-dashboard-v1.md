# NIFS Dashboard V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give NIFS staff a working dashboard to publish blog posts instantly (no
FTP/rebuild) and see visitor/keyword analytics, replacing the current 1-hour
static-export publish flow.

**Architecture:** Add auth, a Postgres database (Neon), and a `/dashboard` route
group to the existing `nifs-india` Next.js app. Blog content moves from
`src/lib/data/blog-posts.json` into the database and becomes dynamically rendered
with on-demand revalidation. The rest of the site (courses, about, centers, etc.)
stays statically generated — untouched. Deploy target moves from cPanel/FTP to
Vercel (a dynamic-rendering route cannot run under `output: "export"`).

**Tech Stack:** Next.js 16 (App Router, Server Actions), Drizzle ORM +
`@neondatabase/serverless` (Neon Postgres), `bcryptjs` (password hashing), `jose`
(signed session cookies, edge-compatible for middleware), Tailwind v4 (existing),
`vitest` (new dev dependency, for the pure-logic units only — this repo has no
existing test runner and no DB/UI test harness; adding one is out of scope for a
2-user internal tool, see spec's "no automation" note under Open risks).

## Global Constraints

- Confirmed scope: exactly two screens (Content, Analytics) + login. No leads/CRM,
  media library, roles/RBAC, SEO engine, health checks, activity log,
  notifications, AI assist, or global search in V1 (spec: "Explicitly out of scope
  for V1").
- Two user accounts only, both full access, no role distinctions (spec: "Login").
- Color tokens: near-black `#1C1917` range background, warm off-white (never pure
  `#FFFFFF`) for light surfaces, gold/amber `#A16207` range accent (spec: "Visual
  design direction").
- Sidebar + main-content layout (spec: "Visual design direction").
- Sans-serif for UI/labels, monospace for numeric stats (spec: "Visual design
  direction").
- No emoji-as-icons — use `lucide-react` (already a dependency) for all icons
  (spec: "Visual design direction").
- Never fabricate analytics/lead data — every number shown must come from a real
  GA4/GSC API call, never a placeholder/mock value left in place (repo-wide Rule 9,
  confirmed still binding for this feature).
- Existing non-blog pages (`courses`, `about`, `centers`, etc.) must keep building
  successfully via `npm run build` after `output: "export"` is removed — don't
  break what already works.

---

## Task 1: Database schema, connection, and env scaffolding

**Files:**
- Create: `src/lib/db/schema.ts`
- Create: `src/lib/db/client.ts`
- Create: `drizzle.config.ts`
- Modify: `package.json` (add `drizzle-orm`, `@neondatabase/serverless`,
  `drizzle-kit`, `bcryptjs`, `@types/bcryptjs`, `jose`, `vitest`)
- Modify: `.env.local` (add `DATABASE_URL`, `SESSION_SECRET` — real values, not
  committed)
- Create: `.env.example` (placeholder names only, safe to commit)
- Modify: `.gitignore` (confirm `.env.local` already ignored — it is, per Phase 1
  audit; no change needed if so)

**Interfaces:**
- Produces: `db` (Drizzle client instance) from `src/lib/db/client.ts`, used by
  every later task that touches the database.
- Produces: `users` and `posts` Drizzle table objects from `src/lib/db/schema.ts`.

- [ ] **Step 1: Install dependencies**

```bash
cd "C:\claude code\nifs-india"
npm install drizzle-orm @neondatabase/serverless bcryptjs jose
npm install -D drizzle-kit @types/bcryptjs vitest
```

- [ ] **Step 2: Create a free Neon project and get the connection string**

Go to https://neon.tech, create a project named `nifs-dashboard`. Copy the pooled
connection string (starts `postgresql://`). This is a manual step — no code.

- [ ] **Step 3: Add environment variables**

Add to `.env.local` (this file is already gitignored — verified in Phase 1 audit):

```
DATABASE_URL=<paste the Neon connection string here>
SESSION_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

Create `.env.example` (this one IS committed — placeholders only):

```
DATABASE_URL=postgresql://user:password@host/dbname
SESSION_SECRET=generate-with-node-crypto-randomBytes-32-hex
```

- [ ] **Step 4: Write the schema**

Create `src/lib/db/schema.ts`:

```typescript
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  category: varchar("category", { length: 120 }).notNull().default(""),
  seoTitle: text("seo_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  ogImage: text("og_image").notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"), // "draft" | "published"
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

- [ ] **Step 5: Create the Drizzle client**

Create `src/lib/db/client.ts`:

```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
```

- [ ] **Step 6: Create drizzle-kit config and push the schema**

Create `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

Run: `npx drizzle-kit push`
Expected: confirms `users` and `posts` tables created in the Neon database (asks
for confirmation, answer yes).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json drizzle.config.ts .env.example src/lib/db/schema.ts src/lib/db/client.ts
git commit -m "feat(dashboard): add Postgres schema and Drizzle client"
```

---

## Task 2: Auth — password hashing, sessions, login page, middleware

**Files:**
- Create: `src/lib/auth/password.ts`
- Create: `src/lib/auth/password.test.ts`
- Create: `src/lib/auth/session.ts`
- Create: `src/lib/auth/session.test.ts`
- Create: `src/lib/db/users.ts`
- Create: `src/app/login/page.tsx`
- Create: `src/app/login/actions.ts`
- Create: `src/middleware.ts`
- Create: `scripts/create-dashboard-user.ts`

**Interfaces:**
- Consumes: `db`, `users` from Task 1.
- Produces: `hashPassword(plain: string): Promise<string>`,
  `verifyPassword(plain: string, hash: string): Promise<boolean>` from
  `src/lib/auth/password.ts`.
- Produces: `createSessionToken(userId: number): Promise<string>`,
  `verifySessionToken(token: string): Promise<{ userId: number } | null>` from
  `src/lib/auth/session.ts` — used by `src/middleware.ts` and later dashboard
  pages to identify the logged-in user.
- Produces: `getUserByEmail(email: string)` from `src/lib/db/users.ts`.

- [ ] **Step 1: Write failing tests for password hashing**

Create `src/lib/auth/password.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifies a correct password against its hash", async () => {
    const hash = await hashPassword("correct-horse-battery-staple");
    expect(await verifyPassword("correct-horse-battery-staple", hash)).toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const hash = await hashPassword("correct-horse-battery-staple");
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/auth/password.test.ts`
Expected: FAIL — `password.ts` does not exist yet.

- [ ] **Step 3: Implement password hashing**

Create `src/lib/auth/password.ts`:

```typescript
import bcrypt from "bcryptjs";

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/auth/password.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Write failing tests for session tokens**

Create `src/lib/auth/session.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from "vitest";
import { createSessionToken, verifySessionToken } from "./session";

beforeAll(() => {
  process.env.SESSION_SECRET = "test-secret-at-least-32-bytes-long-xxxx";
});

describe("session tokens", () => {
  it("round-trips a userId through a signed token", async () => {
    const token = await createSessionToken(42);
    const result = await verifySessionToken(token);
    expect(result?.userId).toBe(42);
  });

  it("rejects a tampered token", async () => {
    const token = await createSessionToken(42);
    const tampered = token.slice(0, -2) + "xx";
    const result = await verifySessionToken(tampered);
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/lib/auth/session.test.ts`
Expected: FAIL — `session.ts` does not exist yet.

- [ ] **Step 7: Implement session tokens**

Create `src/lib/auth/session.ts`:

```typescript
import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.userId !== "number") return null;
    return { userId: payload.userId };
  } catch {
    return null;
  }
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/lib/auth/session.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 9: Add the user query helper**

Create `src/lib/db/users.ts`:

```typescript
import { eq } from "drizzle-orm";
import { db } from "./client";
import { users } from "./schema";

export async function getUserByEmail(email: string) {
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return rows[0] ?? null;
}
```

- [ ] **Step 10: Build the login page and server action**

Create `src/app/login/actions.ts`:

```typescript
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/db/users";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/session";

export async function login(_prevState: string | null, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const user = await getUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return "Wrong email or password.";
  }

  const token = await createSessionToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set("nifs_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect("/dashboard/content");
}
```

Create `src/app/login/page.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C1917] px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-[#231F1B] p-8"
      >
        <h1 className="mb-6 text-xl font-semibold text-white">NIFS Dashboard</h1>
        <label className="mb-1 block text-sm text-white/70">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mb-4 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white"
        />
        <label className="mb-1 block text-sm text-white/70">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mb-4 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white"
        />
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-[#A16207] px-3 py-2 font-medium text-white disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
```

- [ ] **Step 11: Add middleware to protect `/dashboard/*`**

Create `src/middleware.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("nifs_session")?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

- [ ] **Step 12: Create the seed script for the two dashboard users**

Create `scripts/create-dashboard-user.ts`:

```typescript
import { db } from "../src/lib/db/client";
import { users } from "../src/lib/db/schema";
import { hashPassword } from "../src/lib/auth/password";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.error("Usage: npx tsx scripts/create-dashboard-user.ts <email> <password>");
    process.exit(1);
  }
  const passwordHash = await hashPassword(password);
  await db.insert(users).values({ email, passwordHash });
  console.log(`Created dashboard user: ${email}`);
}

main();
```

Run (once, for real, with Teja's and the staff member's actual email + a real
password — do not commit real credentials anywhere):
`npx tsx scripts/create-dashboard-user.ts teja@example.com <real-password>`

- [ ] **Step 13: Run full test suite and commit**

Run: `npx vitest run`
Expected: PASS (4 tests total)

```bash
git add src/lib/auth src/lib/db/users.ts src/app/login src/middleware.ts scripts/create-dashboard-user.ts
git commit -m "feat(dashboard): add login, sessions, and route protection"
```

---

## Task 3: Blog data access layer + migrate existing 160 posts

**Files:**
- Create: `src/lib/db/posts.ts`
- Create: `src/lib/db/posts.test.ts`
- Create: `scripts/migrate-blog-posts-to-db.ts`

**Interfaces:**
- Consumes: `db`, `posts` from Task 1.
- Produces: `slugify(title: string): string`,
  `getPublishedPosts()`, `getAllPosts()`, `getPostBySlug(slug: string)`,
  `getPostById(id: number)`, `createPost(data)`, `updatePost(id, data)`,
  `publishPost(id: number)`, `unpublishPost(id: number)`, `deletePost(id: number)`
  — used by Task 4 (public blog routes) and Task 5 (dashboard content module).

- [ ] **Step 1: Write a failing test for the pure `slugify` helper**

Create `src/lib/db/posts.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { slugify } from "./posts";

describe("slugify", () => {
  it("lowercases and hyphenates a title", () => {
    expect(slugify("Top 10 Fire Safety Courses!")).toBe("top-10-fire-safety-courses");
  });

  it("strips repeated and trailing hyphens", () => {
    expect(slugify("  Safety --- Officer  ")).toBe("safety-officer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/db/posts.test.ts`
Expected: FAIL — `posts.ts` does not exist yet.

- [ ] **Step 3: Implement the data access layer**

Create `src/lib/db/posts.ts`:

```typescript
import { and, desc, eq } from "drizzle-orm";
import { db } from "./client";
import { posts } from "./schema";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getPublishedPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
}

export async function getAllPosts() {
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostBySlug(slug: string) {
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);
  return rows[0] ?? null;
}

export async function getPostById(id: number) {
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return rows[0] ?? null;
}

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  ogImage: string;
};

export async function createPost(data: PostInput) {
  const rows = await db.insert(posts).values(data).returning();
  return rows[0];
}

export async function updatePost(id: number, data: Partial<PostInput>) {
  const rows = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return rows[0];
}

export async function publishPost(id: number) {
  const rows = await db
    .update(posts)
    .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return rows[0];
}

export async function unpublishPost(id: number) {
  const rows = await db
    .update(posts)
    .set({ status: "draft", updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return rows[0];
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/db/posts.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Write the one-time migration script**

Create `scripts/migrate-blog-posts-to-db.ts`:

```typescript
import fs from "node:fs";
import path from "node:path";
import { db } from "../src/lib/db/client";
import { posts } from "../src/lib/db/schema";

type LegacyPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  categories: string[];
  excerpt: string;
  coverImage: string;
  contentHtml: string;
};

async function main() {
  const filePath = path.join(__dirname, "..", "src", "lib", "data", "blog-posts.json");
  const legacyPosts: LegacyPost[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let migrated = 0;
  for (const post of legacyPosts) {
    await db
      .insert(posts)
      .values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt ?? "",
        content: post.contentHtml ?? "",
        coverImage: post.coverImage ?? "",
        category: post.categories?.[0] ?? "",
        seoTitle: post.title,
        metaDescription: post.excerpt ?? "",
        ogImage: post.coverImage ?? "",
        status: "published",
        publishedAt: new Date(post.date),
      })
      .onConflictDoNothing({ target: posts.slug });
    migrated++;
  }
  console.log(`Migrated ${migrated} posts (existing slugs skipped).`);
}

main();
```

- [ ] **Step 6: Run the migration against the real Neon database**

Run: `npx tsx scripts/migrate-blog-posts-to-db.ts`
Expected: `Migrated 160 posts (existing slugs skipped).` Verify with a spot check:
`npx drizzle-kit studio` and confirm the `posts` table has 160 rows with
`status = 'published'`.

- [ ] **Step 7: Commit**

```bash
git add src/lib/db/posts.ts src/lib/db/posts.test.ts scripts/migrate-blog-posts-to-db.ts
git commit -m "feat(dashboard): add post data access layer and migrate 160 existing posts"
```

---

## Task 4: Switch public blog routes to read from the database

**Files:**
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getPublishedPosts`, `getPostBySlug` from Task 3.

**Note for the implementer:** read the current contents of both files before
editing — they currently import from `src/lib/data/blog.ts` /
`blog-posts.json`. Replace that data source with the database calls below,
keeping the existing JSX/markup and SEO metadata generation exactly as-is
(this is a data-source swap, not a redesign). Do not remove
`src/lib/data/blog-posts.json` — keep it as the historical source-of-truth
record referenced by the migration script; just stop reading it live.

- [ ] **Step 1: Update the blog index page**

In `src/app/blog/page.tsx`, replace the import/read of the JSON-backed post list
with:

```typescript
import { getPublishedPosts } from "@/lib/db/posts";

// inside the page component:
const posts = await getPublishedPosts();
```

Keep every other line (JSX, metadata) unchanged — only the data source changes.
Field names now come from the Drizzle `posts` table (`coverImage`, `publishedAt`,
etc.) — match them to whatever field names the existing JSX expects; rename at
the call site if they differ (e.g. old `date` field → new `publishedAt`).

- [ ] **Step 2: Update the blog post page**

In `src/app/blog/[slug]/page.tsx`, replace the JSON lookup with:

```typescript
import { getPostBySlug } from "@/lib/db/posts";
import { notFound } from "next/navigation";

// inside the page component:
const post = await getPostBySlug(params.slug);
if (!post) notFound();
```

Remove any `generateStaticParams` on this route (it can no longer be
statically generated — the post list now changes at runtime, not build time).

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build completes; blog routes now report as dynamic (ƒ) rather than
static (●) in the build output — this is correct and expected for this route
only.

- [ ] **Step 4: Manually verify against a real post**

Run: `npm run dev`, open `http://localhost:3000/blog/` and one real post slug
(e.g. one migrated in Task 3) in a browser. Confirm the title, image, and body
render correctly.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog
git commit -m "feat(dashboard): serve blog pages from the database instead of blog-posts.json"
```

---

## Task 5: Dashboard shell (sidebar layout, theme, logout)

**Files:**
- Create: `src/app/dashboard/layout.tsx`
- Create: `src/components/dashboard/sidebar.tsx`
- Create: `src/app/dashboard/page.tsx`
- Create: `src/app/logout/route.ts`
- Modify: `src/app/globals.css` (add dashboard color tokens — additive only, do
  not touch existing site tokens)

**Interfaces:**
- Consumes: nothing new — pure layout/UI.
- Produces: the `/dashboard` layout every later dashboard page renders inside.

- [ ] **Step 1: Add dashboard color tokens**

In `src/app/globals.css`, add (do not remove or rename any existing token):

```css
:root {
  --dash-bg: #1c1917;
  --dash-surface: #231f1b;
  --dash-border: rgba(255, 255, 255, 0.1);
  --dash-text: #f5f0e6;
  --dash-text-muted: rgba(245, 240, 230, 0.6);
  --dash-accent: #a16207;
}
```

- [ ] **Step 2: Build the sidebar component**

Create `src/components/dashboard/sidebar.tsx`:

```tsx
import Link from "next/link";
import { FileText, BarChart3 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard/content", label: "Content", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <nav className="flex h-full w-56 flex-col border-r border-[var(--dash-border)] bg-[var(--dash-surface)] p-4">
      <div className="mb-8 px-2 font-mono text-sm tracking-wide text-[var(--dash-text)]">
        NIFS DASHBOARD
      </div>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="mb-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--dash-text-muted)] hover:bg-white/5 hover:text-[var(--dash-text)]"
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
      <form action="/logout" method="post" className="mt-auto">
        <button className="w-full rounded-md px-3 py-2 text-left text-sm text-[var(--dash-text-muted)] hover:bg-white/5 hover:text-[var(--dash-text)]">
          Sign out
        </button>
      </form>
    </nav>
  );
}
```

- [ ] **Step 3: Build the dashboard layout**

Create `src/app/dashboard/layout.tsx`:

```tsx
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-[var(--dash-text)]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 4: Add the dashboard index redirect**

Create `src/app/dashboard/page.tsx`:

```tsx
import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  redirect("/dashboard/content");
}
```

- [ ] **Step 5: Add the logout route**

Create `src/app/logout/route.ts`:

```typescript
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("nifs_session");
  redirect("/login");
}
```

- [ ] **Step 6: Verify manually**

Run: `npm run dev`, log in via `/login`, confirm redirect to
`/dashboard/content` (will 404 until Task 6 — that's expected right now), the
sidebar renders with both nav items and the dark/gold theme, and "Sign out"
returns to `/login`.

- [ ] **Step 7: Commit**

```bash
git add src/app/dashboard/layout.tsx src/app/dashboard/page.tsx src/components/dashboard/sidebar.tsx src/app/logout src/app/globals.css
git commit -m "feat(dashboard): add dashboard shell, sidebar, and logout"
```

---

## Task 6: Content module — post list, editor, publish actions

**Files:**
- Create: `src/app/dashboard/content/page.tsx`
- Create: `src/app/dashboard/content/actions.ts`
- Create: `src/app/dashboard/content/new/page.tsx`
- Create: `src/app/dashboard/content/[id]/edit/page.tsx`
- Create: `src/components/dashboard/post-editor-form.tsx`
- Create: `src/components/dashboard/post-list.tsx`

**Interfaces:**
- Consumes: `getAllPosts`, `getPostById`, `createPost`, `updatePost`,
  `publishPost`, `unpublishPost`, `deletePost`, `slugify` from Task 3.

- [ ] **Step 1: Build the server actions**

Create `src/app/dashboard/content/actions.ts`:

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
  slugify,
} from "@/lib/db/posts";

function readPostForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: slugify(String(formData.get("title") ?? "")),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    category: String(formData.get("category") ?? ""),
    seoTitle: String(formData.get("seoTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    ogImage: String(formData.get("ogImage") ?? ""),
  };
}

export async function saveDraftAction(formData: FormData) {
  const data = readPostForm(formData);
  await createPost(data);
  redirect("/dashboard/content");
}

export async function updatePostAction(id: number, formData: FormData) {
  const data = readPostForm(formData);
  await updatePost(id, data);
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/dashboard/content");
}

export async function publishPostAction(id: number, slug: string) {
  await publishPost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function unpublishPostAction(id: number, slug: string) {
  await unpublishPost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function deletePostAction(id: number, slug: string) {
  await deletePost(id);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}
```

- [ ] **Step 2: Build the post list component**

Create `src/components/dashboard/post-list.tsx`:

```tsx
"use client";

import Link from "next/link";
import { publishPostAction, unpublishPostAction, deletePostAction } from "@/app/dashboard/content/actions";

type Post = {
  id: number;
  slug: string;
  title: string;
  status: string;
  updatedAt: Date;
};

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="text-[var(--dash-text-muted)]">
        <tr>
          <th className="pb-3 font-normal">Title</th>
          <th className="pb-3 font-normal">Status</th>
          <th className="pb-3 font-normal">Updated</th>
          <th className="pb-3 font-normal">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id} className="border-t border-[var(--dash-border)]">
            <td className="py-3">
              <Link href={`/dashboard/content/${post.id}/edit`} className="hover:text-[var(--dash-accent)]">
                {post.title}
              </Link>
            </td>
            <td className="py-3">
              <span
                className={
                  post.status === "published"
                    ? "rounded-full bg-[var(--dash-accent)]/20 px-2 py-0.5 font-mono text-xs text-[var(--dash-accent)]"
                    : "rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-[var(--dash-text-muted)]"
                }
              >
                {post.status}
              </span>
            </td>
            <td className="py-3 font-mono text-xs text-[var(--dash-text-muted)]">
              {new Date(post.updatedAt).toLocaleDateString()}
            </td>
            <td className="py-3">
              {post.status === "published" ? (
                <button
                  onClick={() => unpublishPostAction(post.id, post.slug)}
                  className="mr-3 text-xs text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
                >
                  Unpublish
                </button>
              ) : (
                <button
                  onClick={() => publishPostAction(post.id, post.slug)}
                  className="mr-3 text-xs text-[var(--dash-accent)]"
                >
                  Publish
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                    deletePostAction(post.id, post.slug);
                  }
                }}
                className="text-xs text-red-400"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- [ ] **Step 3: Build the content list page**

Create `src/app/dashboard/content/page.tsx`:

```tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/db/posts";
import { PostList } from "@/components/dashboard/post-list";

export default async function ContentPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Content</h1>
        <Link
          href="/dashboard/content/new"
          className="rounded-md bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-white"
        >
          New post
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
```

- [ ] **Step 4: Build the shared editor form**

Create `src/components/dashboard/post-editor-form.tsx`:

```tsx
type PostFormValues = {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

const FIELD = "mb-4 w-full rounded-md border border-[var(--dash-border)] bg-black/20 px-3 py-2 text-[var(--dash-text)]";
const LABEL = "mb-1 block text-sm text-[var(--dash-text-muted)]";

export function PostEditorForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: PostFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl">
      <label className={LABEL}>Title</label>
      <input name="title" defaultValue={initial?.title} required className={FIELD} />

      <label className={LABEL}>Excerpt</label>
      <textarea name="excerpt" defaultValue={initial?.excerpt} rows={2} className={FIELD} />

      <label className={LABEL}>Body</label>
      <textarea name="content" defaultValue={initial?.content} rows={12} className={FIELD} />

      <label className={LABEL}>Cover image URL</label>
      <input name="coverImage" defaultValue={initial?.coverImage} className={FIELD} />

      <label className={LABEL}>Category</label>
      <input name="category" defaultValue={initial?.category} className={FIELD} />

      <h2 className="mb-3 mt-6 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        SEO
      </h2>

      <label className={LABEL}>SEO title</label>
      <input name="seoTitle" defaultValue={initial?.seoTitle} className={FIELD} />

      <label className={LABEL}>Meta description</label>
      <textarea name="metaDescription" defaultValue={initial?.metaDescription} rows={2} className={FIELD} />

      <label className={LABEL}>OG image URL</label>
      <input name="ogImage" defaultValue={initial?.ogImage} className={FIELD} />

      <button
        type="submit"
        className="mt-2 rounded-md bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
```

- [ ] **Step 5: Build the new-post page**

Create `src/app/dashboard/content/new/page.tsx`:

```tsx
import { PostEditorForm } from "@/components/dashboard/post-editor-form";
import { saveDraftAction } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">New post</h1>
      <PostEditorForm action={saveDraftAction} submitLabel="Save draft" />
    </div>
  );
}
```

- [ ] **Step 6: Build the edit-post page**

Create `src/app/dashboard/content/[id]/edit/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/db/posts";
import { PostEditorForm } from "@/components/dashboard/post-editor-form";
import { updatePostAction } from "../../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  const boundAction = updatePostAction.bind(null, post.id);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Edit post</h1>
      <PostEditorForm action={boundAction} initial={post} submitLabel="Save changes" />
    </div>
  );
}
```

- [ ] **Step 7: Verify manually end-to-end**

Run: `npm run dev`. Log in, click "New post," fill in a title + body, save
draft, confirm it appears in the list as `draft`. Click "Publish," confirm the
status badge flips to `published`, then open `/blog/<generated-slug>/` in a new
tab and confirm the post is live immediately (no rebuild). Click "Unpublish,"
confirm `/blog/<slug>/` now 404s. Click "Delete" on a test post, confirm the row
disappears.

- [ ] **Step 8: Commit**

```bash
git add src/app/dashboard/content src/components/dashboard/post-editor-form.tsx src/components/dashboard/post-list.tsx
git commit -m "feat(dashboard): add blog content list, editor, and publish/unpublish/delete"
```

---

## Task 7: Analytics — daily GA4 + Search Console data

**Files:**
- Create: `src/lib/analytics/ga4.ts`
- Create: `src/lib/analytics/gsc.ts`
- Create: `src/app/dashboard/analytics/page.tsx`
- Create: `src/components/dashboard/stat-card.tsx`

**Interfaces:**
- Produces: `getDailySummary(): Promise<{ visitors: number; topPages: {path: string; views: number; avgTimeSeconds: number}[] }>`
  from `src/lib/analytics/ga4.ts`.
- Produces: `getTopQueries(): Promise<{ query: string; clicks: number; impressions: number; position: number }[]>`
  from `src/lib/analytics/gsc.ts`.

**Note for the implementer:** the GA4 property ID and GSC property URL and
credentials are already documented in this repo's `BRAIN.md` (GA4 property
`properties/549697175`, service account key at
`C:\Users\user\.config\claude-seo\vyzma-seo-a209580c533b.json`, GSC property
`https://www.nifsindia.net/`) — reuse that service account, don't create a new
one. Set the key file path via a `GOOGLE_APPLICATION_CREDENTIALS` env var rather
than hardcoding the path in source.

- [ ] **Step 1: Add the credentials env var**

Add to `.env.local`:

```
GOOGLE_APPLICATION_CREDENTIALS=C:\Users\user\.config\claude-seo\vyzma-seo-a209580c533b.json
GA4_PROPERTY_ID=properties/549697175
GSC_SITE_URL=https://www.nifsindia.net/
```

Add the same three variable names (no real values) to `.env.example`.

- [ ] **Step 2: Install the Google API client**

```bash
npm install @google-analytics/data googleapis
```

- [ ] **Step 3: Implement the GA4 daily summary**

Create `src/lib/analytics/ga4.ts`:

```typescript
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const client = new BetaAnalyticsDataClient();

export async function getDailySummary() {
  const propertyId = process.env.GA4_PROPERTY_ID!;

  const [summary] = await client.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
    metrics: [{ name: "activeUsers" }],
  });
  const visitors = Number(summary.rows?.[0]?.metricValues?.[0]?.value ?? 0);

  const [pages] = await client.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10,
  });

  const topPages = (pages.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    views: Number(row.metricValues?.[0]?.value ?? 0),
    avgTimeSeconds: Number(row.metricValues?.[1]?.value ?? 0),
  }));

  return { visitors, topPages };
}

export async function getActiveUsersRightNow(): Promise<number> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await client.runRealtimeReport({
    property: propertyId,
    metrics: [{ name: "activeUsers" }],
  });
  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}
```

- [ ] **Step 4: Implement the Search Console top queries**

Create `src/lib/analytics/gsc.ts`:

```typescript
import { google } from "googleapis";

export async function getTopQueries() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 28);

  const response = await searchconsole.searchanalytics.query({
    siteUrl: process.env.GSC_SITE_URL!,
    requestBody: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      dimensions: ["query"],
      rowLimit: 10,
    },
  });

  return (response.data.rows ?? []).map((row) => ({
    query: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    position: row.position ?? 0,
  }));
}
```

- [ ] **Step 5: Build the stat card component**

Create `src/components/dashboard/stat-card.tsx`:

```tsx
export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
      <div className="mb-1 text-xs text-[var(--dash-text-muted)]">{label}</div>
      <div className="font-mono text-2xl text-[var(--dash-text)]">{value}</div>
    </div>
  );
}
```

- [ ] **Step 6: Build the analytics page**

Create `src/app/dashboard/analytics/page.tsx`:

```tsx
import { getDailySummary } from "@/lib/analytics/ga4";
import { getTopQueries } from "@/lib/analytics/gsc";
import { StatCard } from "@/components/dashboard/stat-card";

export const revalidate = 3600; // refresh hourly — daily-granularity data, no need for per-request calls

export default async function AnalyticsPage() {
  const [summary, queries] = await Promise.all([getDailySummary(), getTopQueries()]);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Analytics</h1>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatCard label="Visitors yesterday" value={summary.visitors} />
        <StatCard label="Top page (7d)" value={summary.topPages[0]?.path ?? "—"} />
        <StatCard label="Top page views (7d)" value={summary.topPages[0]?.views ?? 0} />
      </div>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Top pages (7 days)
      </h2>
      <table className="mb-8 w-full text-left text-sm">
        <thead className="text-[var(--dash-text-muted)]">
          <tr>
            <th className="pb-2 font-normal">Page</th>
            <th className="pb-2 font-normal">Views</th>
            <th className="pb-2 font-normal">Avg. time (s)</th>
          </tr>
        </thead>
        <tbody>
          {summary.topPages.map((page) => (
            <tr key={page.path} className="border-t border-[var(--dash-border)]">
              <td className="py-2">{page.path}</td>
              <td className="py-2 font-mono">{page.views}</td>
              <td className="py-2 font-mono">{Math.round(page.avgTimeSeconds)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Top search keywords (28 days)
      </h2>
      <table className="w-full text-left text-sm">
        <thead className="text-[var(--dash-text-muted)]">
          <tr>
            <th className="pb-2 font-normal">Query</th>
            <th className="pb-2 font-normal">Clicks</th>
            <th className="pb-2 font-normal">Impressions</th>
            <th className="pb-2 font-normal">Avg. position</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q) => (
            <tr key={q.query} className="border-t border-[var(--dash-border)]">
              <td className="py-2">{q.query}</td>
              <td className="py-2 font-mono">{q.clicks}</td>
              <td className="py-2 font-mono">{q.impressions}</td>
              <td className="py-2 font-mono">{q.position.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 7: Verify manually**

Run: `npm run dev`, open `/dashboard/analytics`, confirm real numbers render (not
zeros/errors) — cross-check the visitor count against a manual
`python scratch/ga4_realtime_check.py` run (already exists in this repo per
BRAIN.md) to confirm the figures agree.

- [ ] **Step 8: Commit**

```bash
git add src/lib/analytics src/app/dashboard/analytics src/components/dashboard/stat-card.tsx .env.example
git commit -m "feat(dashboard): add daily GA4 and Search Console analytics page"
```

---

## Task 8: Analytics — live "right now" visitor widget

**Files:**
- Create: `src/app/api/analytics/realtime/route.ts`
- Create: `src/components/dashboard/realtime-widget.tsx`
- Modify: `src/app/dashboard/analytics/page.tsx`

**Interfaces:**
- Consumes: `getActiveUsersRightNow` from Task 7.

- [ ] **Step 1: Build the API route**

Create `src/app/api/analytics/realtime/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getActiveUsersRightNow } from "@/lib/analytics/ga4";

export async function GET() {
  const activeUsers = await getActiveUsersRightNow();
  return NextResponse.json({ activeUsers });
}
```

- [ ] **Step 2: Build the polling client widget**

Create `src/components/dashboard/realtime-widget.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export function RealtimeWidget() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/analytics/realtime");
        const data = await res.json();
        if (!cancelled) setActiveUsers(data.activeUsers);
      } catch {
        // leave last known value on a transient failure
      }
    }

    poll();
    const interval = setInterval(poll, 30_000); // 30s — well under GA4 Realtime API quota
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="rounded-lg border border-[var(--dash-accent)]/40 bg-[var(--dash-surface)] p-5">
      <div className="mb-1 flex items-center gap-2 text-xs text-[var(--dash-text-muted)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--dash-accent)]" />
        Right now
      </div>
      <div className="font-mono text-2xl text-[var(--dash-text)]">
        {activeUsers === null ? "—" : activeUsers}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add the widget to the analytics page**

In `src/app/dashboard/analytics/page.tsx`, import `RealtimeWidget` and add it as
a fourth item in the existing stat-card grid (change `grid-cols-3` to
`grid-cols-4`):

```tsx
import { RealtimeWidget } from "@/components/dashboard/realtime-widget";

// inside the grid, alongside the existing StatCard elements:
<RealtimeWidget />
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`, open `/dashboard/analytics` in one tab and the live
`nifsindia.net` site in another (or the local dev server's homepage). Confirm
the "Right now" count updates within 30 seconds of opening the second tab.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/analytics src/components/dashboard/realtime-widget.tsx src/app/dashboard/analytics/page.tsx
git commit -m "feat(dashboard): add live real-time visitor widget"
```

---

## Task 9: Remove static export, verify full site build

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json` (build script)

**Note for the implementer:** this is the highest-blast-radius change in the
plan — it affects every route in the site, not just the dashboard. Read
`next.config.ts` in full before editing; it currently documents *why*
`output: "export"` is there (the 2026-08-23 cPanel rollback). Do not delete that
historical comment — update it to explain the new state instead.

- [ ] **Step 1: Update `next.config.ts`**

Remove `output: "export"` and `images: { unoptimized: true }` is no longer
required (Vercel handles image optimization natively) but is harmless to leave;
remove it for correctness. Replace the file's top comment to reflect the new
deployment model:

```typescript
import type { NextConfig } from "next";

// Hosted on Vercel (migrated back from cPanel static export 2026-08-2X, this
// time with a staged SSL/DNS cutover — see
// docs/superpowers/specs/2026-08-28-nifs-dashboard-v1-design.md). Blog routes
// and /dashboard are dynamic (database-backed); every other route still
// prerenders at build time via generateStaticParams, unaffected by this change.
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 2: Confirm the build script no longer needs static-export-only steps**

Read `package.json`'s `build` script (`node scripts/generate-htaccess.js && node
scripts/generate-llms-full.js && next build`). `generate-htaccess.js` was only
needed because static export can't run `redirects()`/`headers()` — with
`output: "export"` removed, Next.js's own `redirects()`/`headers()` in
`next.config.ts` work natively. This plan does not port the 200+ existing
`.htaccess` redirects into `next.config.ts` — that is real, separate work.
**Leave `generate-htaccess.js` in the build script and keep `public/.htaccess`
generation as-is for now** (harmless no-op on Vercel — Vercel simply won't read
it) so no existing redirect silently breaks. Flag porting those redirects to
`next.config.ts`'s `redirects()` as a follow-up task, not part of this plan.

No file change needed for this step — it's a decision, not an edit. Record it by
leaving a one-line comment in `next.config.ts` next to the config object:

```typescript
// public/.htaccess is still generated by the build (see package.json) but is
// inert on Vercel — the 200+ legacy-URL redirects it encodes have NOT been
// ported to redirects() below yet. Follow-up work, tracked separately.
```

- [ ] **Step 3: Run a full local build**

Run: `npm run build`
Expected: build completes with 0 errors. Confirm in the output that non-blog
routes (e.g. `/courses/`, `/about/`) still show as static (●) and `/blog/[slug]`
shows as dynamic (ƒ).

- [ ] **Step 4: Run the full test suite once more**

Run: `npx vitest run`
Expected: PASS (all tests from Tasks 2–3)

- [ ] **Step 5: Commit**

```bash
git add next.config.ts
git commit -m "feat(dashboard): remove static export, enable dynamic blog/dashboard routes"
```

---

## Task 10: Deploy to Vercel with a safe DNS cutover

**Files:** none (operational task — infrastructure, not code)

**This task requires Teja directly** for the DNS changes (registrar/cPanel
access) and a go/no-go call before the live cutover — do not perform the DNS
flip without his explicit confirmation in the moment, per this repo's own
established deployment protocol (BRAIN.md: "empirical verification is
mandatory," and per the spec's safe-migration procedure).

- [ ] **Step 1: Push the branch and connect the Vercel project**

Push all commits from Tasks 1–9 to GitHub. In the Vercel dashboard, the
`nifs-institute` project already exists (confirmed in repo history) — reconnect
it to this branch/repo if not already connected, and add all environment
variables from `.env.local` (`DATABASE_URL`, `SESSION_SECRET`,
`GOOGLE_APPLICATION_CREDENTIALS` — for Vercel, upload the service account JSON
content as a `GOOGLE_APPLICATION_CREDENTIALS_JSON` env var instead of a file
path, and adjust `src/lib/analytics/ga4.ts` / `gsc.ts` auth construction to read
from that env var when set, falling back to the file path for local dev) and
`GA4_PROPERTY_ID`, `GSC_SITE_URL`.

- [ ] **Step 2: Verify on the Vercel preview URL first**

Deploy to the `*.vercel.app` preview URL (not the custom domain yet). Confirm:
login works, `/dashboard/content` and `/dashboard/analytics` both load with
real data, a test post publishes and appears on `/blog/` immediately, and every
non-blog route (`/`, `/courses/`, `/about/`, `/centers/`) still renders
correctly.

- [ ] **Step 3: Pre-generate the SSL certificate before touching DNS**

In the Vercel project's Domains settings, add `nifsindia.net` and
`www.nifsindia.net`. Wait for Vercel to report the certificate as fully issued
(not just "verified") before proceeding — this is the exact step that was
skipped in the 2026-08-23 attempt. Confirm with Teja before this step, since it
requires his DNS/registrar access to add the verification records Vercel asks
for.

- [ ] **Step 4: Lower DNS TTL 24h ahead of cutover**

With Teja: lower the TTL on the domain's A/CNAME records to 300s (5 min) at
least 24 hours before the planned cutover, so a rollback (if needed) propagates
fast.

- [ ] **Step 5: Flip DNS with Teja present**

Only after Step 3's certificate is confirmed fully issued: update the A record
to Vercel's IP and the `www` CNAME to `cname.vercel-dns.com`, per Vercel's
Domains page instructions. Keep the current cPanel record values written down
before changing anything, so a revert is a copy-paste, not a lookup.

- [ ] **Step 6: Empirically verify, same standard as every other deploy in this
  repo**

Run independent `curl` checks against `https://www.nifsindia.net/`,
`https://www.nifsindia.net/blog/`, and `https://www.nifsindia.net/dashboard/`
(expect a redirect to `/login`, confirming middleware is active in production).
Confirm HTTP 200 / correct HTML on each, exactly as this repo's existing
`DEPLOYMENT.md` protocol requires before calling a deploy done.

- [ ] **Step 7: Update BRAIN.md and the daily note**

Log the successful migration in `C:\claude code\nifs-india\BRAIN.md` (NEXT
SESSION PRIORITY section) and
`D:\Vyzma\_BRAIN\daily-notes\{today}.md`, per this repo's and the global
CLAUDE.md's standing logging rules. Note the old `fast-deploy.js`/cPanel FTP
flow is now retired for blog publishing (kept only as a historical reference,
not deleted — other static pages could still theoretically need it until a
future decision retires cPanel hosting entirely).
