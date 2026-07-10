"use client";

import { motion, useReducedMotion } from "framer-motion";
import { accreditations } from "@/lib/data/centers";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

export function AccreditationsSection() {
  const reduceMotion = useReducedMotion();
  const list = accreditations.slice(0, 7);
  const left = list.slice(0, 4);
  const right = list.slice(4);

  const badge = (name: string) => (
    <div
      key={name}
      className="min-h-12 border border-[#E5E7EB] bg-white px-6 py-3 text-center text-[13px] font-semibold text-[#0A0A0A] transition-colors hover:border-primary"
    >
      {name}
    </div>
  );

  return (
    <section className="relative overflow-x-hidden">
      <SpineGutterBg color="#F8F8F8" />

      <div className="relative z-[3] mx-auto max-w-[1600px] px-5 pt-16 text-center lg:px-0 lg:pt-20">
        <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
          Recognized By
        </span>
        <h2 className="font-display mt-3 text-[clamp(1.8rem,3vw,3rem)] leading-[1.1] text-[#0A0A0A] italic">
          Approved By The Authorities
          <br />
          That Matter.
        </h2>
      </div>

      <SpineSplit
        className="!py-8 lg:!py-10"
        left={
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2"
          >
            {left.map((a) => badge(a.name))}
          </motion.div>
        }
        right={
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {right.map((a) => badge(a.name))}
            </div>
            <div className="mt-8 border-t border-[#E5E7EB] pt-8">
              <p className="text-center text-[13px] text-[#9CA3AF] lg:text-left">
                Education loans available through leading Indian banks
              </p>
              <p className="mt-2 text-center text-[13px] text-[#9CA3AF] lg:text-left">
                Scholarships available for meritorious students
              </p>
            </div>
          </motion.div>
        }
      />
    </section>
  );
}
