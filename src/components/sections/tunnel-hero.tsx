"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
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
          <span className="mb-4 text-[10px] font-medium tracking-[0.25em] text-white/70 uppercase">
            Est. 2004 — India&apos;s #1 Industrial Safety Institute
          </span>
          <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] leading-[0.95] text-white italic">
            Igniting
            <br />
            Careers
            <br />
            <span className="text-primary">In Safety</span>
          </h1>
          <p className="mt-4 max-w-sm text-[13px] leading-[1.7] text-white/75">
            20+ years of placing graduates at India&apos;s top industrial
            companies.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/courses"
              className="inline-flex h-11 items-center justify-center bg-primary px-6 text-[11px] font-medium tracking-widest text-primary-foreground uppercase"
            >
              Explore Courses →
            </Link>
            <Link
              href="/placements"
              className="inline-flex h-11 items-center justify-center border border-white/60 px-6 text-[11px] font-medium tracking-widest text-white uppercase"
            >
              See Placements
            </Link>
          </div>
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

function HeadlineOverlay({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion() ?? false;
  const headlineOpacity = useTransform(
    progress,
    [0, 1 / tunnelImages.length],
    [1, 0],
  );

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
            20+ years of placing graduates at India&apos;s top industrial
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
          20+ years of placing graduates at India&apos;s top industrial
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
