# NIFS Homepage Rebuild — Phase 1

## Brief

**Audience:** Prospective students (18–30), career changers, parents
**Tone:** Editorial, institutional, Kent College–inspired — low text density, photos do the work
**Surface:** Next.js homepage (src/app/page.tsx), desktop-first with responsive fallbacks
**Constraints:**
- Single continuous spine (SpineLayout) — no duplicate spine implementations
- 45,000 is the only placement stat (no stray 85+, 10K+, 8,531+)
- Single hero headline — no competing headlines
- Cinematic motion (GSAP/Framer Motion) with prefers-reduced-motion support
- Existing images reused where possible; AI-generated photography for new slots

## Sections to Build

### 1. Hero (inside SpineLayout)
- Spine center: "Est. 2004" eyebrow + "Igniting Careers in Safety" thesis headline
- Right: full-bleed hero photo (hero-professional.png + hero-aerial-bg.png overlay)
- Left: dark gutter with CTA buttons
- Scroll indicator: existing 5-dot animated chevron (right edge)

### 2. Explore NIFS Carousel (new, modeled on Kent College shot 4)
- Center spine-styled panel (red/chevron) + two flanking full-bleed photos
- Round left/right arrow navigation
- 5–6 slides: Academic Training, Industrial Project, Facilities (×2), Training Yard, Proof (45,000 placed)
- Each slide: eyebrow, heading, one line body, two photos, optional CTA link

## Architecture

- `SpineLayout` = single spine provider (z-[1] absolute)
- Hero renders as child of SpineLayout, center transparent, spine shows through
- ExploreNifs carousel renders as child of SpineLayout, center panel overlays spine
- Data files: `src/lib/data/divisions.ts`, `src/lib/data/facilities.ts`
