"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const gutterCalc = `calc(50% - ${450 / 2}px)`;

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
      {/* ── DESKTOP: 3-column mirrored spine layout ── */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_450px_1fr]">
        {/* Left gutter bg */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-[2]"
          style={{ width: gutterCalc, background: "var(--background)" }}
        />
        {/* Right gutter bg */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 z-[2]"
          style={{ width: gutterCalc, background: "var(--background)" }}
        />

        {/* ── LEFT — stats row + CTA ── */}
        <div className="relative z-[3] flex items-center justify-start pl-10 pr-6">
          <div className="max-w-[400px]">
            <div className="flex flex-col items-start gap-12">
              <CountUp target={86} label="Centers in India" />
              <CountUp target={24} label="States Covered" />
              <CountUp target={3} suffix="+" label="African Countries" />
            </div>

            <div className="mt-14">
              <Link
                href="/centers"
                className="inline-flex h-12 items-center justify-center border border-border px-7 text-[11px] font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-muted"
              >
                Find a Center Near You →
              </Link>
            </div>
          </div>
        </div>

        {/* ── CENTER SPINE — eyebrow only ── */}
        <div className="relative z-[3] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 px-8 text-center">
            <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
              Our Reach
            </span>
            <div className="h-px w-10 bg-white/30" />
          </div>
        </div>

        {/* ── RIGHT — headline + paragraph ── */}
        <div className="relative z-[3] flex items-center justify-end pr-10 pl-6">
          <div className="max-w-[380px]">
            <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
              Our Reach
            </span>

            <h2 className="font-display mt-4 max-w-[560px] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] italic text-foreground">
              Centers Across India
              <br />& Growing
            </h2>

            <p className="mt-5 max-w-[480px] text-[14px] leading-[1.8] text-muted-foreground">
              With a presence in 24 states and recently started operations in 3
              African countries, NIFS is one of India&apos;s most accessible
              safety training networks.
            </p>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="mx-auto max-w-5xl px-6 text-center lg:hidden lg:px-10">
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

        <div className="mt-14 flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-20">
          <CountUp target={86} label="Centers in India" />
          <CountUp target={24} label="States Covered" />
          <CountUp target={3} suffix="+" label="African Countries" />
        </div>

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
