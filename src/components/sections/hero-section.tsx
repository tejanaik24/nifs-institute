"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SPINE_WIDTH } from "@/components/SpineLayout";

const gutterCalc = `calc(50% - ${SPINE_WIDTH / 2}px)`;

function ScrollIndicator() {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <div className="absolute top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col gap-2.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          animate={
            reduceMotion
              ? {}
              : { opacity: [0.2, 1, 0.2], y: [0, 6, 0] }
          }
          transition={
            reduceMotion
              ? {}
              : { duration: 1.5, repeat: Infinity, delay: i * 0.3 }
          }
          className="h-2 w-3 rotate-45 border-r border-b border-white/40"
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const fadeX = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -40 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.2 },
      };
  const fadeIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1, delay: 0.4 },
      };
  const scaleCenter = reduceMotion
    ? {}
    : {
        initial: { scaleY: 0.92, opacity: 0 },
        animate: { scaleY: 1, opacity: 1 },
        transition: { duration: 0.9, ease: "easeOut" as const },
      };

  return (
    <section
      data-path-target="true"
      className="relative w-full overflow-hidden"
    >
      {/* ── GUTTER BACKGROUNDS ── */}
      {/* Left gutter — dark background for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-[2] hidden bg-[#0A0A0A] lg:block"
        style={{ width: gutterCalc }}
      />
      {/* Right gutter — hero photo bleeding past spine */}
      <motion.div
        {...fadeIn}
        className="absolute inset-y-0 right-0 z-[2] hidden lg:block"
        style={{ width: gutterCalc }}
      >
        <Image
          src="/images/hero-professional.png"
          alt="NIFS graduate safety professional on an industrial site"
          fill
          priority
          sizes="55vw"
          className="object-cover object-[center_top]"
        />
        <Image
          src="/images/hero-aerial-bg.png"
          alt=""
          fill
          sizes="55vw"
          loading="lazy"
          aria-hidden="true"
          className="object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/30" />
      </motion.div>

      {/* Mobile / tablet backgrounds */}
      <div className="absolute inset-0 z-[2] bg-[#0A0A0A] lg:hidden" />

      {/* ── DESKTOP (>1024px) ── */}
      <div className="relative z-[3] hidden min-h-[100svh] lg:grid lg:grid-cols-[1fr_450px_1fr]">
        {/* Left column — text content */}
        <motion.div
          {...fadeX}
          className="flex flex-col p-10 pt-[120px]"
        >
          <div>
            <span className="text-primary text-[11px] font-medium tracking-[0.2em] uppercase">
              India&apos;s #1 Industrial Safety Institute
            </span>
            <div className="bg-primary mt-3 mb-5 h-0.5 w-10" />
            <h1 className="font-display text-[clamp(2rem,3.5vw,4rem)] leading-[0.95] text-white italic">
              Igniting
              <br />
              Careers
              <br />
              <span className="text-primary">In Safety</span>
            </h1>
            <p className="mt-4 max-w-[260px] text-sm leading-[1.7] text-white/60">
              20+ years of placing graduates at India&apos;s top industrial
              companies. NSDC approved. ISO certified.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/courses"
                className="inline-flex h-11 items-center justify-center bg-primary px-5 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                Explore Courses →
              </Link>
              <Link
                href="/placements"
                className="inline-flex h-11 items-center justify-center border border-white/70 px-5 text-[11px] font-medium tracking-widest text-white uppercase backdrop-blur transition-colors hover:bg-white/10"
              >
                See Placements
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Center column — spine shows through from SpineLayout */}
        <motion.div
          {...scaleCenter}
          className="relative flex flex-col items-center justify-center"
        >
          <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
            <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
              Est. 2004
            </span>
            <h2 className="font-display text-[clamp(3rem,5.5vw,6.5rem)] leading-[0.9] text-white italic">
              Igniting
              <br />
              Careers
              <br />
              In Safety
            </h2>
          </div>
          <div className="relative z-10 mt-8 flex flex-col items-center gap-3 px-8">
            <div className="h-px w-16 bg-white/40" />
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
              National Institute of Fire &amp; Safety
            </span>
          </div>
        </motion.div>

        {/* Right column — cutout photo bleeding past spine + scroll indicator */}
        <div className="relative overflow-visible">
          <motion.div
            {...fadeIn}
            className="absolute top-1/2 left-0 z-[4] h-[85%] w-[70%] -translate-y-1/2 overflow-visible"
            style={{ marginLeft: "-60px" }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                borderRadius: "2.5rem 0.75rem 2.5rem 1rem",
              }}
            >
              <Image
                src="/images/hero-professional.png"
                alt="NIFS graduate safety professional on an industrial site"
                fill
                priority
                sizes="30vw"
                className="object-cover object-[center_top]"
              />
              {/* Dark overlay at the left edge for text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
            </div>
          </motion.div>
          <ScrollIndicator />
        </div>
      </div>

      {/* ── TABLET (640–1023px) ── */}
      <div className="hidden min-h-[100svh] sm:grid sm:grid-cols-[45%_55%] lg:hidden">
        <div className="bg-primary relative flex flex-col items-center justify-center gap-8 overflow-hidden px-8 py-16 text-center">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 8l7.5 9L20 8' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E",
              backgroundSize: "25px 25px",
              backgroundRepeat: "repeat",
            }}
          />
          <h2 className="font-display relative z-10 text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-white italic">
            Igniting Careers In Safety.
          </h2>
          <div className="relative z-10 flex flex-col gap-3">
            <Link
              href="/courses"
              className="inline-flex h-11 items-center justify-center bg-white px-5 text-[11px] font-medium tracking-widest text-primary uppercase transition-opacity hover:opacity-90"
            >
              Explore Courses →
            </Link>
            <Link
              href="/placements"
              className="inline-flex h-11 items-center justify-center border border-white/70 px-5 text-[11px] font-medium tracking-widest text-white uppercase backdrop-blur transition-colors hover:bg-white/10"
            >
              See Placements
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/hero-professional.png"
            alt="NIFS graduate safety professional on an industrial site"
            fill
            priority
            sizes="55vw"
            className="object-cover object-[center_top]"
          />
          <Image
            src="/images/hero-aerial-bg.png"
            alt=""
            fill
            sizes="55vw"
            loading="lazy"
            aria-hidden="true"
            className="object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* ── MOBILE (<640px) ── */}
      <div className="flex flex-col sm:hidden">
        <div className="bg-primary relative flex min-h-[45svh] flex-col items-center justify-center gap-4 overflow-hidden px-5 py-12 text-center">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 8l7.5 9L20 8' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E",
              backgroundSize: "25px 25px",
              backgroundRepeat: "repeat",
            }}
          />
          <span className="relative z-10 text-[10px] tracking-[0.3em] text-white/60 uppercase">
            Est. 2004
          </span>
          <h2 className="font-display relative z-10 text-[clamp(2.5rem,8vw,3.5rem)] leading-[0.95] text-white italic">
            Igniting Careers In Safety.
          </h2>
          <p className="relative z-10 text-[13px] text-white/70">
            20+ years placing graduates at India&apos;s top industrial
            companies.
          </p>
          <div className="relative z-10 flex flex-col gap-3">
            <Link
              href="/courses"
              className="inline-flex h-11 items-center justify-center bg-white px-5 text-[11px] font-medium tracking-widest text-primary uppercase transition-opacity hover:opacity-90"
            >
              Explore Courses →
            </Link>
            <Link
              href="/placements"
              className="inline-flex h-11 items-center justify-center border border-white/70 px-5 text-[11px] font-medium tracking-widest text-white uppercase backdrop-blur transition-colors hover:bg-white/10"
            >
              See Placements
            </Link>
          </div>
        </div>
        <div className="relative h-[40svh] w-full">
          <Image
            src="/images/hero-professional.png"
            alt="NIFS graduate safety professional on an industrial site"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
    </section>
  );
}
