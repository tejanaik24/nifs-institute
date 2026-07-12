"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const gutterCalc = `calc(50% - ${450 / 2}px)`;

export function AboutNifs() {
  const reduceMotion = useReducedMotion() ?? false;

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* ── DESKTOP: 3-column spine layout ── */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_450px_1fr]">
        {/* Left gutter bg */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-[2]"
          style={{ width: gutterCalc, background: "var(--background)" }}
        />
        {/* Right gutter bg */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 z-[2]"
          style={{ width: gutterCalc, background: "var(--background)" }}
        />

        {/* ── LEFT — headline + body copy ── */}
        <div className="relative z-[3] flex items-center justify-start pl-10 pr-6">
          <div className="max-w-[400px]">
            {/* Eyebrow */}
            <motion.div {...fadeUp}>
              <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                About NIFS
              </span>
            </motion.div>

            {/* Headline — deep muted red */}
            <motion.h2
              {...fadeUp}
              className="font-display mt-4 max-w-[640px] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] italic text-[#7A0F0C]"
            >
              20+ Years of Excellence
              <br />
              in Industrial Safety Education
            </motion.h2>

            {/* Body copy */}
            <motion.p
              {...fadeUp}
              className="mt-6 max-w-[360px] text-[14px] leading-[1.8] text-muted-foreground"
            >
              Since 2004, NIFS has been India&apos;s trusted pathway into
              industrial safety careers. As an{" "}
              <strong className="text-primary">
                approved training partner of the National Skill Development
                Corporation (NSDC)
              </strong>{" "}
              and a{" "}
              <strong className="text-primary">
                Skill India initiative (कौशल भारत–कुशल भारत)
              </strong>
              , we deliver government-recognized programs that lead directly to
              placements at India&apos;s top companies. Every program is{" "}
              <strong className="text-foreground">
                ISO 9001:2015 certified
              </strong>
              , ensuring consistent quality across all 86 centers.
            </motion.p>
          </div>
        </div>

        {/* ── CENTER SPINE — eyebrow only ── */}
        <div className="relative z-[3] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 px-8 text-center">
            <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
              About NIFS
            </span>
            <div className="h-px w-10 bg-white/30" />
          </div>
        </div>

        {/* ── RIGHT — logos + ISO badge ── */}
        <div className="relative z-[3] flex items-center justify-end pr-10 pl-6">
          <div className="max-w-[380px]">
            {/* Logo pair — NSDC + Skill India */}
            <motion.div
              {...fadeUp}
              className="flex flex-col items-center gap-8 sm:flex-row sm:gap-10"
            >
              {/* NSDC Logo */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-[120px] w-[200px]">
                  <Image
                    src="/images/logos/accreditations/nsdc.png"
                    alt="National Skill Development Corporation — NSDC Approved Training Partner"
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
                <span className="max-w-[200px] text-center text-[10px] leading-[1.5] text-muted-foreground">
                  Approved Training Partner of NSDC
                </span>
              </div>

              {/* Skill India Logo */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-[120px] w-[200px]">
                  <Image
                    src="/images/logos/accreditations/skill-india.png"
                    alt="Skill India — कौशल भारत–कुशल भारत partnership"
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
                <span className="max-w-[200px] text-center text-[10px] leading-[1.5] text-muted-foreground">
                  Skill India Certified Programs
                </span>
              </div>
            </motion.div>

            {/* ISO badge */}
            <motion.div
              {...fadeUp}
              className="mt-8 inline-flex items-center gap-2 border border-border px-5 py-2.5"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-[12px] font-medium tracking-wide text-foreground">
                ISO 9001:2015 Certified
              </span>
              <span className="text-[12px] text-muted-foreground">
                — SSB Institute of Higher Studies Educational Society
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="mx-auto max-w-5xl px-6 text-center lg:hidden lg:px-10">
        <motion.div {...fadeUp}>
          <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
            About NIFS
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp}
          className="font-display mx-auto mt-4 max-w-[640px] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] italic text-[#7A0F0C]"
        >
          20+ Years of Excellence
          <br />
          in Industrial Safety Education
        </motion.h2>

        <motion.p
          {...fadeUp}
          className="mx-auto mt-6 max-w-[560px] text-[14px] leading-[1.8] text-muted-foreground"
        >
          Since 2004, NIFS has been India&apos;s trusted pathway into
          industrial safety careers. As an{" "}
          <strong className="text-primary">
            approved training partner of the National Skill Development
            Corporation (NSDC)
          </strong>{" "}
          and a{" "}
          <strong className="text-primary">
            Skill India initiative (कौशल भारत–कुशल भारत)
          </strong>
          , we deliver government-recognized programs that lead directly to
          placements at India&apos;s top companies. Every program is{" "}
          <strong className="text-foreground">
            ISO 9001:2015 certified
          </strong>
          , ensuring consistent quality across all 86 centers.
        </motion.p>

        <motion.div
          {...fadeUp}
          className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-[150px] w-[280px]">
              <Image
                src="/images/logos/accreditations/nsdc.png"
                alt="National Skill Development Corporation — NSDC Approved Training Partner"
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <span className="max-w-[280px] text-[11px] leading-[1.5] text-muted-foreground">
              Approved Training Partner of NSDC
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative h-[150px] w-[280px]">
              <Image
                src="/images/logos/accreditations/skill-india.png"
                alt="Skill India — कौशल भारत–कुशल भारत partnership"
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <span className="max-w-[280px] text-[11px] leading-[1.5] text-muted-foreground">
              Skill India Certified Programs
            </span>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="mt-10 inline-flex items-center gap-2 border border-border px-5 py-2.5"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[12px] font-medium tracking-wide text-foreground">
            ISO 9001:2015 Certified
          </span>
          <span className="text-[12px] text-muted-foreground">
            — SSB Institute of Higher Studies Educational Society
          </span>
        </motion.div>
      </div>
    </section>
  );
}
