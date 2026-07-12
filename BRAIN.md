# BRAIN.md — NIFS India Website Rebuild

## ⚠️ Read this first

This file was rewritten on 2026-07-13 to replace a stale brief. Everything
above commit `b3cd5a9` (July 10 session — the "Gordonstoun scroll-circuit /
R3F ember-particle" build) describes an **architecture that has been
replaced** on the homepage. Files like `ScrollPathLine.tsx`,
`scroll-circuit.tsx`, and `src/components/three/hero-scene.tsx` still
physically exist in the repo and MAY still be wired into other pages
(`/about`, `/industrial-services`, etc. were not touched this session) —
but the **homepage no longer uses any of them**. Verify with `grep -rn` for
a component before assuming it's live; don't trust old docs. The full,
detailed history of the old build is preserved at the bottom of this file
under "Historical Archive" for reference, but treat it as background, not
current state.

## 30-Second Brief (current, 2026-07-13)

Rebuilding nifsindia.net as a premium Next.js site for NIFS (National
Institute of Fire and Safety), an Indian industrial-safety training
institute headquartered in Visakhapatnam. **Positioning is industrial
safety first (Safety Officer / HSE Manager / Risk Analyst roles at Adani,
L&T, GMR, ITC, MEIL) — NOT firefighting.** This correction has been made
twice now across two different sessions; don't regress on it, including in
generated imagery.

Live: **https://nifs-institute.vercel.app** (Vercel project `nifs-institute`,
account `tejasolryder24-4493`). Repo: `c:\claude code\nifs-india`, GitHub
`tejanaik24/nifs-institute`. **GitHub→Vercel auto-deploy does not reliably
fire** — after every `git push`, also run `vercel --prod --yes` from the
repo root to actually update the live site. Confirmed this manually twice
this session after pushes sat un-deployed for 3+ minutes.

## Current homepage architecture (as of commit `f8fcfd4`)

`src/app/page.tsx` renders, top to bottom:
1. **`<TunnelHero />`** (`src/components/sections/tunnel-hero.tsx`) — full
   viewport scroll-driven image sequence using a new shadcn-style component
   at `src/components/ui/scroll-image-tunnel.tsx` (framer-motion powered:
   each image starts as a tiny scaled-down point and grows to fill frame as
   the user scrolls past its segment). Desktop only — `MobileHeroFallback`
   inside the same file renders a static stacked layout below `lg`.
   **Images are currently placeholder/reused old photos, not the real
   5-image story** — see "Open work" below.
2. **`<AboutNifs />`** and **`<CentersHighlight />`** — new, plain white
   sections, no spine. `AboutNifs` covers 20+ years / NSDC / Skill India /
   ISO 9001:2015 (real facts, verified from the live nifsindia.net site).
   `CentersHighlight` covers the real "86 Centers in 24 States, 3 African
   countries" figure (also verified from the live site, not invented).
3. **`<SpineLayout>` wrapping `<ExploreNifs />`** — this is the ONLY part of
   the homepage that still uses the continuous red "spine" column (see
   `src/components/SpineLayout.tsx`, `SPINE_WIDTH = 450`). `ExploreNifs.tsx`
   (`src/components/sections/ExploreNifs.tsx`) contains beats for: Academic
   Training Division, Industrial Project Division, Facilities (AC
   classrooms/conference halls), Training Yard, and a "45,000 Candidates
   Placed" count-up proof beat. This is a deliberate, explicit user decision
   (see Decision Log) — the spine stays for this section, was removed from
   the hero.

`src/components/sections/hero-section.tsx` (the old spine-based hero) still
exists as a file but is **not imported anywhere** — safe to ignore or delete
in a future cleanup, just don't accidentally re-wire it back in.

## Why the homepage got rebuilt this session (chronological)

1. **Hygiene audit** (early this session) found the live homepage (then a
   different, earlier build) had a broken CSS bug: a decorative red spine
   element was unbounded and ran the full page height, bisecting content —
   plus duplicate/conflicting stats (85+/10K+ vs 73+/8,531+), redundant
   giant-numeral treatments, and an inconsistent logo wall (QCFI logo was
   `null`, rendering as placeholder text).
2. **Content-gap audit** against the live WordPress site (nifsindia.net)
   found the rebuild was missing: 142 blog posts (SEO risk), a live 23-
   listing jobs board, 5 course programs, an FAQ page, hostel copy, and
   several gallery categories. Not yet acted on — flagged for later.
