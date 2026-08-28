# NIFS Dashboard — V1 Design

Status: approved by Teja 2026-08-28. Iteration happens on the built product from here,
not further spec rounds.

## Problem

Publishing a blog post today takes ~1 hour: hand-edit `blog-posts.json`, rebuild
the static export, run `fast-deploy.js` (re-uploads all ~3,784 files over FTP to
cPanel every time, regardless of what changed). There is no visibility into
visitors/pages/keywords without manually running Python scripts against the GA4/GSC
APIs. Confirmed via repository audit (Phase 1, 2026-08-28) — no assumptions.

## Goal (V1 only)

1. Publish a blog post from a web UI in under a minute, live immediately — no FTP,
   no manual rebuild.
2. See visitors, top pages, time on page, and search keywords — daily numbers plus
   a live "right now" visitor count — without leaving the dashboard.

Everything else from the original 13-module brief (leads/CRM, media library, team
roles, SEO opportunity engine, website health checks, activity log, notifications,
AI assist) is explicitly deferred to V2+. Confirmed with Teja 2026-08-28.

## Architecture decision

**Current state:** `nifs-india` is a Next.js 16 app running `output: "export"` —
pure static HTML, hosted on cPanel via FTP. No server, no database, no API routes
possible. This is *why* publishing is slow — there is no live endpoint for a
dashboard to call.

**Decision: move back to Vercel, done safely this time.**

Context: a Vercel migration was completed 2026-08-23 (DNS cutover verified working)
but rolled back the same day after an HTTPS/DNS failure during the cutover window.
Root cause research (2026-08-28): this matches a documented, common Vercel issue —
the SSL certificate for a newly-pointed domain can take several minutes to finish
issuing *after* DNS propagates, and Vercel's own domain-status API can report
`verified: true` before the certificate is actually ready, creating a real gap
where HTTPS fails for visitors. Source: Vercel's own troubleshooting and
pre-generate-SSL-certs docs. This is avoidable, not a sign Vercel is unfit for this
use case.

**Safe migration procedure this time:**
1. Add the production domain to the Vercel project and let the SSL certificate
   fully issue *before* touching live DNS (Vercel's "pre-generate certificates"
   flow).
2. Lower the domain's DNS TTL at least 24h before the cutover.
3. Flip DNS only after the certificate shows fully issued.
4. Keep the current cPanel A/CNAME records documented and ready to restore
   immediately if anything looks wrong post-cutover.
5. Verify with independent `curl`/TCP checks post-cutover, same standard already
   used in this repo's deployment protocol.

**Database:** Vercel has no first-party database. Use a managed Postgres (Neon or
Supabase — final pick is an implementation detail, both have adequate free tiers
for this scale). Holds: dashboard users, blog posts.

**Rendering:** Remove `output: "export"`. Blog pages become dynamic routes reading
from Postgres. Publishing a post flips its status and triggers on-demand
revalidation (`revalidatePath`) — live in seconds, no rebuild, no FTP upload.

**Non-blog pages** (courses, about, centers, etc.) can stay statically generated
from the existing `src/lib/data/*.ts` files at build time — only blog content and
the dashboard itself need to be dynamic/database-backed in V1. Don't migrate
content that doesn't need to move.

**The dashboard lives inside the same Next.js app**, under an auth-gated route
group (e.g. `/dashboard/*`), not a separate project/repo — one deploy, one
codebase, shares the same Postgres connection.

## Data model (V1 — only what's justified)

- `users` — id, email, password_hash. Two rows for V1 (Teja + one NIFS staff
  member), both full access, no role distinctions yet.
- `posts` — id, slug, title, excerpt, content (rich text/HTML), cover_image,
  category, seo_title, meta_description, og_image, status (`draft` | `published`),
  published_at, created_at, updated_at.

No local analytics tables — GA4/Search Console data is fetched live from Google's
APIs on each dashboard view, not duplicated into our own database. Nothing else
(no leads table, no media table, no roles table) — those are V2+ concerns, adding
them now would be unused schema.

## Screens (V1 — exactly two)

### 1. Content (blog CMS)
- List of all posts (draft + published), status visible at a glance.
- Editor: title, slug, excerpt, body, featured image, category, SEO title, meta
  description, OG image (confirmed scope with Teja — full SEO fields from day one,
  not deferred).
- Actions: Save draft, Publish (flips status + triggers revalidation — live
  immediately), Unpublish, Edit, Delete (with a confirmation step — no bare
  destructive click).

### 2. Analytics
- Daily numbers from GA4 + Search Console (already connected — service account
  configured, confirmed in repo audit): visitors, top pages, time on page, top
  search keywords.
- Live "who's on the site right now" widget via the GA4 Realtime Report API,
  polling on an interval (exact interval is an implementation detail — balance
  freshness against API quota).

### Login
- Simple email + password. Two accounts, no role/permission system in V1 (per
  Teja's explicit choice — add real RBAC only if/when a third person needs
  restricted access).

## Migration step (one-time, before cutover)

Import the existing 160 posts from `src/lib/data/blog-posts.json` into the new
`posts` table, `status = published`, `published_at` preserved from the existing
`date` field. The old cPanel site stays live and untouched until the new Vercel
deployment is verified working end-to-end.

## Visual design direction

Researched via `ui-ux-pro-max` design-system query + Teja's own design-DNA
history (`D:\Vyzma\_BRAIN\design-dna.md`), not guessed:

- **Color:** near-black background (`#1C1917` range, never flat `#000`), warm
  off-white for any light surfaces (never stark `#FFFFFF`), gold/amber accent
  (`#A16207` range) for primary actions and key numbers — matches Teja's
  independently-repeated "premium black + gold" signature across his other work.
- **Layout:** sidebar + main content area, same family as Linear/Vercel/Stripe —
  familiar, no learning curve, no clutter.
- **Typography:** clean sans-serif for UI/labels; monospace for numeric stats
  (visitor counts, etc.) — the standard real-dashboard trick for numbers to read
  as precise/counted rather than decorative.
- **Density:** dashboard-appropriate spacing (tighter than a marketing site) —
  this is a working tool, not a hero-section showcase.
- **Explicitly avoid:** purple/blue AI-gradient-blob look, glassmorphism-everywhere,
  emoji-as-icons, generic template feel. Real SVG icons (Heroicons/Lucide), real
  visual hierarchy, restraint over widget-count.

## Explicitly out of scope for V1

Leads/CRM, media library, team roles/RBAC beyond two flat accounts, SEO
opportunity engine, website health checks, activity log, notifications, AI
writing assist, global search, real-time "currently editing" collision handling.
All real ideas from the original brief — deliberately deferred, not forgotten.

## Open risks / need real answers before or during build

- Exact DNS TTL lowering + cutover timing needs doing during a low-traffic window,
  coordinated with Teja (this is a live production domain).
- Neon vs Supabase — pick one during implementation, no strong reason to prefer
  either at this scale; note the choice when made.
- GA4 Realtime API has query quotas — confirm the polling interval doesn't risk
  hitting them before shipping.
- `RESEND_API_KEY` / `ADMISSIONS_EMAIL` were noted as unset in BRAIN.md (contact
  form). Unrelated to this dashboard's scope, but flag again if it resurfaces.
