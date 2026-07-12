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

/* ─── Shared spine text block — rendered inside the center 450px column ─── */
function SpineCopy({
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
    <div className="spine-text-reveal relative z-10 flex flex-col items-center gap-4 px-8 text-center">
      <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
        {eyebrow}
      </span>
      <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.0] text-white italic">
        {title}
      </h3>
      <div className="h-px w-12 bg-white/40" />
      <p className="max-w-[300px] text-[13px] leading-[1.7] text-white/70">
        {description}
      </p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-2 inline-flex h-10 items-center border border-white/40 px-5 text-[10px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white/10"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

/* ─── Mobile/tablet text card — overlays bottom of photo ─── */
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
      <div className="spine-text-reveal relative mx-auto max-w-[400px] bg-primary p-6 text-center">
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

export function ExploreNifs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const root = containerRef.current!;
      if (!root) return;

      root.querySelectorAll<HTMLElement>(".spine-text-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        );
      });

      root.querySelectorAll<HTMLElement>(".photo-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [d1, d2] = divisions;
  const [f1, f2] = facilities;

  return (
    <div ref={containerRef}>
      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Academic Training  (left-dominant)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Desktop — 3-col: large left photo / spine / small right accent */}
        <div className="hidden min-h-[80vh] lg:grid lg:grid-cols-[55%_450px_1fr]">
          {/* Left gutter bg */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-[2]"
            style={{ width: gutterCalc, background: "#0A0A0A" }}
          />

          {/* Left photo — organic cutout, bleeds into spine */}
          <div className="relative z-[3] flex items-center justify-end pr-6">
            <div className="photo-reveal relative h-[65%] w-[85%] overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem]">
              <Image
                src={d1.photoLeft}
                alt="NIFS classroom lecture"
                fill
                sizes="35vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center spine text */}
          <div className="relative z-[3] flex items-center justify-center">
            <SpineCopy
              eyebrow={d1.eyebrow}
              title={d1.name}
              description={d1.description}
              ctaLabel={d1.ctaLabel}
              ctaHref={d1.ctaHref}
            />
          </div>

          {/* Right small accent photo — offset lower */}
          <div className="relative z-[3] flex items-end justify-start pl-6 pb-24">
            <div className="photo-reveal relative h-[45%] w-[80%] overflow-hidden rounded-2xl">
              <Image
                src={d1.photoRight}
                alt="Smart classroom"
                fill
                sizes="15vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet — stacked */}
        <div className="flex flex-col lg:hidden">
          <div className="relative h-[55svh] w-full">
            <Image
              src={d1.photoLeft}
              alt="NIFS classroom lecture"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
          </div>
          <MobileCard
            eyebrow={d1.eyebrow}
            title={d1.name}
            description={d1.description}
            ctaLabel={d1.ctaLabel}
            ctaHref={d1.ctaHref}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — Industrial Projects  (right-dominant, reversed)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="hidden min-h-[75vh] lg:grid lg:grid-cols-[1fr_450px_55%]">
          {/* Right gutter bg */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-[2]"
            style={{ width: gutterCalc, background: "#111111" }}
          />

          {/* Left small detail photo — offset high */}
          <div className="relative z-[3] flex items-start justify-end pr-6 pt-24">
            <div className="photo-reveal relative h-[45%] w-[80%] overflow-hidden rounded-2xl">
              <Image
                src={d2.photoRight}
                alt="Corporate training on-site"
                fill
                sizes="15vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center spine text */}
          <div className="relative z-[3] flex items-center justify-center">
            <SpineCopy
              eyebrow={d2.eyebrow}
              title={d2.name}
              description={d2.description}
              ctaLabel={d2.ctaLabel}
              ctaHref={d2.ctaHref}
            />
          </div>

          {/* Right photo — large, bleeds into spine from right */}
          <div className="relative z-[3] flex items-center justify-start pl-6">
            <div className="photo-reveal relative h-[65%] w-[85%] overflow-hidden rounded-[0.5rem_2rem_0.5rem_2rem]">
              <Image
                src={d2.photoLeft}
                alt="Industrial control room"
                fill
                sizes="35vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="flex flex-col lg:hidden">
          <div className="relative h-[55svh] w-full">
            <Image
              src={d2.photoLeft}
              alt="Industrial control room"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-transparent" />
          </div>
          <MobileCard
            eyebrow={d2.eyebrow}
            title={d2.name}
            description={d2.description}
            ctaLabel={d2.ctaLabel}
            ctaHref={d2.ctaHref}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — AC Classrooms & Smart Labs  (centered, asymmetric)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="hidden min-h-[65vh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-[2]"
            style={{ width: gutterCalc, background: "#0A0A0A" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-[2]"
            style={{ width: gutterCalc, background: "#0A0A0A" }}
          />

          {/* Left photo — normal position */}
          <div className="relative z-[3] flex items-center justify-end pr-8">
            <div className="photo-reveal relative h-[55%] w-[80%] overflow-hidden rounded-2xl">
              <Image
                src={f1.photoLeft}
                alt="Smart classroom"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center spine text */}
          <div className="relative z-[3] flex items-center justify-center">
            <SpineCopy
              eyebrow={f1.eyebrow}
              title={f1.name}
              description={f1.description}
            />
          </div>

          {/* Right photo — offset higher, creating asymmetry */}
          <div className="relative z-[3] flex items-start justify-start pl-8 pt-16">
            <div className="photo-reveal relative h-[50%] w-[75%] overflow-hidden rounded-[1.5rem_0.25rem_1.5rem_0.25rem]">
              <Image
                src={f1.photoRight}
                alt="Lecture hall"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="flex flex-col lg:hidden">
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
          <MobileCard
            eyebrow={f1.eyebrow}
            title={f1.name}
            description={f1.description}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — Conference & Training Halls  (left-dominant, tilted)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="hidden min-h-[65vh] lg:grid lg:grid-cols-[60%_450px_1fr]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-[2]"
            style={{ width: "calc(50% - 225px)", background: "#111111" }}
          />

          {/* Left photo — tilted cutout */}
          <div className="relative z-[3] flex items-center justify-end pr-4">
            <div className="photo-reveal relative h-[60%] w-[88%] overflow-hidden rounded-2xl -rotate-[1.5deg]">
              <Image
                src={f2.photoLeft}
                alt="Conference facility"
                fill
                sizes="35vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center spine text */}
          <div className="relative z-[3] flex items-center justify-center">
            <SpineCopy
              eyebrow={f2.eyebrow}
              title={f2.name}
              description={f2.description}
            />
          </div>

          {/* Right small inset photo */}
          <div className="relative z-[3] flex items-end justify-start pl-4 pb-20">
            <div className="photo-reveal relative h-[40%] w-[75%] overflow-hidden rounded-xl rotate-[1deg]">
              <Image
                src={f2.photoRight}
                alt="Industrial visit"
                fill
                sizes="12vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="flex flex-col lg:hidden">
          <div className="relative h-[50svh] w-full">
            <Image
              src={f2.photoLeft}
              alt="Conference facility"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-transparent" />
          </div>
          <MobileCard
            eyebrow={f2.eyebrow}
            title={f2.name}
            description={f2.description}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — Training Yard  (full-bleed drama, photos spill past
          spine on both sides)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="hidden min-h-[85vh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
          {/* Left photo — large, overlapping into spine */}
          <div className="relative z-[3] flex items-center justify-end">
            <div className="photo-reveal relative h-[75%] w-[95%] overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem] -mr-[60px]">
              <Image
                src={trainingYardSlide.photoLeft}
                alt="Training yard drill"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center spine text */}
          <div className="relative z-[3] flex items-center justify-center">
            <SpineCopy
              eyebrow={trainingYardSlide.eyebrow}
              title={trainingYardSlide.name}
              description={trainingYardSlide.description}
            />
          </div>

          {/* Right photo — large, overlapping into spine from right */}
          <div className="relative z-[3] flex items-center justify-start">
            <div className="photo-reveal relative h-[70%] w-[95%] overflow-hidden rounded-[0.5rem_2rem_0.5rem_2rem] -ml-[60px]">
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

        {/* Mobile / Tablet */}
        <div className="flex flex-col lg:hidden">
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
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — Proof: 45,000 Placed  (centered stat climax)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="hidden min-h-[90vh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-[2]"
            style={{ width: gutterCalc, background: "#0A0A0A" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-[2]"
            style={{ width: gutterCalc, background: "#0A0A0A" }}
          />

          {/* Left portrait — circular cutout, offset high */}
          <div className="relative z-[3] flex items-center justify-end pr-4">
            <div className="photo-reveal relative h-[55%] w-[65%] overflow-hidden rounded-full">
              <Image
                src={proofSlide.photoLeft}
                alt="Placement success — female graduate"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center spine — HUGE stat */}
          <div className="relative z-[3] flex items-center justify-center">
            <div className="spine-text-reveal flex flex-col items-center gap-3 px-8 text-center">
              <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
                {proofSlide.eyebrow}
              </span>
              <div className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.85] text-white italic">
                45,000
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
            <div className="photo-reveal relative h-[55%] w-[65%] overflow-hidden rounded-full mt-20">
              <Image
                src={proofSlide.photoRight}
                alt="Placement success — male graduate"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="flex flex-col lg:hidden">
          <div className="relative flex min-h-[70svh] items-center justify-center bg-[#0A0A0A]">
            {/* Background photos — faded behind stat */}
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

            <div className="spine-text-reveal relative z-10 flex flex-col items-center gap-3 px-5 text-center">
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
        </div>
      </section>
    </div>
  );
}
