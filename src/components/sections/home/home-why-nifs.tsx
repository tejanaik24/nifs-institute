"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  {
    title: "Practical Training Yard",
    desc: "Real hazard simulations on actual equipment. 85% of curriculum is hands-on, not classroom theory.",
    img: "/why_training_yard_bg.webp",
  },
  {
    title: "Direct Placement Cell",
    desc: "Dedicated team with direct recruiter relationships at Adani, L&T, GMR and 45,000+ placements across India.",
    img: "/why_placement_bg.webp",
  },
  {
    title: "Government Recognized",
    desc: "NSDC + Skill India approved. Certificates valid across India, Gulf, and international markets.",
    img: "/why_government_bg.webp",
  },
  {
    title: "70+ Centers Nationwide",
    desc: "Learn near home. Transfer between centers anytime. New centers opening every quarter.",
    img: "/why_centers_bg.webp",
  },
  {
    title: "Industry Faculty Only",
    desc: "Every trainer has minimum 10 years field experience. No academics teaching what they've never done.",
    img: "/why_faculty_bg.webp",
  },
];

const BG_COLORS = ["rgb(15 23 42)", "rgb(0 0 0)", "rgb(23 23 23)"];

export default function HomeWhyNifs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(".why-item"),
    );
    const panelImg = container.querySelector<HTMLImageElement>("#whyPanelImg");
    if (!items.length) return;

    // ─── DESKTOP: original scroll-based effect (≥768px) ───────────────────
    if (window.innerWidth >= 768) {
      if (!panelImg) return;

      let activeCard = -1;
      let swapTimer: ReturnType<typeof setTimeout> | undefined;

      function setActive(index: number) {
        if (index === activeCard || !container) return;
        activeCard = index;
        container.style.backgroundColor = BG_COLORS[index % BG_COLORS.length];
        items.forEach((item) => {
          const i = Number(item.dataset.index);
          const opacity = i === index ? "1" : "0.75";
          item.querySelector<HTMLElement>(".why-title")!.style.opacity =
            opacity;
          item.querySelector<HTMLElement>(".why-desc")!.style.opacity = opacity;
        });
        panelImg!.style.opacity = "0";
        clearTimeout(swapTimer);
        swapTimer = setTimeout(() => {
          panelImg!.src = ITEMS[index].img;
          panelImg!.style.opacity = "1";
        }, 150);
      }

      function handleScroll() {
        const scrollTop = container!.scrollTop;
        const scrollHeight = container!.scrollHeight;
        const clientHeight = container!.clientHeight;
        const progress = scrollTop / (scrollHeight - clientHeight || 1);
        let closest = 0;
        for (let i = 0; i < items.length; i++) {
          if (
            Math.abs(progress - i / items.length) <
            Math.abs(progress - closest / items.length)
          )
            closest = i;
        }
        setActive(closest);
      }

      container.addEventListener("scroll", handleScroll, { passive: true });
      setActive(0);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        clearTimeout(swapTimer);
      };
    }

    // ─── MOBILE: IntersectionObserver crossfade (< 768px) ─────────────────
    // The container is overflow-visible on mobile, so we observe each why-item
    // entering the viewport. The most recently entered item becomes "active":
    // its title + desc fade to opacity 1; all others dim to 0.75.
    // Background color on the section also transitions.
    const section = container.closest<HTMLElement>("section");
    let activeCard = -1;

    function setActiveMobile(index: number) {
      if (index === activeCard) return;
      activeCard = index;
      if (section) {
        section.style.transition = "background-color 0.5s";
        section.style.backgroundColor = BG_COLORS[index % BG_COLORS.length];
      }
      items.forEach((item) => {
        const i = Number(item.dataset.index);
        const opacity = i === index ? "1" : "0.75";
        const titleEl = item.querySelector<HTMLElement>(".why-title");
        const descEl = item.querySelector<HTMLElement>(".why-desc");
        if (titleEl) titleEl.style.opacity = opacity;
        if (descEl) descEl.style.opacity = opacity;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the intersecting entry with the highest intersectionRatio
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best) {
          const index = Number((best.target as HTMLElement).dataset.index);
          setActiveMobile(index);
        }
      },
      {
        // Trigger when item is at least 50% visible in the middle band of the viewport
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    items.forEach((item) => observer.observe(item));
    // Activate first item immediately
    setActiveMobile(0);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-black w-full flex justify-center items-center flex-col overflow-hidden pt-[180px] pb-[100px] max-lg:pt-[140px] max-lg:pb-[70px] max-sm:pt-[120px] max-sm:pb-[60px]">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-[64px] max-sm:gap-[32px] items-center">
        <h2 className="font-sans text-white text-[10vw] max-lg:text-[12vw] font-black leading-[100%] tracking-normal break-words w-full">
          Why <span className="font-display italic">NIFS</span>
        </h2>

        <div
          ref={containerRef}
          id="whyStickyScroll"
          className="h-[36rem] max-sm:h-auto max-sm:overflow-visible max-sm:block w-full max-w-5xl overflow-y-auto flex justify-center relative space-x-10 max-sm:space-x-0 rounded-2xl p-10 max-sm:p-6 border border-white/10 max-sm:border-0 max-sm:bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-sm:shadow-none"
          style={{
            backgroundColor: "rgb(15 23 42)",
            transition: "background-color 0.5s",
          }}
        >
          <div className="relative flex items-start px-4">
            <div className="max-w-2xl">
              {ITEMS.map((item, i) => (
                <div
                  key={item.title}
                  className="why-item my-20 max-sm:my-10"
                  data-index={i}
                >
                  <h3
                    className="font-sans why-title text-2xl font-bold text-slate-100"
                    style={{
                      opacity: i === 0 ? 1 : 0.75,
                      transition: "opacity 0.4s",
                    }}
                  >
                    {item.title}
                  </h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    decoding="async"
                    src={item.img}
                    alt={item.title}
                    className="hidden max-sm:block w-full h-40 object-cover object-top rounded-xl mt-4"
                  />
                  <p
                    className="font-sans why-desc text-lg text-slate-300 max-w-sm mt-10 max-sm:mt-4"
                    style={{
                      opacity: i === 0 ? 1 : 0.75,
                      transition: "opacity 0.4s",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
              <div className="h-40" />
            </div>
          </div>
          <div className="hidden lg:block h-64 w-96 rounded-xl bg-white sticky top-10 overflow-hidden shrink-0 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              decoding="async"
              id="whyPanelImg"
              src="/why_training_yard_bg.webp"
              alt=""
              className="w-full h-full object-cover object-top"
              style={{ transition: "opacity 0.2s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
