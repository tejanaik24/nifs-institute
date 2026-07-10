"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SpineSplit } from "@/components/sections/spine-helpers";

const leftStats = [
  { value: 20, suffix: "+", label: "Years Established" },
  { value: 85, suffix: "+", label: "Training Centers" },
];
const rightStats = [
  { value: 10000, suffix: "+", label: "Alumni Placed" },
  { value: 93, suffix: "%", label: "Placement Rate" },
];

function StatItem({
  value,
  suffix,
  label,
  bordered,
}: {
  value: number;
  suffix: string;
  label: string;
  bordered?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const duration = 2000;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return (
    <div
      ref={ref}
      className={`flex flex-1 flex-col items-center px-4 py-2 text-center ${
        bordered ? "border-l border-white/30" : ""
      }`}
    >
      <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-white italic">
        {count.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span className="mt-2 text-[11px] font-medium tracking-[0.2em] text-white/70 uppercase">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-x-hidden bg-primary">
      <div className="text-center text-[10px] font-medium tracking-[0.25em] text-white uppercase">
        NIFS By The Numbers
      </div>

      <SpineSplit
        className="!py-8 lg:!py-12"
        left={
          <div className="flex gap-4 sm:gap-8">
            {leftStats.map((s, i) => (
              <StatItem key={s.label} {...s} bordered={i > 0} />
            ))}
          </div>
        }
        center={<div className="h-24 w-px bg-white/30" />}
        right={
          <div className="flex gap-4 sm:gap-8">
            {rightStats.map((s, i) => (
              <StatItem key={s.label} {...s} bordered={i > 0} />
            ))}
          </div>
        }
      />
    </section>
  );
}
