"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Fill the Application Form" },
  { number: "02", title: "Attend Free Counselling Session" },
  { number: "03", title: "Confirm Enrolment & Begin Classes" },
];

export function HowToApply() {
  return (
    <section className="bg-background py-14 lg:py-28">
      <div data-path-target="true" className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
          Start your safety career in 3 steps
        </h2>

        <div className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div className="absolute top-6 left-0 right-0 hidden h-px bg-border sm:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center bg-background text-2xl font-semibold text-[#CC0000]">
                {step.number}
              </span>
              <p className="mt-4 text-sm font-medium text-foreground">
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/admissions"
          className="mt-14 inline-block bg-[#CC0000] px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
        >
          Apply Now →
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          Or call us: +91-9246-624-690
        </p>
      </div>
    </section>
  );
}
