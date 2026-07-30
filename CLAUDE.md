# NIFS India

## What is this?
Premium website rebuild for NIFS India — fire & industrial safety training institute.
85+ centers across India. Targeting award-winning design quality.

## Live URLs
- Vercel: nifs-institute.vercel.app
- Real domain (not connected yet): nifsindia.net

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
1. **Homepage Source of Truth:** `public/homepage.html` (220KB) is the real standalone homepage. `out/index.html` must ALWAYS be a copy of `public/homepage.html`.
2. **Post-Build Auto-Sync:** `npm run build`, `fast-deploy.js`, and `upload-real-homepage.js` automatically copy `public/homepage.html` (220KB) over `out/index.html`. NEVER upload a 25KB raw Next.js shell file.
3. **Deployment Execution:** Use `node restore-homepage-html.js` or `node upload-real-homepage.js` to upload `/public_html/index.html` and `.htaccess` to cPanel FTP (`ftp://nifsindia.net/public_html`).
4. **Live Site Empirical Verification (Mandatory):**
   - Fetch `https://www.nifsindia.net/?cb=` + timestamp via Node.js HTTP. Confirm `Status 200`, `Length ~220,000`, `Has Dark Nav Pill: true`, `Old phone 9246624690: 0`, `New phone 8374340999: 12`.
   - Run CDP headless Chrome verification script and verify output screenshots (`live_widget_step1.png`, `live_widget_step2.png`, `live_footer.png`).
5. **Memory Logging:** Update `BRAIN.md` header & latest session section, and log immediately to `D:\Vyzma\_BRAIN\daily-notes\{YYYY-MM-DD}.md`.

