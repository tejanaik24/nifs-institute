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
- **2026-10-04 City pages honesty pass** (commit 5b84a4b, deployed + live-checked): removed AI-portrait placement cards, formula salary calculator and course-matcher packages (now real range Rs 1.2L-8.2L from 90 recorded placements), Gulf/"100% placement"/"Most Trusted"/"seats left" claims; yard gallery relabelled "representative, not specific to this center"; 6 real Vizag photos in public/images/real/vizag/. Photos in F:\PHOTOS are by activity, not city; only Vizag/Guntur proven by signage; AM/NS CM-visit photos excluded.
- 2026-09-29: Free "Ergonomic Safety" course (NIFS ES) built, NOT deployed: `/courses/ergonomic-safety/`. Front end redesigned after Teja rejected v1 (plain boxes): warm editorial + film grain, hero Strain Lab (drag slider, body figure bends, live strain meter), scroll-drawn route, lesson player (7 chapters: hazard hunt, symptom match, drag-into-power-zone, quiz per chapter), dark focus exam (20 Qs / 10 min server-timed, CBT look: instructions screen, candidate card + roll no., question palette with answered/not-answered/not-visited/marked, Mark for review, full-screen, tab-leave warnings; at 00:00 'Time is over' locks the exam and auto-submits), tilted certificate. FINAL FLOW (Teja, 2026-09-29): register -> index: animated 4 Key Benefits -> download PDF -> 'I'm ready for the exam' (unlocks after download) -> then revealed: Learn-by-doing activities + (no separate quiz/round: Teja wants ONE exam only; the 7 situation questions live inside the real exam) + EXAM (opens immediately, no longer locked behind the assignment) + assignment (submit any time, before or after the exam). Suggestion box (table `nifs.course_suggestions`, migration `free-course-suggestions.sql` APPLIED; read at /dashboard/course-exams) is visible to every registered student. After 'I'm ready': 'Learn by doing' (`activities.tsx`: Hazard Hunt 9 dots, Symptom Match, Power Zone drag; optional) + '(no separate quiz/round: Teja wants ONE exam only; the 7 situation questions live inside the real exam)' practice warm-up (`mock-quiz.tsx`, optional, same 7 situations are also in the real exam); no chapters. Courses page (`/courses/`) shows a highlighted FREE COURSE card FIRST (`free-course-feature.tsx`). FREE is highlighted (solid red badge) at the top of landing + welcome screens. `player.tsx` + hazard/symptom/power-zone games in `lessons.tsx` are built but UNUSED (restore if wanted). Code: `src/components/sections/ergonomic-course/` (es-course.css = tokens/motion), `src/lib/free-course/` (answer key server-only), `src/app/api/free-course/*`. DB: `nifs.course_registrations` (migration `migrations/free-course-ergonomic.sql`, ALREADY APPLIED to the shared Supabase DB). PDF: `node scripts/pdf/build-study-guide.mjs`. Dashboard: `/dashboard/course-exams` (list, print certificate, mark sent). Certificates emailed manually by staff (no email service). Pending: review 20 questions in `exam.ts`, look at dashboard certificate page while logged in, deploy.
- **2026-10-03 SEO overhaul & eligibility fix**:
  - Eliminated dead clicks on homepage: mobile course cards (85vw) converted to direct `<Link>` tags with isolated WhatsApp trigger (`e.stopPropagation()`); desktop added "View Syllabus & Fees"; latest updates/events/jobs/industrial tabs converted from static divs to functional Next.js Links; centers map touch targets expanded to 44px min.
  - Resolved keyword cannibalization: `CANONICAL_OVERRIDES` in `src/app/(marketing)/blog/[slug]/page.tsx` mapping competing posts to core conversion pages (`/safety-officer-salary-in-india/`, `/courses/diploma-in-fire-safety/`, `/how-to-become-a-safety-officer-in-india/`, `/courses/safety-officer-course/`) with an upfront official syllabus banner.
  - CTR & Title tag optimization: overhauled ADIS, DFS, and Safety Officer Salary metadata to target high-intent commercial queries (Fees, Syllabus, 2026, Freshers Package).
  - Pogo-sticking elimination: transparent fee aid ("EMI & Scholarship Assistance") and salary scope badges placed upfront in course detail pages.
  - Server redirect consolidation: synced all 14 courses into `scripts/generate-htaccess.js`, enforced single-hop HTTPS and apex canonical rewrite, updated safety officer category redirect.
  - Removed ITI eligibility from B.Sc and B.Sc (Honours) in Fire & Industrial Safety (now strictly 10+2 / Diploma 3 Yrs).
