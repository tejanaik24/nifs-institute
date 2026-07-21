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
