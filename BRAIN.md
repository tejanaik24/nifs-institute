# BRAIN.md — NIFS India Website Rebuild

## 30-Second Brief

Rebuilding nifsindia.net as a premium, Gordonstoun-style (gordonstoun.org.uk)
Next.js site for NIFS (National Institute of Fire and Safety), an Indian
industrial-safety and fire-engineering training institute. Brand accent is
NIFS's real red (`#DC1711`, pixel-sampled from their logo), not a copied
purple. Positioning is **industrial safety first** — their real recruiters
(Adani, L&T, ITC, GMR, Amazon...) and career outcomes (Safety Officer, HSE
Manager, Risk Analyst) are corporate/industrial roles, not firefighting.

Full design spec lives at:
`C:\Users\user\.claude\plans\please-help-me-create-transient-jellyfish.md`

## Architecture Map

- **Framework**: Next.js 16.2.10 (App Router, Turbopack), TypeScript, Tailwind v4, shadcn/ui (base-ui, not Radix)
- **Motion**: GSAP + ScrollTrigger (`src/components/sections/story-block.tsx` — scroll-pinned progress rail, the Gordonstoun-equivalent "3D-reading" effect) + Lenis smooth scroll (`src/components/motion/smooth-scroll-provider.tsx`)
- **3D**: React Three Fiber ember-particle hero layer (`src/components/three/hero-scene.tsx` + `hero-scene-wrapper.tsx`) — lazy-loaded, disabled on mobile / `prefers-reduced-motion`
- **Content**: static typed data, no CMS — `src/lib/data/courses.ts` (10 courses), `centers.ts` (15 centers + recruiters + accreditations), `nav.ts`
- **Forms**: `src/app/api/contact/route.ts` — Next.js API route, sends via Resend if `RESEND_API_KEY` set, else logs to console. Used by `src/components/sections/enquiry-form.tsx` (react-hook-form + zod) on `/admissions` and `/contact`.
- **Images**: none generated yet — all image slots use `src/components/image-placeholder.tsx`, a labeled placeholder showing the expected filename. Real images are being generated externally in Google Antigravity and will land in `c:\claude code\nifs-images-incoming\` — swap placeholders for `next/image` once files arrive (see TASKS.md).
- **Crest asset**: real NIFS crest downloaded from their live favicon at `public/images/nifs-crest.png`, wrapped by `src/components/nifs-crest.tsx`.

## Design System Tokens

- Primary red: `#DC1711` (`--primary` in `globals.css`, oklch-converted)
- Secondary blush tint: derived from the red
- Crest colors (emblem only, not general UI): green `#26BE29`, orange `#FC8010`
- Display font: Playfair Display (italic for headlines/quotes) — swap-in for Gordonstoun's licensed Ivy Presto
- Body font: Inter — swap-in for Gordonstoun's licensed Proxima Nova
- Full palette rationale and Gordonstoun-to-NIFS mapping table in the plan file above

## Routes (24 total, zero dead links, verified via `npm run build`)

`/`, `/about`, `/courses`, `/courses/[slug]` (×10 static), `/industrial-services`, `/centers`, `/placements`, `/gallery`, `/admissions`, `/contact`, `/blog`, `/api/contact`

## Corrected Detail — the scroll rail mechanic

The first implementation of `story-block.tsx`'s rail was a **fill-up bar**
(scaleY 0→1). User caught that this doesn't match the live site and pointed
me back to inspect gordonstoun.org.uk directly. Live DOM inspection found
the real elements: `.custom-line-marker-backing` (a full-height bordered
white track) and `.custom-line-marker` (a **fixed-height thumb**, ~28% of
track height, that **translates down** the track as you scroll — a
scroll-position indicator, not a progress fill). Colors matched our earlier
pixel-sampled tokens exactly: thumb `rgb(199,176,213)` ≈ `#c7b0d5`
(secondary lilac), track border `rgb(200,201,198)` (light grey). Fixed in
`story-block.tsx` to use a GSAP-driven `translateY` thumb inside a bordered
track, matching the verified mechanic. **Lesson: when replicating a
reference site's motion detail, inspect the live DOM/computed styles for
the specific element, don't infer the mechanic from a screenshot alone.**

## Mobile + Accessibility QA Pass (this session)

Found and fixed via live browser testing (agent-browser at 375×812 and
desktop viewports):
- **Header contrast bug (real, would have shipped broken)**: `SiteHeader`
  defaulted to white text assuming every page has a dark hero behind it.
  Subpages use the light `PageHero` — white-on-white made "NIFS",
  "Admissions", "Contact us" nearly invisible until scrolling past 60px.
  Fixed: `SiteHeader` now checks `usePathname() === "/"` and only uses the
  transparent/white mode on the homepage; every other page starts in the
  solid/dark-text state.
