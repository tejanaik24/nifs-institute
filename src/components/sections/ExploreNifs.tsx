"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPINE_WIDTH } from "@/components/SpineLayout";
import { divisions } from "@/lib/data/divisions";
import {
  facilities,
  trainingYardSlide,
  proofSlide,
} from "@/lib/data/facilities";

gsap.registerPlugin(ScrollTrigger);

const gutterCalc = `calc(50% - ${SPINE_WIDTH / 2}px)`;

/* ══════════════════════════════════════════════════════════════════════════════
   DESKTOP Pinned Beat Component
   Each beat is a 100svh section. Spine text fades in/out via ScrollTrigger.
   ══════════════════════════════════════════════════════════════════════════════ */

/** Beat 2: Academic Training — left copy + right photo with headline on photo */
function Beat2Desktop() {
  const { name: title, description, ctaLabel, ctaHref, photoLeft } = divisions[0];
  return (
    <div className="relative hidden min-h-[100svh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
      {/* Spine — eyebrow only */}
      <div className="relative z-[3] flex items-center justify-center">
        <div className="beat-spine-text flex flex-col items-center gap-3 px-8 text-center">
          <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
            Division 01.
          </span>
          <div className="h-px w-10 bg-white/30" />
        </div>
      </div>
      {/* Left — copy */}
      <div className="relative z-[3] flex items-center justify-start pl-10 pr-4">
        <div className="beat-gutter-text max-w-[320px]">
          <h3 className="font-display text-[clamp(2rem,3vw,3rem)] leading-[1.0] text-white italic">
            {title}
          </h3>
          <p className="mt-4 text-[13px] leading-[1.7] text-white/60">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex h-11 items-center justify-center bg-primary px-5 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
      {/* Right — photo with headline overlaid */}
      <div className="relative z-[3] flex items-center justify-start pl-6">
        <div className="beat-photo relative h-[70%] w-[90%] overflow-visible">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
          >
            <Image
              src={photoLeft}
              alt="NIFS classroom lecture"
              fill
              sizes="35vw"
              className="object-cover"
            />
          </div>
          {/* Headline ON the photo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] text-white italic drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)]">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Beat 3: Industrial Projects — photo left with headline, copy right */
function Beat3Desktop() {
  const { name: title, description, ctaLabel, ctaHref, photoLeft } = divisions[1];
  return (
    <div className="relative hidden min-h-[100svh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
      {/* Left — photo with headline overlaid */}
      <div className="relative z-[3] flex items-center justify-end pr-6">
        <div className="beat-photo relative h-[70%] w-[90%] overflow-visible">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "0.5rem 2rem 0.5rem 2rem" }}
          >
            <Image
              src={photoLeft}
              alt="Industrial control room"
              fill
              sizes="35vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] text-white italic drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)]">
              {title}
            </span>
          </div>
        </div>
      </div>
      {/* Spine — eyebrow only */}
      <div className="relative z-[3] flex items-center justify-center">
        <div className="beat-spine-text flex flex-col items-center gap-3 px-8 text-center">
          <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
            Division 02.
          </span>
          <div className="h-px w-10 bg-white/30" />
        </div>
      </div>
      {/* Right — copy */}
      <div className="relative z-[3] flex items-center justify-end pr-10 pl-4">
        <div className="beat-gutter-text max-w-[320px]">
          <h3 className="font-display text-[clamp(2rem,3vw,3rem)] leading-[1.0] text-white italic">
            {title}
          </h3>
          <p className="mt-4 text-[13px] leading-[1.7] text-white/60">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex h-11 items-center justify-center border border-white/40 px-5 text-[11px] font-medium tracking-widest text-white uppercase transition-colors hover:bg-white/10"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Beat 4: Facilities — SHORTER section, photo-led, captions only */
function Beat4Desktop() {
  const [f1, f2] = facilities;
  return (
    <div className="relative hidden min-h-[70vh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
      {/* Left — facility photo with caption overlay */}
      <div className="relative z-[3] flex items-center justify-end pr-6">
        <div className="beat-photo relative h-[60%] w-[85%] overflow-visible">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "1.5rem 0.25rem 1.5rem 0.25rem" }}
          >
            <Image
              src={f1.photoLeft}
              alt="Smart classroom"
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
              {f1.name}
            </span>
          </div>
        </div>
      </div>
      {/* Spine — eyebrow */}
      <div className="relative z-[3] flex items-center justify-center">
        <div className="beat-spine-text flex flex-col items-center gap-3 px-8 text-center">
          <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
            Our Spaces
          </span>
          <div className="h-px w-10 bg-white/30" />
        </div>
      </div>
      {/* Right — training hall photo with caption */}
      <div className="relative z-[3] flex items-center justify-start pl-6">
        <div className="beat-photo relative h-[55%] w-[85%] overflow-visible">
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "0.25rem 1.5rem 0.25rem 1.5rem" }}
          >
            <Image
              src={f2.photoLeft}
              alt="Conference facility"
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
              {f2.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Beat 5: Training Yard — full-bleed single dramatic photo */
function Beat5Desktop() {
  return (
    <div className="relative hidden min-h-[100svh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
      {/* Left photo — spilling into spine */}
      <div className="relative z-[3] flex items-center justify-end">
        <div
          className="beat-photo relative h-[75%] w-[95%] overflow-hidden -mr-[80px]"
          style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
        >
          <Image
            src={trainingYardSlide.photoLeft}
            alt="Training yard drill"
            fill
            sizes="40vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Spine — minimal text */}
      <div className="relative z-[3] flex items-center justify-center">
        <div className="beat-spine-text flex flex-col items-center gap-3 px-8 text-center">
          <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
            {trainingYardSlide.eyebrow}
          </span>
          <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.0] text-white italic">
            {trainingYardSlide.name}
          </h3>
          <div className="h-px w-10 bg-white/30" />
        </div>
      </div>
      {/* Right photo — spilling into spine from right */}
      <div className="relative z-[3] flex items-center justify-start">
        <div
          className="beat-photo relative h-[70%] w-[95%] overflow-hidden -ml-[80px]"
          style={{ borderRadius: "0.5rem 2rem 0.5rem 2rem" }}
        >
          <Image
            src={trainingYardSlide.photoRight}
            alt="Emergency response drill"
            fill
            sizes="40vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/** Beat 6: Proof — HUGE count-up "45,000" in spine, flanking portraits */
function Beat6Desktop() {
  const counterRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!counterRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const el = counterRef.current;

    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      el.textContent = "45,000";
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: 45000,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (triggeredRef.current) return;
            triggeredRef.current = true;
          },
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toLocaleString("en-IN");
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative hidden min-h-[100svh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
      {/* Left portrait — circular cutout */}
      <div className="relative z-[3] flex items-center justify-end pr-4 pt-20">
        <div className="beat-photo relative h-[55%] w-[60%] overflow-hidden rounded-full">
          <Image
            src={proofSlide.photoLeft}
            alt="Placement success — female graduate"
            fill
            sizes="22vw"
            className="object-cover"
          />
        </div>
      </div>
      {/* Spine — HUGE count-up stat */}
      <div className="relative z-[3] flex items-center justify-center pt-20">
        <div className="beat-spine-text flex flex-col items-center gap-3 px-8 text-center">
          <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
            {proofSlide.eyebrow}
          </span>
          <div
            ref={counterRef}
            className="font-display text-[clamp(3rem,6vw,6.5rem)] leading-[0.85] text-white italic"
          >
            0
          </div>
          <div className="h-px w-16 bg-white/40" />
          <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] text-white/80 italic">
            Candidates Placed
          </p>
          <p className="mt-2 max-w-[280px] text-[12px] leading-[1.7] text-white/50">
            {proofSlide.description}
          </p>
        </div>
      </div>
      {/* Right portrait — circular cutout, offset low */}
      <div className="relative z-[3] flex items-center justify-start pl-4">
        <div className="beat-photo relative h-[55%] w-[60%] overflow-hidden rounded-full mt-20">
          <Image
            src={proofSlide.photoRight}
            alt="Placement success — male graduate"
            fill
            sizes="22vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MOBILE / TABLET — simple stacked scroll (no pinned mechanic)
   ══════════════════════════════════════════════════════════════════════════════ */

function MobileCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="relative -mt-24 z-10 px-5 pb-10">
      <div className="beat-spine-text relative mx-auto max-w-[400px] bg-primary p-6 text-center">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25'%3E%3Cpath d='M2 6l10.5 13L23 6' stroke='white' stroke-width='1.5' fill='none' stroke-opacity='0.15'/%3E%3C/svg%3E",
            backgroundSize: "25px 25px",
            backgroundRepeat: "repeat",
          }}
        />
        <span className="relative z-10 text-[10px] tracking-[0.3em] text-white/60 uppercase">
          {eyebrow}
        </span>
        <h3 className="relative z-10 font-display mt-2 text-[1.75rem] leading-[1.0] text-white italic">
          {title}
        </h3>
        <div className="relative z-10 mx-auto mt-3 h-px w-10 bg-white/40" />
        <p className="relative z-10 mt-3 text-[13px] leading-[1.7] text-white/70">
          {description}
        </p>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="relative z-10 mt-4 inline-flex h-10 items-center border border-white/40 px-5 text-[10px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white/10"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

function MobileSection({
  src,
  alt,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[55svh] w-full">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
      </div>
      <MobileCard
        eyebrow={eyebrow}
        title={title}
        description={description}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
    </section>
  );
}

function MobileFacilitiesSection() {
  const [f1, f2] = facilities;
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[50svh] w-full">
        <Image
          src={f1.photoLeft}
          alt="Smart classroom"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
      </div>
      <MobileCard eyebrow={f1.eyebrow} title={f1.name} description={f1.description} />
    </section>
  );
}

function MobileTrainingYardSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[60svh] w-full">
        <Image
          src={trainingYardSlide.photoLeft}
          alt="Training yard drill"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
      </div>
      <MobileCard
        eyebrow={trainingYardSlide.eyebrow}
        title={trainingYardSlide.name}
        description={trainingYardSlide.description}
      />
    </section>
  );
}

function MobileProofSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[70svh] items-center justify-center bg-[#0A0A0A]">
        <div className="absolute inset-0 flex">
          <div className="relative w-1/2 opacity-20">
            <Image
              src={proofSlide.photoLeft}
              alt=""
              fill
              sizes="50vw"
              aria-hidden="true"
              className="object-cover"
            />
          </div>
          <div className="relative w-1/2 opacity-20">
            <Image
              src={proofSlide.photoRight}
              alt=""
              fill
              sizes="50vw"
              aria-hidden="true"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        </div>
        <div className="beat-spine-text relative z-10 flex flex-col items-center gap-3 px-5 text-center">
          <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
            {proofSlide.eyebrow}
          </span>
          <div className="font-display text-[clamp(3rem,12vw,5rem)] leading-[0.85] text-white italic">
            45,000
          </div>
          <div className="h-px w-12 bg-white/40" />
          <p className="font-display text-[1.5rem] leading-[1.1] text-white/80 italic">
            Candidates Placed
          </p>
          <p className="mt-2 max-w-[300px] text-[12px] leading-[1.7] text-white/50">
            {proofSlide.description}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════════ */

export function ExploreNifs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = typeof window !== "undefined"
    ? window.matchMedia("(min-width: 1024px)").matches
    : true;

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Only run pinned beat logic on desktop
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      const root = containerRef.current!;
      if (!root) return;

      // Animate spine text (eyebrows) in each beat
      root.querySelectorAll<HTMLElement>(".beat-spine-text").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: (el.closest("[data-beat]") as HTMLElement) ?? el,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate gutter text (descriptions, CTAs) in each beat
      root.querySelectorAll<HTMLElement>(".beat-gutter-text").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: (el.closest("[data-beat]") as HTMLElement) ?? el,
              start: "top 55%",
              end: "bottom 45%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate photos with a subtle scale-up
      root.querySelectorAll<HTMLElement>(".beat-photo").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: (el.closest("[data-beat]") as HTMLElement) ?? el,
              start: "top 65%",
              end: "bottom 35%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [d1, d2] = divisions;

  return (
    <div ref={containerRef} className="mb-16">
      {/* ═══ BEAT 2 — Academic Training ═══ */}
      <section data-beat="2" className="relative overflow-hidden">
        {/* Desktop */}
        <Beat2Desktop />
        {/* Mobile / Tablet */}
        <div className="lg:hidden">
          <MobileSection
            src={d1.photoLeft}
            alt="NIFS classroom lecture"
            eyebrow={d1.eyebrow}
            title={d1.name}
            description={d1.description}
            ctaLabel={d1.ctaLabel}
            ctaHref={d1.ctaHref}
          />
        </div>
      </section>

      {/* ═══ BEAT 3 — Industrial Projects ═══ */}
      <section data-beat="3" className="relative overflow-hidden">
        <Beat3Desktop />
        <div className="lg:hidden">
          <MobileSection
            src={d2.photoLeft}
            alt="Industrial control room"
            eyebrow={d2.eyebrow}
            title={d2.name}
            description={d2.description}
            ctaLabel={d2.ctaLabel}
            ctaHref={d2.ctaHref}
          />
        </div>
      </section>

      {/* ═══ BEAT 4 — Facilities (SHORTER) ═══ */}
      <section data-beat="4" className="relative overflow-hidden">
        <Beat4Desktop />
        <div className="lg:hidden">
          <MobileFacilitiesSection />
        </div>
      </section>

      {/* ═══ BEAT 5 — Training Yard ═══ */}
      <section data-beat="5" className="relative overflow-hidden">
        <Beat5Desktop />
        <div className="lg:hidden">
          <MobileTrainingYardSection />
        </div>
      </section>

      {/* ═══ BEAT 6 — Proof: 45,000 ═══ */}
      <section data-beat="6" className="relative overflow-hidden">
        <Beat6Desktop />
        <div className="lg:hidden">
          <MobileProofSection />
        </div>
      </section>
    </div>
  );
}
