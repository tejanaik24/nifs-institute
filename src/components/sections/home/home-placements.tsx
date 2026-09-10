"use client";

import { recentPlacements } from "@/lib/data/recent-placements";

const BORDER_COLORS = ["border-nifs-red", "border-nifs-green", "border-nifs-orange"];
const TEXT_COLORS = ["text-red-400", "text-emerald-400", "text-amber-400"];

const PLACEMENTS = recentPlacements.map((p, i) => ({
  img: p.photo,
  name: p.name,
  role: p.designation,
  company: p.company,
  color: BORDER_COLORS[i % BORDER_COLORS.length],
  text: TEXT_COLORS[i % TEXT_COLORS.length],
}));

const TRACK = [...PLACEMENTS, ...PLACEMENTS];

export default function HomePlacements() {
  return (
    <section className="w-full py-[80px] max-lg:py-[50px] bg-[#101010] flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-8 items-center">
        <h2 className="font-sans text-white text-[3.5vw] max-lg:text-[5vw] max-sm:text-[28px] font-black leading-none text-center break-words w-full">
          Our Students <span className="font-display italic">Placed In</span>
        </h2>

        <div
          className="home-placements-wrap overflow-hidden w-full relative"
          onTouchStart={(e) => e.currentTarget.classList.add("paused")}
          onTouchEnd={(e) => e.currentTarget.classList.remove("paused")}
        >
          <div className="home-placements-track flex gap-8" style={{ width: "max-content" }}>
            {TRACK.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="flex-shrink-0 w-[160px] flex flex-col items-center text-center"
              >
                <div
                  className={`w-[130px] h-[130px] rounded-full overflow-hidden border-2 ${p.color} shadow-lg flex-shrink-0 relative`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    decoding="async"
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-sans text-white text-[16px] font-bold mt-3 leading-tight">
                  {p.name}
                </h3>
                <p className="text-white/60 text-[12px] mt-0.5 leading-tight">
                  {p.role}
                </p>
                <p className={`text-[13px] font-bold ${p.text} mt-1`}>
                  {p.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
