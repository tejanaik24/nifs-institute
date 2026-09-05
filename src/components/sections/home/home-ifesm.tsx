"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeIfesm() {
  const statRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stat = statRef.current;
    const section = sectionRef.current;
    if (!stat || !section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      stat.textContent = "500+";
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);

        const target = 500;
        const duration = 2000;
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          stat.textContent = `${Math.round(easeOut(progress) * target)}+`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-[64px] max-lg:py-[40px] flex justify-center items-center px-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div
        className="relative w-[92%] max-w-6xl rounded-[32px] shadow-2xl ring-1 ring-white/15 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(220,23,17,0.95),rgba(90,10,8,0.95)),url('/images/gallery-industrial-visit.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-6 left-8 max-sm:left-4 px-4 py-1.5 rounded-full bg-white text-nifs-red text-[11px] font-black uppercase tracking-widest shadow-lg z-10">
          Official Industrial Division
        </div>

        <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-10 max-lg:text-center px-10 py-[56px] max-lg:px-6 max-lg:py-[48px]">
          <div className="flex items-center gap-4 max-lg:justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              src="https://ifesm.com/assets/images/ifesm-logo-1-302x117.png"
              alt="IFESM — Industrial Fire Engineering & Safety Management"
              className="h-16 max-sm:h-12 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <div className="h-10 w-px bg-white/15 max-lg:hidden" />
            <p className="text-white/50 text-[13px] font-semibold uppercase tracking-wider max-lg:hidden">A Division of NIFS</p>
          </div>

          <div className="relative flex flex-col items-center max-lg:items-center">
            <div
              className="absolute inset-0 -m-6 rounded-full blur-2xl opacity-60"
              style={{ background: "radial-gradient(circle,rgba(255,255,255,0.35),transparent 70%)" }}
            />
            <span ref={statRef} className="relative text-white font-sans font-black text-[52px] max-sm:text-[38px] leading-none">
              0+
            </span>
            <span className="relative text-white/60 text-[13px] font-semibold mt-1">Companies Served Across India</span>
          </div>

          <div className="flex flex-col items-center max-lg:items-center gap-4">
            <p className="text-white/80 text-[16px] font-medium max-sm:text-[14px]">
              NIFS Trains.<span className="text-white font-bold"> IFESM Deploys.</span>
            </p>
            <div className="flex items-center gap-4 max-sm:flex-col">
              <a
                href="https://ifesm.com"
                target="_blank"
                rel="noopener"
                className="rounded-full bg-white text-nifs-red text-[13px] font-bold w-[168px] h-[168px] flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-[15px] font-black">IFESM</span>
                <span className="text-[11px] mt-1">Visit Site →</span>
              </a>
              <a
                href="/industrial-services"
                className="rounded-full bg-transparent border-2 border-white text-white text-[13px] font-bold w-[168px] h-[168px] flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-white hover:text-nifs-red transition-all duration-300"
              >
                <span className="text-[15px] font-black">Industrial</span>
                <span className="text-[15px] font-black -mt-1">Services</span>
                <span className="text-[11px] mt-1">Explore →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
