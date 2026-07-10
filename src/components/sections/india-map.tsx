"use client";

import { motion } from "framer-motion";

// Real lon/lat projected into this component's own viewBox using the same
// equidistant-conic-style projection as INDIA_PATH below (equirectangular
// with a standard parallel at India's mean latitude, so east-west
// distances aren't stretched near the north the way a naive x=lon,y=lat
// projection would stretch them) — so dots line up precisely with the
// coastline rather than being eyeballed guesses.
const cityDots = [
  { city: "Delhi", x: 91.6, y: 75 },
  { city: "Jamshedpur", x: 185, y: 140.2 },
  { city: "Kolkata", x: 207.2, y: 142.8 },
  { city: "Rourkela", x: 171.2, y: 146.2 },
  { city: "Bhubaneswar", x: 181.2, y: 167.9 },
  { city: "Visakhapatnam", x: 154.4, y: 196.8 },
  { city: "Kakinada", x: 144.4, y: 204.5 },
  { city: "Nagpur", x: 112, y: 158.5 },
  { city: "Hyderabad", x: 105.8, y: 200.1 },
  { city: "Warangal", x: 117.2, y: 193.7 },
  { city: "Guntur", x: 125.8, y: 212 },
  { city: "Chennai", x: 124.1, y: 247.6 },
  { city: "Tambaram", x: 122.4, y: 249.4 },
  { city: "Pondicherry", x: 119.4, y: 260.3 },
  { city: "Mumbai", x: 48.3, y: 181.4 },
];

// India's mainland outline, derived from Natural Earth's 1:110m admin-0
// countries dataset (public domain — naturalearthdata.com/about/terms-of-use,
// "No permission is needed to use Natural Earth"), projected to this
// viewBox with a standard-parallel correction (see cityDots comment) and
// simplified. Not traced from any copyrighted/CC-licensed map.
const INDIA_PATH =
  "M299.23,79.92 L300,84.11 L296.4,86.13 L297.24,92.93 L289.91,90.94 L276.62,98.57 L276.93,104.9 L271.27,114.16 L270.75,119.55 L266.17,128.66 L258.15,126.14 L257.75,137.58 L255.43,141.34 L256.51,146.03 L251.45,148.65 L246.04,131.13 L243.21,131.16 L241.53,138.22 L235.91,132.5 L239.08,126.21 L243.67,125.57 L248.41,116.22 L242.49,114.33 L232.97,114.49 L223.2,112.98 L222.29,105.3 L217.39,104.75 L209.26,99.98 L205.64,107.47 L213.05,113.32 L206.63,117.44 L204.35,121.47 L210.67,124.43 L208.92,131.09 L212.48,139.4 L214.08,148.49 L212.61,152.53 L205.62,152.39 L192.97,154.68 L193.56,163 L188.08,169.53 L173.31,176.97 L161.82,189.97 L154.1,196.94 L143.87,204.18 L143.86,209.26 L138.74,211.98 L129.49,215.94 L124.7,216.52 L121.62,224.95 L123.76,239.33 L124.3,248.49 L119.95,258.99 L119.91,277.76 L114.6,278.3 L109.92,286.73 L113.05,290.37 L103.69,293.5 L100.23,301.02 L96.11,304.19 L86.39,293.87 L81.64,278.4 L77.7,267.25 L74.11,262.03 L68.65,251.41 L66.11,237.59 L64.33,230.69 L54.99,215.51 L50.74,194.1 L47.67,179.96 L47.71,166.57 L45.72,156.23 L30.78,162.84 L23.55,161.52 L10.14,148.12 L15.07,144.13 L12.04,139.79 L0,130.41 L6.84,123.04 L29.43,123.07 L27.39,113.58 L21.62,107.98 L20.45,99.47 L13.73,94.51 L25.04,82.93 L36.96,83.77 L47.7,72.18 L54.14,60.97 L64.1,49.88 L63.94,42.01 L72.7,35.61 L64.41,30.16 L60.85,22.68 L57.21,13 L62.24,8.23 L77.81,10.93 L89.25,9.29 L99.17,0 L110.2,12.95 L109.16,21.97 L113.24,27.62 L112.91,33.26 L105.54,31.78 L108.42,43.96 L118.5,50.96 L132.77,58.68 L126.26,63.69 L122.27,74.03 L132.22,78.21 L141.89,83.63 L155.28,89.83 L169.35,91.26 L175.27,96.88 L183.2,97.94 L195.55,100.51 L204.1,100.33 L205.28,95.95 L203.93,88.93 L204.72,84.17 L210.98,81.85 L211.84,90.55 L212.06,92.77 L221.39,96.96 L227.85,95.23 L236.51,95.97 L244.89,95.65 L245.61,88.86 L241.43,85.33 L249.71,83.95 L259.05,75.73 L270.88,68.69 L279.49,71.41 L286.81,66.76 L291.62,73.63 L288.16,78.27 L299.23,79.92 Z";

export function IndiaMap() {
  return (
    <div className="mx-auto max-w-md">
      <svg viewBox="-6 -6 312 316" className="w-full" aria-hidden="true">
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
                r={5}
                fill="#CC0000"
                className="map-dot-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r={5}
                fill="#CC0000"
                stroke="white"
                strokeWidth={1.25}
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
              />
              <g className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <rect
                  x={dot.x - labelWidth / 2}
                  y={dot.y - 26}
                  width={labelWidth}
                  height={18}
                  rx={4}
                  fill="var(--foreground)"
                />
                <text
                  x={dot.x}
                  y={dot.y - 13}
                  textAnchor="middle"
                  fontSize={10}
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
