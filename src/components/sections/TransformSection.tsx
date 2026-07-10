"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Briefcase, TrendingUp } from "lucide-react";

const outcomes = [
  {
    icon: Clock,
    title: "Certified In 6 Months",
    sub: "Government approved certificate",
  },
  {
    icon: Briefcase,
    title: "Placed In 90 Days",
    sub: "Post-graduation guarantee",
  },
  {
    icon: TrendingUp,
    title: "₹3L–₹12L CTC",
    sub: "Average salary range",
  },
];

export function TransformSection() {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.7, ease: "easeOut" as const, delay },
        };

  return (
    <section className="overflow-x-hidden bg-[#0A0A0A] py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="order-2 lg:order-1">
          <motion.span
            {...fadeUp()}
            className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase"
          >
            The NIFS Difference
          </motion.span>

          <motion.h2
            {...fadeUp(0.1)}
            className="font-display mt-3 text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] text-white italic"
          >
            From Classroom
            <br />
            To Plant Floor
            <br />
            In 12 Months.
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-[440px] text-[15px] leading-[1.8] text-white/60"
          >
            Our curriculum moves from theory to practice faster than any
            other institute. The same student mapping risk matrices in class
            is auditing a live plant floor within weeks — under real industry
            supervision.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
          >
            {outcomes.map((o) => (
              <div
                key={o.title}
                className="border-l-[3px] border-primary bg-[#1A1A1A] p-5"
              >
                <o.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-[11px] font-semibold tracking-[0.15em] text-white uppercase">
                  {o.title}
                </div>
                <div className="mt-1 text-xs text-white/60">{o.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.15)}
          className="order-1 lg:order-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/hero-industrial-site.jpg"
              alt="NIFS graduate conducting an industrial safety audit"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-0 left-0 max-w-[220px] bg-primary/95 p-6">
              <span className="font-display block text-[64px] leading-none text-white italic">
                12
              </span>
              <span className="mt-2 block text-xs text-white/80">
                months to your first
              </span>
              <span className="block text-sm font-bold text-white">
                safety officer role
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
