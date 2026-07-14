"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { recruiterLogos } from "@/lib/data/centers";
import { StatBadge3D } from "@/components/three/StatBadge3D";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

const roles = [
  "Fire Safety Officer",
  "Industrial Safety Supervisor",
  "HSE Manager",
  "Emergency Response Coordinator",
  "Risk Analyst",
];

/** Auto-scrolling recruiter logo wall — a 3-column grid that scrolls
 * vertically (loops seamlessly via a duplicated track), sized to fill a
 * tall spine column instead of squeezing into one horizontal strip. */
function LogoMarquee({ height = 420 }: { height?: number }) {
  const track = (
    <div className="grid grid-cols-3 gap-3">
      {recruiterLogos.map((r) => (
        <div
          key={r.name}
          className="flex h-16 w-full items-center justify-center rounded-md border border-border bg-white p-3"
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
      <SpineGutterBg color="var(--background)" />

      {/* ── DESKTOP: spine split ── */}
      <div className="hidden lg:block">
        <SpineSplit
          align="start"
          left={
            <motion.div {...fadeUp} className="px-6 lg:pr-10 lg:pl-0">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Career Outcomes
              </span>
              <h2 className="font-display mt-3 text-3xl italic leading-tight text-[#7A0F0C]">
                Where our graduates work
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80"
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

              <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-sm bg-muted/40">
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
            <motion.div {...fadeUp} className="w-full px-6 lg:pr-0 lg:pl-10">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Our Students Placed With
              </p>
              <div className="mt-4">
                <LogoMarquee height={720} />
              </div>
            </motion.div>
          }
        />
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="relative z-[3] mx-auto max-w-5xl px-6 py-16 text-center lg:hidden">
        <motion.div {...fadeUp}>
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Career Outcomes
          </span>
          <h2 className="font-display mt-3 text-2xl italic leading-tight text-[#7A0F0C]">
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
              className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80"
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="mt-8">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
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

        <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-sm bg-muted/40">
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
