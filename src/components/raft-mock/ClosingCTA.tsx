"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Download, Phone } from "lucide-react";

const cards = [
  { icon: FileText, title: "Apply Online", sub: "5-minute application", cta: "Apply Now →", href: "/admissions", variant: "filled" as const },
  { icon: Download, title: "Download Brochure", sub: "Full course details & fees", cta: "Download →", href: "/admissions", variant: "outline" as const },
  { icon: Phone, title: "Talk To Counsellor", sub: "Free 15-minute call", cta: "Call Now →", href: "/contact", variant: "outline" as const },
];

export function ClosingCTA() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-primary px-8 py-14 text-center lg:px-16"
        >
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-white uppercase">
            Admissions Open — 2026 Batch
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white lg:text-5xl">
            Your Safety Career Starts Here.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/80">
            Diploma, PG Diploma, Degree and International courses in Fire &amp;
            Industrial Safety. Education loans and scholarships available.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl bg-white p-6 text-center"
              >
                <c.icon className="mx-auto h-6 w-6 text-primary" />
                <div className="mt-3 text-sm font-semibold text-foreground">{c.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>
                <Link
                  href={c.href}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  {c.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
