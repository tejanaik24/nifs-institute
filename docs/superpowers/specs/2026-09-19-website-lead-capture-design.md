# Website Lead Capture (WhatsApp clicks + form auto-save)

## Problem

The dashboard's "leads" number only counts rows in the `enquiries` table,
which only gets a row when someone submits the callback form. Three CTAs
added on 2026-09-16 (`whatsapp-seat-checker.tsx`, the enquiry-form
WhatsApp fast-track, and the course-card WhatsApp/call buttons) send
visitors to `wa.me/...` or `tel:...` links that never touch the site's
backend — those conversions are currently invisible to both Teja and NIFS.

Goal: NIFS's team (who log into the dashboard themselves) and Teja both
need an honest picture of total website leads — real, callable leads kept
strictly separate from anonymous signal counts, so nobody mistakes a
WhatsApp click for someone they can call back.

Out of scope for this spec: reading WhatsApp message content (requires
migrating the number to Meta's Business Platform — explicitly rejected),
call-tracking numbers for phone leads (real recurring cost — deferred),
and rolling this out to any client other than NIFS.

## Design

### 1. WhatsApp click logger

New table `whatsapp_clicks`:

```sql
CREATE TABLE whatsapp_clicks (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,        -- e.g. "hero_seat_checker", "enquiry_form", "course_card"
  page_path TEXT NOT NULL,     -- e.g. "/courses/adis"
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

New endpoint `POST /api/track/whatsapp-click` — accepts `{ source, pagePath }`,
inserts a row, returns `{ ok: true }`. Fire-and-forget: the click handler
calls it (plain `fetch`, no `await` needed since the WhatsApp link opens in
a new tab and the current page never unloads) then proceeds to open the
`wa.me` link exactly as today. Failure to log never blocks the WhatsApp
link from opening.

Every existing WhatsApp CTA (`whatsapp-seat-checker.tsx`, the enquiry-form
fast-track buttons, the course-card CTA) gets this one extra call added to
its `onClick`, each with its own fixed `source` string. No UI changes, no
visible behavior change for the visitor.

### 2. Form auto-save (draft leads)

Add two columns to `enquiries`:

```sql
ALTER TABLE enquiries ADD COLUMN status TEXT NOT NULL DEFAULT 'submitted'; -- 'draft' | 'submitted'
```

(`phone`/`name` stay `NOT NULL` — a draft only saves once both have enough
content to be useful: name ≥ 2 characters, phone ≥ 10 digits. Looser than
the full submit-time zod validation, since we're not blocking on typos
mid-typing.)

Behavior in `enquiry-form.tsx`:
- Debounce ~2s after the user stops typing in name/phone.
- First time the loose check passes, `POST /api/enquiry/draft` → inserts
  one row with `status: 'draft'`, returns its `id`, stored in a ref.
- Subsequent debounced fires with an existing draft id → `PATCH
  /api/enquiry/draft/:id` to update the same row (never a second insert).
- On real submit (existing `onSubmit` flow), if a draft id exists, the
  submit call updates that row's `status` to `'submitted'` instead of the
  current insert-only behavior; if no draft id exists (e.g. autofill/paste
  submitted before the debounce fired), insert as today.
- If the visitor never submits and never returns, the row simply stays
  `status: 'draft'` — still visible to NIFS's team as a real, callable
  lead, just labeled "Draft" in the dashboard list.

### 3. Dashboard changes

- `dashboard/page.tsx`'s lead count query stays the count of `enquiries`
  (drafts + submitted both count as real leads, per Teja's call — a name
  + phone is callable either way). Rows with `status: 'draft'` get a small
  "Draft" tag in the enquiries list so NIFS's team knows it wasn't a
  formal submit.
- New card: "WhatsApp Clicks (this period)" — a separate count from
  `whatsapp_clicks`, shown next to but never merged into the Real Leads
  number.

## Explicitly not doing

- No popup/interstitial before WhatsApp or call links — rejected as too
  much friction, risks losing leads.
- No call-tracking number / caller-ID capture — real recurring cost,
  deferred until Teja decides to revisit.
- No cookie-based ad/session attribution (gclid/fbclid, repeat-visitor
  linking) — descoped once the actual goal (one honest total-leads number)
  was clarified; may become its own future spec if Teja wants ad-level
  attribution later.
- No changes to any other client site — NIFS only.
