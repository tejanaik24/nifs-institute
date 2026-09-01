"use client";

import { useState } from "react";

const STATES = [
  {
    name: "Andhra Pradesh",
    count: "7 Centers",
    details:
      "7 centers across Andhra Pradesh including Visakhapatnam HQ, Guntur, and Kakinada.",
    left: "44%",
    top: "67%",
    size: "h-4 w-4",
  },
  {
    name: "Telangana",
    count: "2 Centers",
    details: "2 centers in Telangana — Hyderabad and Warangal.",
    left: "33%",
    top: "65%",
    size: "h-3 w-3",
  },
  {
    name: "Tamil Nadu",
    count: "10 Centers",
    details: "10 centers in Tamil Nadu — Chennai, Tambaram, and more.",
    left: "37%",
    top: "81%",
    size: "h-4 w-4",
  },
  {
    name: "Odisha",
    count: "3 Centers",
    details: "3 centers in Odisha — Bhubaneswar, Rourkela, and more.",
    left: "55%",
    top: "52%",
    size: "h-3 w-3",
  },
  {
    name: "West Bengal",
    count: "3 Centers",
    details: "3 centers in West Bengal — Kolkata and regional hubs.",
    left: "64%",
    top: "47%",
    size: "h-3 w-3",
  },
  {
    name: "Maharashtra",
    count: "5 Centers",
    details: "5 centers in Maharashtra — Mumbai, Nagpur, and industrial hubs.",
    left: "23%",
    top: "56%",
    size: "h-3 w-3",
  },
  {
    name: "Gujarat",
    count: "6 Centers",
    details: "6 centers in Gujarat covering industrial corridors.",
    left: "15%",
    top: "45%",
    size: "h-3 w-3",
  },
  {
    name: "Uttar Pradesh",
    count: "7 Centers",
    details: "7 centers in UP covering Noida, Lucknow, and more.",
    left: "35%",
    top: "35%",
    size: "h-3 w-3",
  },
  {
    name: "Punjab & Haryana",
    count: "7 Centers",
    details: "7 centers across Punjab and Haryana including Chandigarh.",
    left: "25%",
    top: "22%",
    size: "h-3 w-3",
  },
  {
    name: "Delhi NCR",
    count: "4 Centers",
    details: "4 centers in the National Capital Region.",
    left: "28%",
    top: "27%",
    size: "h-3 w-3",
  },
  {
    name: "Rajasthan",
    count: "5 Centers",
    details: "5 centers in Rajasthan covering Jaipur and industrial zones.",
    left: "20%",
    top: "35%",
    size: "h-3 w-3",
  },
  {
    name: "Madhya Pradesh",
    count: "4 Centers",
    details: "4 centers in MP covering Bhopal and industrial corridors.",
    left: "32%",
    top: "45%",
    size: "h-3 w-3",
  },
  {
    name: "Karnataka",
    count: "4 Centers",
    details: "4 centers in Karnataka — Bangalore and regional hubs.",
    left: "28%",
    top: "72%",
    size: "h-3 w-3",
  },
  {
    name: "Kerala",
    count: "4 Centers",
    details: "4 centers in Kerala covering Kochi and coastal regions.",
    left: "27%",
    top: "82%",
    size: "h-3 w-3",
  },
  {
    name: "Bihar",
    count: "3 Centers",
    details: "3 centers in Bihar covering Patna and industrial zones.",
    left: "52%",
    top: "38%",
    size: "h-3 w-3",
  },
  {
    name: "Jharkhand",
    count: "3 Centers",
    details: "3 centers in Jharkhand — Jamshedpur and steel belt region.",
    left: "57%",
    top: "46%",
    size: "h-3 w-3",
  },
  {
    name: "Chhattisgarh",
    count: "2 Centers",
    details: "2 centers in Chhattisgarh covering Raipur.",
    left: "45%",
    top: "48%",
    size: "h-3 w-3",
  },
  {
    name: "Uttarakhand",
    count: "2 Centers",
    details: "2 centers in Uttarakhand covering Dehradun.",
    left: "32%",
    top: "22%",
    size: "h-3 w-3",
  },
  {
    name: "Himachal Pradesh",
    count: "2 Centers",
    details: "2 centers in Himachal Pradesh.",
    left: "28%",
    top: "18%",
    size: "h-3 w-3",
  },
  {
    name: "Assam",
    count: "1 Center",
    details: "1 center in Assam covering Northeast India.",
    left: "72%",
    top: "35%",
    size: "h-3 w-3",
  },
  {
    name: "Jammu & Kashmir",
    count: "1 Center",
    details: "1 center in J&K.",
    left: "25%",
    top: "10%",
    size: "h-3 w-3",
  },
  {
    name: "Goa",
    count: "1 Center",
    details: "1 center in Goa.",
    left: "22%",
    top: "73%",
    size: "h-3 w-3",
  },
];

const EXPLORE = [
  ["Andhra Pradesh", 7],
  ["Tamil Nadu", 10],
  ["Maharashtra", 5],
  ["Gujarat", 6],
  ["Uttar Pradesh", 7],
  ["Punjab & Haryana", 7],
  ["Delhi NCR", 4],
  ["Rajasthan", 5],
  ["Madhya Pradesh", 4],
  ["Karnataka", 4],
  ["Kerala", 4],
  ["West Bengal", 3],
  ["Bihar", 3],
  ["Jharkhand", 3],
  ["Telangana", 2],
  ["Odisha", 3],
  ["Chhattisgarh", 2],
  ["Uttarakhand", 2],
  ["Himachal Pradesh", 2],
  ["Assam", 1],
  ["J&K", 1],
  ["Goa", 1],
];

