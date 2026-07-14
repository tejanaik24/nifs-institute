"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const headlineWords = ["Igniting", "Careers", "In Safety"];

const statPills = [
  { value: "45,000+", label: "Alumni" },
  { value: "86", label: "Centers" },
  { value: "25", label: "Years" },
];

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

const wordChild = {
  hidden: { y: 80, opacity: 0, rotateX: -20 },
  visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

const subtitleVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
} as const;

const ctaVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 18, delay: 0.9 } },
};

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } },
} as const;

const pillChild = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

export function TunnelHero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src="/images/nifs-hero-campus.png"
          alt="NIFS campus building in Visakhapatnam"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.span
          className="mb-4 text-[11px] font-medium tracking-[0.25em] text-white/70 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Est. 2004 — India&apos;s #1 Industrial Safety Institute
        </motion.span>
        <motion.h1
          className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] text-white italic drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
          style={{ perspective: 1000 }}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              className={i === 2 ? "text-primary" : ""}
              variants={wordChild}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7] text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          25+ years of placing graduates at India&apos;s top industrial
          companies. NSDC approved. ISO certified. 86 centers across 24
          states.
        </motion.p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <motion.div variants={ctaVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400 } }}>
            <Link
              href="/courses"
              className="inline-flex h-12 items-center justify-center bg-primary px-7 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Explore Courses →
            </Link>
          </motion.div>
          <motion.div variants={ctaVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400 } }}>
            <Link
              href="/placements"
              className="inline-flex h-12 items-center justify-center border border-white/60 px-7 text-[11px] font-medium tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              See Placements
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 flex justify-center gap-4"
          variants={pillContainer}
          initial="hidden"
          animate="visible"
        >
          {statPills.map((pill) => (
            <motion.div
              key={pill.value}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-center backdrop-blur-sm"
              variants={pillChild}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(220,38,38,0.2)" }}
            >
              <div className="text-sm font-bold text-white">{pill.value}</div>
              <div className="text-[10px] text-white/60">{pill.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
