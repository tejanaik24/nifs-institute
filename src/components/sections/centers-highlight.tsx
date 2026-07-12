"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function CountUp({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!ref.current || reduceMotion) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          el.textContent =
            Math.round(obj.value).toLocaleString("en-IN") + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix, reduceMotion]);

  // Show final value immediately if reduced motion
  const displayValue = reduceMotion
    ? target.toLocaleString("en-IN") + suffix
    : "0" + suffix;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.85] italic text-primary"
      >
        {displayValue}
      </div>
      <span className="text-[12px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}

export function CentersHighlight() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
          Our Reach
        </span>

        <h2 className="font-display mx-auto mt-4 max-w-[560px] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] italic text-foreground">
          Centers Across India
          <br />& Growing
        </h2>

        <p className="mx-auto mt-5 max-w-[480px] text-[14px] leading-[1.8] text-muted-foreground">
          With a presence in 24 states and recently started operations in 3
          African countries, NIFS is one of India&apos;s most accessible
          safety training networks.
        </p>

        {/* Stats row */}
        <div className="mt-14 flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-20">
          <CountUp target={86} label="Centers in India" />
          <CountUp target={24} label="States Covered" />
          <CountUp
            target={3}
            suffix="+"
            label="African Countries"
          />
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link
            href="/centers"
            className="inline-flex h-12 items-center justify-center border border-border px-7 text-[11px] font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-muted"
          >
            Find a Center Near You →
          </Link>
        </div>
      </div>
    </section>
  );
}
