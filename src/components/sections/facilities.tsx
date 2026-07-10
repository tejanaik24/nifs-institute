"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const facilities = [
  {
    title: "Practical Training Yard",
    tagline: "Real hazards. Real drills. Real readiness.",
    image: "/images/training-yard-drill.jpg",
    alt: "Trainees running a hazard drill at the practical training yard",
  },
  {
    title: "Hostel Facility",
    tagline: "Stay focused. We have accommodation covered.",
    image: "/images/hostel-facility.jpg",
    alt: "NIFS hostel accommodation for out-of-town students",
  },
  {
    title: "Digital Classrooms",
    tagline: "Modern labs with simulation-based learning",
    image: null,
    alt: "Digital classroom with simulation-based learning setup",
  },
];

export function Facilities() {
  return (
    <section className="bg-background py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display max-w-2xl text-4xl italic leading-tight md:text-5xl">
          State-of-the-art training infrastructure
        </h2>

        <div className="mt-12 flex flex-col gap-16 lg:gap-24">
          {facilities.map((facility, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12",
                  reverse && "md:[&>*:first-child]:order-2"
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  {facility.image ? (
                    <Image
                      src={facility.image}
                      alt={facility.alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#CC0000]/90 text-center text-sm font-medium text-white">
                      {facility.alt}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-3xl italic leading-tight md:text-4xl">
                    {facility.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground">{facility.tagline}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
