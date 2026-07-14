"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ScrollImageTunnel } from "@/components/ui/scroll-image-tunnel";

const tunnelImages = [
  {
    src: "/images/nifs-hero-campus.png",
    alt: "NIFS campus building in Visakhapatnam",
    caption: "Our Campus in Visakhapatnam",
  },
  {
    src: "/images/nifs-hero-classroom.png",
    alt: "NIFS classroom, instructor teaching industrial safety fundamentals",
    caption: "Where Safety Careers Begin",
  },
  {
    src: "/images/nifs-hero-training-yard.png",
    alt: "Hands-on practical training at the NIFS training yard",
    caption: "Hands-On, Not Just Theory",
  },
  {
    src: "/images/nifs-hero-student-life.png",
    alt: "NIFS students between sessions",
    caption: "Life at NIFS",
  },
  {
    src: "/images/nifs-hero-graduation.png",
    alt: "NIFS graduation ceremony",
    caption: "Every Milestone, Celebrated",
  },
];

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

function FloatingOrb() {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(220,38,38,1) 0%, transparent 70%)",
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.18, 0.12] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Static stacked fallback for mobile — avoids excessive dead scroll */
function MobileHeroFallback() {
  return (
    <div className="relative lg:hidden">
      {/* Primary image — full bleed */}
      <div className="relative h-[100svh] w-full">
        <Image
          src={tunnelImages[0].src}
          alt={tunnelImages[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <motion.span
            className="mb-4 text-[10px] font-medium tracking-[0.25em] text-white/70 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Est. 2004 — India&apos;s #1 Industrial Safety Institute
          </motion.span>
          <motion.h1
            className="font-display text-[clamp(2.5rem,8vw,4rem)] leading-[0.95] text-white italic"
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
            className="mt-4 max-w-sm text-[13px] leading-[1.7] text-white/75"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            25+ years of placing graduates at India&apos;s top industrial
            companies.
          </motion.p>
          <div className="mt-6 flex flex-col gap-3">
            <motion.div variants={ctaVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400 } }}>
              <Link
                href="/courses"
                className="inline-flex h-11 items-center justify-center bg-primary px-6 text-[11px] font-medium tracking-widest text-primary-foreground uppercase"
              >
                Explore Courses →
              </Link>
            </motion.div>
            <motion.div variants={ctaVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400 } }}>
              <Link
                href="/placements"
                className="inline-flex h-11 items-center justify-center border border-white/60 px-6 text-[11px] font-medium tracking-widest text-white uppercase"
              >
                See Placements
              </Link>
            </motion.div>
          </div>
          {/* Mobile stat pills */}
          <motion.div
            className="mt-6 flex gap-3"
            variants={pillContainer}
            initial="hidden"
            animate="visible"
          >
            {statPills.map((pill) => (
              <motion.div
                key={pill.value}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center backdrop-blur-sm"
                variants={pillChild}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(220,38,38,0.2)" }}
              >
                <div className="text-xs font-bold text-white">{pill.value}</div>
                <div className="text-[10px] text-white/60">{pill.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Secondary image strip — 4 smaller frames in a row */}
      <div className="grid grid-cols-4 gap-1 bg-background p-1">
        {tunnelImages.slice(1).map((img) => (
          <div key={img.src} className="relative aspect-video overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CounterDisplay({ counterIndex }: { counterIndex: MotionValue<number> }) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(counterIndex, "change", (v) => setIdx(v));
  const display = String(idx + 1).padStart(2, "0");
  return (
    <motion.div
      className="pointer-events-auto absolute bottom-8 left-6 text-sm font-medium text-white/60"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 1.3 }}
    >
      <span className="text-white">{display}</span>
      <span className="ml-1">/05</span>
    </motion.div>
  );
}

function HeadlineOverlay({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion() ?? false;
  const headlineOpacity = useTransform(
    progress,
    [0, 1 / tunnelImages.length],
    [1, 0],
  );
  const counterIndex = useTransform(progress, (p) => {
    const idx = Math.min(Math.floor(p * tunnelImages.length), tunnelImages.length - 1);
    return idx;
  });

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center">
        <div className="pointer-events-auto">
          <span className="mb-4 inline-block text-[11px] font-medium tracking-[0.25em] text-white/70 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            Est. 2004 — India&apos;s #1 Industrial Safety Institute
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white italic drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            Igniting
            <br />
            Careers
            <br />
            <span className="text-primary">In Safety</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7] text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            25+ years of placing graduates at India&apos;s top industrial
            companies. NSDC approved. ISO certified. 86 centers across 24
            states.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/courses"
              className="inline-flex h-12 items-center justify-center bg-primary px-7 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Explore Courses →
            </Link>
            <Link
              href="/placements"
              className="inline-flex h-12 items-center justify-center border border-white/60 px-7 text-[11px] font-medium tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              See Placements
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{ opacity: headlineOpacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center"
    >
      <div className="pointer-events-auto relative">
        <FloatingOrb />
        <motion.span
          className="mb-4 inline-block text-[11px] font-medium tracking-[0.25em] text-white/70 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Est. 2004 — India&apos;s #1 Industrial Safety Institute
        </motion.span>
        <motion.h1
          className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white italic drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
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
        {/* Desktop stat pills */}
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
      {/* Image counter */}
      <CounterDisplay counterIndex={counterIndex} />
    </motion.div>
  );
}

export function TunnelHero() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Mobile: static stacked fallback — no dead scroll
  if (isMobile) {
    return <MobileHeroFallback />;
  }

  // Desktop: full scroll tunnel with headline overlaid on first image
  return (
    <div>
      <ScrollImageTunnel
        images={tunnelImages}
        hint=""
        stepHeight="180vh"
        className="tunnel-hero"
        overlay={(progress) => <HeadlineOverlay progress={progress} />}
      />
    </div>
  );
}