- **Duplicate close button** in the mobile nav drawer — shadcn's `Sheet`
  auto-adds its own close X in addition to the custom one already in the
  drawer header. Fixed with `showCloseButton={false}` on `SheetContent`.
- **Hero placeholder label overlapping headline text on mobile** — the
  `ImagePlaceholder`'s centered label sat mid-frame and clashed with the
  bottom-anchored hero copy on narrow screens. Added an `align="top"` prop
  to `ImagePlaceholder`, used on the Hero specifically.
- **Excess dead whitespace between stacked sections on mobile** — several
  sections used the same `py-20`/`py-24` at all breakpoints, which is fine
  on desktop but reads as broken empty gaps on a 375px screen. Scaled down
  to `py-12`–`py-16` on mobile with `md:`/`lg:` overrides restoring the
  larger desktop spacing (`story-block.tsx`, `course-grid.tsx`,
  homepage placement/CTA sections).
- Color contrast was spot-checked analytically (Tailwind v4's `oklch()`
  tokens broke naive canvas-based automated contrast scripts — lab()/oklch
  colors need pixel-readback via `getImageData`, not string parsing).
  Primary red (`#DC1711`) on white computes to ~5:1, body grey to ~5.5–6:1 —
  both pass WCAG AA for normal text.

## Corrected Detail #2 — the line must be ONE continuous thread, not per-section

User caught (via a live screenshot comparison) that my first "fix" still had
the line resetting inside each `StoryBlock` rather than running unbroken
through the whole page like Gordonstoun's does. I asked clarifying
questions instead of guessing again: confirmed the line should be (a) one
continuous thread down a single page, not carried across page navigations,
and (b) unbroken through every section including single-column ones
(hero, trust strip, course grid, footer), not just the two-column story
blocks.

**Fix**: removed the per-`StoryBlock` track/thumb entirely. Added
`src/components/motion/scroll-spine.tsx` — a single page-level fixed
vertical track+thumb mounted once in `layout.tsx` (so it's present on every
page), driven by `ScrollTrigger` on `document.body` with `start: "top top"`,
`end: "bottom bottom"`, so the thumb's position reflects total document
scroll progress from the very top of the page to the very bottom of the
footer, continuously, matching what was requested. Positioned at
`left-3 xl:block` (hidden below `xl` — 1280px — to avoid overlapping page
content, which uses the same left padding at narrower widths) and disabled
under `prefers-reduced-motion`.

**Lesson**: when the user says a screenshot shows something is still wrong,
re-verify by actually looking at fresh screenshots across the whole scroll
range before claiming it's fixed — don't declare victory after only fixing
the mechanic (moving-thumb-vs-fill-bar) without checking scope (per-section
vs. page-wide).

## Corrected Detail #3 — the bend/branch connector (circuit-cap system)

User sent a screenshot showing the line doesn't just run straight — it bends
90° into a horizontal bar that draws across the top edge of each pinned
image (verified as a real, distinct effect, separate from the continuous
spine). Per user's explicit direction ("ask follow-up questions until you
understand my vision, don't code"), I asked before implementing, confirming:
the horizontal bar caps the full width of the image it belongs to, the
bend/cap happens at every image block, and — after showing the planned
technique — it should run **site-wide across every page**, not just the
homepage, framed as a deliberate "circuit trace" motif (fits NIFS's
industrial/engineering brand well).

