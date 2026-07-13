"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { centers } from "@/lib/data/centers";

type IndiaMapProps = {
  selectedCity: string | null;
  onSelect: (city: string) => void;
};

export function IndiaMap({ selectedCity, onSelect }: IndiaMapProps) {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-none">
      <Image
        src="/images/india-map-v2.png"
        alt="Map of India"
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 100vw, 44vw"
      />

      {/* Radar sweep — full-bleed, sits behind the dots */}
      <div
        aria-hidden="true"
        className="map-radar-sweep pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, color-mix(in oklch, var(--primary) 18%, transparent) 340deg, transparent 360deg)",
        }}
      />
      {/* Scan line — thin horizontal sweep top to bottom */}
      <div
        aria-hidden="true"
        className="map-scan-line pointer-events-none absolute inset-x-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklch, var(--primary) 45%, transparent), transparent)",
        }}
      />

      {centers.map((dot, i) => {
        const isSelected = dot.city === selectedCity;
        const labelWidth = dot.city.length * 6.5 + 16;
        const size = dot.isHQ ? "h-4 w-4" : "h-3 w-3";
        return (
          <button
            key={dot.city}
            type="button"
            onClick={() => onSelect(dot.city)}
            aria-pressed={isSelected}
            aria-label={dot.city}
            className="group absolute cursor-pointer"
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <span
                className={`map-dot-pulse absolute inset-0 block rounded-full bg-primary ${size}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              {isSelected && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className={`absolute inset-0 block rounded-full border-2 border-primary ${size}`}
                  style={{ boxShadow: "0 0 0 6px color-mix(in oklch, var(--primary) 20%, transparent)" }}
                />
              )}
              <motion.span
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`relative block rounded-full border-2 border-white shadow-sm ${size} ${
                  isSelected ? "bg-foreground" : "bg-primary"
                }`}
              />
              <span
                className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-medium whitespace-nowrap text-background transition-opacity duration-200 group-hover:opacity-100 ${
                  isSelected ? "opacity-100" : "opacity-0"
                }`}
                style={{ minWidth: labelWidth }}
              >
                {dot.isHQ ? `${dot.city} · HQ` : dot.city}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
