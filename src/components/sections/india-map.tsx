"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Dot positions as a percentage of the map image's width/height. Calibrated
// by pixel-detecting four known landmarks in the actual generated image
// (Kashmir tip, Kanyakumari, the Kutch peninsula, and the Arunachal Pradesh
// tip) and mapping every city's real longitude/latitude onto that same
// linear scale — not eyeballed guesses.
const cityDots = [
  { city: "Delhi", x: 37.48, y: 25.78 },
  { city: "Jamshedpur", x: 55.64, y: 44.78 },
  { city: "Kolkata", x: 59.95, y: 45.53 },
  { city: "Rourkela", x: 52.95, y: 46.53 },
  { city: "Bhubaneswar", x: 54.89, y: 52.86 },
  { city: "Visakhapatnam", x: 49.68, y: 61.26 },
  { city: "Kakinada", x: 47.75, y: 63.51 },
  { city: "Nagpur", x: 41.44, y: 50.12 },
  { city: "Hyderabad", x: 40.24, y: 62.24 },
  { city: "Warangal", x: 42.45, y: 60.36 },
  { city: "Guntur", x: 44.13, y: 65.71 },
  { city: "Chennai", x: 43.8, y: 76.1 },
  { city: "Tambaram", x: 43.46, y: 76.6 },
  { city: "Pondicherry", x: 42.88, y: 79.77 },
  { city: "Mumbai", x: 29.04, y: 56.79 },
];

export function IndiaMap() {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-2xl">
      <Image
        src="/images/india-map.png"
        alt="Map of India"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 42rem"
      />
      {cityDots.map((dot, i) => {
        const labelWidth = dot.city.length * 6.5 + 16;
        return (
          <div
            key={dot.city}
            className="group absolute cursor-pointer"
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <span
                className="map-dot-pulse absolute inset-0 block h-3 w-3 rounded-full bg-[#CC0000]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <motion.span
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative block h-3 w-3 rounded-full border border-white bg-[#CC0000]"
              />
              <span
                className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-medium whitespace-nowrap text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ minWidth: labelWidth }}
              >
                {dot.city}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
