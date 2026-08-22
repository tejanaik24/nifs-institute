## SESSION START — Read Before Anything
1. ~/.claude/CLAUDE.md (all agency rules)
2. D:\Vyzma\_BRAIN\vyzma-website-build-standards.md
3. D:\Vyzma\_BRAIN\clients\nifs\brand-voice.md
4. C:\claude code\nifs-india\PRODUCT.md

For design work also run:
node C:\Users\user\.claude\plugins\cache\impeccable\impeccable\3.9.1\skills\impeccable\scripts\context.mjs

Confirm loaded before starting any task.

---

# NIFS India

## What is this?
Premium website rebuild for NIFS India — fire & industrial safety training institute.
85+ centers across India. Targeting award-winning design quality.

## Live URLs
- Vercel: nifs-institute.vercel.app
- nifsindia.net — LIVE production domain.
  Deploy: node fast-deploy.js (FTP to cPanel)

## Stack
- Next.js 16, React 19, Tailwind v4, shadcn
- GSAP + ScrollTrigger, Framer Motion, Lenis
- Three.js + React Three Fiber (3D badges, ember particles)
- No CMS — all data in src/lib/

## Brand
- Primary red: #DC1711
- Fonts: Playfair Display Italic (headlines) + Inter (body)
- Vibe: gordonstoun.org.uk level premium — editorial, not corporate

## What's Done
- All pages built (about, courses, blog, gallery, centers, placements, contact)
- 142 blog posts migrated
- 182 gallery photos live
- 63 student placement records recovered
- Interactive India centers map
- 3D stat badges (Three.js)
- SEO redirects from old URLs

## What's Pending (Real Open Items)
- Design quality pass — site is "okish", needs wow factor (typography, motion, photography)
- RESEND_API_KEY + ADMISSIONS_EMAIL env vars not set → contact form not sending emails
- nifsindia.net custom domain not connected to Vercel yet
- nifs-images-incoming folder — check if real client images have arrived

## Important Rules
- BRAIN.md is source of truth — not TASKS.md or PROJECT.md (those are stale)
- Never use fabricated data — PlacementWall.tsx and TestimonialsSection.tsx have fake data, do not wire them in without real numbers from client
- Positioning: 70% industrial safety, 30% fire-specific
- Real recruiters: Adani, L&T, ITC, GMR, Amazon, MEIL

## 🛠️ Critical Deployment & Verification Protocol (End-to-End Workflow)
1. **Homepage Source of Truth:** the Next.js app itself. The old static `public/homepage.html` was deleted (2026-08-22) — the homepage is now real React components under `src/components/sections/home/`. Do not recreate the fetch-and-`document.write` hack.
2. **Deployment Execution:** `npm run build`, then upload the contents of `out/` to cPanel FTP (`ftp://nifsindia.net/public_html`). `.htaccess` 301s `/homepage.html` → `/`.
3. **Live Site Empirical Verification (Mandatory):**
   - Fetch `https://www.nifsindia.net/?cb=` + timestamp via Node.js HTTP. Confirm `Status 200` and that the served HTML contains hero copy ("India's Leader in Fire").
   - Run CDP headless Chrome verification script and verify output screenshots.
4. **Memory Logging:** Update `BRAIN.md` header & latest session section, and log immediately to `D:\Vyzma\_BRAIN\daily-notes\{YYYY-MM-DD}.md`.

