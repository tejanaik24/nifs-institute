"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { accreditationLogos } from "@/lib/data/centers";

const stats = [
  { value: "85+", label: "Centers" },
  { value: "10K+", label: "Alumni" },
  { value: "27+", label: "Partners" },
];

const chevronPattern =
  "data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 8l7.5 9L20 8' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E";

function StatsRow({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className="flex flex-wrap gap-4 xl:gap-6">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={
            i > 0
              ? variant === "dark"
                ? "border-l border-white/15 pl-4 xl:pl-6"
                : "border-l border-border pl-4 xl:pl-6"
              : ""
          }
        >
          <div
            className={`font-display text-2xl italic ${variant === "dark" ? "text-white" : "text-foreground"}`}
          >
            {stat.value}
          </div>
          <div
            className={`text-[10px] tracking-widest uppercase ${variant === "dark" ? "text-white/50" : "text-muted-foreground"}`}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CtaButtons({ stacked = true }: { stacked?: boolean }) {
  return (
    <div className={`flex gap-3 ${stacked ? "flex-col" : "flex-wrap"}`}>
      <Link
        href="/courses"
        className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3.5 text-xs font-medium tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
      >
        Explore Courses →
      </Link>
      <Link
        href="/placements"
        className="inline-flex min-h-12 items-center justify-center border border-white/70 px-7 py-3.5 text-xs font-medium tracking-widest text-white uppercase backdrop-blur transition-colors hover:bg-white/10"
      >
        See Placements
      </Link>
    </div>
  );
}

function AccreditationRow() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {accreditationLogos
        .filter((a) => a.logo)
        .slice(0, 3)
        .map((a) => (
          <div
            key={a.name}
            className="flex h-9 w-20 items-center justify-center bg-white/95 px-2"
          >
            <Image
              src={a.logo as string}
              alt={a.name}
              width={64}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const fadeX = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -40 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.2 },
      };
  const scaleIn = reduceMotion
    ? {}
    : {
        initial: { scaleY: 0.92, opacity: 0 },
        animate: { scaleY: 1, opacity: 1 },
        transition: { duration: 0.9, ease: "easeOut" as const },
      };
  const fadeIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1, delay: 0.4 },
      };
  const statsIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.6 },
      };

  return (
    <section
      data-path-target="true"
      className="relative w-full overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background photo — bleeds from spine-center through the right edge */}
      <motion.div
        {...fadeIn}
        className="absolute inset-y-0 right-0 left-[45%] hidden lg:block"
      >
        <Image
          src="/images/hero-industrial-site.jpg"
          alt="NIFS industrial site inspection at golden hour"
          fill
          priority
          sizes="55vw"
          className="object-cover object-[center_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-black/20 to-black/30" />
      </motion.div>

      {/* ---------- DESKTOP (>1024px) ---------- */}
      <div className="relative z-10 hidden min-h-[100svh] grid-cols-[30%_40%_30%] lg:grid">
        <motion.div
          {...fadeX}
          className="flex flex-col p-8 pt-[160px] pl-[60px] xl:p-[60px] xl:pt-[160px]"
        >
          <div>
            <span className="text-primary text-[11px] font-medium tracking-[0.2em] uppercase">
              India&apos;s #1 Industrial Safety Institute
            </span>
            <div className="bg-primary mt-4 mb-8 h-0.5 w-10" />
            <h1 className="font-display text-[clamp(3rem,4vw,5rem)] leading-[0.95] text-white italic">
              Igniting
              <br />
              Careers
              <br />
              <span className="text-primary">In Safety</span>
            </h1>
            <p className="mt-6 max-w-[260px] text-sm leading-[1.7] text-white/60">
              20+ years of placing graduates at India&apos;s top industrial
              companies. NSDC approved. ISO certified.
            </p>
            <motion.div {...statsIn} className="mt-10">
              <StatsRow variant="dark" />
            </motion.div>
            <div className="mt-10">
              <CtaButtons />
            </div>
          </div>
          <div className="mt-auto pt-10">
            <AccreditationRow />
          </div>
        </motion.div>

        {/* Center spine */}
        <motion.div
          {...scaleIn}
          className="bg-primary relative flex flex-col items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("${chevronPattern}")`,
              backgroundSize: "25px 25px",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
            <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
              Est. 2004
            </span>
            <h2 className="font-display text-[clamp(4rem,7vw,8rem)] leading-[0.9] text-white italic">
              Trained
              <br />
              For the
              <br />
              Plant.
            </h2>
            <h3 className="font-display text-[clamp(2rem,4vw,4rem)] leading-[0.95] text-white/70 italic">
              Placed In
              <br />
              The Industry.
            </h3>
          </div>
          <div className="relative z-10 mt-16 flex flex-col items-center gap-3 px-8">
            <div className="h-px w-16 bg-white/40" />
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
              National Institute of Fire &amp; Safety
            </span>
          </div>
        </motion.div>

        {/* Right column — image lives in the absolute layer above; this holds the scroll indicator */}
        <div className="relative">
          <div className="absolute top-1/2 right-5 z-20 flex -translate-y-1/2 flex-col gap-2.5">
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
                    : {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }
                }
                className="h-2 w-3 rotate-45 border-r border-b border-white/40"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- TABLET (640–1023px) ---------- */}
      <div className="hidden min-h-[100svh] sm:grid sm:grid-cols-[45%_55%] lg:hidden">
        <div className="bg-primary relative flex flex-col items-center justify-center gap-8 overflow-hidden px-8 py-16 text-center">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("${chevronPattern}")`,
              backgroundSize: "25px 25px",
              backgroundRepeat: "repeat",
            }}
          />
          <h2 className="font-display relative z-10 text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-white italic">
            Trained For the Plant.
          </h2>
          <div className="relative z-10">
            <CtaButtons />
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/hero-industrial-site.jpg"
            alt="NIFS industrial site inspection at golden hour"
            fill
            priority
            sizes="55vw"
            className="object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 p-8">
            <StatsRow variant="dark" />
          </div>
        </div>
      </div>

      {/* ---------- MOBILE (<640px) ---------- */}
      <div className="flex flex-col sm:hidden">
        <div className="bg-primary relative flex min-h-[45svh] flex-col items-center justify-center gap-4 overflow-hidden px-5 py-12 text-center">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("${chevronPattern}")`,
              backgroundSize: "25px 25px",
              backgroundRepeat: "repeat",
            }}
          />
          <h2 className="font-display relative z-10 text-[clamp(2.5rem,8vw,3.5rem)] leading-[0.95] text-white italic">
            Trained for the Plant. Placed In the Industry.
          </h2>
          <p className="relative z-10 text-[13px] text-white/70">
            20+ years placing graduates at India&apos;s top industrial companies.
          </p>
        </div>
        <div className="relative h-[40svh] w-full">
          <Image
            src="/images/hero-industrial-site.jpg"
            alt="NIFS industrial site inspection at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="bg-[#0A0A0A] px-5 py-8">
          <StatsRow variant="dark" />
          <div className="mt-8">
            <CtaButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
