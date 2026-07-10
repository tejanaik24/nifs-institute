"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const items = [
  {
    number: "01",
    title: "Practical Training Yard",
    body: "Real hazard simulations on actual equipment. 85% of curriculum is hands-on, not classroom theory.",
  },
  {
    number: "02",
    title: "Direct Placement Cell",
    body: "Dedicated team with direct recruiter relationships at Adani, L&T, GMR and 85+ other companies.",
  },
  {
    number: "03",
    title: "Industry Faculty Only",
    body: "Every trainer has minimum 10 years field experience. No academics teaching what they've never done.",
  },
  {
    number: "04",
    title: "Government Recognized",
    body: "NSDC + Skill India approved. Certificates valid across India, Gulf, and international markets.",
  },
  {
    number: "05",
    title: "85 Centers Nationwide",
    body: "Learn near home. Transfer between centers anytime. New centers opening every quarter.",
  },
];

export function WhyNIFS() {
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  return (
    <section className="overflow-x-hidden bg-[#0A0A0A] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 lg:grid-cols-[40%_60%] lg:gap-8 lg:px-6">
        <motion.div {...fadeUp}>
          <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
            The Difference
          </span>
          <h2 className="font-display mt-3 text-[clamp(2rem,3.5vw,3.8rem)] leading-[1.1] text-white italic">
            Any Institute
            <br />
            Gives A Certificate.
            <br />
            We Give You
            <br />A Career.
          </h2>
          <p className="mt-6 max-w-[320px] text-sm text-white/60">
            Since 2004, we&apos;ve built a single-minded reputation: get our
            students jobs. Not just certificates.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block min-h-12 py-3 text-xs font-medium tracking-[0.15em] text-primary uppercase transition-opacity hover:opacity-70"
          >
            Our Story →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
              className="flex gap-4 border-b border-[#1F1F1F] pb-4"
            >
              <span className="font-display min-w-[48px] text-[32px] leading-none text-primary italic opacity-40">
                {item.number}
              </span>
              <div>
                <div className="text-[13px] font-semibold tracking-[0.1em] text-white uppercase">
                  {item.title}
                </div>
                <p className="mt-1 text-[13px] leading-[1.6] text-white/60">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