const STATS = [
  {
    icon: "🏢",
    bg: "bg-nifs-red/10",
    color: "text-nifs-red",
    value: "70+",
    label: "Centers",
  },
  {
    icon: "📍",
    bg: "bg-nifs-green/10",
    color: "text-nifs-green",
    value: "24",
    label: "States",
  },
  {
    icon: "🌍",
    bg: "bg-nifs-orange/10",
    color: "text-nifs-orange",
    value: "3+",
    label: "Countries",
  },
  {
    icon: "⭐",
    bg: "bg-nifs-red/10",
    color: "text-nifs-red",
    value: "HQ",
    label: "Vizag",
  },
];

export default function HomeCentersMap() {
  const [info, setInfo] = useState<{
    state: string;
    count: string;
    details: string;
  } | null>(null);

  return (
    <section
      id="centers"
      className="w-full py-[120px] max-lg:py-[70px] bg-gray-50 flex justify-center items-center flex-col"
    >
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-12">
        <div className="flex flex-row max-lg:flex-col gap-12 items-center w-full">
          <div className="w-[42%] max-lg:w-full flex flex-col gap-8">
            <div className="max-lg:text-center text-left">
              <span className="font-sans text-nifs-red font-bold text-xs tracking-widest uppercase">
                National Presence
              </span>
              <h2 className="font-sans text-[3.2vw] max-lg:text-[5vw] max-sm:text-[32px] font-black leading-tight text-gray-900 mt-1 break-words w-full">
                70+ Centers Across{" "}
                <span className="font-display italic">24 States</span>
              </h2>
              <p className="font-sans text-gray-500 text-[15px] mt-2 font-medium">
                India&apos;s largest network of safety training institutes,
                offering local courses to international standards.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex gap-4 items-center p-4 bg-white rounded-[20px] shadow-sm border border-gray-100"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color} font-bold text-[20px] flex-shrink-0`}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <span className="block font-sans text-[22px] font-black text-gray-900 leading-none">
                      {s.value}
                    </span>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-600 mt-1 block">
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-widest text-left">
                Explore States
              </span>
              <div
                className="flex flex-wrap gap-2.5 max-h-[160px] overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#DC1711 #f3f4f6",
                }}
              >
                {EXPLORE.map(([name, n]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      const s = STATES.find(
                        (st) =>
                          st.name === name ||
                          (name === "J&K" && st.name === "Jammu & Kashmir"),
                      );
                      if (s)
                        setInfo({
                          state: s.name,
                          count: s.count,
                          details: s.details,
                        });
                    }}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full font-sans text-[14px] font-semibold hover:border-nifs-red hover:text-nifs-red transition-colors cursor-pointer"
                  >
                    {name} <b className="text-nifs-red">{n}</b>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[58%] max-lg:w-full flex justify-center items-center">
            <div className="relative w-full max-w-[580px] aspect-[868/890] flex-shrink-0 select-none overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                decoding="async"
                src="/images/india-map-v2.webp"
                alt="NIFS India Centers Map"
                className="absolute max-w-none"
                style={{
                  width: "168.04%",
                  height: "111.21%",
                  left: "-35.99%",
                  top: "-3.33%",
                }}
              />

              <div
                aria-hidden="true"
                className="home-map-sweep pointer-events-none absolute inset-0 mix-blend-multiply opacity-20 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, #DC1711 340deg, transparent 360deg)",
                  transformOrigin: "center",
                }}
              />
              <div
                aria-hidden="true"
                className="home-map-scan pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#DC1711]/50 to-transparent"
              />

              {STATES.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() =>
                    setInfo({
                      state: s.name,
                      count: s.count,
                      details: s.details,
                    })
                  }
                  className="group absolute cursor-pointer focus:outline-none"
                  style={{ left: s.left, top: s.top }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <span
                      className={`animate-ping absolute inset-0 inline-flex ${s.size} rounded-full bg-nifs-red opacity-75`}
                    />
                    <span
                      className={`relative block rounded-full border-2 border-white shadow-sm ${s.size} bg-nifs-red`}
                    />
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 font-sans text-[10px] font-medium whitespace-nowrap text-white transition-opacity duration-200 group-hover:opacity-100 opacity-0 z-30">
                      {s.name}
                    </span>
                  </div>
                </button>
              ))}

              <div
                className={`absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-gray-150 rounded-[24px] p-5 shadow-2xl z-40 transition-all duration-300 transform ${
                  info
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-nifs-red bg-nifs-red/10 px-2.5 py-1 rounded-full">
                      {info ? info.state.toUpperCase() : "STATE INFO"}
                    </span>
                    <h3 className="font-sans text-[20px] font-bold text-gray-900 mt-2">
                      {info?.state ?? "Andhra Pradesh"}
                    </h3>
                    <p className="font-sans text-[13px] font-semibold text-nifs-red mt-0.5">
                      {info?.count ?? "7 Centers"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInfo(null)}
                    aria-label="Close state info"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 text-[20px] font-bold leading-none cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
                <p className="font-sans text-gray-600 text-[13px] mt-2.5 leading-relaxed font-medium text-left">
                  {info?.details ??
                    "7 centers across Andhra Pradesh including Visakhapatnam HQ, Guntur, and Kakinada."}
                </p>

                <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                  {info?.state === "Telangana" ? (
                    <a
                      href="/centers/hyderabad"
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-nifs-red hover:underline"
                    >
                      Explore Hyderabad Regional Center →
                    </a>
                  ) : info?.state === "Andhra Pradesh" ? (
                    <a
                      href="/centers/visakhapatnam"
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-nifs-red hover:underline"
                    >
                      Explore Visakhapatnam National HQ →
                    </a>
                  ) : (
                    <a
                      href="/centers"
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-gray-700 hover:text-nifs-red hover:underline"
                    >
                      View All Centers in {info?.state ?? "India"} →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
