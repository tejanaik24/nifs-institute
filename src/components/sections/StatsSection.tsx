"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 20, suffix: "+", label: "Years Established" },
  { value: 85, suffix: "+", label: "Training Centers" },
  { value: 10000, suffix: "+", label: "Alumni Placed" },
  { value: 93, suffix: "%", label: "Placement Rate" },
];

function StatItem({
  value,
  suffix,
  label,
  index,
}: (typeof stats)[number] & { index: number }) {
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
      className={`flex flex-col items-center px-4 py-2 text-center ${
        index > 0 ? "sm:border-l sm:border-white/30" : ""
      }`}
    >
      <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-white italic">
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
    <section className="overflow-x-hidden bg-primary py-16 lg:py-20">
      <div className="mx-auto max-w-[900px] px-5">
        <div className="text-center text-[10px] font-medium tracking-[0.25em] text-white uppercase">
          NIFS By The Numbers
        </div>

        <div className="mt-12 grid grid-cols-2 gap-y-8 sm:flex sm:flex-row sm:justify-between sm:gap-y-0">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
