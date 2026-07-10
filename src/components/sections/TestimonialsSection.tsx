"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

const testimonials = [
  {
    quote:
      "NIFS didn't just give me a certificate — it gave me the confidence to walk into a plant and know what I'm doing. Within 3 months of graduating I was working at L&T.",
    name: "Mohammed Irfan",
    meta: "B.Sc Fire & Safety | Now at L&T, Hyderabad",
    photo: "/images/testimonial-male.png",
  },
  {
    quote:
      "I was a commerce graduate with no idea about industrial safety. The PG Diploma completely changed my career trajectory. The practical training yard was the real difference-maker.",
    name: "Priya Reddy",
    meta: "PG DHSE | Now at GMR Group, Hyderabad",
    photo: "/images/testimonial-female.png",
  },
  {
    quote:
      "The placement cell at NIFS is genuinely different. They don't just send your resume — they prepare you for interviews, follow up with companies, and actually care about where you land.",
    name: "Suresh Kumar",
    meta: "ADIS | Now at MEIL, Visakhapatnam",
  },
];

function TestimonialCard({ t, i }: { t: (typeof testimonials)[number]; i: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
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
      <div className="flex items-center gap-3">
        {t.photo && (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image
              src={t.photo}
              alt={`${t.name}, NIFS graduate`}
              fill
              loading="lazy"
              sizes="44px"
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="text-[13px] font-bold text-[#0A0A0A]">{t.name}</div>
          <div className="mt-1 text-[11px] text-primary">{t.meta}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-x-hidden">
      <SpineGutterBg color="#F8F8F8" />

      <div className="relative z-[3] mx-auto max-w-[1600px] px-5 pt-16 text-center lg:px-0 lg:pt-24">
        <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
          Student Stories
        </span>
        <h2 className="font-display mt-3 text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] text-[#0A0A0A] italic">
          Hear It From Those Who Made It.
        </h2>
      </div>

      <SpineSplit
        className="lg:!items-start"
        left={<TestimonialCard t={testimonials[0]} i={0} />}
        center={
          <span className="font-display text-[100px] leading-none text-primary italic opacity-30">
            &ldquo;
          </span>
        }
        right={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <TestimonialCard t={testimonials[1]} i={1} />
            <TestimonialCard t={testimonials[2]} i={2} />
          </div>
        }
      />
    </section>
  );
}
