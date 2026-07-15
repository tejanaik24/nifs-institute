"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function StatStrip() {
  return (
    <section className="bg-muted/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-10 rounded-2xl border border-border bg-white p-8 lg:flex-row lg:justify-between lg:p-12"
        >
          <div className="text-center lg:text-left">
            <div className="text-5xl font-bold text-primary">25+</div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Years of Excellence in Industrial Safety Education — NSDC
              approved, Skill India certified, ISO 9001:2015.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-16 w-32">
                <Image
                  src="/images/logos/accreditations/nsdc.png"
                  alt="NSDC Approved Training Partner"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">NSDC Approved</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-16 w-32">
                <Image
                  src="/images/logos/accreditations/skill-india.png"
                  alt="Skill India Certified"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Skill India</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-foreground">ISO 9001:2015 Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
