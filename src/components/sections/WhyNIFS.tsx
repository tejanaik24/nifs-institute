"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";
import { NifsCrest } from "@/components/nifs-crest";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    number: "01",
    title: "Practical Training Yard",
    body: "Real hazard simulations on actual equipment. 85% of curriculum is hands-on, not classroom theory.",
  },
  {
    number: "02",
    title: "Direct Placement Cell",
    body: "Dedicated team with direct recruiter relationships at Adani, L&T, GMR and 45,000+ placements across India.",
  },
  {
    number: "03",
    title: "Industry Faculty Only",
    body: "Every trainer has minimum 10 years field experience. No academics teaching what they've never done.",
  },
  {
    number: "04",
    title: "Government Recognized",
    body: "NSDC + Skill India approved. Certificates valid across India, Gulf, and international markets.",
  },
  {
    number: "05",
    title: "86 Centers Nationwide",
    body: "Learn near home. Transfer between centers anytime. New centers opening every quarter.",
  },
];

/** Crest + "Welcome to NIFS" + "Why Choose NIFS" — rendered on the red spine
 * (desktop) via SpineSplit's `center` slot, and again in the mobile-only
 * stacked block (mobile has no spine column). */
function SpineWelcome({
  size = "large",
  animated = false,
  className = "",
}: {
  size?: "large" | "small";
  animated?: boolean;
  className?: string;
}) {
  const crestSize = size === "large" ? "h-24 w-24" : "h-14 w-14";
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <div
          aria-hidden="true"
          className="spine-welcome-ring absolute rounded-full opacity-70"
          style={{
            width: size === "large" ? "128px" : "88px",
            height: size === "large" ? "128px" : "88px",
            background:
              "conic-gradient(from 0deg, var(--nifs-green), var(--nifs-orange), var(--primary), var(--nifs-green))",
            filter: "blur(6px)",
          }}
        />
        <div
          className={`relative rounded-full bg-white p-1.5 ${animated ? "spine-welcome-crest" : ""}`}
        >
          <NifsCrest className={crestSize} />
        </div>
      </div>
      <span
        className={`text-sm font-bold tracking-[0.2em] uppercase ${size === "large" ? "text-white" : "text-foreground"} ${animated ? "spine-welcome-eyebrow" : ""}`}
      >
        Welcome to NIFS
      </span>
      <span
        className={`font-display text-lg font-semibold italic sm:text-xl ${size === "large" ? "text-white" : "text-foreground"} ${animated ? "spine-welcome-why" : ""}`}
      >
        Why Choose NIFS
      </span>
    </div>
  );
}

export function WhyNIFS() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const crest = containerRef.current!.querySelector(".spine-welcome-crest");
      const eyebrow = containerRef.current!.querySelector(".spine-welcome-eyebrow");
      const why = containerRef.current!.querySelector(".spine-welcome-why");
      if (!crest || !eyebrow || !why) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top 20%",
            scrub: true,
          },
        })
        .from(crest, { opacity: 0, scale: 0.5, filter: "blur(10px)", duration: 0.4 })
        .from(
          eyebrow,
          { opacity: 0, y: 16, filter: "blur(6px)", duration: 0.3 },
          "-=0.15"
        )
        .from(
          why,
          { opacity: 0, y: 16, filter: "blur(6px)", duration: 0.3 },
          "-=0.15"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="relative overflow-x-hidden" ref={containerRef}>
      <SpineGutterBg color="var(--background)" />

      <SpineSplit
        left={
          <div>
            {/* Mobile-only: crest + Welcome to NIFS (no spine on mobile) */}
            <div className="mb-8 lg:hidden">
              <SpineWelcome size="small" />
            </div>

            <motion.div {...fadeUp}>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3.8rem)] leading-[1.1] text-foreground italic">
                Trained.
                <br />
                Placed.
                <br />
                Proven.
              </h2>
              <p className="mt-6 max-w-[320px] text-sm text-muted-foreground">
                Since 2004, NIFS has turned classroom training into real
                industrial safety careers — trusted by 45,000+ professionals
                and recruiters like Adani, L&amp;T and GMR. Here&apos;s why
                they chose us:
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block min-h-12 py-3 text-xs font-medium tracking-[0.15em] text-primary uppercase transition-opacity hover:opacity-70"
              >
                Our Story →
              </Link>
            </motion.div>
          </div>
        }
        center={<SpineWelcome size="large" animated />}
        right={
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.number}
                initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
                whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold tracking-wide text-foreground uppercase">
                    {item.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        }
      />
    </section>
  );
}