- **2026-10-01 behaviour audit + content session** (commit `27b9c46`, deployed + verified live):
  - Clarity project is now `ypu3ajsxw1` (token in `~/.config/claude-seo/google-api.json`; API cap 10 req/day, 3 days max). Audit found 18% dead-click sessions site-wide (shared course template pills/boxes look clickable but aren't; NOT fixed yet), 58 of 65 city pages with zero GSC impressions, ~700 junk GA4 sessions, 24h hole in WhatsApp-click data Sep 30-Oct 1 (cause unknown; Vercel logs API returns ExceedsBillingLimitError).
  - Enquiry failures now logged to `nifs.enquiry_errors` (migration `enquiry-errors.sql`, applied). Server logs error class + PG code only, never the message (driver message can embed the visitor's phone). Register `error_type` as a GA4 event custom dimension (manual, in GA4 Admin) to split validation vs delivery.
  - Placements: lead form removed, Current Openings moved to top. `/courses/abroad-students/` added to sitemap; NEBOSH/OSHA line removed.
  - Blog: 3 new posts + `top-picks-for-free-online-safety-courses-you-can-trust` rebuilt in place as the free fire safety course guide. `<!--free-course-signup-->` in a post's HTML renders the sign-up form (`free-course-blog-signup.tsx`, registers via /api/free-course/register and opens the course signed in).
  - OPEN: abroad page hero photo is an AI image of "SILICON UNIVERSITY" captioned as the NIFS campus; "Study in India Partner" unverified; `nifs.posts.slug` has NO unique constraint in the live DB (schema.ts says unique) so check for duplicates before inserting; need a real free fire-safety course to own "free fire safety course"; email-click tracking missing.
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
- **2026-09-24 GSC indexing fix session** (commit `6268189`, deployed + verified live):
  - `sitemap.ts` was pulling blog URLs from a stale local JSON (157 posts) instead of the live DB (167 published) — 16 real posts were never submitted to Google, 6 dead ones were. Now reads straight from `getPublishedPosts()`.
  - Found and removed **fabricated review/rating content across all 53 city center pages** — fake `aggregateRating`/`review` JSON-LD, fake "4.9★" claims in meta titles/descriptions, a fake "Google Verified" stat badge, and (on 7 pages) a full fake "Google Reviews" card with invented named reviewers ("Suresh Reddy" etc.) and quotes. This is the likely root cause of 58 center pages sitting in GSC "Discovered - currently not indexed" — confirmed via live URL Inspection API that Chennai/Guntur/Vijayawada/Bhubaneswar got **zero search impressions in 90 days**.
  - Verified GSC "Duplicate, Google chose different canonical" flag on 3 blog posts is a real Google-side www-vs-apex canonical confusion, not a code bug (canonical tags are already correct) — needs a manual "Request Indexing" click in Search Console, not a code fix.
  - Found 7 separate near-duplicate blog posts already live for Chennai/Vijayawada/Guntur/Bhubaneswar (3 just for Chennai) — same scaled-content pattern that already crashed traffic once (Aug 2026, see BRAIN.md). Merged into one real post (`nifs-fire-safety-training-centers-chennai-vijayawada-guntur-bhubaneswar`) with 301 redirects from all 7 old slugs, following the same fix pattern as the Sep 19 Vizag/Chennai merge in `next.config.ts`.
  - `GSC_SITE_URL` in `.env.local`/Vercel env still points to `https://www.nifsindia.net/` (redirects) instead of the real property — flagged to Teja, not yet fixed.
- **2026-09-26 session** (commit `ee14d5c`):
  - Removed closed centers Chandigarh, Chandigarh-2, Dehradun, Hamirpur (centers.ts, page folders, home map counts, indexnow/dashboard lists) + 301s to `/centers/` in `next.config.ts`. Ludhiana/Shimla never had pages. Blogs (DB) had zero mentions.
  - Home nav link hidden on the homepage itself (`site-header.tsx`).
  - Dashboard honesty pass: lead table showed hardcoded "Visakhapatnam HQ" + "Pending Call" for every lead → now real `city, state` (Vercel geo, captured since 2026-09-19) and Submitted/Half-filled. Counts = unique candidates by phone (6 people had submitted 2-3 times). Removed fake fallbacks (5900/670 donut, "54 Centers", hardcoded "Top South/East/North/West Hub" numbers on analytics), dead City/Time filters, "students"/"inquiries" labels on visitor data, wrong Instagram link (was iron_prince_official → nifsindia). Course names now mapped by exact slug from courses.ts (ADFS/PG DFS were labelled "Diploma in Fire Safety"). NIFS-centre tag now derived from centers.ts.
  - `GSC_SITE_URL` fixed to `https://nifsindia.net/` in `.env.local` + Vercel production (28d clicks 35 → 1,017).
  - Speed: `vercel.json` `regions: ["bom1"]` — functions were running in iad1 (Washington) against the Mumbai Supabase DB. Risk-flags no longer loads all post content (2.4 MB).
  - New blog published: `/blog/types-of-fire-and-safety-institutes-in-india/` (AI-search angle, logged in brain vault blog-performance-log).

## What's Pending (Real Open Items)
- City pages: recruiter names in FAQs (came from deleted fake cards), "top-rated" in titles, "45,000+ placed" needs NIFS proof, RPF photo permission, real local photos/details for top 5 centers (uniqueness).
- About page center counts disagree ("69 centers / 21 states" vs "70+ / 24 states"; real data = 65 locations / 18 states) — Teja wants to confirm the number with the client first
- Dashboard has no call-status tracking (who was called / converted) — needs a real feature if wanted
- A real ADIS enquiry came from Chandigarh on 2026-09-22 after that center was closed — tell client
- Design quality pass — site is "okish", needs wow factor (typography, motion, photography)
- RESEND_API_KEY + ADMISSIONS_EMAIL env vars not set → contact form not sending emails
- nifs-images-incoming folder — check if real client images have arrived
- Re-check PageSpeed Insights field data (28-day CrUX) in ~2 weeks to confirm the 2026-09-05 CWV/INP fixes actually moved the real-user numbers — desktop was previously at Accessibility 90/Agentic Browsing 2/3, mobile at 100/3/3; both should match after propagation
- Verify contact-form email delivery once RESEND_API_KEY is set
- ~~Fix `GSC_SITE_URL` env var~~ done 2026-09-26
- Re-check GSC indexing status on the 58 previously-not-indexed center pages in ~1-2 weeks (Google needs to recrawl after the fake-review-schema removal)
- Request re-indexing in Search Console UI for the 3 canonical-mismatch blog posts (see 2026-09-24 session above)
- `center-gallery.ts`'s synthetic "placed alumni" name pool (200 fake names incl. "Suresh Reddy") is still live — flagged, not touched, matches a prior explicit call Teja made on AI-generated testimonial content

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



## Session 2026-10-03
- Done: safety-engineer blog live (posts id 819); sitemap now includes open jobs + /courses/online/; job publish/close pings Google Indexing API + IndexNow (src/lib/seo/notify-search.ts); llms.txt lists free course + jobs; security fixes + Resend certificate email deployed.
- Pending: weekly job posts + WhatsApp channel; job schema hiringOrganization.sameAs; Course schema on /courses/online/; interlink blogs to jobs/free course; legacy NEBOSH/IOSH blogs; staff session revocation; live certificate-email test; recheck GSC 'safety engineer course' ~2026-10-17.
