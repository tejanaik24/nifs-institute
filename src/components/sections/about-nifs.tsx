"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        {/* Eyebrow */}
        <motion.div {...fadeUp}>
          <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
            About NIFS
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp}
          className="font-display mx-auto mt-4 max-w-[640px] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] italic text-foreground"
        >
          20+ Years of Excellence
          <br />
          in Industrial Safety Education
        </motion.h2>

        {/* Body copy */}
        <motion.p
          {...fadeUp}
          className="mx-auto mt-6 max-w-[560px] text-[14px] leading-[1.8] text-muted-foreground"
        >
          Since 2004, NIFS has been India&apos;s trusted pathway into
          industrial safety careers. As an{" "}
          <strong className="text-foreground">
            approved training partner of the National Skill Development
            Corporation (NSDC)
          </strong>{" "}
          and a{" "}
          <strong className="text-foreground">
            Skill India initiative (कौशल भारत–कुशल भारत)
          </strong>
          , we deliver government-recognized programs that lead directly to
          placements at India&apos;s top companies. Every program is{" "}
          <strong className="text-foreground">
            ISO 9001:2015 certified
          </strong>
          , ensuring consistent quality across all 86 centers.
        </motion.p>

        {/* Logo pair — NSDC + Skill India with real visual weight */}
        <motion.div
          {...fadeUp}
          className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16"
        >
          {/* NSDC Logo */}
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

          {/* Skill India Logo */}
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

        {/* ISO badge */}
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
