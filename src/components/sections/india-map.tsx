"use client";

import { motion } from "framer-motion";

// Approximate, illustrative positions within the map's own viewBox — not
// GPS-precise, just relatively correct (Delhi north, Mumbai west, Chennai
// southeast, Kolkata east, Nagpur central, etc.).
const cityDots = [
  { city: "Delhi", x: 165, y: 85 },
  { city: "Jamshedpur", x: 205, y: 150 },
  { city: "Kolkata", x: 215, y: 140 },
  { city: "Rourkela", x: 195, y: 175 },
  { city: "Bhubaneswar", x: 210, y: 185 },
  { city: "Visakhapatnam", x: 215, y: 215 },
  { city: "Kakinada", x: 205, y: 225 },
  { city: "Nagpur", x: 160, y: 190 },
  { city: "Hyderabad", x: 175, y: 225 },
  { city: "Warangal", x: 185, y: 215 },
  { city: "Guntur", x: 195, y: 245 },
  { city: "Chennai", x: 190, y: 285 },
  { city: "Tambaram", x: 185, y: 292 },
  { city: "Pondicherry", x: 185, y: 300 },
  { city: "Mumbai", x: 125, y: 210 },
];

// Hand-authored simplified silhouette — a decorative approximation of
// India's outline, not a traced/licensed map asset.
const INDIA_PATH =
  "M168,18 L200,30 L215,55 Q230,58 245,60 Q262,68 270,80 Q258,92 245,100 " +
  "L238,135 L225,170 L233,205 L222,240 L212,275 L195,310 Q183,335 175,355 " +
  "Q167,335 155,320 L145,280 L133,235 L120,195 Q100,183 85,175 Q95,160 110,150 " +
  "L100,105 L125,65 L168,18 Z";

export function IndiaMap() {
  return (
    <div className="mx-auto max-w-md">
      <svg viewBox="0 0 320 400" className="w-full" aria-hidden="true">
        <path
          d={INDIA_PATH}
          fill="var(--muted)"
          stroke="var(--border)"
          strokeWidth={1.5}
        />
        {cityDots.map((dot, i) => {
          const labelWidth = dot.city.length * 6 + 16;
          return (
            <g key={dot.city} className="group cursor-pointer">
              <circle
                cx={dot.x}
                cy={dot.y}
                r={6}
                fill="#CC0000"
                className="map-dot-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r={6}
                fill="#CC0000"
                stroke="white"
                strokeWidth={1.5}
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
              />
              <g className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <rect
                  x={dot.x - labelWidth / 2}
                  y={dot.y - 30}
                  width={labelWidth}
                  height={20}
                  rx={4}
                  fill="var(--foreground)"
                />
                <text
                  x={dot.x}
                  y={dot.y - 16}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={500}
                  fill="var(--background)"
                >
                  {dot.city}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
