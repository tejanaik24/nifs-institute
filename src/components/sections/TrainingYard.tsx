"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Eye, HardHat, AlertTriangle } from "lucide-react";

const cards = [
  {
    icon: Shield,
    title: "Fire Suppression Drill Area",
    body: "Live fire suppression practice with real equipment",
  },
  {
    icon: Eye,
    title: "Hazard Identification Lab",
    body: "Controlled hazard scenarios for real recognition training",
  },
  {
    icon: HardHat,
    title: "PPE Equipment Room",
    body: "Full range of industry-standard protective equipment",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Response Zone",
    body: "Simulated industrial emergency scenarios",
  },
];

export function TrainingYard() {
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
    <section className="overflow-x-hidden bg-[#0A0A0A]">
      <div className="relative h-[300px] w-full lg:h-[500px]">
        <Image
          src="/images/training-yard-drill.jpg"
          alt="Trainees running a hazard drill at the practical training yard"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/80 uppercase">
            Practical Training
          </span>
          <h2 className="font-display mt-3 text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white italic">
            Where Theory
            <br />
            Meets Reality
          </h2>
        </div>
      </div>

      <div className="bg-[#111111] px-5 py-16 lg:px-6">
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-6 md:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
              className="text-center"
            >
              <c.icon className="mx-auto h-7 w-7 text-primary" />
              <div className="mt-3 text-xs font-medium tracking-[0.15em] text-white uppercase">
                {c.title}
              </div>
              <p className="mt-2 text-xs text-white/60">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center bg-primary px-8 py-3 text-xs font-medium tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#B91C1C]"
          >
            Book A Campus Visit →
          </Link>
        </div>
      </div>
    </section>
  );
}
