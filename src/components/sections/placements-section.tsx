"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { recruiterLogos } from "@/lib/data/centers";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";
import { useCountUp, useInView } from "@/components/sections/scroll-reveal-hooks";

const roles = [
  "Fire Safety Officer",
  "Industrial Safety Supervisor",
  "HSE Manager",
  "Emergency Response Coordinator",
  "Risk Analyst",
];

const featuredRecruiters = ["Adani", "L&T", "ITC", "GMR", "MEIL", "Amazon"];

function FlagshipStat({ size = "large" }: { size?: "large" | "small" }) {
  const reduceMotion = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [value, done] = useCountUp(45000, inView, 1400);
  const displayValue = reduceMotion ? 45000 : value;
  const glowSize = size === "large" ? "320px" : "220px";
  const numberClass = size === "large" ? "text-6xl" : "text-4xl";

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center gap-2 text-center">
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width: glowSize,
          height: glowSize,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--nifs-orange) 55%, transparent) 0%, transparent 70%)",
        }}
      />
      <span className={`relative font-display italic text-white ${numberClass}`}>
        {displayValue.toLocaleString("en-IN")}
        {(done || reduceMotion) && "+"}
      </span>
      <span className="relative text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
        Candidates Placed
      </span>
    </div>
  );
}

function LogoMarquee() {
  const track = (
    <div className="flex w-max items-center whitespace-nowrap">
      {recruiterLogos.map((r) => (
        <div
          key={r.name}
          className="mx-3 flex h-16 w-32 shrink-0 items-center justify-center rounded-md bg-white p-3"
        >
          <div className="relative h-full w-full">
            <Image src={r.logo!} alt={r.name} fill className="object-contain" sizes="128px" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative z-[3] mt-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#111111] to-transparent lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#111111] to-transparent lg:w-32" />
      <div className="animate-marquee flex w-max">
        {track}
        {track}
      </div>
    </div>
  );
}

export function Placements() {
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  const remainingCount = recruiterLogos.length - featuredRecruiters.length;

  return (
    <section className="relative overflow-hidden py-6 lg:py-0">
      <SpineGutterBg color="#111111" />

      {/* ── DESKTOP: spine split ── */}
      <div className="hidden lg:block">
        <SpineSplit
          align="center"
          left={
            <motion.div {...fadeUp} className="text-white">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Career Outcomes
              </span>
              <h2 className="font-display mt-3 text-3xl italic leading-tight">
                Where our graduates work
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Our placement cell partners directly with recruiters across
                construction, EPC, manufacturing, and FMCG to place every
                graduating batch into real industrial safety roles.
              </p>
              <ul className="mt-5 space-y-1.5 text-sm text-white/80">
                {roles.map((role) => (
                  <li key={role} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {role}
                  </li>
                ))}
              </ul>
              <Link
                href="/placements"
                className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View All Placements →
              </Link>
            </motion.div>
          }
          center={
            <motion.div {...fadeUp}>
              <FlagshipStat />
            </motion.div>
          }
          right={
            <motion.div {...fadeUp}>
              <div className="grid grid-cols-3 gap-3">
                {recruiterLogos
                  .filter((r) => featuredRecruiters.includes(r.name))
                  .map((r) => (
                    <div
                      key={r.name}
                      className="flex h-16 items-center justify-center rounded-md border border-white/10 bg-white p-3"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={r.logo!}
                          alt={r.name}
                          fill
                          className="object-contain"
                          sizes="100px"
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <p className="mt-3 text-xs text-white/60">
                +{remainingCount} more recruiting partners
              </p>
            </motion.div>
          }
        />
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="relative z-[3] mx-auto max-w-5xl px-6 py-16 text-center text-white lg:hidden">
        <motion.div {...fadeUp}>
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Career Outcomes
          </span>
          <h2 className="font-display mt-3 text-2xl italic leading-tight">
            Where our graduates work
          </h2>
          <p className="mx-auto mt-4 max-w-[420px] text-sm leading-relaxed text-white/70">
            Our placement cell partners directly with recruiters across
            construction, EPC, manufacturing, and FMCG to place every
            graduating batch into real industrial safety roles.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mt-10">
          <FlagshipStat size="small" />
        </motion.div>

        <motion.ul {...fadeUp} className="mx-auto mt-8 flex max-w-[320px] flex-col gap-1.5 text-sm text-white/80">
          {roles.map((role) => (
            <li key={role} className="flex items-center justify-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
              {role}
            </li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp} className="mt-8 grid grid-cols-3 gap-3">
          {recruiterLogos
            .filter((r) => featuredRecruiters.includes(r.name))
            .map((r) => (
              <div
                key={r.name}
                className="flex h-16 items-center justify-center rounded-md border border-white/10 bg-white p-3"
              >
                <div className="relative h-full w-full">
                  <Image src={r.logo!} alt={r.name} fill className="object-contain" sizes="100px" />
                </div>
              </div>
            ))}
        </motion.div>
        <p className="mt-3 text-xs text-white/60">
          +{remainingCount} more recruiting partners
        </p>

        <Link
          href="/placements"
          className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View All Placements →
        </Link>
      </div>

      <LogoMarquee />
      <div className="relative z-[3] pb-10 lg:pb-16" />
    </section>
  );
}
