"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PLACEMENTS = [
  { img: "/images/placements/1.png", name: "CH Sridhar", role: "Safety Supervisor", company: "Kotac Automotives", color: "border-nifs-red", text: "text-nifs-red" },
  { img: "/images/placements/2.png", name: "G Lokesh", role: "Safety Supervisor", company: "Kotac Automotives", color: "border-nifs-green", text: "text-nifs-green" },
  { img: "/images/placements/3.png", name: "V Prudhiv Raj", role: "Safety Inspector", company: "L&T", color: "border-nifs-orange", text: "text-nifs-orange" },
  { img: "/images/placements/4.png", name: "Bhanu Kumar", role: "Safety Inspector", company: "L&T", color: "border-nifs-red", text: "text-nifs-red" },
  { img: "/images/placements/5.png", name: "Yadagiri Babu", role: "Safety Inspector", company: "L&T", color: "border-nifs-green", text: "text-nifs-green" },
  { img: "/images/placements/6.png", name: "Sai Teja", role: "Fire Safety Steward", company: "Lansum Group", color: "border-nifs-orange", text: "text-nifs-orange" },
];

const TRACK = [...PLACEMENTS, ...PLACEMENTS.slice(0, 3)];

export default function HomePlacements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || track.children.length < 2) return;

    const half = Math.ceil(track.children.length / 2);
    const cardW = (track.children[0] as HTMLElement).offsetWidth + 32;
    const scrollDist = cardW * half;

    gsap.set(track, { x: 0 });
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(track, { x: -scrollDist, duration: 25, ease: "none" });

    let paused = false;
    const pause = () => {
      paused = true;
      tl.pause();
    };
    const resume = () => {
      if (!paused) return;
      paused = false;
      tl.resume();
    };
    wrap?.addEventListener("mouseenter", pause);
    wrap?.addEventListener("mouseleave", resume);
    wrap?.addEventListener("touchstart", pause, { passive: true });
    wrap?.addEventListener("touchend", resume, { passive: true });

    return () => {
      tl.kill();
      wrap?.removeEventListener("mouseenter", pause);
      wrap?.removeEventListener("mouseleave", resume);
      wrap?.removeEventListener("touchstart", pause);
      wrap?.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section className="w-full py-[80px] max-lg:py-[50px] bg-[#101010] flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-8 items-center">
        <h2 className="font-sans text-white text-[3.5vw] max-lg:text-[5vw] max-sm:text-[28px] font-black leading-none text-center break-words w-full">Our Students <span className="font-display italic">Placed In</span></h2>

        <div ref={wrapRef} className="overflow-hidden w-full relative">
          <div ref={trackRef} className="flex gap-8" style={{ width: "max-content" }}>
            {TRACK.map((p, i) => (
              <div key={`${p.name}-${i}`} className="flex-shrink-0 w-[160px] flex flex-col items-center text-center">
                <div className={`w-[130px] h-[130px] rounded-full overflow-hidden border-2 ${p.color} shadow-lg flex-shrink-0 relative`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={p.img} alt={p.name} className="w-full h-full object-cover" style={{ transform: "scale(1.6)", transformOrigin: "50% 20%" }} />
                </div>
                <h3 className="font-sans text-white text-[16px] font-bold mt-3 leading-tight">{p.name}</h3>
                <p className="text-white/60 text-[12px] mt-0.5 leading-tight">{p.role}</p>
                <p className={`text-[13px] font-bold ${p.text} mt-1`}>{p.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
