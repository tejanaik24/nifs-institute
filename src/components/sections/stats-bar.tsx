"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 20, suffix: "+", label: "Years of Legacy" },
  { value: 85, suffix: "+", label: "Training Centers" },
  { value: 10000, suffix: "+", label: "Placed Graduates" },
  { value: 27, suffix: "+", label: "Recruiting Partners" },
];

function StatCounter({ value, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
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
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center px-6 py-8 text-center">
      <span className="font-display text-4xl italic text-primary md:text-5xl">
        {count.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function StatsBar() {
  return (
    <section data-path-target="true" className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border border-border md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
