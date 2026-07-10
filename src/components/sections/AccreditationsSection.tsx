"use client";

import { motion, useReducedMotion } from "framer-motion";
import { accreditations } from "@/lib/data/centers";

export function AccreditationsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-x-hidden bg-[#F8F8F8] py-16 lg:py-20">
      <div className="mx-auto max-w-[1000px] px-5 text-center lg:px-6">
        <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
          Recognized By
        </span>
        <h2 className="font-display mt-3 text-[clamp(1.8rem,3vw,3rem)] leading-[1.1] text-[#0A0A0A] italic">
          Approved By The Authorities
          <br />
          That Matter.
        </h2>

        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 lg:gap-8"
        >
          {accreditations.slice(0, 7).map((a) => (
            <div
              key={a.name}
              className="min-h-12 border border-[#E5E7EB] bg-white px-6 py-3 text-[13px] font-semibold text-[#0A0A0A] transition-colors hover:border-primary"
            >
              {a.name}
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 max-w-md border-t border-[#E5E7EB] pt-8">
          <p className="text-center text-[13px] text-[#9CA3AF]">
            Education loans available through leading Indian banks
          </p>
          <p className="mt-2 text-center text-[13px] text-[#9CA3AF]">
            Scholarships available for meritorious students
          </p>
        </div>
      </div>
    </section>
  );
}
