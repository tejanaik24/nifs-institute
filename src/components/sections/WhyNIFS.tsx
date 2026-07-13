"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";
import { NifsCrest } from "@/components/nifs-crest";

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

/** Types out `text` one character at a time once `start` becomes true.
 * Returns the currently-revealed substring and whether typing has finished. */
function useTypewriter(text: string, start: boolean, speed = 40) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setOutput("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [start, text, speed]);

  return [output, done] as const;
}

/** Crest + "Welcome to NIFS" + "Why Choose NIFS" — rendered on the red spine
 * (desktop) via SpineSplit's `center` slot, and again in the mobile-only
 * stacked block (mobile has no spine column). When `typing` is true, both
 * lines type themselves out in sequence instead of appearing all at once. */
function SpineWelcome({
  size = "large",
  typing = false,
  className = "",
}: {
  size?: "large" | "small";
  typing?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const crestSize = size === "large" ? "h-32 w-32" : "h-16 w-16";
  const ringSize = size === "large" ? "160px" : "96px";
  const dividerColor = size === "large" ? "bg-white/30" : "bg-foreground/20";
  const textColor = size === "large" ? "text-white" : "text-foreground";

  const [welcomeText, welcomeDone] = useTypewriter(
    "Welcome to NIFS",
    typing && !reduceMotion,
    40
  );
  const [whyText, whyDone] = useTypewriter(
    "Why Choose NIFS",
    typing && !reduceMotion && welcomeDone,
    45
  );

  const welcomeDisplay = reduceMotion ? "Welcome to NIFS" : welcomeText;
  const whyDisplay = reduceMotion ? "Why Choose NIFS" : whyText;
  const showFinal = reduceMotion || typing;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: showFinal ? 1 : 0, scale: showFinal ? 1 : 0.6 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center gap-4 text-center ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div
          aria-hidden="true"
          className="spine-welcome-ring absolute rounded-full opacity-70"
          style={{
            width: ringSize,
            height: ringSize,
            background:
              "conic-gradient(from 0deg, var(--nifs-green), var(--nifs-orange), var(--primary), var(--nifs-green))",
            filter: "blur(6px)",
          }}
        />
        <div className="relative rounded-full bg-white p-2">
          <NifsCrest className={crestSize} />
        </div>
      </div>
      <span className={`text-base font-bold tracking-[0.25em] uppercase ${textColor}`}>
        {welcomeDisplay}
        {!reduceMotion && typing && !welcomeDone && (
          <span className="animate-pulse">|</span>
        )}
      </span>
      <div className={`h-px w-10 ${dividerColor}`} />
      <span
        className={`font-display text-xl font-semibold italic sm:text-2xl ${textColor}`}
      >
        {whyDisplay}
        {!reduceMotion && typing && welcomeDone && !whyDone && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    </motion.div>
  );
}

export function WhyNIFS() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-x-hidden" ref={containerRef}>
      <SpineGutterBg color="var(--background)" />

      <SpineSplit
        align="start"
        left={
          <div>
            {/* Mobile-only: crest + Welcome to NIFS (no spine on mobile) */}
            <div className="mb-8 flex justify-center lg:hidden">
              <SpineWelcome size="small" typing={inView} />
            </div>

            <motion.div {...fadeUp} className="text-center">
              <h2 className="font-display text-[clamp(2rem,3.5vw,3.8rem)] leading-[1.1] text-foreground italic">
                Trained.
                <br />
                Placed.
                <br />
                Proven.
              </h2>
              <p className="mx-auto mt-6 max-w-[320px] text-sm text-muted-foreground">
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
        center={<SpineWelcome size="large" typing={inView} />}
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
