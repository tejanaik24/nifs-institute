# NIFS India — Studio Brief

## Creative Vision
Recreate the premium, editorial feel of gordonstoun.org.uk — italic serif
headlines, scroll-pinned storytelling, a single disciplined brand accent —
but built from NIFS India's actual brand (red, not purple) and actual
positioning (industrial safety, not firefighting).

## Strategic Goals
NIFS's real recruiters (Adani, L&T, ITC, GMR, Amazon, MEIL...) and real
career outcomes (Safety Officer, HSE Manager, Risk Analyst) are corporate
industrial-safety roles. The site must sell that pipeline, not a fire-brigade
fantasy — imagery and copy are weighted accordingly (~70% industrial safety,
~30% fire-specific).

## Visual Direction
- Primary accent: `#DC1711` (pixel-sampled from NIFS's real logo)
- Crest colors (green `#26BE29`, orange `#FC8010`) reserved for the emblem only
- Display font: Playfair Display Italic; body: Inter
- Full token table and Gordonstoun-to-NIFS mapping: see the plan file at
  `C:\Users\user\.claude\plans\please-help-me-create-transient-jellyfish.md`

## Motion Strategy
- GSAP + ScrollTrigger scroll-pinned split sections with a progress rail —
  this is what Gordonstoun actually does and what reads as "3D" on their
  site (verified: no WebGL/Three.js on gordonstoun.org.uk itself)
- Lenis for smooth-scroll easing
- Added: React Three Fiber ember-particle hero layer — genuine 3D, beyond
  Gordonstoun's real effects, per explicit user request

## Tech Stack
Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · shadcn/ui
(base-ui) · GSAP · Lenis · React Three Fiber · react-hook-form + zod ·
static/typed content, no CMS · Vercel deploy target (not yet deployed)

## Component System
Shared: `SiteHeader`, `SiteFooter`, `PageHero`, `StoryBlock`, `ImagePlaceholder`,
`NifsCrest`, `EnquiryForm`. shadcn components in use: button, card,
navigation-menu, sheet, accordion, tabs, badge, separator, dialog, input,
textarea, label, form.

## Phase Plan
See TASKS.md for the live checklist. Phases 1 and 2 (foundation, nav shell)
are complete. Phase 3 (page content) is complete except real photography —
blocked on external image generation (Google Antigravity, user-driven).

## Meeting / Decisions Log
See BRAIN.md's Decision Log for the full rationale trail (brand color
correction, crest color scoping, industrial-safety repositioning, 3D scope,
no-CMS decision).
