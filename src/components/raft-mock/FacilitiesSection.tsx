"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type FacilityPanel = { title: string; image: string; alt: string };

const panels: FacilityPanel[] = [
  { title: "Smart Classrooms", image: "/images/courses-classroom.png", alt: "AC smart classroom with digital display and safety posters" },
  { title: "AC Lecture Theatre", image: "/images/classroom-lecture.jpg", alt: "Tiered lecture theatre with large touchscreen display" },
  { title: "Practical Training Yard", image: "/images/training-yard-drill.jpg", alt: "Trainees running a rope-rescue drill at the practical training yard" },
  { title: "Fire Hazard Drill", image: "/images/training-drill.png", alt: "Students conducting a live fire hazard identification drill" },
  { title: "Hostel Accommodation", image: "/images/hostel-facility.jpg", alt: "NIFS hostel room for out-of-town students" },
  { title: "Industry Site Visits", image: "/images/gallery-industrial-visit.jpg", alt: "Students on an industrial site visit at a solar power plant" },
];

function AccordionPanel({ panel, isActive, onActivate }: { panel: FacilityPanel; isActive: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={isActive}
      className={`group relative h-[420px] min-w-[48px] overflow-hidden rounded-xl transition-[flex-grow] duration-700 ease-in-out ${
        isActive ? "flex-[3]" : "flex-1"
      }`}
    >
      <Image src={panel.image} alt={panel.alt} fill sizes="280px" className="object-cover" />
      <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? "opacity-20" : "opacity-50"}`} />
      <span
        className={`absolute font-semibold text-sm text-white transition-all duration-300 ${
          isActive ? "bottom-5 left-1/2 -translate-x-1/2 rotate-0 text-center" : "bottom-16 left-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap"
        }`}
      >
        {panel.title}
      </span>
    </button>
  );
}

export function FacilitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
            Our Campus
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            State-of-the-art training infrastructure
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 hidden gap-3 lg:flex"
        >
          {panels.map((panel, i) => (
            <AccordionPanel
              key={panel.title}
              panel={panel}
              isActive={i === activeIndex}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:hidden">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image src={panel.image} alt={panel.alt} fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{panel.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
