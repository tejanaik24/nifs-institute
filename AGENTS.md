<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NIFS India — Project Rules

## What this is
Rebuild of nifsindia.net as a premium Gordonstoun-style (gordonstoun.org.uk)
Next.js site for an Indian industrial-safety training institute. See
BRAIN.md for full context and the plan file at
`C:\Users\user\.claude\plans\please-help-me-create-transient-jellyfish.md`
for the complete design spec.

## Critical rules — never do these
- **Never use `#702381` (Gordonstoun's purple) as an accent.** NIFS's brand
  color is `#DC1711` (red), pixel-sampled from the real logo. This is a
  verified fact, not a placeholder — don't "fix" it back to purple.
- **Never lead with firefighter/fire-brigade imagery or copy.** NIFS's real
  recruiters and career outcomes are industrial safety / EHS roles at
  companies like Adani, L&T, ITC, GMR, Amazon. Fire content is a real but
  minority part of the curriculum — keep the ~70/30 industrial/fire balance.
- **Never build a component from scratch if shadcn has it.** This project
  uses the `base-ui` shadcn variant (not Radix) — components use a `render`
  prop pattern, not `asChild`. Check `src/components/ui/*.tsx` for the
  actual API before assuming Radix conventions.
- **`params` and `searchParams` are async** in this Next.js version (16.2) —
  always `await` them in page/layout components. See `courses/[slug]/page.tsx`
  for the pattern.
- **Don't hardcode NIFS content.** All courses, centers, recruiters, and nav
  live in `src/lib/data/*.ts` — edit there, not inline in components.

## Design system
- Primary: `--primary` in `globals.css` = NIFS red (oklch-converted from `#DC1711`)
- Crest colors (`--nifs-green` `#26BE29`, `--nifs-orange` `#FC8010`) are
  reserved for the crest/emblem motif only — never use them as general UI accents
- Display font `var(--font-display)` = Playfair Display (italic for headlines)
- Body font `var(--font-sans)` = Inter

## Route map
`/`, `/about`, `/courses`, `/courses/[slug]` (10 static slugs — see
`src/lib/data/courses.ts`), `/industrial-services`, `/centers`,
`/placements`, `/gallery`, `/admissions`, `/contact`, `/blog`, `/api/contact`

## Key files
- `src/lib/data/courses.ts` — all 10 course definitions
- `src/lib/data/centers.ts` — centers, recruiters, accreditations
- `src/components/sections/story-block.tsx` — the GSAP scroll-pin + progress-rail pattern, reused across the site
- `src/components/image-placeholder.tsx` — stand-in for missing photography; swap for `next/image` per-slot once real files exist
- `src/components/three/hero-scene.tsx` — R3F ember particle field, the "advanced 3D" layer

## Known bugs / do-not-repeat
- `SheetTrigger` does NOT support `asChild` in this shadcn/base-ui setup —
  pass className/props directly to `SheetTrigger` instead.
- R3F `bufferAttribute` requires an explicit `args={[array, itemSize]}` prop
  in this Three.js/R3F version, not just `count`/`array`/`itemSize`.
- Port 3000 may already be occupied by another project on this dev machine —
  check before assuming the dev server is this project's.
- The site-wide scroll line is `src/components/ScrollPathLine.tsx`
  (`ScrollPathLine`, rendered once in `layout.tsx` for all pages). It has
  gone through two redesigns: `scroll-circuit.tsx` (left-rail + branches)
  → `scroll-path-line.tsx` in `components/motion/` (comet with per-section
  glow activation, bend-safe length→y lookup table) → the current
  `components/ScrollPathLine.tsx` (2026-07-10, user-specified rewrite: no
  section glow, no lookup table — traveler `stroke-dashoffset` is driven by
  `self.progress * totalPathLength` directly from a single `ScrollTrigger`,
  per explicit user instruction overriding the earlier bend-desync fix).
  It is ONE `<svg>` with a track path + a red comet "traveler" path sharing
  the same `d` — don't reintroduce a second sitewide line component or
  split it into separate track/thumb/branch elements.
- The SVG uses `viewBox="0 0 windowWidth documentScrollHeight"` with
  `preserveAspectRatio="none"` at a fixed `100vw`/`100vh` size — the whole
  document-height path is intentionally squashed to fit one screen (a
  static compressed "thread" with the comet's revealed segment tracking
  scroll progress), not a per-scroll-position translated overlay. This was
  an explicit, twice-repeated user instruction — don't "fix" it back to a
  translate(0,-scrollY) group without checking first.
- The logo start-point is tagged `data-path-logo="true"` (see
  `site-header.tsx`); every wrapped element (hero, `page-hero.tsx`, course
  cards, the training-yard `StoryBlock` image via its `pathTarget` prop,
  homepage CTA section, footer) is tagged `data-path-target="true"`. Don't
  reintroduce the old `data-path-section="logo|hero|card|..."` typed
  attribute — the path builder now just uses document order (first tagged
  element = hero-style entry, last = footer, everything between = a
  generic bracket wrap).
- The path `<svg>` MUST keep a z-index above normal section content
  (currently `z-50` inline style on `ScrollPathLine`, matching the
  header/dialog layer) — it was previously invisible over the hero/footer
  when set too low. Don't drop it below section content.

## Images status
No real photography exists yet. All image slots use `ImagePlaceholder`
with a `slot` filename matching the shot list in BRAIN.md. Real images are
being generated externally (Google Antigravity) and will land in
`c:\claude code\nifs-images-incoming\` — move them into `public/images/`
and swap each placeholder for `next/image` when they arrive.

## Deploy instructions
Not yet deployed. `npm run build` passes clean. Target Vercel. Set
`RESEND_API_KEY` and `ADMISSIONS_EMAIL` env vars before launch or the
contact form only logs to console instead of sending real email.
