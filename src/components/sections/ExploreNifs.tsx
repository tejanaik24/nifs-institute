"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SPINE_WIDTH } from "@/components/SpineLayout";
import { divisions } from "@/lib/data/divisions";
import {
  facilities,
  trainingYardSlide,
  proofSlide,
} from "@/lib/data/facilities";

const chevronTexture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25'%3E%3Cpath d='M2 6l10.5 13L23 6' stroke='white' stroke-width='1.5' fill='none' stroke-opacity='0.15'/%3E%3C/svg%3E";

type Slide = {
  eyebrow: string;
  name: string;
  description: string;
  photoLeft: string;
  photoRight: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const allSlides: Slide[] = [
  ...divisions,
  ...facilities,
  trainingYardSlide,
  {
    ...proofSlide,
    name: proofSlide.headline,
  },
];

const gutterCalc = `calc(50% - ${SPINE_WIDTH / 2}px)`;

function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Go to ${direction === "left" ? "previous" : "next"} slide`}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {direction === "left" ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
}

function SlideCounter({ current, total }: { current: number; total: number }) {
  return (
    <span className="text-[11px] tracking-[0.2em] text-white/50 uppercase">
      {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  );
}

/** Single slide — the 3-column layout: left photo | center spine panel | right photo */
function CarouselSlide({
  slide,
  reduceMotion,
}: {
  slide: Slide;
  reduceMotion: boolean;
}) {
  const fade = reduceMotion
    ? { initial: false, animate: false }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  const slideDuration = reduceMotion ? 0 : 0.4;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.name}
        {...fade}
        transition={{ duration: slideDuration }}
        className="relative grid min-h-[600px] w-full grid-cols-[1fr_450px_1fr] lg:min-h-[700px]"
      >
        {/* Left photo */}
        <div className="relative overflow-hidden">
          <Image
            src={slide.photoLeft}
            alt={slide.name}
            fill
            sizes="33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Center spine panel */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden px-8 text-center">
          <div
            className="absolute inset-0"
            style={{ background: "#DC1711" }}
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("${chevronTexture}")`,
              backgroundSize: "25px 25px",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
              {slide.eyebrow}
            </span>
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.0] text-white italic">
              {slide.name}
            </h3>
            <div className="h-px w-12 bg-white/40" />
            <p className="max-w-[300px] text-[13px] leading-[1.7] text-white/70">
              {slide.description}
            </p>
            {slide.ctaLabel && slide.ctaHref && (
              <Link
                href={slide.ctaHref}
                className="mt-2 inline-flex h-10 items-center border border-white/40 px-5 text-[10px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white/10"
              >
                {slide.ctaLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Right photo */}
        <div className="relative overflow-hidden">
          <Image
            src={slide.photoRight}
            alt={slide.name}
            fill
            sizes="33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Mobile slide — stacked layout: photo + text card overlay */
function MobileSlide({
  slide,
  reduceMotion,
}: {
  slide: Slide;
  reduceMotion: boolean;
}) {
  const fade = reduceMotion
    ? { initial: false, animate: false }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.name}
        {...fade}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        className="relative flex flex-col"
      >
        {/* Photo */}
        <div className="relative h-[50svh] w-full overflow-hidden">
          <Image
            src={slide.photoLeft}
            alt={slide.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Text card overlaying bottom of photo */}
        <div className="relative -mt-24 z-10 px-5 pb-8">
          <div className="mx-auto max-w-[400px] rounded-sm bg-primary p-6 text-center">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url("${chevronTexture}")`,
                backgroundSize: "25px 25px",
                backgroundRepeat: "repeat",
              }}
            />
            <span className="relative z-10 text-[10px] tracking-[0.3em] text-white/60 uppercase">
              {slide.eyebrow}
            </span>
            <h3 className="relative z-10 font-display mt-2 text-[1.75rem] leading-[1.0] text-white italic">
              {slide.name}
            </h3>
            <div className="relative z-10 mx-auto mt-3 h-px w-10 bg-white/40" />
            <p className="relative z-10 mt-3 text-[13px] leading-[1.7] text-white/70">
              {slide.description}
            </p>
            {slide.ctaLabel && slide.ctaHref && (
              <Link
                href={slide.ctaHref}
                className="relative z-10 mt-4 inline-flex h-10 items-center border border-white/40 px-5 text-[10px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white/10"
              >
                {slide.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ExploreNifs() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const total = allSlides.length;

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + total) % total);
  }, [total]);

  const slide = allSlides[current];

  return (
    <section className="relative overflow-hidden">
      {/* ── DESKTOP (>1024px) ── */}
      <div className="hidden lg:block">
        <CarouselSlide slide={slide} reduceMotion={reduceMotion} />

        {/* Navigation bar */}
        <div className="relative z-[3] flex items-center justify-center gap-6 py-8">
          <NavArrow direction="left" onClick={goPrev} disabled={false} />
          <SlideCounter current={current} total={total} />
          <NavArrow direction="right" onClick={goNext} disabled={false} />
        </div>
      </div>

      {/* ── TABLET (640–1023px) ── */}
      <div className="hidden sm:block lg:hidden">
        <div className="relative grid min-h-[500px] grid-cols-[40%_60%]">
          {/* Left: spine panel */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
            <div className="absolute inset-0" style={{ background: "#DC1711" }} />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url("${chevronTexture}")`,
                backgroundSize: "25px 25px",
                backgroundRepeat: "repeat",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
                {slide.eyebrow}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.0] text-white italic">
                {slide.name}
              </h3>
              <div className="h-px w-10 bg-white/40" />
              <p className="max-w-[240px] text-[12px] leading-[1.7] text-white/70">
                {slide.description}
              </p>
              {slide.ctaLabel && slide.ctaHref && (
                <Link
                  href={slide.ctaHref}
                  className="mt-2 inline-flex h-9 items-center border border-white/40 px-4 text-[10px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white/10"
                >
                  {slide.ctaLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Right: photo */}
          <div className="relative overflow-hidden">
            <Image
              src={slide.photoRight}
              alt={slide.name}
              fill
              sizes="60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 py-6">
          <NavArrow direction="left" onClick={goPrev} disabled={false} />
          <SlideCounter current={current} total={total} />
          <NavArrow direction="right" onClick={goNext} disabled={false} />
        </div>
      </div>

      {/* ── MOBILE (<640px) ── */}
      <div className="sm:hidden">
        <MobileSlide slide={slide} reduceMotion={reduceMotion} />
        <div className="flex items-center justify-center gap-6 py-6">
          <NavArrow direction="left" onClick={goPrev} disabled={false} />
          <SlideCounter current={current} total={total} />
          <NavArrow direction="right" onClick={goNext} disabled={false} />
        </div>
      </div>
    </section>
  );
}
