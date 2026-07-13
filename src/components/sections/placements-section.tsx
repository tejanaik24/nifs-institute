"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { recruiterLogos } from "@/lib/data/centers";
import { StatBadge3D } from "@/components/three/StatBadge3D";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";
import { useCountUp, useInView } from "@/components/sections/scroll-reveal-hooks";

const roles = [
  "Fire Safety Officer",
  "Industrial Safety Supervisor",
  "HSE Manager",
  "Emergency Response Coordinator",
  "Risk Analyst",
];

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

/** Auto-scrolling recruiter logo wall — a 2-column grid that scrolls
 * vertically (loops seamlessly via a duplicated track), sized to fill a
 * tall spine column instead of squeezing into one horizontal strip. */
function LogoMarquee({ height = 420 }: { height?: number }) {
  const track = (
    <div className="grid grid-cols-2 gap-3">
      {recruiterLogos.map((r) => (
        <div
          key={r.name}
          className="flex h-16 w-full items-center justify-center rounded-md bg-white p-3"
        >
          <div className="relative h-full w-full">
            <Image src={r.logo!} alt={r.name} fill className="object-contain" sizes="128px" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="relative z-[3] overflow-hidden"
      style={{
        height,
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="animate-marquee-vertical flex flex-col gap-3">
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
              <div className="mt-5 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <Link
                href="/placements"
                className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View All Placements →
              </Link>

              <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-sm bg-white/5">
                <Image
                  src="/images/placement-graduate-worksite.png"
                  alt="NIFS graduate working as an industrial safety officer on-site"
                  fill
                  sizes="420px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          }
          center={
            <motion.div {...fadeUp} className="w-full max-w-[380px] h-[380px] flex items-center justify-center mx-auto">
              <StatBadge3D value="45,000+" label="Candidates Placed" />
            </motion.div>
          }
          right={
            <motion.div {...fadeUp} className="w-full">
              <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                Our Students Placed With
              </p>
              <div className="mt-4">
                <LogoMarquee height={480} />
              </div>
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
        </motion.div>

        <motion.div {...fadeUp} className="mt-10 w-full max-w-[380px] h-[380px] flex items-center justify-center mx-auto">
          <StatBadge3D value="45,000+" label="Candidates Placed" />
        </motion.div>

        <motion.div {...fadeUp} className="mx-auto mt-8 flex max-w-[340px] flex-wrap justify-center gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80"
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="mt-8">
          <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
            Our Students Placed With
          </p>
          <div className="mx-auto mt-4 max-w-[340px]">
            <LogoMarquee height={360} />
          </div>
        </motion.div>

        <Link
          href="/placements"
          className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View All Placements →
        </Link>

        <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-sm bg-white/5">
          <Image
            src="/images/placement-graduate-worksite.png"
            alt="NIFS graduate working as an industrial safety officer on-site"
            fill
            sizes="420px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative z-[3] pb-10 lg:pb-16" />
    </section>
  );
}
