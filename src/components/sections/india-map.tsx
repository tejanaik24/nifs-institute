"use client";

import { motion } from "framer-motion";

// Real lon/lat projected into this component's own 300x283 viewBox using
// the same equirectangular projection as INDIA_PATH below, so dots line up
// precisely with the coastline (Mumbai on the west coast, Chennai/Tambaram/
// Pondicherry clustered in the southeast, etc.) rather than being
// eyeballed guesses.
const cityDots = [
  { city: "Delhi", x: 91.6, y: 69.7 },
  { city: "Jamshedpur", x: 185, y: 130.3 },
  { city: "Kolkata", x: 207.2, y: 132.6 },
  { city: "Rourkela", x: 171.2, y: 135.8 },
  { city: "Bhubaneswar", x: 181.2, y: 156 },
  { city: "Visakhapatnam", x: 154.4, y: 182.8 },
  { city: "Kakinada", x: 144.4, y: 190 },
  { city: "Nagpur", x: 112, y: 147.3 },
  { city: "Hyderabad", x: 105.8, y: 185.9 },
  { city: "Warangal", x: 117.2, y: 179.9 },
  { city: "Guntur", x: 125.8, y: 197 },
  { city: "Chennai", x: 124.1, y: 230 },
  { city: "Tambaram", x: 122.4, y: 231.7 },
  { city: "Pondicherry", x: 119.4, y: 241.8 },
  { city: "Mumbai", x: 48.3, y: 168.5 },
];

// India's mainland outline, derived from Natural Earth's 1:110m admin-0
// countries dataset (public domain — naturalearthdata.com/about/terms-of-use,
// "No permission is needed to use Natural Earth"), projected to this
// viewBox and simplified. Not traced from any copyrighted/CC-licensed map.
const INDIA_PATH =
  "M299.23,74.24 L300,78.13 L296.4,80.01 L297.24,86.33 L289.91,84.47 L276.62,91.57 L276.93,97.44 L271.27,106.05 L270.75,111.05 L266.17,119.52 L258.15,117.18 L257.75,127.8 L255.43,131.3 L256.51,135.66 L251.45,138.09 L246.04,121.81 L243.21,121.84 L241.53,128.4 L235.91,123.08 L239.08,117.24 L243.67,116.65 L248.41,107.96 L242.49,106.21 L232.97,106.36 L223.2,104.95 L222.29,97.81 L217.39,97.31 L209.26,92.87 L205.64,99.84 L213.05,105.27 L206.63,109.09 L204.35,112.83 L210.67,115.59 L208.92,121.77 L212.48,129.49 L214.08,137.94 L212.61,141.69 L205.62,141.56 L192.97,143.69 L193.56,151.41 L188.08,157.49 L173.31,164.4 L161.82,176.47 L154.1,182.95 L143.87,189.67 L143.86,194.39 L138.74,196.92 L129.49,200.6 L124.7,201.14 L121.62,208.97 L123.76,222.32 L124.3,230.83 L119.95,240.59 L119.91,258.03 L114.6,258.52 L109.92,266.35 L113.05,269.73 L103.69,272.64 L100.23,279.63 L96.11,282.58 L86.39,272.99 L81.64,258.62 L77.7,248.26 L74.11,243.41 L68.65,233.55 L66.11,220.71 L64.33,214.3 L54.99,200.2 L50.74,180.31 L47.67,167.17 L47.71,154.74 L45.72,145.12 L30.78,151.27 L23.55,150.04 L10.14,137.6 L15.07,133.89 L12.04,129.86 L0,121.15 L6.84,114.3 L29.43,114.32 L27.39,105.51 L21.62,100.31 L20.45,92.41 L13.73,87.8 L25.04,77.04 L36.96,77.82 L47.7,67.05 L54.14,56.64 L64.1,46.34 L63.94,39.02 L72.7,33.08 L64.41,28.01 L60.85,21.07 L57.21,12.07 L62.24,7.65 L77.81,10.15 L89.25,8.63 L99.17,0 L110.2,12.03 L109.16,20.4 L113.24,25.66 L112.91,30.9 L105.54,29.52 L108.42,40.83 L118.5,47.33 L132.77,54.51 L126.26,59.17 L122.27,68.77 L132.22,72.65 L141.89,77.69 L155.28,83.45 L169.35,84.78 L175.27,90 L183.2,90.98 L195.55,93.37 L204.1,93.2 L205.28,89.14 L203.93,82.61 L204.72,78.19 L210.98,76.03 L211.84,84.12 L212.06,86.17 L221.39,90.07 L227.85,88.47 L236.51,89.15 L244.89,88.85 L245.61,82.54 L241.43,79.27 L249.71,77.98 L259.05,70.35 L270.88,63.81 L279.49,66.33 L286.81,62.01 L291.62,68.4 L288.16,72.71 L299.23,74.24 Z";

export function IndiaMap() {
  return (
    <div className="mx-auto max-w-md">
      <svg viewBox="-6 -6 312 295" className="w-full" aria-hidden="true">
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
