"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Briefcase, TrendingUp } from "lucide-react";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

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
    <section className="relative overflow-x-hidden">
      <SpineGutterBg color="#0A0A0A" />

      <SpineSplit
        left={
          <div>
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
              other institute. The same student mapping risk matrices in
              class is auditing a live plant floor within weeks — under real
              industry supervision.
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
        }
        center={
          <span className="font-display text-[64px] leading-none text-white italic">
            12
          </span>
        }
        right={
          <motion.div {...fadeUp(0.15)}>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/transform-after.png"
                alt="Confident NIFS graduate safety officer after completing the program"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute top-4 right-4 h-24 w-20 overflow-hidden border-2 border-white/80 shadow-lg sm:h-32 sm:w-24">
                <Image
                  src="/images/transform-before.png"
                  alt="Student before joining NIFS"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 30vw, 15vw"
                  className="object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 text-center text-[9px] font-medium tracking-widest text-white uppercase">
                  Before
                </span>
              </div>

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
        }
      />
    </section>
  );
}
