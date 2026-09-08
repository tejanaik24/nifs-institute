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
- Vercel project: nifs-institute (nifs-institute.vercel.app)
- nifsindia.net — LIVE production domain, connected to Vercel (cutover done 2026-09-05)
  Deploy: git push origin main, then `vercel deploy --prod`
  (old FTP/cPanel deploy is retired — cPanel-era files kept in work/, backups/, .next-cpanel/ but excluded from deploy via .vercelignore)

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
- Vercel cutover complete, nifsindia.net live on Vercel (2026-09-05)
- Core Web Vitals fix pass (2026-09-05): CLS (recruiter logo width/height), LCP (hero image responsive srcset + fetchPriority), Accessibility 100 + Agentic Browsing 3/3 on mobile PSI (inert vs aria-hidden, contrast fixes, dl/dt structure, label-content-name-mismatch)
- INP fix pass (2026-09-05): removed gsap from HomeIfesm (native IntersectionObserver+rAF counter) and HomePlacements (pure CSS marquee); deferred HomeAnimations' page-wide ScrollTrigger setup to requestIdleCallback so it no longer blocks the main thread on load

## What's Pending (Real Open Items)
- Design quality pass — site is "okish", needs wow factor (typography, motion, photography)
- RESEND_API_KEY + ADMISSIONS_EMAIL env vars not set → contact form not sending emails
- nifs-images-incoming folder — check if real client images have arrived
- Re-check PageSpeed Insights field data (28-day CrUX) in ~2 weeks to confirm the 2026-09-05 CWV/INP fixes actually moved the real-user numbers — desktop was previously at Accessibility 90/Agentic Browsing 2/3, mobile at 100/3/3; both should match after propagation
- Verify contact-form email delivery once RESEND_API_KEY is set

## Important Rules
- BRAIN.md is source of truth — not TASKS.md or PROJECT.md (those are stale)
- Never use fabricated data — PlacementWall.tsx and TestimonialsSection.tsx have fake data, do not wire them in without real numbers from client
- Positioning: 70% industrial safety, 30% fire-specific
- Real recruiters: Adani, L&T, ITC, GMR, Amazon, MEIL

## 🛠️ Critical Deployment & Verification Protocol (End-to-End Workflow)
1. **Homepage Source of Truth:** the Next.js app itself. Homepage is real React components under `src/components/sections/home/`, wired up in `src/app/(marketing)/page.tsx`.
2. **Deployment Execution (Vercel — current method):** `git push origin main`, then `vercel deploy --prod`. Do NOT use the old cPanel/FTP method — that's retired.
3. **Live Site Empirical Verification (Mandatory):**
   - `curl -sI https://nifsindia.net/` — confirm `200 OK`.
   - `curl -s https://nifsindia.net/ | grep -o "..."` for any specific text/class you just changed, to confirm it's actually in the served HTML (not just built locally).
4. **Memory Logging:** Update this file's "What's Done"/"What's Pending" sections after every session.

