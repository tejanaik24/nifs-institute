"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const statPills = [
  { value: "45,000+", label: "Alumni" },
  { value: "86", label: "Centers" },
  { value: "25", label: "Years" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function RaftHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase"
        >
          Est. 2004 — India&apos;s #1 Industrial Safety Institute
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-foreground"
        >
          {["Igniting", "Careers", "In", "Safety"].map((word) => (
            <motion.span
              key={word}
              variants={fadeUp}
              className={`mr-3 inline-block ${word === "Safety" ? "text-primary" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          25+ years of placing graduates at India&apos;s top industrial companies.
          NSDC approved. ISO certified. 86 centers across 24 states.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Courses
          </Link>
          <Link
            href="/placements"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border px-7 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            See Placements
          </Link>
        </motion.div>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-border shadow-2xl"
        >
          <motion.div style={{ y: imageY, scale: imageScale }} className="relative aspect-[16/9] w-full">
            <Image
              src="/images/nifs-hero-campus.png"
              alt="NIFS campus building in Visakhapatnam"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
          }}
          className="mt-10 flex justify-center gap-4"
        >
          {statPills.map((pill) => (
            <motion.div
              key={pill.value}
              variants={fadeUp}
              className="rounded-xl border border-border bg-white px-6 py-3 text-center shadow-sm"
            >
              <div className="text-lg font-bold text-foreground">{pill.value}</div>
              <div className="text-xs text-muted-foreground">{pill.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
