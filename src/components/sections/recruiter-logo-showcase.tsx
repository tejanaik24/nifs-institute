"use client";

// Ported from IFESM's "Featured" section (scrolling logo marquee + a
// matter.js gravity-drop pile below it). See ifesm-website-repo for the
// original: src/components/UI/Featured/.
import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { GravityLogoPhysics } from "./gravity-logo-physics";

export type LogoItem = { name: string; logo: string };

function MarqueeRow({ logos }: { logos: LogoItem[] }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
      }}
    >
      <div className="animate-marquee flex w-max gap-5">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            aria-hidden={i >= logos.length}
            className="group flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-primary/50 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:scale-105 hover:border-primary hover:shadow-lg sm:h-28 sm:w-28"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.logo} alt={logo.name} className="h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GravityDrop({ logos }: { logos: LogoItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%", amount: 0.3 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="mt-5 flex flex-wrap justify-center gap-5">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-primary/50 bg-white p-4 shadow-sm sm:h-28 sm:w-28"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.logo} alt={logo.name} className="h-full w-full object-contain" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative mt-5 h-64 sm:h-80">
      {inView && (
        <GravityLogoPhysics
          images={logos.map((l) => ({ src: l.logo, alt: l.name }))}
          size={110}
        />
      )}
    </div>
  );
}

export function RecruiterLogoShowcase({ logos }: { logos: LogoItem[] }) {
  const half = Math.ceil(logos.length / 2);
  const scrollLogos = logos.slice(0, half);
  const dropLogos = logos.slice(half);

  return (
    <div className="w-full">
      <MarqueeRow logos={scrollLogos} />
      {dropLogos.length > 0 && <GravityDrop logos={dropLogos} />}
    </div>
  );
}
