"use client";

import { motion, useReducedMotion } from "framer-motion";

const testimonials = [
  {
    quote:
      "NIFS didn't just give me a certificate — it gave me the confidence to walk into a plant and know what I'm doing. Within 3 months of graduating I was working at L&T.",
    name: "Mohammed Irfan",
    meta: "B.Sc Fire & Safety | Now at L&T, Hyderabad",
  },
  {
    quote:
      "I was a commerce graduate with no idea about industrial safety. The PG Diploma completely changed my career trajectory. The practical training yard was the real difference-maker.",
    name: "Priya Reddy",
    meta: "PG DHSE | Now at GMR Group, Hyderabad",
  },
  {
    quote:
      "The placement cell at NIFS is genuinely different. They don't just send your resume — they prepare you for interviews, follow up with companies, and actually care about where you land.",
    name: "Suresh Kumar",
    meta: "ADIS | Now at MEIL, Visakhapatnam",
  },
];

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-x-hidden bg-[#F8F8F8] py-16 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-6">
        <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
          Student Stories
        </span>
        <h2 className="font-display mt-3 text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] text-[#0A0A0A] italic">
          Hear It From
          <br />
          Those Who Made It.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
              className="border-b-4 border-primary bg-white p-8 shadow-sm"
            >
              <span className="font-display block leading-[0] text-[80px] text-primary opacity-20">
                &ldquo;
              </span>
              <p className="font-display mt-4 text-base leading-[1.7] text-[#0A0A0A] italic">
                {t.quote}
              </p>
              <div className="mt-6 mb-4 h-px bg-[#E5E7EB]" />
              <div className="text-[13px] font-bold text-[#0A0A0A]">
                {t.name}
              </div>
              <div className="mt-1 text-[11px] text-primary">{t.meta}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
