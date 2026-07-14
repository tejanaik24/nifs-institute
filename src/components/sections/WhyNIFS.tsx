"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";
import { NifsCrest } from "@/components/nifs-crest";
import { useTypewriter } from "@/components/sections/scroll-reveal-hooks";

const items = [
  {
    number: "01",
    title: "Practical Training Yard",
    body: "Real hazard simulations on actual equipment. 85% of curriculum is hands-on, not classroom theory.",
    icon: "/images/icons/training-yard.png",
  },
  {
    number: "02",
    title: "Direct Placement Cell",
    body: "Dedicated team with direct recruiter relationships at Adani, L&T, GMR and 45,000+ placements across India.",
    icon: "/images/icons/placement-cell.png",
  },
  {
    number: "03",
    title: "Industry Faculty Only",
    body: "Every trainer has minimum 10 years field experience. No academics teaching what they've never done.",
    icon: "/images/icons/faculty.png",
  },
  {
    number: "04",
    title: "Government Recognized",
    body: "NSDC + Skill India approved. Certificates valid across India, Gulf, and international markets.",
    icon: "/images/icons/government-recognized.png",
  },
  {
    number: "05",
    title: "86 Centers Nationwide",
    body: "Learn near home. Transfer between centers anytime. New centers opening every quarter.",
    icon: "/images/icons/centers-nationwide.png",
  },
];

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

            <div className="text-center">
              <motion.h2
                className="font-display text-[clamp(2rem,3.5vw,3.8rem)] leading-[1.1] text-foreground italic"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.span
                  className="mb-1 block overflow-hidden"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                  }}
                >
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: 60, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
                    }}
                  >
                    Trained.
                  </motion.span>
                </motion.span>
                <motion.span
                  className="mb-1 block overflow-hidden"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                  }}
                >
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: 60, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
                    }}
                  >
                    Placed.
                  </motion.span>
                </motion.span>
                <motion.span
                  className="block overflow-hidden"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                  }}
                >
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: 60, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
                    }}
                  >
                    Proven.
                  </motion.span>
                </motion.span>
              </motion.h2>
              <p className="mx-auto mt-6 max-w-[320px] text-sm text-muted-foreground">
                Since 2004, NIFS has turned classroom training into real
                industrial safety careers — trusted by 45,000+ professionals
                and recruiters like Adani, L&amp;T and GMR. Here&apos;s why
                they chose us:
              </p>

              <div className="mx-auto mt-4 max-w-[320px] rounded-lg border border-primary/20 bg-primary/5 px-4 py-3.5 text-left">
                <div className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-foreground uppercase">
                  In Technical Collaboration With
                </div>
                <ul className="space-y-1.5 text-xs leading-[1.5]">
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span className="font-bold text-blue-600">
                      Annamalai University
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                    <span className="font-bold text-indigo-600">
                      Acharya Nagarjuna University
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span className="font-bold text-blue-600">
                      State Board of Technical Education AP
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="font-bold text-primary">
                      Skill India | National Skill Development Corporation
                      (NSDC)
                    </span>
                  </li>
                </ul>
              </div>

              <Link
                href="/about"
                className="mt-8 inline-block min-h-12 py-3 text-xs font-medium tracking-[0.15em] text-primary uppercase transition-opacity hover:opacity-70"
              >
                Our Story →
              </Link>
            </div>
          </div>
        }
        center={<SpineWelcome size="large" typing={inView} />}
        right={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={item.number}
                initial={reduceMotion ? {} : { y: 50, opacity: 0 }}
                whileInView={reduceMotion ? {} : { y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={
                  reduceMotion
                    ? {}
                    : { type: "spring" as const, stiffness: 200, damping: 20, delay: i * 0.1 }
                }
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -8, transition: { type: "spring" as const, stiffness: 300 } }
                }
                className="group relative flex items-start gap-4 rounded-lg border border-transparent bg-card p-5 shadow-sm transition-[border-color,box-shadow] hover:border-[rgba(220,38,38,0.3)] hover:shadow-[0_24px_60px_rgba(220,38,38,0.12)]"
              >
                <div className="relative h-11 w-11 shrink-0">
                  {/* Red circle behind icon */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                  />
                  <motion.div
                    className="relative h-full w-full transition-transform"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-contain"
                    />
                  </motion.div>
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wide text-foreground uppercase transition-colors group-hover:text-red-600">
                    {item.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
                {/* Red accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-red-600"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        }
      />
    </section>
  );
}
