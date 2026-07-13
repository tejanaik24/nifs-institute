# BRAIN.md — NIFS India Website Rebuild

## ⚠️ Read this first

This file was last updated 2026-07-13 (eleventh pass — built the "Our
Students Placed In" carousel with 63 REAL recovered student records, a
featured-story news card, and a real 6-tab updates widget). **The tenth
pass's conclusion that the student-placement data "does not exist anywhere
discoverable" was WRONG** — see the eleventh-pass section below for the
correct finding and don't repeat that dead-end investigation. The homepage
architecture described below is **current as of this update** — verify
with `grep -rn` against `src/app/page.tsx` before trusting anything that
isn't. Two older layers of history are preserved further down for
background only: a "Historical Archive" (July 10 session,
scroll-circuit/R3F architecture, fully replaced) and the
immediately-preceding mid-session brief's blow-by-blow build log (still
useful chronology, kept as-is).

## Latest session — 2026-07-13 (eleventh pass): recovered the real student data, built all 3 remaining widgets

The user pushed back hard on the tenth pass's conclusion, insisting the
student-placement screenshot was real and from nifsindia.net. **They were
right.** Correct finding this time:

1. **The tenth pass's live-DOM/REST-API/cPanel investigation was real but
   incomplete** — it only checked the *current* live site, which had the
   section removed. **The fix was checking the Wayback Machine's full
   snapshot history**, not just the latest 2025 snapshot. Found: the
   homepage had a **"Recently Placed Students"** (later renamed "Our
   Students Placed In") section with **63 individually-designed card
   images** (`wp-content/uploads/2018/08/1.png`–`63.png`, each baked-in
   photo+name+role+company+CTC) live on the site from **Feb 2019 through
   mid-2023**, removed in a 2023 redesign that replaced it with the current
   logo-only recruiter carousel. **Lesson for future fabricated-data-style
   dead ends**: before concluding old-site content "doesn't exist," check
   the Wayback Machine's *full* CDX snapshot list across years
   (`web.archive.org/cdx/search/cdx?url=<domain>&output=json`), not just
   the most recent capture — sites get redesigned and real content gets
   silently dropped.
2. **Recovered all 63 images** via
   `web.archive.org/web/20230609000000im_/http://www.nifsindia.net/
   wp-content/uploads/2018/08/<n>.png` (the `im_` Wayback modifier serves
   the raw archived asset). Saved to `public/images/placements/<n>.png`,
   all verified unique (md5) and visually read/transcribed by hand into
   `src/lib/data/placed-students.ts` (`{id, image, name, role, company,
   ctc}[]` — text fields exist only for alt text, the cards render as the
   real recovered images, not re-created HTML).
3. **New `src/components/sections/student-placements.tsx`** — a custom
   paged prev/next carousel (5 cards/page desktop, 2/page mobile, no
   carousel library added — follows the same no-new-dependency precedent
   as the Gallery's custom lightbox). Wired into `src/app/page.tsx` right
   after `FacilitiesShowcase`.
4. **`src/components/sections/latest-news.tsx` extended** with a featured
   story treatment for the top post (side-by-side photo + headline on a
   blush background, matching the old site's "milestone collaboration"
   card layout) — pinned to the real ANU-collaboration post if present,
   falls back to most recent otherwise. The rest of the grid below is
   unchanged from the tenth pass.
5. **New `src/components/sections/updates-tabs.tsx`** — a real 6-tab
   widget (NIFS Updates / Articles / Events / Journals / Jobs / Industrial
   Works) with a vertical icon-tab nav (red active tab, matching the old
   screenshot's visual language). Content per tab, all real, sourced from
   the old site's raw homepage HTML (`src/lib/data/updates-tabs.ts`):
   - **NIFS Updates**: the same 2 real announcement strings already used in
     the site-wide ticker (see tenth pass).
   - **Jobs**: upgraded to pull from the live `awsm_job_openings` REST API
     (`src/lib/data/job-openings.ts`, 6 of the 23 real listings) instead of
     the old site's single external Blogspot link — a genuine improvement,
     not just a replica. The full 23-listing board is still a separate,
     larger open item (see "Open work" below), this only surfaces a handful
     inline.
   - **Articles / Events / Journals / Industrial Works**: honest replicas
     of what the old site actually did — real external links to
     `nifs-india.blogspot.com` posts, a real Google Form event link, and
     the new site's own `/industrial-services` page (swapped in for the old
     site's legacy `in_house_training.html` static page, since we have a
     real internal equivalent now). No fabricated internal content for tabs
     that never had any.
6. Verified via `agent-browser` at desktop (1440px) and mobile (500px) —
   carousel paging works and matches the user's original screenshot exactly
   (Sai Teja / S Pavan Sai / N Vamsi / Satish / B Sarat Reddy appear on
   page 2), tabs switch correctly, Jobs tab shows real live listings, no
   horizontal overflow on mobile. `npm run build` and `npx tsc --noEmit`
   both clean.
7. Committed + pushed + deployed (`vercel --prod --yes`), verified live via
   `curl` against production HTML (`Bhanu Kumar` present, placement image
   200s). Live at https://nifs-institute.vercel.app.

## Previous session — 2026-07-13 (tenth pass): old-site widget parity + fabricated-data dead end (student-carousel conclusion later corrected — see eleventh pass above)

User shared 4 screenshots of old nifsindia.net homepage widgets missing from
the new site: a "milestone collaboration" news card, an "Our Students Placed
In" student carousel (real names/roles/CTC), a 6-tab widget (NIFS
Updates/Articles/Events/Journals/Jobs/Industrial Works), and a "From
Chairman's Desk" section.

1. **Investigated all 4 before building anything** — live DOM inspection
   (`agent-browser`) of the current nifsindia.net homepage, WordPress public
   REST API (`/wp/v2/media`, `/wp/v2/pages`, `/wp/v2/categories`), and (after
   the user explicitly said to check cPanel, twice) a live cPanel File
   Manager login. Findings:
   - **News card**: real, matches the already-migrated 142 blog posts. Built.
   - **Chairman's Desk**: real, but the site already had a *different*,
     generic placeholder quote on `/about` ("Safety is not an option, it
     must be a priority.", no attribution). Fixed with the real quote +
     Sri. Suneel Mahanty's name/credentials.
   - **6-tab widget**: mostly a thin shell — "NIFS Updates" is just 2
     scrolling announcement strings (marquee plugin), the other 5 tabs link
     **out** to an external Blogspot blog or a legacy static HTML page, no
     real internal content to migrate. Built only the 2 real announcement
     strings, folded into the existing `UrgencyBar` (was already a static
     single-message red top bar — turned it into a real scrolling
     multi-message ticker instead of adding a redundant second bar).
   - **Student carousel — real data does NOT exist anywhere discoverable.**
     The screenshot showed named students (S Pavan Sai, N Vamsi, etc.) with
     roles/companies/CTC, but: the live homepage's "Our Students Placed In"
     section (confirmed via raw HTML + rendered DOM) only ever contains
     recruiter **logos**, no individual records; WP media library search for
     student/placement/achiever/names returned nothing relevant; the
     cPanel `wordpress-backups` folder exists but is **empty**; there's no
     `/placements/` page on the old site (404); `wp-admin` itself is
     CAPTCHA-gated (didn't bypass, per browser-automation safety rules).
     **Concluded the screenshot's data isn't recoverable and deliberately
     did not build this widget** — this is exactly the "fabricated data"
     trap the repo already warns about (`PlacementWall.tsx`,
     `TestimonialsSection.tsx` — orphaned files with invented student
     names/CTC). **If this needs to be built later, the real records must
     come directly from the user/MD, not reconstructed by guessing** — flag
     this to the user before attempting it again.
2. **New `src/components/sections/latest-news.tsx`** — homepage-only,
   pulls the 3 most recent posts from `src/lib/data/blog.ts`
   (`blogPosts`, already-existing accessor, same one `/blog` uses), same
   card visual language as `CoursesSection`. Wired into `src/app/page.tsx`
   between `CoursesSection` and `AdmissionsCTA`.
3. **`src/components/layout/urgency-bar.tsx` rebuilt** from a static
   single-line red bar into a real horizontal scrolling ticker (reused the
   existing `.animate-marquee` keyframe from `globals.css`, same pattern as
   `LogoMarquee` — no new CSS invented) looping both real announcement
   strings pulled verbatim from the old site's raw HTML.
4. **`src/app/about/page.tsx`** — Chairman's Desk quote replaced with the
   real one, name/credentials line added below it (previously absent).
   Left the page's separate `StoryBlock` "Vision & Mission" copy untouched
   (different section, coincidentally similar wording, not the same thing).
5. Verified via `agent-browser` at desktop and mobile (500px viewport, via
   `agent-browser set viewport 500 900` — note: this command works despite
   printing a spurious "Invalid response" error, verified by screenshot).
   `npm run build` clean. Note: the site-wide `ScrollPathLine` decorative
   red thread crosses through the Chairman's Desk text at mobile width in a
   screenshot taken mid-scroll — this is pre-existing sitewide behavior
   (see AGENTS.md's `ScrollPathLine` notes), not a regression from this
   session's edits; left as-is.
6. Committed + pushed + deployed (`vercel --prod --yes`), verified live via
   `curl` against production HTML. Live at https://nifs-institute.vercel.app.

## Previous session — 2026-07-13 (interactive centers map)

Two live-feedback items on the `CentersGrid` section (map/HQ block, still
inside the homepage's `SpineLayout`):

1. **`25-years-excellence.png` color mismatch** (in `AboutNifs`, one section
   up) — user didn't like how the cyan/blue AI-generated graphic looked
   against the red spine. **Diagnosed, not yet fixed**: `mix-blend-screen`
   of cyan-on-grey-vignette over saturated red produces a muddy fringe.
   **Recommendation given to user** (not applied — needs regeneration):
   redo the graphic in warm off-white (`#FFF4EE`) numerals with a coral-
   orange glow (`#FF6B4A`–`#FF8552`, adjacent to the existing `--nifs-orange`
   accent) on a **true transparent background** (no grey vignette — that's
   what's producing the muddy wash). Keep `mix-blend-screen` in code once
   the new asset lands; no code change needed beyond swapping the file.
   **Still open** — user hasn't regenerated the image yet.
2. **India-map + centers block rebuilt as fully interactive** (this was
   fully implemented, not just recommended):
   - `src/lib/data/centers.ts` — `Center` type gained `x`/`y` (map
     coordinates, now single-sourced here instead of duplicated in
     `india-map.tsx`) and optional `address` (only Visakhapatnam HQ has a
     verified one — the other 14 centers intentionally have none, no fake
     addresses/phone numbers are ever fabricated). Added
     `hasVerifiedAddress()` helper.
   - `src/components/sections/india-map.tsx` — now a **controlled**
     component (`selectedCity`, `onSelect` props), dots are real `<button>`s
     (a11y), map widened to fill the gutter (`max-w-xl` → `max-w-none`),
     added a radar-sweep + scan-line "futuristic" overlay (both respect
     `prefers-reduced-motion`, mirroring the existing `.map-dot-pulse` /
     `.spine-welcome-ring` guard pattern in `globals.css`). Permanent
     always-on "HQ" tooltip removed — no city is visually privileged by
     default now that the section is pan-India framed.
   - `src/components/sections/center-detail-card.tsx` (new) — the card
     that renders in the spine's previously-unused `center` slot (and
     reused for the mobile fallback below the map, since `SpineSplit`'s
     `center` slot is desktop-only by design). Two branches: verified
     (HQ — full address + Get Directions + Call/WhatsApp) vs. generic
     (other 14 — honest "Contact NIFS HQ for this center's address" copy +
     same Call/WhatsApp CTAs + View All Centers link). Never renders fake
     placeholder data.
   - `src/components/sections/centers-grid.tsx` — owns `selectedCity`
     state, wires it into `IndiaMap` and the spine `center` slot (via
     `AnimatePresence` cross-fade between a placeholder and the populated
     card). **Removed the hardcoded "NIFS Visakhapatnam" HQ-only right
     column** — replaced with pan-India framing ("Find a center near you"),
     kept the 86/24/3+ stat row and the major-centers chip list, made the
     chips clickable too (second path into the same detail-card flow, not
     just the map). Mobile gets its own detail-card render path under the
     map with `scrollIntoView` on selection.
   - Verified end-to-end via `agent-browser` (desktop: map click, chip
     click, both HQ and non-HQ branches all sync correctly; mobile 375px:
     no horizontal scroll, card appears under map, scrolls into view).
     `npm run build` passes clean.
   - Committed + pushed + deployed (`vercel --prod --yes`) — live at
     https://nifs-institute.vercel.app.

**Follow-up fixes, same day** — user flagged three more issues from a live
screenshot after the above shipped:
   - **Map had a lot of dead space** — `india-map-v2.png` (1536×1024) has
     ~23%/9%/20%/9% of transparent padding baked in on L/T/R/B around the
     actual India land mass. Fixed by cropping the *display* (not the
     source file) to the land-mass bounding box via a CSS transform in
     `india-map.tsx` (`CROP_BOX` constant — width/height/position all in
     %, computed from a pixel-scan of the real PNG content bounds with a
     small safety margin so the outline is never clipped). `centers.ts`'s
     x/y values were remapped into this same cropped coordinate space —
     if the map image ever changes, both need recalibrating together.
   - **"Find a center near you" text was touching/overlapping the spine**
     — `SpineSplit`'s gutter columns have zero built-in padding (by
     design, so different sections can choose their own). Added
     `px-6 lg:pr-10 lg:pl-0` (left/map column) and `px-6 lg:pr-0 lg:pl-10`
     (right/text column) directly in `centers-grid.tsx`, mirroring the
     `pl-10 pr-6` / `pr-10 pl-6` pattern `about-nifs.tsx` already uses for
     the same problem. Also gave the "Find a center near you" heading the
     same deep-red (`#7A0F0C`) brand treatment used elsewhere for
     spine-adjacent headlines (was plain foreground color before).
   - **Real bug found during this pass, not user-reported**: switching
     directly from one selected city to another (e.g. Nagpur → Mumbai
     without deselecting first) left the spine/mobile detail card showing
     the *previous* city's data — confirmed via `agent-browser` that
     stale card DOM nodes were silently accumulating (never being
     removed) rather than being replaced. Root cause: `AnimatePresence`'s
     exit animation was never completing on rapid key swaps (`mode="wait"`
     didn't fix it either — the exiting element just never got cleaned
     up). Fixed by dropping `AnimatePresence` for this swap entirely —
     plain conditional rendering keyed by city name remounts instantly
     and correctly; the card's own `motion.div` still plays its enter
     animation. Stress-tested by firing 5 rapid clicks in a row — verified
     exactly one detail card renders each time, no duplicates.
   - Committed + pushed + deployed again — live at
     https://nifs-institute.vercel.app.

### Session — 2026-07-13 (third pass, same day): Placements section + 25-years image, take 2

1. **25-years image swap, attempt 2.** The user regenerated the graphic
   themselves (`25 years orange.png` in Downloads) with the warm
   orange/white-on-transparent palette recommended earlier. **Real gotcha
   hit during this swap**: the exported PNG had **no actual alpha
   channel** (`PixelFormat.Format24bppRgb` — confirmed via .NET
   `Bitmap.PixelFormat`) — the "checkerboard" that looks like a
   transparency indicator in every preview tool was literally baked into
   the file as opaque near-white/light-grey pixels (~246–254 RGB, alpha
   always 255). Swapping the file and just dropping `mix-blend-screen`
   (as planned) rendered a solid white/checkered rectangle on the red
   spine, not a transparent cutout. **Fixed with a custom PowerShell
   script** (`System.Drawing` + `LockBits`) that redraws the source onto a
   real `Format32bppArgb` bitmap, then punches alpha to near-zero for any
   pixel whose minimum RGB channel exceeds ~190 (smooth ramp over ~12
   units) — this reliably separates the near-white checker/glow
   background from the saturated orange numerals (min channel ~64) and
   dark charcoal wordmark (min channel ~84), which stay fully opaque.
   Result: a clean warm-glow cutout on the red spine, wordmark legible.
   **Lesson for next time**: always verify a "transparent" PNG's actual
   `PixelFormat`/alpha channel before trusting a preview tool's
   checkerboard rendering — many export/screenshot tools flatten the
   transparency indicator into real pixels instead of true alpha.
   **Also hit a caching red herring** while iterating: after overwriting
   the file, the dev server kept serving the *old* image across several
   reloads and `.next/cache/images` wipes — even a brand-new Chrome
   profile still showed stale content. Root cause was Next.js dev
   server's in-*process* image-transform cache, not the on-disk
   `.next/cache/images` folder (clearing that alone didn't help) — only
   fully killing and restarting the `next dev` process picked up each
   change. **Lesson**: when a swapped static asset doesn't show up after
   normal cache-busting (query params, `.next/cache` wipe, fresh browser
   profile), restart the actual `next dev` process before assuming
   something else is wrong.
2. **New homepage "Placements" section** —
   `src/components/sections/placements-section.tsx`, inserted between
   `AboutNifs` and `CentersGrid` in `src/app/page.tsx` (homepage is now
   `TunnelHero → SpineLayout(WhyNIFS → AboutNifs → Placements →
   CentersGrid)`). Built from a user-shared screenshot of Amity
   University's "Top Placements" section as a **layout reference only** —
   Amity's own numbers (36,000 placements, ₹2 crore salaries) were never
   used; only NIFS's own verified figures went in. Structure: dark
   (`#111111`) `SpineGutterBg`+`SpineSplit` band (deliberate contrast
   against the white sections around it) — left column: "Career Outcomes"
   copy + 5 real role titles, both reused verbatim from the `/placements`
   page; center spine: a **count-up animated "45,000+ Candidates Placed"**
   stat (first real use of the previously-dead `useCountUp`/`useInView`
   hooks in `scroll-reveal-hooks.ts`) with a soft warm radial-gradient
   glow behind it (deliberately NOT the multi-hue `.spine-welcome-ring`
   conic gradient used elsewhere — tried that first, it read as a messy
   rainbow blob at this size/context, swapped for a plain warm
   `radial-gradient` instead — a single-hue glow suits a stat number,
   the multi-color ring suits the crest/emblem context it was designed
   for); right column: 6 featured recruiter logos (Adani, L&T, ITC, GMR,
   MEIL, Amazon) as bordered white cards + "+12 more recruiting
   partners". Below the split: a full-width scrolling marquee of **all
   18 real recruiter logo images** (`recruiterLogos` from `centers.ts` —
   first time these logo files are used anywhere as images; the existing
   `/placements` page only ever rendered recruiter names as plain text
   tiles) using the already-existing-but-unused `.animate-marquee`
   keyframe in `globals.css`. Mobile gets its own separate `lg:hidden`
   stacked block (same established pattern as `about-nifs.tsx` and
   `centers-grid.tsx` — `SpineSplit`'s `center` slot is desktop-only).
3. **Data-honesty note, important if this section gets extended later**:
   the codebase has several orphaned (zero-import) pre-built components —
   `StatsSection.tsx`, `stats-bar.tsx`, `PlacementWall.tsx`,
   `LogoBar.tsx`, `TrustStrip.tsx`, `salary-outcomes.tsx`,
   `TransformSection.tsx`, `TestimonialsSection.tsx`,
   `CoursesSection.tsx` — containing **fabricated data that must never be
   used as real content**: invented individual student
   names/companies/packages, an unsourced "93% Placement Rate", and
   conflicting placed-counts (45,000 vs 10,000 vs 8,531 elsewhere). None
   of it was used in the new Placements section. They remain on disk
   untouched (matches the project's existing convention of leaving
   unused components as reference, e.g. `ExploreNifs.tsx`) — **do not
   wire any of them into a route without first verifying every number in
   them against a real source**.
4. Verified end-to-end via `agent-browser` at desktop (~1036–1440px) and
   mobile (~500px, Chrome's minimum window width — couldn't get exactly
   375px via window resize on this Windows machine, but confirmed the
   `lg` breakpoint collapse behaves correctly, which is what matters) —
   count-up animates on scroll into view, marquee scrolls with edge
   fades, mobile stacked block renders with no desktop-card duplication.
   `npm run build` passes clean.
5. Committed + pushed + deployed (`vercel --prod --yes`) — live at
   https://nifs-institute.vercel.app.

### Session — 2026-07-13 (fourth pass): Facilities showcase + design-review detour

1. Ran `/plan-design-review` on the Placements section per user request —
   the skill catalogue entry is just a stub pointing at an upstream repo
   (`github.com/garrytan/gstack`) not installed locally, so the actual
   review was done manually. Findings: the 25-years badge and the
   45,000+ stat both read as generic/templated ("AI slop" — glossy
   award-badge look, blurred-circle stat tile, flat logo-wall grid). User
   decided to regenerate both as **Three.js/WebGL, industrial/technical
   style** via Google AntiGravity, using a prompt I wrote (see the prompt
   in this session's transcript if it needs regenerating — covers a
   parameterized `StatBadge3D` component: brushed-metal plate, hazard-
   stripe trim, rivet details, transparent canvas, reduced-motion
   fallback). **That integration is in progress, started outside this
   agent session** — `src/components/three/StatBadge3D.tsx` now exists
   and is imported (uncommitted) into `about-nifs.tsx` and
   `placements-section.tsx`. Left untouched/uncommitted this session
   (stashed and restored around an unrelated deploy) — **don't assume it's
   finished or wired into the actual render tree; check the live diff
   before continuing that thread**.
2. Also trimmed the Placements "Career Outcomes" copy (removed the
   paragraph, converted the 5-role list to pill chips) — this WAS
   committed/deployed, unlike item 1.
3. **New "Facilities Showcase" homepage section** —
   `src/components/sections/facilities-showcase.tsx`, added to
   `src/app/page.tsx` **after `</SpineLayout>`** (deliberately outside the
   spine system — a full-width rhythm break, not another spine column
   section). Interactive hover/click-to-expand image accordion on
   desktop (adapted from a 21st.dev component the user pasted — rewritten
   to use `next/image`, real facility photos, project design tokens, and
   `onClick`/`onFocus` alongside `onMouseEnter` since the original was
   hover-only and unusable on touch devices), collapsing to a plain
   2-column photo grid on mobile (hover-accordion doesn't translate to
   touch, so mobile gets a simpler pattern rather than a broken one).
   Six panels: Smart Classrooms, AC Lecture Theatre, Practical Training
   Yard, Fire Hazard Drill, Hostel Accommodation, Industry Site Visits.
   **Important data-integrity catch**: the existing (still-unused)
   `src/lib/data/facilities.ts` pairs `hostel-facility.jpg` and
   `gallery-industrial-visit.jpg` with an "AC Conference Hall" /
   "Conference & Training Halls" caption — I opened both image files and
   neither shows a conference hall (one's a hostel dorm room, one's a
   solar-farm site visit). **No real conference-hall photo exists
   anywhere in this repo.** Used accurate captions instead of inheriting
   that mismatch. If a real conference-hall photo ever gets added, it'd
   slot in as a 7th panel — don't just relabel one of the existing 6.
4. Verified via `agent-browser` at ~1036px (desktop accordion, click-to-
   expand confirmed working) and ~500px (mobile grid, no horizontal
   scroll, all 6 real photos + captions render). `npm run build` clean.
5. **Deploy note**: item 1's uncommitted `StatBadge3D` changes were
   `git stash`ed before running `vercel --prod --yes` (so only the
   committed Facilities-showcase + copy-trim work shipped), then
   `git stash pop`ped back immediately after — production is NOT running
   the in-progress 3D badge integration. Live at
   https://nifs-institute.vercel.app.

### Session — 2026-07-13 (fifth pass): WhyNIFS card icons

User generated 2 icon sheets externally (`1.png`, `2.png`, from
Downloads) using the icon-graphics prompt from the fourth-pass session
and asked me to crop + place them. **`2.png` matched the requested 5
motifs almost exactly** (rope/carabiner, briefcase+shield, hardhat+mic,
shield+stars+ribbons, location-pin cluster — brushed-metal + hazard-
orange style, transparent-looking backgrounds) — used all 5 from that
sheet. **`1.png` was a different, unrelated icon set** (gear+wrench,
server rack, plain shield, warning-hazard triangle, robotic arm) —
didn't match any of the 5 card concepts as well as `2.png`'s icons did,
so it wasn't used; flagged this to the user rather than silently
picking mismatched icons.

Cropping notes for next time: a variance-based auto-crop (comparing each
pixel to a corner-sampled background color) **failed** on these sheets —
the shared brushed-metal background photo has enough natural
gradient/texture variance on its own that the diff threshold triggered
everywhere, returning the full cell every time. Fell back to fixed
centered-square crops per grid cell (`public/images/icons/*.png`, cropped
from `2.png`'s 3×2 grid at 512×512 px/cell) with small manual per-icon
offset nudges after visually checking each crop — 2 of the 5 needed
re-cropping because the icon wasn't centered in its cell (shield+stars
and location-pins both needed an upward/leftward nudge). **Always
visually verify each crop before wiring it in** — don't assume a
programmatic crop is correctly framed without looking at the output.

Wired into `WhyNIFS.tsx`: `items` array gained an `icon` field per
entry, the single shared `lucide-react` `CheckCircle2` (repeated
identically on all 5 cards) was replaced with a per-item `<Image>`.
Verified at desktop (~1536px) and sub-1024px width (mobile stacked
layout — same `right` slot markup renders on both, no separate mobile
component needed here since `SpineSplit`'s `right` slot isn't `hidden`
on mobile, unlike its `center` slot).

**Browser-testing note**: `agent-browser`/Chrome window resizing via
Win32 `SetWindowPos` proved unreliable this session (repeatedly failed
to actually change `window.innerWidth`, and once failed outright because
a `document.title` sanity-check eval changed the window title being
matched against). What reliably worked: fully killing Chrome and
relaunching with `--window-size=W,H` **as a launch flag**, not resizing
an already-running window. Even then, Chrome enforced a floor around
~500px content width on this machine — couldn't get a true 375px
viewport via window sizing, but 500px is still comfortably below the
`lg` (1024px) Tailwind breakpoint so it still validates mobile-layout
behavior correctly.

Deploy: same stash-before-deploy pattern as the fourth pass (the
`StatBadge3D` WIP in `about-nifs.tsx`/`placements-section.tsx` is still
uncommitted and still untouched by me — stashed, deployed only the
committed icon work, popped the stash back). Live at
https://nifs-institute.vercel.app.

### Session — 2026-07-13 (sixth pass): shipped StatBadge3D + added graduate photo

1. **`StatBadge3D` (the Three.js/React Three Fiber badge from the prompt
   written earlier) is now finished and shipped**, not just WIP. Verified
   it builds clean and renders correctly (a dark-red brushed-metal plaque
   with hazard-stripe corner trim and white italic numerals — a real
   visual upgrade from both the old flat PNG badge and the old blurred-
   circle stat treatment) at desktop and mobile before committing.
   Replaces the flat 2D graphic in `about-nifs.tsx` ("25+ Years of
   Excellence") and the `radial-gradient`+text treatment in
   `placements-section.tsx` ("45,000+ Candidates Placed"). Committed
   together as one deploy this time — no more stash-before-deploy dance,
   since the work was actually complete and verified rather than
   mid-flight.
2. **Placements section's empty column space now has a real image.**
   Same pattern as before: I don't have a working image-generation tool
   in this environment (`imagegen` and `plan-design-review` are catalogue
   stubs pointing at an uninstalled upstream package, confirmed again
   this session — don't try invoking them expecting real output), so I
   wrote a prompt, the user generated it externally (ChatGPT image gen
   this time, not AntiGravity), and I wired the result in. Saved as
   `public/images/placement-graduate-worksite.png`. First pass sized it
   at `max-w-[280px]` which read as too small/cramped against the column
   — user asked to make it bigger and centered, bumped to
   `max-w-[420px]` on both the desktop left column and the mobile
   stacked block in `placements-section.tsx`, re-verified before
   shipping.
3. Live at https://nifs-institute.vercel.app, clean working tree (no
   uncommitted WIP left over this time).

### Session — 2026-07-13 (seventh pass): "neg space" report — investigated, not a real bug

User sent a mobile screenshot showing a large blank gap between the
recruiter logo grid and the marquee in `placements-section.tsx`, asked
for `/plan-design-review`. **Investigated properly instead of guessing**:
reloaded the live production site fresh (clean Chrome profile, mobile
width) and measured every element's exact position via
`getBoundingClientRect()` rather than trusting a screenshot. Every gap
matched its intended Tailwind spacing exactly (`mt-8` = 32px between CTA
and photo, `mt-14`+`py-16` ≈ 120px between photo and marquee) — **no
structural layout bug**, the photo renders correctly sized (420×525) and
positioned right where the code says it should be. Couldn't reproduce a
blank gap on a fresh load. Most likely explanation: the user's
screenshot was taken moments after the previous deploy (the "make image
bigger" commit) went live, and either their device had a half-stale
cached page, or it was an ordinary Next.js `<Image>` lazy-load timing
flash on a slower connection — **not a code bug to "fix" by guessing at
layout changes**.

Shipped one honest, low-risk improvement regardless of root cause: added
`bg-white/5` to the photo's container div (both desktop and mobile) so
if a slow-load moment ever does happen again, it shows a soft dark
placeholder consistent with the section's palette instead of a stark
black void that reads as broken. **Told the user to hard-refresh and
report back if the gap is still there** — if it persists after a clean
reload, that points to something render-environment-specific (a
particular phone/browser) that needs a fresh screenshot + real
investigation, not another guess. Live at
https://nifs-institute.vercel.app.

**Lesson for next time**: when a user reports a visual bug from a
screenshot, don't assume the screenshot reflects current live state —
reload the actual production site fresh and measure with
`getBoundingClientRect()` before proposing a fix. Guessing at spacing
changes for a bug that doesn't reproduce wastes a deploy cycle and
doesn't actually address what the user saw.

### Session — 2026-07-13 (eighth pass): recruiter "+N more" stub → real logo wall

Turned out there WAS a real issue, just not the one investigated in the
seventh pass — the user's actual complaint was about the recruiter card
area (right column desktop / a block in the mobile stack): it only ever
showed 6 featured logos + a "+12 more recruiting partners" **text
label**, never the other 12 logos themselves, leaving real dead space
below it. User pointed at an old/historical build (`trust-strip.tsx` +
`logo-marquee.tsx` — both orphaned, zero imports anywhere — this was
from before the current spine rebuild) as the reference for what they
wanted: real scrolling logo walls instead of a "+N more" stub.

Iterated twice on the fix:
1. First pass: replaced the static 6-logo grid + text with the
   section's existing horizontal `LogoMarquee` (auto-scroll, all 18
   logos) sized down (`compact` prop) to fit the column — this filled
   the *original* dead space but created a *new* one: the right column
   (short heading + one horizontal marquee row) was now much shorter
   than the photo/badge columns beside it, still visually unbalanced
   (the general "spine columns must be height-balanced" lesson from
   `feedback-nifs-spine-section-height.md` applies again here).
2. User asked mid-fix to make it **vertical, 2 rows** instead of
   horizontal — redesigned `LogoMarquee` into a 2-column CSS grid that
   scrolls vertically inside a fixed-height (`height` prop, 480px
   desktop / 360px mobile) `overflow-hidden` container with a
   top/bottom `mask-image` fade (not left/right), looping via a
   duplicated track + a new `.animate-marquee-vertical` keyframe added
   to `globals.css` (mirrors the existing `.animate-marquee` pattern
   exactly, including the `prefers-reduced-motion` guard). This both
   fills the dead space AND actually balances the column height against
   the photo/badge columns, since the container height is an explicit
   prop tuned to match. Removed the now-fully-redundant full-width
   horizontal marquee that used to sit below the `SpineSplit` (was
   showing the same 18 logos a second time in the same section).

**Lesson for next time**: when replacing a "+N more" stub with the
actual full list, check whether the new content's natural height
matches its neighboring spine columns — a single short element (one
heading + one horizontal scroll row) in a column next to a tall photo
will look just as broken as the static grid it replaced, just with the
dead space relocated instead of removed. Live at
https://nifs-institute.vercel.app.

### Session — 2026-07-13 (ninth pass): Courses/Admissions wired in, full blog + gallery migration, end-to-end audit

This was a much longer pass than the previous eight, spanning a fresh
conversation that picked up from the eighth pass's handoff.

1. **`FacilitiesShowcase` dead-space bug fixed.** The accordion panel row
   used fixed pixel widths (`w-[360px]` active + five `w-[64px]` collapsed
   = 740px total) inside a `max-w-7xl` (~1200px inner) container, leaving
   ~460px of unstyled whitespace on desktop — visible in a user screenshot
   with the gap circled. Fixed by switching the panels to `flex-[6]`/
   `flex-1` (flex-grow) instead of fixed widths, so the row always fills
   its container regardless of viewport. This is the **first appearance of
   a recurring bug class this session** — see item 4 below.

2. **`CoursesSection` and `AdmissionsCTA` wired into the homepage** —
   both components already existed in the codebase (previous session) but
   were never mounted; `src/app/page.tsx` went straight from
   `FacilitiesShowcase` into the footer with no course content or closing
   CTA. Stripped an invented per-tier `salaryByTier` map from
   `CoursesSection` (₹2.5–₹12 LPA figures with **no source** in
   `courses.ts` — exactly the "fabricated data" pattern flagged in earlier
   sessions) before wiring it in, per explicit user confirmation via
   AskUserQuestion. Homepage is now:
   `TunnelHero → SpineLayout(WhyNIFS → AboutNifs → Placements →
   CentersGrid) → FacilitiesShowcase → CoursesSection → AdmissionsCTA`.

3. **`CoursesSection` fully redesigned** after user feedback ("so plain,
   no wow factor, no interactive, full of text"). Diagnosed two real
   issues: flat text-only cards (tier/duration/name/2-line summary/link,
   no imagery), and an unused `SpineSplit` center gutter showing the raw
   sitewide background through as an unstyled seam (`CoursesSection` sits
   *outside* `SpineLayout`, so `SpineSplit` had nothing to align with in
   the first place). Rebuilt on the visual language of an orphaned sibling
   component, `course-grid.tsx` (real photography, `TiltWrapper` 3D
   pointer-tilt hover, gradient reveal, tier badge) — dropped `SpineSplit`
   entirely, added a `framer-motion layoutId` sliding tab indicator for
   the tier filters, and surfaced `careers` (real data, already in
   `courses.ts`, previously unused) as 1-2 hover-revealed chips per card
   instead of the dropped summary paragraph.

4. **Recurring bug class discovered this session: CSS Grid `auto-fit`
   does not fill a partial last row.** First hit when filtering
   `CoursesSection` to a small tier count (e.g. 2 Diploma courses) left
   dead gutter space — fixed at the time by switching to
   `grid-template-columns: repeat(auto-fit, minmax(...))`, which appeared
   to work for that specific 2-item case. **Root cause understood properly
   only later, during the Gallery build**: `auto-fit` only collapses
   columns that are *entirely* empty across *every* row — it does nothing
   for a last row that's merely partially filled while earlier rows use
   those same columns. So the fix "worked" for 2 items (single row, extra
   columns genuinely empty) but silently does **not** fix arbitrary counts
   (e.g. 5 items in a row that fits 3-4 columns) — confirmed by an
   `agent-browser`-verified bug in the new Gallery's "In-House Training"
   category (5 photos). **Real, permanent fix**: switched to Flexbox
   (`flex flex-wrap` + `flex-1 min-w-[240px]` per item) in
   `GalleryGrid.tsx`, which correctly redistributes each row's leftover
   width independently. **`CoursesSection`'s grid still uses the
   `auto-fit` approach and was never retroactively fixed** — flagged to
   the user, not yet actioned; would show the same dead-space bug for
   course-tier counts that aren't a clean multiple of the fitting column
   count (e.g. 3 courses in some breakpoint).

5. **User asked directly: "if we deploy new website to old domain i dont
   want to disturb seo"** — confirmed via `vercel domains ls` that
   `nifsindia.net` is **not yet attached** to the `nifs-institute` Vercel
   project (still points at the live WordPress site), so no live risk yet.
   Explained the real risk (142 indexed blog URLs would 404 on cutover
   without redirects) and the safe sequence (build redirects → verify →
   only then flip DNS → resubmit sitemap in GSC). No GSC access available
   for this domain — noted as a real limitation, decided to prioritize by
   content substance instead of traffic data.

6. **Full blog migration — all 142 posts, real content, not thin
   spam.** Pulled every post via the WordPress **public REST API**
   (`/wp-json/wp/v2/posts` — no `/wp-admin` login needed at all, despite
   the user proactively sharing cPanel/WP-admin credentials, which matched
   what's already in the memory vault and weren't needed for any of this
   work). Content turned out to be substantial (avg 1,088 words, min 288,
   max 3,934 — real course/certification/career-guidance articles, only
   51/142 even city-specific), which changed the plan from "just redirect"
   to "actually migrate as real posts," per explicit user confirmation.
   - Downloaded all 244 unique referenced images to `public/images/blog/`.
   - Cleaned content: stripped literal WPBakery/Elementor shortcode
     leftovers (`[vc_row]` etc. — these render as unprocessed literal text
     via the REST API, not parsed HTML), MS-Word-paste cruft attributes,
     decoded HTML entities (including numeric `&#038;` for `&`), rewrote
     internal links to other migrated posts as `/blog/<slug>`, unwrapped
     links to non-post old pages with no new equivalent.
   - **Real bug caught by agent-browser QA, then fixed**: the excerpt/
     index-card text generation stripped HTML tags but not the shortcode
     brackets *before* truncating, so ~55/142 index cards showed literal
     `[vc_row][vc_column_text css="..."]` junk even though the full
     article body (cleaned separately) was fine. Fixed by running the
     same shortcode/CSS-comment stripping before the plain-text excerpt
     truncation, not just on the full-content HTML path.
   - Built `/blog` (grid index) and `/blog/[slug]` (detail, 142 static
     params) routes. One migrated post has an auto-generated WordPress
     slug of `elementor-6959` instead of a descriptive one (real content,
     628 words, just an ugly permalink from the old site) — left as-is
     since the redirect must match the actual old URL exactly; cosmetic
     only, could be renamed later if wanted.
   - Added 301 redirects (`next.config.ts` `redirects()`) for all 142 old
     flat post URLs (`nifsindia.net/<slug>/`, matching the old site's
     root-level permalink structure — old site had **no** `/blog/` prefix)
     to `/blog/<slug>`, both with and without trailing slash. Verified
     working (308 redirect) on both localhost and the live Vercel
     production deployment before considering this done.

7. **End-to-end content audit** (new site's `src/app/` routes vs. old
   site's full 72-page WordPress inventory via `/wp/v2/pages`,
   `/wp/v2/awsm_job_openings`, `/wp/v2/news`, `/wp/v2/media`). Findings:
   - New site is **not stub-heavy** — all 11 routes have real, data-driven
     content, no "coming soon" pages remaining except already-known gaps.
   - `/wp/v2/news` (a distinct custom post type from blog `posts`) is
     confirmed **empty, 0 items** — nothing to migrate there, safe to
     stop wondering about it.
   - Jobs board confirmed real and structured: 23 live
     `awsm_job_openings` listings, "Safety Executive" manpower-consultancy
     postings (role/city/salary ~23-29K CTC/Job ID/apply-by-email), not
     internal NIFS HR jobs — still has no equivalent on the new site.
   - `/centers` page copy still references "international centers" that
     don't exist in `centers.ts` or as any route — a content/promise gap,
     not a broken link (no such link exists to click).
   - Confirmed still-missing: FAQ page, 6 individual partner/accreditation
     pages (DNV-GL, SBTET, Lincoln University Malaysia, Acharya Nagarjuna
     University, NSDC, Annamalai University — new site only shows a bare
     logo strip), 5 individual center location pages beyond the map.

8. **Full Gallery migration — all 182 photos across 12 real categories**,
   replacing a 6-photo hardcoded placeholder grid. Old site's `/gallery/`
   hub linked to 12 separate category pages (`/gallery/<category>/`, plus
   a standalone `/recognition-gallery/` not nested under `/gallery/`) —
   confirmed via the public REST API by fetching each category page's raw
   content and counting/deduping `<img>` tags (stripping WordPress's
   `-WxH` scaled-size-variant suffix to avoid counting the same image
   twice). Exact counts: Practical Training Yard 20, Infrastructure 13,
   Study Tours 29, Industrial Visit 20, Corporate Yard 7, In-House
   Training 5, Achievements 12, Graduation Celebration 24, Guest Lectures
   11, Events 21, Campus Drive 11, Recognition 9 (= 182 total).
   - **Recognition Gallery is structurally different from the other 11**:
     it's MOU/partnership-award **document scans** (NSDC, ANU, SBTET,
     Lincoln University Malaysia, ISO certificate, award photos), not
     campus photography, and referenced via WPBakery
     `[vc_single_image image="ID"]` shortcodes rather than plain `<img>`
     tags — with the quotes HTML-entity-encoded as smart quotes
     (`&#8221;`/`&#8243;`), not literal `"`, which broke a naive regex on
     the first attempt. Resolved each of the 9 media IDs via
     `/wp/v2/media/<id>` to get the real file URL, and extracted the
     accordion section titles as real captions (e.g. "Memorandum of NSDC
     (Skill India)").
   - **Real bug caught by agent-browser QA, then fixed**: those same
     accordion-title captions had unescaped/double-encoded entities
     (`"ISO &amp; QUALITY CERTIFICATE"` literally, and backtick-quoted
     text like `` ``BEST FIRE...`` `` from the source) — fixed by decoding
     entities and normalizing backtick-quotes when building the caption
     text, same category of bug as the blog excerpt issue in item 6.
   - Built `src/lib/data/gallery.ts`/`gallery.json`
     (`{slug, name, images:[{src,alt}]}[]`) and rebuilt
     `src/app/gallery/page.tsx` as a client `GalleryGrid` component:
     category tabs (same sliding-indicator pattern as `CoursesSection`,
     with a live photo count per tab), the Flexbox-based grid described
     in item 4, and a **custom lightbox** (click photo → full-screen
     modal, prev/next/close, `Escape` key, click-backdrop-to-close) since
     no lightbox library was already in the project and a small custom
     component covered it without adding a dependency. Supports
     `?category=<slug>` deep-linking (via `useSearchParams`, wrapped in
     `<Suspense>` per Next.js App Router requirements) so redirects can
     land directly on the right tab.
   - Added 301 redirects for all 12 old gallery URLs (11×
     `/gallery/<category>/` + the standalone `/recognition-gallery/`) to
     `/gallery?category=<slug>`, same pattern and verification (localhost
     + live production) as the blog redirects.

9. **Housekeeping note for future sessions**: several background
   `Explore`-agent screenshot calls this session wrote files with mangled/
   concatenated Windows paths directly into the **repo root** (e.g. a
   literal filename `UsersuserAppDataLocalTemp...scratchpadblog.png`, and
   once a stray `--viewport` file) instead of the intended scratchpad
   directory. Caught and deleted both before committing — **always run
   `git status` and scan for unexpected untracked files before staging**,
   especially after any session that used background agents for visual
   QA.

10. Both migrations verified end-to-end before shipping: `npm run build`
    clean, dev-server route/redirect checks via `curl`, `agent-browser`
    visual QA passes (including a second QA round after each bug fix),
    then `git add` → commit → `git push` → `vercel --prod --yes`, with a
    final `curl` check against the live `nifs-institute.vercel.app` URL
    confirming redirects work in production, not just localhost. Total:
    3 separate commits/deploys this session (Facilities fix, Courses
    redesign, blog migration, gallery migration — actually 4 deploys,
    committed/pushed/deployed independently rather than batched).

## ⚡ 30-Second Brief (current, 2026-07-13 end of session)

Rebuilding nifsindia.net as a premium Next.js site for NIFS (National
Institute of Fire and Safety), an Indian industrial-safety training
institute headquartered in Visakhapatnam. **Positioning is industrial
safety first (Safety Officer / HSE Manager / Risk Analyst roles at Adani,
L&T, GMR, ITC, MEIL) — NOT firefighting.** This correction has been made
twice across earlier sessions; don't regress on it, including in generated
imagery.

Live: **https://nifs-institute.vercel.app** (Vercel project `nifs-institute`,
account `tejasolryder24-4493`). Repo: `c:\claude code\nifs-india`, GitHub
`tejanaik24/nifs-institute`. **GitHub→Vercel auto-deploy does not reliably
fire** — after every `git push`, also run `vercel --prod --yes` from the
repo root. **Standing instruction (2026-07-13): always deploy (commit + push
+ `vercel --prod --yes`) immediately after finishing any piece of work in
this repo, without waiting to be asked** — see memory
`feedback-nifs-auto-deploy.md`.

**Homepage today** (`src/app/page.tsx`, updated in the eleventh pass — see
that section above): `TunnelHero` → `SpineLayout` wrapping `WhyNIFS` →
`AboutNifs` → `Placements` → `CentersGrid` → `FacilitiesShowcase` →
**`StudentPlacements` (new eleventh pass)** → `CoursesSection` →
`LatestNews` → **`UpdatesTabs` (new eleventh pass)** → `AdmissionsCTA`, all
full-width outside `SpineLayout`. The site-wide `UrgencyBar` (fixed top bar,
rendered in `layout.tsx` above the header, not part of this flow) is a real
scrolling ticker with 2 real announcement strings — see tenth-pass notes.
`CentersHighlight` and `ExploreNifs` were both
**removed entirely** in an earlier session per explicit user request — the
`ExploreNifs` gap that used to be flagged as "no replacement content
decided" is filled by `Placements` + `FacilitiesShowcase` + `CoursesSection`
+ `AdmissionsCTA`, so that open item is resolved (see ninth-pass note above
if this needs revisiting — no new replacement content has been discussed
since).

**Two other real, separate routes were built this pass and are NOT part of
the homepage flow**: `/blog` (142 migrated posts) and `/gallery` (182
migrated photos, 12 categories) — see the ninth-pass section above for
full detail on both.

## Current homepage architecture

`src/app/page.tsx`:
```tsx
<TunnelHero />
<SpineLayout>
  <WhyNIFS />
  <AboutNifs />
  <Placements />
  <CentersGrid />
</SpineLayout>
<FacilitiesShowcase />
<CoursesSection />
<AdmissionsCTA />
{/* last three full-width, deliberately outside the spine */}
```

1. **`<TunnelHero />`** (`src/components/sections/tunnel-hero.tsx`) —
   full-viewport scroll-driven image tunnel, 5 real NIFS gallery photos,
   full-bleed frames, headline overlay fades out on frame 0→1. Copy says
   "25+ years of placing graduates..." (updated from "20+" this session,
   see Decision Log). Stays spine-free — explicit, repeated decision.
2. **`<WhyNIFS />`** (`src/components/sections/WhyNIFS.tsx`) — **new this
   session**, repurposed from a previously-built-but-unused component.
   First section after the hero, inside the spine. White background
   (SpineGutterBg), `align="start"` (top-aligned, not vertically centered).
   - **Left column**: "Trained. Placed. Proven." headline (now
     horizontally centered — was flush-left originally, user disliked the
     resulting dead space), body paragraph, a bulleted **"In Technical
     Collaboration With"** card (Annamalai University, Acharya Nagarjuna
     University, State Board of Technical Education AP, Skill India |
     NSDC — bold names, colored bullet dots, tinted highlighted card), then
     "Our Story →" CTA.
   - **Center (spine)**: crest logo + "Welcome to NIFS" + "Why Choose
     NIFS", both lines **typed out character-by-character** (real
     typewriter effect, not a fade/blur) once scrolled into view, plus a
     rotating conic-gradient halo behind the crest. This replaced an
     earlier GSAP scroll-scrub blur/fade version the user explicitly
     rejected ("effects is not impresive... keep typing effect").
   - **Right column**: the 5-item differentiator list (Practical Training
     Yard, Direct Placement Cell, Industry Faculty Only, Government
     Recognized, 86 Centers Nationwide) as bordered hover-cards with
     check icons, in a **2-column grid** (`sm:grid-cols-2`) — was a single
     tall column, which made the section way taller than the left/center
     content and left a large dead-space gap the user flagged twice.
   - Shared scroll-reveal hooks (`useTypewriter`, `useCountUp`, `useInView`)
     live in `src/components/sections/scroll-reveal-hooks.ts`, used by both
     `WhyNIFS.tsx` and `about-nifs.tsx`.
3. **`<AboutNifs />`** (`src/components/sections/about-nifs.tsx`) — white
   background, spine-integrated (was already spine-continuous before this
   session's edits, unchanged there).
   - **Left**: "25+ Years of Excellence in Industrial Safety Education"
     headline (deep red `#7A0F0C`), body para (NSDC/Skill India bold red,
     86 centers).
   - **Center (spine)**: **the user's own AI-generated image**
     (`public/images/25-years-excellence.png`, a blue/cyan "25+ YEARS OF
     EXCELLENCE" graphic) composited with `mix-blend-mode: screen` so its
     grey vignette background disappears into the red spine — no added
     border/card/color from us. This replaced two earlier attempts: a
     plain "ABOUT NIFS" eyebrow, then a from-scratch CSS gradient-numeral
     badge the user rejected ("this is not good, i will generate with ai").
   - **Right**: NSDC + Skill India logos (200×120px, bigger/bolder captions
     than originally) + ISO 9001:2015 badge. Fixed a real overflow bug here
     this session: the two-logo row needed ~556px but its wrapper was
     capped at 380px, clipping the Skill India logo — widened the
     container and added `flex-wrap` so logos stack instead of clipping at
     narrower desktop widths.
   - Mobile stacked block (`lg:hidden`) is separate and mostly untouched —
     still has its own plain "About NIFS" eyebrow (correct/intentional,
     since mobile has no spine to put the fancy badge on).
4. **`<CentersGrid />`** (`src/components/sections/centers-grid.tsx`) —
   **rebuilt this session** from a full-width breakout card into a proper
   3-column spine split (`SpineGutterBg` + `SpineSplit`) matching the rest
   of the site: India map (left) | red spine (center) | Headquarters info +
   stats + major-centers pills + CTAs (right). `align="start"`. No
   duplicate outer section padding (was double-padded with `SpineSplit`'s
   own py at one point — fixed).

**Removed this session:**
- **`CentersHighlight`** (86/24/3+ stats + "Centers Across India & Growing"
  headline/spine section) — deleted from the homepage entirely per explicit
  user request. The component file may still exist on disk unimported;
  don't re-wire it back in without being asked.
- **`ExploreNifs`** (all 5 beats: Academic Training Division, Industrial
  Projects Division, Facilities/"Our Spaces", Practical Training Yard,
  "45,000 Candidates Placed" proof) — deleted from the homepage entirely
  per explicit user request, confirmed via AskUserQuestion (user picked
  "delete all 5 / entire section" and said they have new content planned
  to replace it — **that replacement content was never described**, so the
  page currently just ends after `CentersGrid`). `src/components/sections/
  ExploreNifs.tsx` is left on disk, unimported, in case any of its content
  is reusable for whatever comes next.
- The old `SpineLayout` wrapping was `<SpineLayout><ExploreNifs /></SpineLayout>`
  only; it now wraps `WhyNIFS + AboutNifs + CentersGrid`, so the continuous
  red spine starts right after the hero and runs through all three
  remaining sections (the Kent-parity "continuous spine" goal from the
  previous session's plan — now done, just via a different set of
  sections than originally planned).

## Real facts verified / decided (use these, don't invent numbers)

- **86 Centers in 24 States across India**, recently started in **3 African
  countries** (source: nifsindia.net `/centers/` page body text).
- **25+ years** — changed from "20+ years" to "25+ years" on 2026-07-13 per
  explicit user decision (confirmed via AskUserQuestion after a hand-drawn
  screenshot annotation). Used in `AboutNifs` headline (desktop + mobile)
  and `tunnel-hero.tsx` hero copy (3 occurrences). **Unresolved: the
  arithmetic doesn't reconcile with "Est. 2004"** (2004 + 25 = 2029, a
  future year as of this session's actual date, 2026-07-13) —
  "Est. 2004" was deliberately left untouched since changing the founding
  year wasn't part of what was asked. **Flag this to the user if it comes
  up again** — may be a rounding/marketing choice, or "Est. 2004" itself
  may need revisiting. Don't silently "fix" either number without asking.
- **NSDC approved training partner**, **Skill India** collaboration,
  **ISO 9001:2015 certified** unit of SSB Institute of Higher Studies
  Educational Society — confirmed on the live site, logos in
  `public/images/logos/accreditations/`.
- **Technical collaboration partners** (added 2026-07-13 per explicit user
  confirmation via AskUserQuestion, **not independently verified against
  the live nifsindia.net site** — treat as user-provided fact, not a
  cPanel/live-site-verified one like the centers/states figures):
  **Annamalai University**, **Acharya Nagarjuna University**, **State
  Board of Technical Education AP**, plus the existing Skill India / NSDC
  partnership. Shown in `WhyNIFS.tsx`'s left column.
- **45,000 candidates placed** — came from the MD directly (voice note,
  relayed by user), not independently verified against the old site
  (which showed smaller/conflicting figures like 8,531+ before the
  rebuild). Current source of truth per explicit instruction, but
  provenance is different from the centers/states figures — worth knowing
  if it's ever questioned.
- Old site's course catalogue has 15 programs; new site's `courses.ts` has
  10 — 5 still missing (Diploma in Industrial Safety, Advanced Diploma in
  Fire & Industrial Safety, Chemical Safety cert, Construction Safety cert,
  Advanced Diploma in QHSE). **Not yet added** — still untouched.
- **142 blog posts migrated** (ninth pass) from `nifsindia.net` via its
  public WordPress REST API — real content (avg 1,088 words/post), not
  disposable SEO filler. Live at `/blog` + `/blog/<slug>`, all 142 old URLs
  301-redirected. Data file: `src/lib/data/blog-posts.json` /
  `src/lib/data/blog.ts`.
- **182 gallery photos migrated across 12 categories** (ninth pass), same
  source. Live at `/gallery` (category tabs + lightbox), all 12 old
  category URLs 301-redirected. Data file: `src/lib/data/gallery.json` /
  `src/lib/data/gallery.ts`. "Recognition" category (9 images) is
  MOU/partnership/award document scans, not campus photography.
- Old site has **72 total WordPress pages** (`/wp/v2/pages`), a confirmed
  **23-listing live jobs board** (`/wp/v2/awsm_job_openings` — "Safety
  Executive" manpower-consultancy roles, not internal HR jobs), and an
  empty/unused `/wp/v2/news` post type (0 items, safe to ignore going
  forward).
- `nifsindia.net`'s DNS is **not yet pointed at** the new Vercel project
  (confirmed via `vercel domains ls`) — the live domain still serves the
  old WordPress site untouched. No SEO risk exists yet; it only becomes
  relevant the moment DNS is switched over (redirects for blog + gallery
  are now in place ahead of that, see ninth-pass notes).

## What the user did NOT like this session (corrections made, don't repeat)

- **Spine invisible / duplicate eyebrow bugs** in the (now-removed)
  `CentersHighlight` and in `AboutNifs`/`CentersHighlight` — outer
  `<section>` had an opaque `bg-background` covering the whole width
  including the transparent spine gutter, and the eyebrow text was
  duplicated once in the spine-center column and once in the content
  column. Root pattern to avoid in future sections: don't put your own
  background on the outer section when using the gutter-bg + spine
  pattern, and only put the spine-eyebrow text in ONE place.
- **The entire `ExploreNifs` section** — user wanted all 5 beats gone,
  no exceptions.
- **Scroll-scrub blur/fade reveal** on `WhyNIFS`'s crest/text — user said
  the effect wasn't impressive and explicitly asked for a literal
  character-by-character typewriter effect instead. Don't default to
  subtle scroll-scrub effects for "wow factor" asks — prefer something
  more literally/obviously animated when the user asks for a "wow" moment.
- **Flush-left "Trained. Placed. Proven."** headline with a big empty gap
  next to it — wanted it horizontally centered in its column.
  **Vertically-centered spine content in a much-taller row** (from the
  tall single-column card list) — wanted it pulled up to the top instead.
  General lesson (saved to memory, `feedback-nifs-spine-section-height.md`):
  when one spine column is much taller than the others (e.g. a long
  stacked list), either compact it (2-col grid — what fixed it here) or
  otherwise balance heights; don't just top/center-align short content and
  accept the dead space.
- **A CSS-built "25 Years of Excellence" gradient badge** — user said "this
  is not good, i will generate with ai" and had me write an image-gen
  prompt instead. Don't over-invest in a from-scratch CSS recreation of a
  branded numeral/badge graphic when the user can generate a real image —
  offer that path earlier for this kind of asset.
- **Cropped Skill India logo** — real layout bug (flex row content wider
  than its container), not a preference issue; fixed with a wider
  container + `flex-wrap`.
- **Plain inline-colored text** for "In Technical Collaboration With..." —
  user wanted actual bullet points, bold university names, and a
  highlighted (tinted card) treatment, not just colored inline spans.
- **General meta-feedback** (saved to memory,
  `feedback-think-innovative-not-blind.md`): "think innovative, dont
  complete work blindly" — apply creative/design judgment rather than
  literal word-for-word execution, especially for visual/design asks.

## Open work / not yet done

- **"Est. 2004" vs "25+ years" arithmetic inconsistency** (2004+25=2029) —
  flagged to the user twice now, still unresolved. Don't silently "fix"
  either number without asking.
- **Content-gap items still open** (blog posts and gallery are now DONE,
  see ninth-pass notes and "Real facts" above): 23-listing jobs board, 5
  missing course programs, FAQ page, 6 individual partner/accreditation
  pages (currently just a logo strip), 5 individual center location pages,
  a handful of misc old pages (hostel-facility, how-to-apply,
  abroad-centers, two one-off event write-ups).
- **`/centers` page copy references "international centers"** that don't
  exist in `centers.ts` or as any page — a content promise with nothing
  behind it (found during the ninth-pass end-to-end audit).
- **`CoursesSection`'s card grid still uses the `auto-fit` CSS Grid
  approach**, which does not correctly fill a partial last row for
  arbitrary item counts (only verified working for the specific 2-item
  case tested) — the Gallery's grid was fixed to use Flexbox instead after
  this exact bug surfaced there. `CoursesSection` was flagged to the user
  but not yet retroactively fixed — do this if asked, or proactively if a
  course-tier filter ever visibly shows the gap.
- **QCFI and other accreditation logos** — recovered via cPanel and
  committed in an earlier session; not re-verified live recently. Worth a
  spot-check next time you're in `AboutNifs`/logos territory.
- Kent-parity items from the previous session's plan that are now
  **effectively done or moot**: continuous spine (done, via WhyNIFS→
  AboutNifs→CentersGrid instead of the originally-planned AboutNifs→
  CentersHighlight→ExploreNifs), `fullWidthStretch()` helper (exists in
  `spine-helpers.tsx`, used by the old CentersGrid before its rebuild —
  check if still needed after the 3-col rebuild), cutout student photos
  inside `ExploreNifs` beats (moot — that section no longer exists).
  Kent's 390px left-sidebar spine for interior/subpages remains
  explicitly out of scope.

## Reference

- **NIFS cPanel + WordPress admin credentials**: saved in Claude's memory
  vault at `Secrets/nifs-cpanel-credentials.md` (not in this repo).
  WordPress `/wp-admin/` is behind a CAPTCHA; cPanel File Manager and the
  public front-end (no login) both work for asset recovery.
- **Kent College reference**: kentcollege.com — structural/design
  benchmark for the spine/cutout-photo visual language. Their real
  signature is cutout (transparent-bg) student photography and a
  continuous spine column, not a dramatic hero — NIFS deliberately keeps
  its dramatic hero (industrial-training audience justifies it) but
  adopted the spine.
- **Standing preferences saved to Claude's memory vault** (apply
  automatically, no need to re-ask): `feedback-nifs-auto-deploy.md` (always
  deploy after finishing work), `feedback-nifs-spine-section-height.md`
  (avoid dead space from mismatched spine-column heights),
  `feedback-think-innovative-not-blind.md` (creative judgment over literal
  execution for design tasks).

## Deployment

**Live**: https://nifs-institute.vercel.app — deploy via `git push` (to
`tejanaik24/nifs-institute`, `main` branch) **followed by**
`vercel --prod --yes` from the repo root (`c:\claude code\nifs-india`) —
the GitHub webhook auto-deploy does not fire reliably, confirmed stalled
3+ minutes multiple times across sessions. `vercel whoami` confirms CLI
auth as `tejasolryder24-4493`, project already linked
(`.vercel/project.json` present). **Do this automatically after finishing
any work here — standing instruction, don't wait to be asked.**

## Session History

### Session — 2026-07-13 (this session)
**Worked on:** Bug fixes (spine visibility, duplicate eyebrows) →
removed `CentersHighlight` → rebuilt `CentersGrid` as a 3-col spine split →
fixed doubled section padding → removed `ExploreNifs` entirely (all 5
beats) → built new `WhyNIFS` welcome section from a previously-unused
component, then iterated on it ~5 times per live feedback (spine
placement, background color, list styling, centering, dead-space, replaced
scroll-scrub with real typewriter effect) → changed "20+" to "25+" years
sitewide → built then replaced a CSS "25 Years of Excellence" badge with
the user's own AI-generated image (blend-mode composited, no added
decoration) → fixed a real Skill India logo clipping bug → restyled the
new "Technical Collaboration" text as a bulleted highlighted list.
**Left off at:** Everything above is built, verified (desktop + mobile
screenshots), committed, and deployed live. No known open bugs.
**Next session should start with:** Ask the user what should fill the
space where `ExploreNifs` used to be (they said they have something
planned but didn't describe it yet) — that's the biggest open item.
Also worth surfacing the "Est. 2004" vs "25+ years" math inconsistency
again if relevant, and the still-unaddressed content-gap audit list
(blog posts, jobs board, 5 missing courses, FAQ page).

### Session — 2026-07-13 (ninth pass, new conversation)
**Duration:** Long — full session, multiple plan-mode cycles.
**Worked on:** See the "ninth pass" narrative section above (10 numbered
items) for full detail. Summary: fixed a real dead-space bug in
`FacilitiesShowcase`; wired `CoursesSection`+`AdmissionsCTA` into the
homepage (stripping fabricated salary data first) then fully redesigned
`CoursesSection` per user feedback ("no wow factor"); discovered and
properly root-caused a recurring CSS-Grid `auto-fit` last-row bug (fixed
in Gallery via Flexbox, still open in `CoursesSection`); migrated all 142
blog posts and all 182 gallery photos (12 categories) from the live
WordPress site via its public REST API, with cleaned content, downloaded
images, and 301 redirects for every old URL; ran a full end-to-end content
audit confirming the new site isn't stub-heavy and confirming exactly
what's still missing (jobs board, FAQ, partner pages, 5 courses).
**Completed:** Items 1, 2, 3, 6, 7 (report), 8 above — all committed,
pushed, and deployed (4 separate deploys this session, each verified live
before moving to the next task).
**Decisions made:** Migrate all 142 blog posts as real content rather than
just redirecting (content was substantial, not disposable); strip
`CoursesSection`'s fabricated per-tier salary figures rather than keep or
source them; use a custom lightbox instead of adding a library dependency
for the Gallery.
**Left off at:** Everything above is built, verified (build + dev-server +
`agent-browser` QA + live-production redirect checks), committed, and
deployed. No known open bugs in the blog or gallery migrations. One known
*unfixed* issue: `CoursesSection`'s grid has the same last-row dead-space
bug class as Gallery had, just not yet retroactively patched.
**Next session should start with:** Either fix `CoursesSection`'s grid
(same Flexbox pattern already proven in `GalleryGrid.tsx`), or pick up the
next content-gap item (jobs board is the most-requested-feeling one given
how much attention blog/gallery just got — 23 real listings, structured
data already confirmed via `/wp/v2/awsm_job_openings`). Also still open:
"Est. 2004" arithmetic, 5 missing courses, FAQ page, partner pages,
`/centers` "international centers" copy mismatch.

---

# Prior mid-session brief (2026-07-13, earlier in the day) — chronology log

The section below was the brief written mid-session, before the later work
described above (WhyNIFS rebuild, ExploreNifs/CentersHighlight removal,
25-years image, etc.). Kept for its detailed chronology of the hero/tunnel
build and Kent-reference research, which is still accurate background —
just note that several "Open work" items in it have since been resolved,
overtaken, or made moot by the later work above (e.g. "extend the spine
through CentersHighlight → ExploreNifs" — both of those sections are gone
now; the spine instead runs through WhyNIFS → AboutNifs → CentersGrid).

## Why the homepage got rebuilt earlier this session (chronological)

1. **Hygiene audit** (early this session) found the live homepage (then a
   different, earlier build) had a broken CSS bug: a decorative red spine
   element was unbounded and ran the full page height, bisecting content —
   plus duplicate/conflicting stats (85+/10K+ vs 73+/8,531+), redundant
   giant-numeral treatments, and an inconsistent logo wall (QCFI logo was
   `null`, rendering as placeholder text).
2. **Content-gap audit** against the live WordPress site (nifsindia.net)
   found the rebuild was missing: 142 blog posts (SEO risk), a live 23-
   listing jobs board, 5 course programs, an FAQ page, hostel copy, and
   several gallery categories. Not yet acted on — still flagged.
3. **MD gave new direction** (via voice note, relayed by the user): two
   business divisions (Academic Training / Industrial Project) need clear
   representation, "45,000 candidates placed" is the single-source-of-
   truth stat, and facility highlights need surfacing — with a strong
   preference for **less text, more images**. (Note: the Academic/
   Industrial division beats this drove were part of `ExploreNifs`, which
   has since been removed — see above.)
4. **User provided kentcollege.com as the explicit structural reference**
   — key patterns adopted: a continuous scroll-driven spine, no
   carousel/pagination widgets, photos that break out of rigid rectangles,
   varied section rhythm.
5. **Studio review** (`/website-design meeting` roleplay) diagnosed why an
   early carousel-based attempt read as templated vs. Kent's premium feel.
6. **Two bug-fix passes** on the (now-removed) `ExploreNifs` spine sequence
   — black-gutter-everywhere bug, grid child-ordering bug putting copy
   inside the spine column. Both moot now that the section is gone.
7. **Hero replaced with `ScrollImageTunnel`** — 5 real NIFS photos, tunnel
   scroll-reveal effect, headline overlay on frame 0 only. This part is
   still current — see "Current homepage architecture" above.

## Kent design system parity — token/component cross-check (still accurate)

| Kent has | NIFS equivalent |
|---|---|
| `--color-maroon: #AA0040` spine color | `bg-primary` (NIFS red `#DC1711`) — correctly NOT copied as Kent's literal color |
| `--spine-width-home: 450px` | `SPINE_WIDTH = 450` in `SpineLayout.tsx` — exact match |
| Chevron transparent PNG texture, repeat, `25px 25px` | Inline SVG chevron data-URI in `SpineLayout.tsx`, same effect |
| `.overlap-from-left` / `.overlap-from-right` (120px bleed) | `overlapFromLeft()` / `overlapFromRight()` in `spine-helpers.tsx` |
| `HomepageSpineLayout` wrapping children | `SpineLayout` in `src/components/SpineLayout.tsx` |
| Mobile: hide spine, reset to full-width stack | Handled via `lg:block`/`lg:hidden` splits throughout |

---

# Historical Archive — superseded architecture (July 10 session)

Everything below this line describes the **previous** homepage build
(scroll-circuit "comet" line, R3F ember-particle hero, India map with
pixel-calibrated city dots) which has since been replaced twice over
(first by the spine/Kent-inspired rebuild, then by this session's further
changes documented above). Kept for reference only — do not treat any of
this as current state without verifying against the actual codebase first.

## 30-Second Brief (OLD)

Rebuilding nifsindia.net as a premium, Gordonstoun-style (gordonstoun.org.uk)
Next.js site for NIFS (National Institute of Fire and Safety), an Indian
industrial-safety and fire-engineering training institute. Brand accent is
NIFS's real red (`#DC1711` in tokens, `#CC0000` used directly on several
newer CTA/accent elements per explicit user spec), not a copied purple.
Positioning is **industrial safety first** — their real recruiters (Adani,
L&T, ITC, GMR, Amazon...) and career outcomes (Safety Officer, HSE Manager,
Risk Analyst) are corporate/industrial roles, not firefighting.

Full design spec lived at:
`C:\Users\user\.claude\plans\please-help-me-create-transient-jellyfish.md`

## Architecture Map (OLD)

- **Framework**: Next.js 16.2.10 (App Router, Turbopack), TypeScript, Tailwind v4, shadcn/ui (base-ui, not Radix)
- **Motion**: GSAP + ScrollTrigger (`src/components/sections/story-block.tsx`) + Lenis smooth scroll (`src/components/motion/smooth-scroll-provider.tsx`)
- **3D**: React Three Fiber ember-particle hero layer (`src/components/three/hero-scene.tsx` + `hero-scene-wrapper.tsx`)
- **Content**: static typed data, no CMS — `src/lib/data/courses.ts`, `centers.ts`, `nav.ts`
- **Forms**: `src/app/api/contact/route.ts`, `src/components/sections/enquiry-form.tsx`
- **Crest asset**: `public/images/nifs-crest.png`, wrapped by `src/components/nifs-crest.tsx`

## Key corrected details from that session (still generally useful lessons)

- **Lesson**: when replicating a reference site's motion detail, inspect the
  live DOM/computed styles for the specific element, don't infer the
  mechanic from a screenshot alone.
- **Lesson**: when a user says a screenshot shows something is still wrong,
  re-verify with fresh screenshots across the whole scroll range before
  claiming it's fixed — don't declare victory after only fixing part of the
  issue.
- **Lesson**: when a scroll effect "isn't showing" after geometry/z-index/
  DOM all check out correctly, test color contrast directly (swap to an
  unmistakable debug color, nothing else changed) before assuming a
  browser/rendering bug — much cheaper hypothesis to rule out first.
- **Lesson**: `data-path-target` wrap granularity — mark inner content
  wrappers, not outer full-bleed sections; mark per-item only for ≤4 large
  distinct items; mark whole-section for many small repeated items (card
  grids) to avoid a tangled zigzag of brackets.
- **Positioning correction (industrial safety, not firefighting)** was
  already made once in this old session too — this is the second time it's
  had to be corrected across two different sessions. Do not let it drift
  back a third time, especially in AI-generated imagery prompts.

## Decision Log (OLD, may no longer apply)

- Brand color red `#DC1711`, pixel-sampled from the real logo.
- Crest colors (green/orange) reserved for the emblem motif only.
- No CMS, no existing NIFS backend assumed.
- `ScrollPathLine.tsx` was a standing off-limits-to-edit component (fix
  overlap bugs via `data-path-target` attributes on content, never the
  component itself) — status of this constraint under the NEW architecture
  is unknown/likely moot since the homepage no longer uses it.
- India map: ended on the AI-generated raster version
  (`public/images/india-map.png`), vector alternative preserved at git
  commit `3a71abe` if ever revisited.
