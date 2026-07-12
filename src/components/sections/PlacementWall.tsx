"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { recruiterLogos } from "@/lib/data/centers";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

const placements = [
  { name: "Rahul Sharma", course: "Adv. Diploma, 2023", company: "L&T", role: "Safety Officer", pkg: "₹4.2 LPA", photo: "/images/placement-male-1.png" },
  { name: "Priya Reddy", course: "PG DHSE, 2023", company: "GMR Group", role: "HSE Executive", pkg: "₹5.1 LPA", photo: "/images/placement-female.png" },
  { name: "Mohammed Irfan", course: "B.Sc Safety, 2022", company: "Adani", role: "Safety Inspector", pkg: "₹4.8 LPA", photo: "/images/placement-male-2.png" },
  { name: "Kavitha Rao", course: "Diploma, 2024", company: "ITC Limited", role: "Safety Officer", pkg: "₹3.6 LPA" },
  { name: "Suresh Kumar", course: "ADIS, 2022", company: "MEIL", role: "Senior Safety Officer", pkg: "₹6.2 LPA" },
  { name: "Anitha Devi", course: "PG DHSE, 2023", company: "Asian Paints", role: "EHS Executive", pkg: "₹5.4 LPA" },
];

function PlacementCard({ p, i }: { p: (typeof placements)[number]; i: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: (i % 3) * 0.1 }}
      className="border-t-[3px] border-primary bg-[#1A1A1A] p-5"
    >
      <div className="flex items-center gap-3">
        {p.photo && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={p.photo}
              alt={`${p.name}, NIFS graduate`}
              fill
              loading="lazy"
              sizes="40px"
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white">{p.name}</div>
          <div className="mt-1 text-[11px] text-white/50">{p.course}</div>
        </div>
      </div>
      <div className="my-3 h-px bg-[#333]" />
      <div className="text-[10px] font-medium tracking-[0.1em] text-white/50 uppercase">
        Now at:
      </div>
      <div className="mt-1 text-sm font-bold text-primary">{p.company}</div>
      <div className="mt-1 text-xs text-white">{p.role}</div>
      <div className="mt-1 text-[11px] text-white/50">{p.pkg}</div>
    </motion.div>
  );
}

export function PlacementWall() {
  const logoList = recruiterLogos.filter((r) => r.logo);
  const left = placements.slice(0, 3);
  const right = placements.slice(3);

  return (
    <section className="relative overflow-x-hidden">
      <SpineGutterBg color="#0A0A0A" />

      <div className="relative z-[3] mx-auto max-w-[1600px] px-5 pt-16 text-center lg:px-0 lg:pt-24">
        <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
          Placement Record
        </span>
        <h2 className="font-display mx-auto mt-3 max-w-[600px] text-[clamp(2rem,4vw,4rem)] leading-[1.1] text-white italic">
          45,000+ Lives Changed. Careers Built. Futures Secured.
        </h2>
        <p className="mx-auto mt-4 max-w-[500px] text-sm text-white/60">
          Our dedicated placement cell maintains direct relationships with
          India&apos;s top industrial employers — matching every graduating
          batch to real openings.
        </p>
      </div>

      <SpineSplit
        className="!py-8 lg:!pt-12 lg:!pb-16"
        left={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {left.map((p, i) => (
              <PlacementCard key={p.name} p={p} i={i} />
            ))}
          </div>
        }
        center={
          <span className="font-display text-[56px] leading-none text-white italic">
            45K+
          </span>
        }
        right={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {right.map((p, i) => (
              <PlacementCard key={p.name} p={p} i={i} />
            ))}
          </div>
        }
      />

      <div className="relative z-[3] mx-auto max-w-[1600px] overflow-hidden border-t border-white/10 px-5 pt-8 pb-16 lg:px-0 lg:pb-24">
        <div className="mb-4 text-center text-[10px] font-medium tracking-[0.2em] text-primary uppercase">
          45,000+ Graduates Placed
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent lg:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent lg:w-28" />
          <div className="placement-ticker flex w-max items-center gap-10 whitespace-nowrap">
            {[...logoList, ...logoList].map((r, i) => (
              <div
                key={`${r.name}-${i}`}
                className="flex h-8 w-20 shrink-0 items-center justify-center bg-white/95 px-2"
              >
                <Image
                  src={r.logo as string}
                  alt={r.name}
                  width={72}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes placementTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .placement-ticker {
          animation: placementTicker 30s linear infinite;
        }
        .placement-ticker:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .placement-ticker {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
