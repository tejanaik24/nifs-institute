"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Download, Phone } from "lucide-react";
import { SpineSplit } from "@/components/sections/spine-helpers";
import { SPINE_WIDTH } from "@/components/SpineLayout";

const gutterWidth = `calc(50% - ${SPINE_WIDTH / 2}px)`;

const cards = [
  { icon: FileText, title: "Apply Online", sub: "5-minute application", cta: "APPLY NOW →", href: "/admissions", variant: "filled" as const },
  { icon: Download, title: "Download Brochure", sub: "Full course details & fees", cta: "DOWNLOAD →", href: "/admissions", variant: "outline-red" as const },
  { icon: Phone, title: "Talk To Counsellor", sub: "Free 15-minute call", cta: "CALL NOW →", href: "/contact", variant: "outline-white" as const },
];

export function AdmissionsCTA() {
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  return (
    <section className="relative overflow-x-hidden">
      {/* Background photo covers only the left/right gutters on desktop —
          the center 450px is left uncovered so the real continuous spine
          (rendered by the shared SpineLayout wrapper) shows through
          uninterrupted, instead of this section faking its own strip. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-0 hidden overflow-hidden lg:block"
        style={{ width: gutterWidth }}
      >
        <Image
          src="/images/admissions-cta-bg.png"
          alt=""
          fill
          loading="lazy"
          sizes="50vw"
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-0 hidden overflow-hidden lg:block"
        style={{ width: gutterWidth }}
      >
        <Image
          src="/images/admissions-cta-bg.png"
          alt=""
          fill
          loading="lazy"
          sizes="50vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      {/* Mobile: spine is hidden, so a single full-bleed background covers
          the whole section as before. */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="/images/admissions-cta-bg.png"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          aria-hidden="true"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <SpineSplit
        left={
          <div>
            <motion.span
              {...fadeUp}
              className="inline-block bg-primary px-4 py-2 text-xs tracking-[0.15em] text-white uppercase"
            >
              Admissions Open — 2026 Batch
            </motion.span>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="font-display mt-6 text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-white italic"
            >
              Your Safety Career
              <br />
              Starts Here.
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="mt-4 max-w-[440px] text-[15px] text-white/60"
            >
              Diploma, PG Diploma, Degree and International courses in Fire
              &amp; Industrial Safety. Education loans and scholarships
              available.
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="mt-4 text-[13px] text-[#FCA5A5]"
            >
              ⚠ Limited seats available for August 2026 intake
            </motion.p>
          </div>
        }
        center={
          <span className="font-display text-[56px] leading-none text-white italic">
            2026
          </span>
        }
        right={
          <div className="grid grid-cols-1 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 * i }}
                className={
                  c.variant === "filled"
                    ? "bg-primary p-6 text-center"
                    : "border border-[#333] bg-[#1A1A1A] p-6 text-center"
                }
              >
                <c.icon
                  className={`mx-auto h-6 w-6 ${c.variant === "filled" ? "text-white" : "text-primary"}`}
                />
                <div className="mt-3 text-[13px] font-medium tracking-[0.1em] text-white uppercase">
                  {c.title}
                </div>
                <div className={`mt-1 text-xs ${c.variant === "filled" ? "text-white/70" : "text-white/60"}`}>
                  {c.sub}
                </div>
                <Link
                  href={c.href}
                  className={`mt-4 flex min-h-12 w-full items-center justify-center px-6 py-2 text-[11px] uppercase transition-colors ${
                    c.variant === "filled"
                      ? "bg-white text-primary hover:bg-white/90"
                      : c.variant === "outline-red"
                        ? "border border-primary text-primary hover:bg-primary hover:text-white"
                        : "border border-white text-white hover:bg-white hover:text-[#0A0A0A]"
                  }`}
                >
                  {c.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        }
      />
    </section>
  );
}
