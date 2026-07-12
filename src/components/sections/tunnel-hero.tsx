"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollImageTunnel } from "@/components/ui/scroll-image-tunnel";

const tunnelImages = [
  {
    src: "/images/nifs-hero-campus.png",
    alt: "NIFS campus building in Visakhapatnam",
  },
  {
    src: "/images/nifs-hero-classroom.png",
    alt: "NIFS classroom, instructor teaching industrial safety fundamentals",
  },
  {
    src: "/images/nifs-hero-training-yard.png",
    alt: "Hands-on practical training at the NIFS training yard",
  },
  {
    src: "/images/nifs-hero-student-life.png",
    alt: "NIFS students between sessions",
  },
  {
    src: "/images/nifs-hero-graduation.png",
    alt: "NIFS graduation ceremony",
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

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" } as const,
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  // Desktop: full scroll tunnel, then headline/CTA as in-flow block
  return (
    <div>
      <ScrollImageTunnel
        images={tunnelImages}
        hint=""
        stepHeight="180vh"
        className="tunnel-hero"
      />

      {/* Headline + CTA — appears after the tunnel finishes */}
      <div className="bg-background px-5 py-24 text-center lg:py-32">
        <motion.span
          {...fadeUp}
          className="mb-4 inline-block text-[11px] font-medium tracking-[0.25em] text-muted-foreground uppercase"
        >
          Est. 2004 — India&apos;s #1 Industrial Safety Institute
        </motion.span>
        <motion.h1
          {...fadeUp}
          className="font-display mx-auto max-w-[640px] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] italic text-foreground"
        >
          Igniting
          <br />
          Careers
          <br />
          <span className="text-primary">In Safety</span>
        </motion.h1>
        <motion.p
          {...fadeUp}
          className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7] text-muted-foreground"
        >
          20+ years of placing graduates at India&apos;s top industrial
          companies. NSDC approved. ISO certified. 86 centers across 24
          states.
        </motion.p>
        <motion.div
          {...fadeUp}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center bg-primary px-7 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Explore Courses →
          </Link>
          <Link
            href="/placements"
            className="inline-flex h-12 items-center justify-center border border-border px-7 text-[11px] font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-muted"
          >
            See Placements
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