**Built**: `src/lib/circuit-constants.ts` (shared `CIRCUIT_SPINE_X = 12`,
must match `ScrollSpine`'s track position) + `src/components/motion/
circuit-cap.tsx` — a `CircuitCap` wrapper component. Wrap any image block
in `<CircuitCap>...</CircuitCap>` and it measures its own position on
mount/resize, then draws a horizontal branch (GSAP `scaleX` scrub tied to
that block's scroll entry) from the spine's x-position across to the
image's right edge, landing exactly on the image's top border.

**Applied to**: both homepage `StoryBlock` images (built into the shared
component, so also covers `about`'s reused `StoryBlock`), the homepage
placement-story image, `about`'s chairman portrait, all 4 `industrial-
services` images, `centers`' exterior image, `placements`' success image.
**Not applied to**: the Hero (full-bleed background, not a discrete framed
block — capping it would span the entire viewport oddly) and dense grids
(course cards, gallery grid) where bending to every thumbnail would be
visual clutter, not a clean signature line.

**Bug found + fixed during verification**: the branch `<div>` was
originally gated behind React state (`branchStyle`) that got set *inside*
the same effect that early-returns if `branchRef.current` is null — since
the branch wasn't in the DOM yet on first render (state hadn't been set),
the effect always bailed before GSAP ever attached. Fixed by always
rendering the branch element and writing its `left`/`width` directly to
the DOM node in `measure()`, not through state.

**False alarm during testing**: after the fix, several screenshot checks
still appeared to show no branch. Root cause was **Lenis smooth-scroll
momentum** — `scroll` + `wait` + `screenshot` as separate tool calls could
land at slightly different scroll offsets than the eval calls that
confirmed the branch's computed position was correct. Not a code bug —
confirmed by waiting longer for scroll momentum to fully settle before
screenshotting, at which point the branch appeared exactly as intended
(see the Industrial Services page screenshot, two branches visible
correctly capping both images).

## Corrected Detail #4 — one unified line, not two mismatched pieces

User sent screenshots again: the vertical spine and the horizontal branch
still didn't look like one line (different visual styles — thin bordered
track+dot vs. thick solid bar — and no guaranteed contact at the bend).
Per explicit instruction ("don't code, ask me questions in simple
language until you understand"), confirmed in plain language: (1) vertical
and horizontal parts must touch with zero gap, (2) the whole line must be
one single consistent color/thickness throughout, (3) after capping one
image it must keep going to reach the next image, repeating down the page.

**Rebuilt from scratch**: deleted `scroll-spine.tsx` and `circuit-cap.tsx`
entirely. Replaced both with `src/components/motion/scroll-circuit.tsx` —
one `<svg><path>` per page, single stroke color/width for its whole
length. The path's `d` is built as one unbroken sequence of line-to
commands: down to each `[data-circuit-node]` element's top edge, across to
its right edge (the cap), back to the spine x, continue down to the next
node, repeat, ending at the page bottom. All existing `CircuitCap` wrapper
usages became plain `data-circuit-node` attributes on the same divs (no
wrapper component needed anymore — one global component measures
everything).

**Second bug found during verification**: the whole path's `stroke-
dashoffset` was being driven by raw scroll progress (0–1 of page height)
mapped directly onto path-length progress (0–1 of total stroke length).
Because each bend adds length without adding vertical distance, the path's
length isn't proportional to its vertical extent — so the "drawn tip"
desynced from the user's actual scroll position (confirmed via pixel
sampling: a whole vertical stretch through the course-grid section was
pure white/undrawn while scrolled well past it, because bends earlier in
the path had already consumed a disproportionate length-budget). Fixed by
sampling the path at 200 fixed length-intervals into a length→y lookup
table, then on each scroll update finding the path-length whose y matches
the user's actual `scrollY + viewportHeight`, and using *that* length for
dashoffset instead of raw scroll-fraction. Verified fixed by screenshotting
the same previously-broken course-grid stretch — line now draws correctly
in sync with scroll position.

## Corrected Detail #5 — the circuit line's real bug was z-index, not the draw math

User reported (2026-07-10) that the site's circuit line "doesn't continue" like
Gordonstoun's does, and asked for a full scrape-and-screenshot audit of
gordonstoun.org.uk to compare. Live-inspected Gordonstoun via agent-browser
(desktop viewport, full-page scroll screenshots + DOM/CSS inspection):
confirmed their line genuinely IS one continuous thread hero-to-footer, built
from alternating pieces — vertical track+thumb divs (`.custom-line-marker`/
`-backing`) joined by SVG quarter-circle bend pieces (`M...Q...` paths in
`svg-container` elements) — positioned edge-to-edge with matching stroke so it
*reads* as one line despite being segmented. It draws on top of full-bleed dark
photos (confirmed: white stroke clearly visible over a firefighter photo,
purple/lilac track visible on light sections) and reaches all the way into the
dark footer.

Auditing the NIFS live site + local dev server the same way found the real bug:
`scroll-circuit.tsx`'s `<svg>` had `z-0` — the lowest stacking layer. A
`position: static` sibling (the footer, the hero's own background) always
paints *above* content that is merely `z-0`/`z-auto` at the same DOM level in
some paint scenarios, and per CSS stacking rules a positioned element needs an
explicit z-index above any layered/painted siblings to guarantee it renders on
top everywhere, not just over plain-white sections with no competing layers.
That's why the line was only ever visible on plain white backgrounds and
invisible over the hero and footer — nowhere close to "continuous."

**Fix applied**: `z-0` → `z-20` (below the header/dialogs at `z-50`, above the
hero's `z-10` content and all normal section content) + stroke width `3`→`4`
for a bit more headroom. Verified via agent-browser screenshots: the line now
draws continuously through the hero's dark tail, the white trust-strip, the
image-cap bends, and — verified via an independent offscreen-canvas pixel
rasterization test (bypassing screenshot-tool tiling quirks) — every point
along the path down to the very bottom of the footer paints the correct color
at full alpha.

**Note for next session**: real end-user + production (Vercel build) behavior
should render correctly per this fix and the CSS stacking analysis, but our
own screenshot tooling (agent-browser via CDP) intermittently failed to show
the line in the footer region across several *otherwise-identical* re-tests —
almost certainly a compositor-tile staleness quirk for a very tall (5674px)
absolutely-positioned element scrolled deep into the page, not a real page
bug (independently confirmed via canvas pixel-sampling that the browser's own
SVG rasterizer paints it correctly at every tested Y). If a future session
still sees "line missing in footer" complaints from a real user, re-verify
with a hard, cold page load and native scrolling before assuming regression.

## Corrected Detail #6 — the line was still missing its permanent "track"

After the z-index fix, user pushed back with side-by-side screenshots of
gordonstoun.org.uk and pointed out what Corrected Detail #5 missed: Gordonstoun
actually renders **two** overlapping lines, not one —
1. A **static white/grey track** — the entire route, 100% drawn immediately on
   page load, never animated. This is what's visible everywhere on their site
   regardless of scroll position (confirmed in every screenshot the user sent:
   the white line is always fully present end-to-end).
2. A **purple/lilac progress marker** on top of that track, which grows/moves
   along it as the user scrolls — the "you are here" indicator.

`scroll-circuit.tsx` only ever had the second piece (the animated reveal). It
never had a permanent base track, so at any scroll position everything below
the current scroll point looked "missing" — which is the actual, correct
description of what was broken, more precise than Corrected Detail #5's
z-index-only diagnosis (that fix was real and still necessary, but incomplete).

**Fix applied**: added a second `<path>` (`trackPathRef`) sharing the exact
same `d` string as the animated path, stroke `#c8c9c6` (Gordonstoun's own
sampled track-border grey — reads on both light and dark sections without
needing per-section color logic), width 3, **no dasharray/dashoffset** — so
it's simply always fully drawn. The existing red-tint path renders on top of
it and still animates in via scroll as before. Both paths' `d` are set
together in `build()`.

