"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Eye, HardHat, AlertTriangle } from "lucide-react";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";
import { SPINE_WIDTH } from "@/components/SpineLayout";

const chevronTexture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25'%3E%3Cpath d='M2 6l10.5 13L23 6' stroke='white' stroke-width='1.5' fill='none' stroke-opacity='0.15'/%3E%3C/svg%3E";

const cards = [
  { icon: Shield, title: "Fire Suppression Drill Area", body: "Live fire suppression practice with real equipment" },
  { icon: Eye, title: "Hazard Identification Lab", body: "Controlled hazard scenarios for real recognition training" },
  { icon: HardHat, title: "PPE Equipment Room", body: "Full range of industry-standard protective equipment", image: "/images/training-ppe.png" },
  { icon: AlertTriangle, title: "Emergency Response Zone", body: "Simulated industrial emergency scenarios", image: "/images/training-emergency.png" },
];

function FacilityCard({
  c,
  i,
  fadeUp,
}: {
  c: (typeof cards)[number];
  i: number;
  fadeUp: Record<string, unknown>;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
      className="text-center"
    >
      {c.image ? (
        <div className="relative mx-auto mb-3 aspect-square w-14 overflow-hidden rounded-full">
          <Image
            src={c.image}
            alt={c.title}
            fill
            loading="lazy"
            sizes="56px"
            className="object-cover"
          />
        </div>
      ) : (
        <c.icon className="mx-auto h-7 w-7 text-primary" />
      )}
      <div className="mt-3 text-xs font-medium tracking-[0.15em] text-white uppercase">
        {c.title}
      </div>
      <p className="mt-2 text-xs text-white/60">{c.body}</p>
    </motion.div>
  );
}

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
    <section className="relative overflow-x-hidden">
      {/* Full-bleed image — deliberately painted below the strip that follows,
          so the spine visually continues on top of it, per spec. */}
      <div className="relative h-[300px] w-full lg:h-[500px]">
        <Image
          src="/images/training-drill.png"
          alt="Trainees running a hazard drill at the practical training yard"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Local spine strip continuing over the image (image sits at z-0
            within this stacking context; this strip paints after it). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden lg:block"
          style={{
            width: `${SPINE_WIDTH}px`,
            transform: "translateX(-50%)",
            background: "#DC1711",
            backgroundImage: `url("${chevronTexture}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "25px 25px",
            opacity: 0.85,
          }}
        />

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

      <div className="relative">
        <SpineGutterBg color="#111111" />

        <SpineSplit
          className="!py-16 lg:!py-16"
          left={
            <div className="grid grid-cols-2 gap-6">
              {cards.slice(0, 2).map((c, i) => (
                <FacilityCard key={c.title} c={c} i={i} fadeUp={fadeUp} />
              ))}
            </div>
          }
          right={
            <div className="grid grid-cols-2 gap-6">
              {cards.slice(2).map((c, i) => (
                <FacilityCard key={c.title} c={c} i={i} fadeUp={fadeUp} />
              ))}
            </div>
          }
        />

        <div className="relative z-[3] mx-auto flex max-w-[1600px] justify-center px-5 pb-16 lg:px-0 lg:pb-16">
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