3. **MD gave new direction** (via voice note, relayed by the user): two
   business divisions (Academic Training / Industrial Project) need clear
   representation, "45,000 candidates placed" is the new single-source-of-
   truth stat (replacing all old conflicting figures), and facility
   highlights (AC conference halls, AC classrooms, smart classrooms,
   training yard) need surfacing — with a strong preference for **less
   text, more images**.
4. **User provided kentcollege.com as the explicit structural reference**
   (screenshots analyzed in detail, not just casually browsed) — key
   patterns adopted: a continuous scroll-driven spine (not hero-only), no
   carousel/pagination widgets (true scrollytelling instead), photos that
   break out of rigid rectangles, headlines overlaid directly on photos
   where it suits the content, and varied section rhythm.
5. **Studio review** (`/website-design meeting` — NOVA/VIVID/ARIA/FLUX/SAGE/
   etc. roleplay) diagnosed exactly why an early carousel-based attempt read
   as templated vs. Kent's premium feel: carousel/pagination widgets read as
   "product UI" not "designed page"; hard rectangular photo boxes vs. Kent's
   cutout/bleed treatment; text duplicated across too many places.
6. **Two real bug-fix passes** were needed after OpenCode built the
   spine-based Explore NIFS sequence:
   - Pass 1: every beat had a hardcoded `#0A0A0A` black background forced
     onto both side gutters regardless of content (huge black void panels),
     the hero had the same headline duplicated in two places plus the same
     photo layered twice (ghosting artifact), and the "45,000" count-up
     numeral was clipping behind the fixed header. Fixed directly in this
     session (commit `a9de246`).
   - Pass 2: a CSS Grid child-ordering bug meant the division beats'
     substantial copy (headline + paragraph + CTA) was rendering **inside**
     the red spine column instead of the white side column, while the
     spine's intended-to-be-quiet eyebrow ended up in the white column —
     backwards from the code's own comments. Also the same division
     headline was duplicated a second time as a large overlay on the photo.
     Fixed via an OpenCode prompt (commit `9da091c`): grid children
     reordered, white column rebuilt with Kent-style colored headline +
     paragraph + bullet list + CTA, photo overlay replaced with a small
     corner caption tag.
7. **Hero replaced entirely with `ScrollImageTunnel`** — user wanted 5
   images telling NIFS's story via a scroll-reveal tunnel effect (a
   pre-built shadcn-style component, code pasted directly by the user from
   an external source, integrated via an OpenCode prompt — commit
   `f8fcfd4`). Confirmed via AskUserQuestion: spine removed from hero only
   (kept for Explore NIFS below), headline/CTA text should appear **after**
   the tunnel finishes as its own moment leading into About NIFS — **this
   is NOT yet how it's built** (see Open work below, it currently overlays
   on top of the tunnel and fades on scroll instead).

## Open work / not yet done

- **The 5 hero tunnel images have not been generated yet.** The tunnel is
  currently cycling through old placeholder photos
  (`classroom-lecture.jpg`, `training-yard-drill.jpg`, `placement-female.png`,
  `control-room-risk-assessment.jpg`, `hero-professional.png`) via
  `tunnelImages` in `tunnel-hero.tsx` — these are NOT the real story
  sequence and need swapping once real images exist.
