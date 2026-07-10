# NIFS India — Task Board

## PHASE 1: Foundation — DONE
- [x] Research NIFS India (content, branding, recruiters, career outcomes)
- [x] Research Gordonstoun (design tokens, motion patterns, live browser verification)
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui
- [x] Install GSAP, Lenis, React Three Fiber, react-hook-form, zod

## PHASE 2: Navigation Shell — DONE
- [x] Design tokens in `globals.css` (NIFS red `#DC1711`, Playfair Display + Inter)
- [x] Site header (floating circular menu button, Gordonstoun pattern)
- [x] Site footer
- [x] All routes stubbed, zero dead links (verified via `npm run build`)
- [x] Mobile nav (sheet/drawer)

## PHASE 3: Page Implementation

### Homepage — DONE (pending real images)
- [x] Hero (R3F ember field + video-poster placeholder + rotated tagline)
- [x] Trust strip (accreditations + recruiters)
- [x] Story block 1 — Practical Training Yard (GSAP scroll-pin + progress rail)
- [x] Story block 2 — Classroom to Site (reversed layout)
- [x] Course grid (4 featured courses)
- [x] Placement story section
- [x] Closing admissions CTA
- [ ] Swap `ImagePlaceholder` → real photos once available

### Courses — DONE (pending real images)
- [x] `/courses` index, grouped by tier
- [x] `/courses/[slug]` × 10 static pages (curriculum, eligibility, careers)
- [ ] Swap course-card placeholders for real photos

### About — DONE (pending real images)
- [x] Chairman's Desk section
- [x] Vision & Mission story block
- [ ] Real chairman portrait + copy review (current copy adapted from live site, needs a human pass)

### Industrial Services — DONE (pending real images)
- [x] In-house Training / Corporate Training / Safety Audits / Manpower Consultancy sections

### Centers — DONE (pending real images)
- [x] All 15 centers listed with HQ flag

### Placements — DONE (pending real images)
- [x] Career outcomes copy
- [x] Recruiter grid (21 real recruiters pulled from live site)

### Gallery — DONE (pending real images)
- [x] 6-image grid, all placeholder

### Admissions — DONE
- [x] Process steps
- [x] Working enquiry form → `/api/contact`

### Contact — DONE
- [x] Contact details
- [x] Working enquiry form

### Blog — STUB ONLY
- [ ] Migrate real articles from nifsindia.net/blog (not yet scraped)

## IMAGES — BLOCKED ON EXTERNAL GENERATION
- [ ] 14 images being generated in Google Antigravity by user, prompts already handed off
- [ ] Drop folder: `c:\claude code\nifs-images-incoming\`
- [ ] Once files land: move into `nifs-india/public/images/`, replace each `ImagePlaceholder` with `next/image`, remove the placeholder component's dev-only styling
- Full shot list with exact filenames is in BRAIN.md and the plan file

## PHASE GATE — PARTIALLY DONE
- [x] Mobile QA at 375px — tested live, found and fixed 3 real bugs (header
      contrast on subpages, duplicate drawer close button, hero placeholder
      text overlap, excess mobile section padding). See BRAIN.md.
- [x] Basic accessibility spot-check — keyboard tab order and focus
      visibility confirmed working; contrast ratios verified analytically
      (primary red ~5:1, body grey ~5.5-6:1 on white, both pass AA)
- [ ] `/website-design checkpoint` — full gate checklist before calling Phase 3 done
- [ ] Lighthouse pass (currently unverified — no real images yet, so LCP numbers aren't meaningful)
- [ ] Full a11y audit (screen reader pass, ARIA labels on icon-only buttons, form error announcements) — only spot-checked so far

## DEPLOYMENT — LIVE
- [x] Deployed to Vercel production: https://nifs-institute.vercel.app
- [ ] Set `RESEND_API_KEY` and `ADMISSIONS_EMAIL` env vars in Vercel project settings for the contact form to actually send email (currently logs to console only)
- [ ] Redeploy once real images are wired in from `nifs-images-incoming/`
- [ ] Connect a custom domain (e.g. nifsindia.net) once ready to replace the old site

## NEXT SESSION START WITH
1. Check if `c:\claude code\nifs-images-incoming\` has files — if yes, wire them in
2. If not, continue polishing content/copy or start mobile/accessibility QA
