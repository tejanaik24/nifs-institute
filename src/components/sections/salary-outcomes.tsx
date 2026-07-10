"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const outcomes = [
  { role: "Safety Officer", range: "₹2.5L – ₹4L / year", tier: "Entry Level" },
  { role: "HSE Engineer", range: "₹4L – ₹7L / year", tier: "Mid Level" },
  { role: "Safety Manager", range: "₹8L – ₹18L / year", tier: "Senior Level" },
];

export function SalaryOutcomes() {
  return (
    <section className="bg-background py-14 lg:py-28">
      <div data-path-target="true" className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
          A certification that pays for itself — fast
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Our graduates are placed within weeks. Here&apos;s what they earn:
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {outcomes.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="border border-border bg-card px-6 py-10 text-center"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {item.tier}
              </span>
              <h3 className="font-display mt-3 text-2xl italic">{item.role}</h3>
              <p className="mt-4 text-2xl font-semibold text-[#CC0000]">
                {item.range}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/placements"
          className="mt-12 inline-block bg-[#CC0000] px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
        >
          See Placement Records →
        </Link>
      </div>
    </section>
  );
}
