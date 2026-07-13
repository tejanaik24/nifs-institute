# BRAIN.md — NIFS India Website Rebuild

## ⚠️ Read this first

This file was rewritten on 2026-07-13 (evening pass, after a full session of
homepage rebuild + fixes) to replace a now-stale mid-session brief. The
homepage architecture described below is **current as of this rewrite** —
verify with `grep -rn` against `src/app/page.tsx` before trusting anything
that isn't. Two older layers of history are preserved further down for
background only: a "Historical Archive" (July 10 session, scroll-circuit/
R3F architecture, fully replaced) and the immediately-preceding mid-session
brief's blow-by-blow build log (still useful chronology, kept as-is).

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

**Homepage today** (`src/app/page.tsx`): `TunnelHero` → `SpineLayout`
wrapping `WhyNIFS` → `AboutNifs` → `CentersGrid`. That's it — `CentersHighlight`
and `ExploreNifs` were both **removed entirely** this session per explicit
user request (see below). The page currently ends after the map/HQ block;
**no replacement content has been decided yet** for where `ExploreNifs`
used to be — this is the most obvious next thing to plan with the user.

## Current homepage architecture

`src/app/page.tsx`:
```tsx
<TunnelHero />
<SpineLayout>
  <WhyNIFS />
  <AboutNifs />
  <CentersGrid />
</SpineLayout>
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
  Advanced Diploma in QHSE). **Not yet added** — untouched this session.

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

- **No replacement content decided for the removed `ExploreNifs` section.**
  The user said they have something planned but never described it. This
  is the most likely next thing to come up — don't assume, ask what it
  should be.
- **"Est. 2004" vs "25+ years" arithmetic inconsistency** (2004+25=2029) —
  flagged to the user once already, unresolved.
- **Content-gap audit items** (142 blog posts / SEO redirects, jobs board,
  5 missing course programs, FAQ page) — still fully unaddressed across
  multiple sessions now.
- **QCFI and other accreditation logos** — recovered via cPanel and
  committed in an earlier session; not re-verified live since the later
  rewrites this session. Worth a spot-check next time you're in
  `AboutNifs`/logos territory.
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