**Not independently re-verified visually this session** — the screenshot
tooling issues from Corrected Detail #5 recurred (agent-browser/CDP
screenshots of this page inconsistently fail to show the line even though an
offscreen-canvas ground-truth rasterization test confirms every pixel paints
correctly). Rather than keep asserting "fixed" from an unreliable capture
tool, this was shipped to production and the user was asked to confirm
directly in their own browser.

## Corrected Detail #7 — it was never a rendering bug, just low-contrast colors

User reported the deployed fix from #6 still wasn't visible. Went back to
agent-browser and, this time, isolated variables one at a time instead of
re-diagnosing from scratch: added a plain `<div>` at the same position (showed
fine), a filled `<rect>` in the same `<svg>` (showed fine), a `<line>` with
`stroke` (showed fine), then the actual `trackPathRef`/`pathRef` `<path>`
elements with their real colors (`#c8c9c6` grey, `var(--nifs-red-tint)` pale
pink, both at 3–4px) — invisible. Swapped ONLY the color to `lime` on the same
element, same `d`, no other change — instantly visible. That isolated it:
**there was never a rendering/paint bug** (the earlier "Chromium repaint bug"
theory in a previous version of this comment was a red herring — chased
because a `display:none`→`''` toggle sometimes seemed to fix it, but that was
confounded by simultaneously testing with bright debug colors). The real
problem was always plain color contrast: `#c8c9c6` grey and the pale
`--nifs-red-tint` pink are simply too close in tone to this hero photo's dark
grey gradient to read at 3–4px width.

**Fix applied**: track path → semi-transparent white (`#ffffff` at
`strokeOpacity 0.55`) instead of solid grey — bright against the dark hero,
a soft hairline on white sections (matches Gordonstoun's own intent of
subtlety on light backgrounds). Progress path → the saturated `var(--primary)`
NIFS red instead of the washed-out `--nifs-red-tint` — reads clearly against
both dark and light backgrounds. Removed an unnecessary `display` toggle
"repaint fix" that had been added while chasing the wrong theory (harmless
but pointless — the toggle was never what fixed anything; the color swap in
the same test was doing all the work).

**This time visually verified end-to-end** via agent-browser screenshots
with the real colors (not debug lime): line visible in the hero, through the
white trust-strip, bending correctly across the training-yard image cap, and
running the full height of the black footer. Deployed to production.

