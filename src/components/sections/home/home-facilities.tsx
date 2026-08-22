"use client";

import { useEffect, useRef } from "react";

const FACILITIES = [
  { title: "Smart Classrooms", desc: "AC classrooms with digital displays and safety training posters", img: "/images/nifs-hero-classroom.webp", hover: "hover:border-nifs-red/50 hover:shadow-[0_0_40px_rgba(220,23,17,0.25)]" },
  { title: "AC Lecture Theatre", desc: "Tiered lecture theatre with large touchscreen display", img: "/images/classroom-lecture.webp", hover: "hover:border-nifs-green/50 hover:shadow-[0_0_40px_rgba(38,190,41,0.25)]" },
  { title: "Practical Training Yard", desc: "Real hazard simulations on actual equipment. 85% hands-on curriculum", img: "/images/nifs-hero-training-yard.webp", hover: "hover:border-nifs-orange/50 hover:shadow-[0_0_40px_rgba(252,128,16,0.25)]" },
  { title: "Fire Hazard Drill", desc: "Live fire hazard identification and emergency response drills", img: "/images/training-drill.webp", hover: "hover:border-nifs-red/50 hover:shadow-[0_0_40px_rgba(220,23,17,0.25)]" },
  { title: "Hostel Accommodation", desc: "On-campus housing for out-of-town students across all centers", img: "/images/hostel-facility.webp", hover: "hover:border-nifs-green/50 hover:shadow-[0_0_40px_rgba(38,190,41,0.25)]" },
  { title: "Industry Site Visits", desc: "Industrial visits to power plants, factories, and construction sites", img: "/images/gallery-industrial-visit.webp", hover: "hover:border-nifs-orange/50 hover:shadow-[0_0_40px_rgba(252,128,16,0.25)]" },
];

const MOBILE_DESC: Record<string, string> = {
  "Smart Classrooms": "AC classrooms with digital displays",
  "AC Lecture Theatre": "Tiered lecture theatre with touchscreen",
  "Practical Training Yard": "85% hands-on curriculum",
  "Fire Hazard Drill": "Live fire hazard drills",
  "Hostel Accommodation": "On-campus housing",
  "Industry Site Visits": "Power plants, factories, construction",
};

const LEN = FACILITIES.length;
const MOBILE_AUTOPLAY_MS = 3500;

export default function HomeFacilities() {
  const mobileRowRef = useRef<HTMLDivElement>(null);
  const mobileTouchingRef = useRef(false);
  const mobileAutoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mobileCardIndexRef = useRef(0);

  // ─── Mobile snap-scroll autoplay ──────────────────────────────────────
  useEffect(() => {
    const row = mobileRowRef.current;
    if (!row) return;

    // Only run on mobile breakpoint (max-md = < 768px)
    if (window.innerWidth >= 768) return;

    function scrollToCard(index: number) {
      if (!row) return;
      const cardWidth = row.scrollWidth / LEN;
      row.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    }

    function startMobileAutoplay() {
      if (mobileAutoplayRef.current) clearInterval(mobileAutoplayRef.current);
      mobileAutoplayRef.current = setInterval(() => {
        if (mobileTouchingRef.current) return;
        mobileCardIndexRef.current = (mobileCardIndexRef.current + 1) % LEN;
        scrollToCard(mobileCardIndexRef.current);
      }, MOBILE_AUTOPLAY_MS);
    }

    function handleTouchStart() {
      mobileTouchingRef.current = true;
    }

    function handleTouchEnd() {
      mobileTouchingRef.current = false;
      if (!row) return;
      const cardWidth = row.scrollWidth / LEN;
      mobileCardIndexRef.current = Math.round(row.scrollLeft / cardWidth) % LEN;
    }

    row.addEventListener("touchstart", handleTouchStart, { passive: true });
    row.addEventListener("touchend", handleTouchEnd, { passive: true });
    startMobileAutoplay();

    return () => {
      row.removeEventListener("touchstart", handleTouchStart);
      row.removeEventListener("touchend", handleTouchEnd);
      if (mobileAutoplayRef.current) clearInterval(mobileAutoplayRef.current);
    };
  }, []);

  return (
    <section className="w-full py-[200px] max-lg:py-[70px] bg-[#101010] flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-16 items-center">
        <div className="text-center w-full">
          <h2 className="font-sans text-white text-[6vw] max-lg:text-[8vw] font-black leading-none break-words">
            State-of-the-art
            <br />
            <span className="font-display italic">training infrastructure</span>
          </h2>
          <p className="text-white/60 font-sans text-[20px] max-sm:text-[16px] mt-6">6 real facilities — not brochures, reality</p>
        </div>

        {/* Desktop 3-col grid — unchanged */}
        <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-6 w-full max-md:hidden">
          {FACILITIES.map((f) => (
            <div
              key={f.title}
              className={`relative overflow-hidden rounded-[32px] p-8 max-sm:p-6 flex flex-col min-h-[280px] justify-end group cursor-pointer shadow-xl border border-white/10 hover:-translate-y-2 transition-all duration-300 ${f.hover}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={f.img} alt={f.title} className="infra-parallax absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="font-sans text-white text-[24px] font-bold relative z-10">{f.title}</h3>
              <p className="text-white/80 text-[15px] relative z-10 mt-1 leading-normal">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile snap-scroll row — autoplay added */}
        <div
          ref={mobileRowRef}
          className="hidden max-md:flex overflow-x-auto w-full px-4 gap-4 pb-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {FACILITIES.map((f) => (
            <div
              key={f.title}
              className="relative overflow-hidden rounded-[32px] p-6 flex flex-col min-h-[320px] justify-end group cursor-pointer shadow-xl border border-white/10 shrink-0 snap-start"
              style={{ width: "85vw" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={f.img} alt={f.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="font-sans text-white text-[20px] font-bold relative z-10">{f.title}</h3>
              <p className="text-white/80 text-[14px] relative z-10 mt-1">{MOBILE_DESC[f.title]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