- **Image prompt iteration history (useful — don't repeat the same
  mistakes):**
  1. First attempt: generic "photorealistic young man, golden hour, shallow
     depth of field" portrait-orientation prompts — user rejected as
     unrealistic/generic AI-slop and pointed out the tunnel's frame is
     portrait-shaped (`max-w-xl` × `70%` viewport height), so portrait
     images were also the wrong aspect ratio for on-screen use — wanted
     landscape/horizontal instead, working on both mobile and desktop.
  2. Second attempt: rewrote as 16:9 landscape with a literal fire/flame
     motif ("The Spark," "Ignition") tying to the "Igniting Careers"
     tagline — user rejected this too: NIFS is industrial safety, not
     firefighting, and leaning on literal flame imagery over-indexes the
     wrong specialty (this is the SAME correction made in the old July 10
     archived session — a recurring point, don't drop it again).
  3. Third attempt: rebalanced to industrial/EHS-first beats (hazard
     identification/lockout-tagout tag, EHS classroom, plant-floor PPE
     inspection, industrial scale/environmental shot, NIFS badge/emblem
     close-up) — landscape 16:9, varied cinematic framing instead of 5
     repeated portrait shots, thematic/color continuity instead of forcing
     the same face across independent generations. **User was still not
     happy with this and ended the session before resolving it** — the
     image concept is unresolved. A fresh session should not assume the
     3rd attempt is approved; re-derive the brief with the user before
     generating anything.
- **`scroll-image-tunnel.tsx`'s frame aspect ratio was never actually
  changed** to properly suit landscape images — it's still `h-[70%] w-full
  max-w-xl` (portrait-biased). If landscape images get approved, this frame
  needs adjusting (e.g. to `aspect-video w-full max-w-6xl` or similar)
  before they'll display without heavy side-cropping. Flagged to the user,
  not yet actioned.
- **Hero text placement doesn't match what the user actually asked for.**
  They picked "headline/CTA appear after the tunnel finishes, leading into
  About NIFS" via AskUserQuestion, but what OpenCode built has the text
  overlaid on top of the tunnel from the start, fading out on scroll — the
  other option they didn't pick. Not yet corrected — flagged to the user,
  awaiting their call on whether to fix it or keep it now that they've seen
  it in context.
- **Content-gap audit items** (142 blog posts / SEO redirects, jobs board,
  5 missing courses, FAQ page) are still fully unaddressed — this session
  focused entirely on homepage hero/visual work, not that list.
- **QCFI and other accreditation logos**: real logos were pulled from the
  live nifsindia.net site via cPanel access (credentials in memory, see
  Reference below) and copied into `public/images/logos/accreditations/`,
  fixing the `qcfi.png` null-logo bug from the original hygiene audit. This
  DID get committed/deployed — should still be live, but wasn't
  re-verified after the later hero/ExploreNifs rewrites; worth a quick
  spot-check.

## Real facts verified from the live site (use these, don't invent numbers)

- **86 Centers in 24 States across India**, recently started in **3 African
  countries** (source: nifsindia.net `/centers/` page body text).
- **20+ years** — founded 2004, so "20+ years of excellence" / "Est. 2004"
  are both accurate.
- **NSDC approved training partner**, **Skill India** collaboration,
  **ISO 9001:2015 certified** unit of SSB Institute of Higher Studies
  Educational Society — all confirmed on the live site, logos recovered via
  cPanel and already in `public/images/logos/`.
- **45,000 candidates placed** — this came from the MD directly (voice
  note, relayed by user), not independently verified against the old site
  (which showed smaller/conflicting figures like 8,531+ before the
  rebuild). Treat as the current source of truth per explicit instruction,
  but it did NOT come from the same verification pass as the centers/states
  figures above — worth knowing the provenance is different if it's ever
  questioned.
- Old site's course catalogue has 15 programs; new site's `courses.ts` has
  10 — 5 are missing (Diploma in Industrial Safety, Advanced Diploma in
  Fire & Industrial Safety, Chemical Safety cert, Construction Safety cert,
  Advanced Diploma in QHSE). Not yet added.

## Reference

- **NIFS cPanel + WordPress admin credentials**: saved in Claude's memory
  vault at `Secrets/nifs-cpanel-credentials.md` (not in this repo, for
  security — ask the user or check that memory file if you need to pull
  more real content/assets from the live site). WordPress `/wp-admin/` is
  behind a CAPTCHA/security challenge; cPanel File Manager and the public
  front-end (no login needed) both worked fine for asset recovery.
- **Kent College reference**: kentcollege.com — the explicit structural/
  design benchmark for this rebuild, analyzed via 4 detailed user-provided
  screenshots (hero → values section → academic section → "Explore Kent
  College" interactive carousel-that's-actually-scroll-driven section).
  Design language notes: continuous spine-like color column, photos as
  cutouts breaking rectangular bounds, headlines overlaid directly on
  photos, low text density, varied section rhythm, no click-driven
  pagination widgets anywhere on their real site.

## Deployment

**Live**: https://nifs-institute.vercel.app — deploy via `git push` (to
`tejanaik24/nifs-institute`, `main` branch) **followed by**
`vercel --prod --yes` from the repo root (`c:\claude code\nifs-india`), run
manually every time this session — the GitHub webhook auto-deploy did not
fire reliably (confirmed stalled 3+ minutes on two separate pushes before
manual `vercel --prod` was used instead). `vercel whoami` confirms CLI auth
as `tejasolryder24-4493`, project already linked (`.vercel/project.json`
present).

---

# Historical Archive — superseded architecture (July 10 session)

Everything below this line describes the **previous** homepage build
(scroll-circuit "comet" line, R3F ember-particle hero, India map with
pixel-calibrated city dots) which has since been replaced by the spine/
Kent-inspired rebuild documented above. Kept for reference only — do not
treat any of this as current state without verifying against the actual
codebase first.

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
  commit `3a71abe` if ever revisited. Status under the new architecture
  unknown — `CentersHighlight` (new) does not obviously reuse this; check
  before assuming either the map or its calibration script still matters.