**Lesson for next session**: when a scroll effect "isn't showing" after the
geometry/z-index/DOM all check out correctly, test color contrast directly
(swap to an unmistakable debug color with nothing else changed) before
assuming a browser/rendering bug — it's a much more common and much cheaper
hypothesis to rule out first.

## Known Issues / Pending Work

- **No real images yet.** All 14 image slots (see plan file's image plan) are placeholders. Prompts were handed to the user for Google Antigravity generation, output expected in `c:\claude code\nifs-images-incoming\`.
- Dev server currently running on **port 3001** (port 3000 was occupied by an unrelated project on this machine).
- Blog is a stub — no articles migrated yet from the old site.
- Chairman portrait, hostel, gallery pages use generic placeholder slots — need real photos or copy review once images land.
- No CMS — if NIFS staff need to self-edit content later, that's a scope change from the current "static/typed data" decision.

## Deployment

**Live**: https://nifs-institute.vercel.app (Vercel project `nifs-institute`, account
`tejasolryder24-4493`, deployed to production). Contact form will only log to console until
`RESEND_API_KEY` and `ADMISSIONS_EMAIL` env vars are set in the Vercel project settings — no real
email sends yet. Real photography still pending (`ImagePlaceholder` throughout) — redeploy once
images from `c:\claude code\nifs-images-incoming\` are wired in.

## Session History

### 2026-07-10 — Initial build session
- Researched NIFS India live site in-browser (agent-browser): corrected brand color from assumed blue to actual red, pixel-sampled exact hex from logo file, pulled real recruiter list and career-outcome copy from live course pages
- Researched Gordonstoun in-browser + via their public style guide: extracted exact color/font tokens (`#702381`, Ivy Presto Display, Proxima Nova, Slick Carousel, Bootstrap) via live computed-CSS inspection
- Discovered image-generation skills (`imagen`, `imagegen`, `fal-generate`, `venice-image-generate`) are all uninstalled catalogue stubs with no API keys configured — handed off image generation to user's Google Antigravity setup with 14 detailed prompts + shared drop folder
- Scaffolded Next.js 16 project, shadcn/ui (base-ui variant), GSAP/Lenis/R3F
- Built full navigation shell + homepage (hero with R3F ember field, two GSAP scroll-pinned story blocks, course grid, trust strip, placement story, CTA) + all 10 course detail pages + About/Industrial Services/Centers/Placements/Gallery/Admissions/Contact/Blog
- `npm run build` passes clean, 24 routes, zero dead links
- Visually verified hero, story-block scroll-pin/progress-rail, and closing sections render correctly via agent-browser screenshots

## Decision Log

- **Brand color is red (`#DC1711`), not navy** — corrected after live browser inspection showed NIFS's actual current site uses red, not the blue assumed from an earlier text-only fetch. Pixel-sampled from the real logo PNG.
- **Crest colors (green/orange) reserved for the emblem motif only** — mirrors Gordonstoun's single-accent discipline while staying true to NIFS's real multi-color badge.
- **Positioning shifted toward industrial safety, away from firefighter imagery** — user's explicit direction, backed by real recruiter/career-outcome research (most placements are industrial/EPC/manufacturing safety roles, not fire brigade jobs).
- **3D scope**: added an R3F ember-particle hero layer beyond Gordonstoun's actual GSAP-only effects, per user's explicit "advanced 3D" request.
- **No CMS, no existing NIFS backend assumed** — confirmed with user during planning.
- **Scroll thread went through two redesigns on 2026-07-10.** First: replaced `scroll-circuit.tsx` with a comet-style `scroll-path-line.tsx` in `components/motion/` (glow trail, wrap-around brackets, per-section box-shadow activation, bend-safe length→y lookup table). User rejected that result outright ("completely wrong"), deleted it, and gave a much more literal, prescriptive spec instead. Second (current): `src/components/ScrollPathLine.tsx` — no section glow, no particles, `viewBox="0 0 windowWidth documentScrollHeight"` with `preserveAspectRatio="none"` (path intentionally squashed to one screen height), and traveler `stroke-dashoffset` driven by plain `self.progress * totalPathLength` from a single ScrollTrigger — explicitly overriding the earlier bend-desync fix. Attribute scheme simplified to `data-path-logo="true"` (logo only) + `data-path-target="true"` (every wrapped element; first tagged = hero-style entry, last = footer, rest = generic bracket wrap). Lesson: when a user gives an exact, literal technical spec a second time after rejecting a "corrected" version, implement it exactly as written rather than re-applying the same fix.
