"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COURSES = [
  {
    tag: "DFS",
    title: "Diploma in Fire & Safety",
    duration: "1 Year • NSDC Approved",
    desc: "Fire Prevention & Emergency Response",
    img: "/images/courses/diploma-in-fire-safety.webp",
  },
  {
    tag: "DHSE",
    title: "Diploma in HSE",
    duration: "1 Year • NSDC Approved",
    desc: "Health, Safety & Environment",
    img: "/images/courses/diploma-in-health-safety-environment.webp",
  },
  {
    tag: "DIS",
    title: "Diploma in Industrial Safety",
    duration: "1 Year • NSDC Approved",
    desc: "Industrial Hygiene & Hazard Management",
    img: "/images/course-card-industrial-safety.webp",
  },
  {
    tag: "PGDFS",
    title: "PG Diploma in Fire & Safety",
    duration: "1 Year • NSDC Approved",
    desc: "Advanced Fire Engineering",
    img: "/images/course-card-fire-safety.webp",
  },
  {
    tag: "PGDHSE",
    title: "PG Diploma in HSE",
    duration: "1 Year • NSDC Approved",
    desc: "Senior HSE Management",
    img: "/images/corporate-training-onsite.webp",
  },
  {
    tag: "ADFS",
    title: "Advanced Diploma in Fire & Safety",
    duration: "18 Months • NSDC Approved",
    desc: "Fire Risk Assessment & Safety Audits",
    img: "/images/training-yard-drill.webp",
  },
  {
    tag: "B.Sc",
    title: "B.Sc in Fire & Industrial Safety",
    duration: "3 Years (6 Semesters) • University Approved",
    desc: "Full degree with internship training",
    img: "/images/gallery-practical-yard.webp",
  },
  {
    tag: "B.Sc Hons",
    title: "B.Sc (Honours) in Fire & Industrial Safety",
    duration: "4 Years (8 Semesters) • University Approved",
    desc: "4-year honours degree program",
    img: "/images/gallery-industrial-visit.webp",
  },
  {
    tag: "CCFS",
    title: "Certificate Course in Fire & Safety",
    duration: "3-6 Months • NSDC Approved",
    desc: "Quick-entry safety certification",
    img: "/images/courses/certificate-course-in-fire-safety.webp",
  },
];

const LEN = COURSES.length;
const MOBILE_AUTOPLAY_MS = 3500;

function waHref(title: string) {
  return `https://wa.me/918374340999?text=${encodeURIComponent(`Hi, I'm interested in ${title}`)}`;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export default function HomeCourses() {
  const [active, setActive] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Mobile autoplay refs ──────────────────────────────────────────────
  const mobileRowRef = useRef<HTMLDivElement>(null);
  const mobileTouchingRef = useRef(false);
  const mobileAutoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mobileCardIndexRef = useRef(0);

  // ─── Desktop 3D carousel logic (unchanged) ─────────────────────────────
  const layout = useCallback((index: number) => {
    const stack = stackRef.current;
    if (!stack) return;
    const gap = calculateGap(stack.offsetWidth);
    const stickUp = gap * 0.8;
    const imgs = stack.querySelectorAll<HTMLElement>("img");
    imgs.forEach((img) => {
      const i = Number(img.dataset.index);
      const isActive = i === index;
      const isLeft = (index - 1 + LEN) % LEN === i;
      const isRight = (index + 1) % LEN === i;
      if (isActive) {
        img.style.zIndex = "3";
        img.style.opacity = "1";
        img.style.transform =
          "translateX(0px) translateY(0px) scale(1) rotateY(0deg)";
      } else if (isLeft) {
        img.style.zIndex = "2";
        img.style.opacity = "1";
        img.style.transform = `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`;
      } else if (isRight) {
        img.style.zIndex = "2";
        img.style.opacity = "1";
        img.style.transform = `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`;
      } else {
        img.style.zIndex = "1";
        img.style.opacity = "0";
      }
    });
  }, []);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActive((a) => (a + 1) % LEN);
    }, 5000);
  }, []);

  useEffect(() => {
    layout(active);
  }, [active, layout]);

  useEffect(() => {
    layout(0);
    resetAutoplay();
    const onResize = () => layout(active);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (mobileTouchingRef.current) return; // paused while user touches
        mobileCardIndexRef.current = (mobileCardIndexRef.current + 1) % LEN;
        scrollToCard(mobileCardIndexRef.current);
      }, MOBILE_AUTOPLAY_MS);
    }

    function handleTouchStart() {
      mobileTouchingRef.current = true;
    }

    function handleTouchEnd() {
      mobileTouchingRef.current = false;
      // Sync card index from current scroll position after user drag
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const course = COURSES[active];

  return (
    <section
      id="courses"
      className="w-full min-h-screen py-[200px] max-lg:py-[70px] max-md:py-[60px] max-sm:py-[80px] bg-[#101010] flex justify-center items-center flex-col overflow-hidden"
    >
      <div className="w-[90%] max-sm:w-[95%] relative flex flex-col gap-[64px] max-sm:gap-[32px] justify-center items-center">
        <h2 className="font-sans text-white text-[10vw] max-lg:text-[12vw] font-black leading-[100%] tracking-normal break-words w-full">
          Our <span className="font-display italic">Programs</span>
        </h2>

        {/* Mobile snap-scroll row — autoplay added, desktop carousel untouched */}
        <div
          ref={mobileRowRef}
          className="hidden max-md:flex overflow-x-auto w-full px-4 gap-4 pb-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {COURSES.map((c) => (
            <div
              key={c.tag}
              className="relative overflow-hidden rounded-[32px] p-6 flex flex-col min-h-[320px] justify-end group cursor-pointer shadow-xl border border-white/10 shrink-0 snap-start"
              style={{ width: "85vw" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                decoding="async"
                src={c.img}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="font-sans text-white text-[20px] font-bold relative z-10">
                {c.title}
              </h3>
              <p className="text-white/70 text-[13px] relative z-10 mt-1">
                {c.duration}
              </p>
              <p className="text-white/80 text-[14px] relative z-10 mt-1">
                {c.desc}
              </p>
              <a
                href={waHref(c.title)}
                target="_blank"
                rel="noopener"
                aria-label={`Chat on WhatsApp about ${c.title}`}
                className="text-emerald-400 text-[13px] font-semibold relative z-10 mt-3 inline-block hover:underline"
              >
                Chat about this course →
              </a>
            </div>
          ))}
        </div>

        {/* Desktop 3D carousel — unchanged */}
        <div
          id="courseCarousel"
          className="w-full max-w-[56rem] mx-auto max-md:hidden"
          style={{ perspective: "1000px" }}
        >
          <div className="grid grid-cols-2 gap-[5rem] items-center">
            <div ref={stackRef} className="relative w-full h-[24rem]">
              {COURSES.map((c, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={c.tag}
                  src={c.img}
                  alt={c.title}
                  data-index={i}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-bold text-[28px] text-white leading-tight">
                  {course.title}
                </h3>
                <p className="font-sans text-white/50 text-[15px] mt-2">
                  {course.duration}
                </p>
                <p
                  key={active}
                  className="font-sans text-white/70 text-[18px] mt-8 leading-[1.75]"
                >
                  {course.desc.split(" ").map((word, i) => (
                    <span
                      key={`${active}-${i}`}
                      className="inline-block"
                      style={{
                        opacity: 0,
                        filter: "blur(10px)",
                        transition:
                          "opacity 0.22s ease-in-out, filter 0.22s ease-in-out",
                        transitionDelay: `${0.025 * i}s`,
                        animation: `homeWordIn 0.22s ease-in-out ${0.025 * i}s forwards`,
                      }}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </p>
                <a
                  href={waHref(course.title)}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Chat on WhatsApp about ${course.title}`}
                  className="inline-flex items-center gap-2 mt-6 text-emerald-400 font-sans font-semibold text-[15px] hover:underline"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4c-4.86 0-8.82 3.96-8.82 8.82 0 1.56.4 3.08 1.18 4.42L3.2 22l4.9-1.28a8.82 8.82 0 0 0 3.94.93h.01c4.86 0 8.82-3.96 8.82-8.82 0-2.36-.92-4.57-2.6-6.24l-.05-.27zm-5.55 13.58h-.01a7.3 7.3 0 0 1-3.73-1.02l-.27-.16-2.77.73.74-2.7-.18-.28a7.36 7.36 0 0 1-1.13-3.93c0-4.06 3.31-7.37 7.38-7.37a7.34 7.34 0 0 1 5.22 2.17 7.32 7.32 0 0 1 2.16 5.21c0 4.06-3.31 7.35-7.41 7.35zm4.04-5.52c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.11-.94-.35-1.79-1.11a6.7 6.7 0 0 1-1.24-1.55c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.69-1.66-.18-.43-.36-.37-.5-.38h-.42c-.15 0-.39.05-.59.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.8 3.36.53.23.94.36 1.27.47.53.17 1.01.14 1.4.09.43-.06 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26z" />
                  </svg>
                  Chat about this course
                </a>
              </div>
              <div className="flex gap-6 pt-12">
                <button
                  aria-label="Previous course"
                  onClick={() => {
                    setActive((a) => (a - 1 + LEN) % LEN);
                    resetAutoplay();
                  }}
                  className="w-[2.7rem] h-[2.7rem] rounded-full bg-[#141414] flex items-center justify-center text-white hover:bg-nifs-red transition-colors cursor-pointer border-none"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  aria-label="Next course"
                  onClick={() => {
                    setActive((a) => (a + 1) % LEN);
                    resetAutoplay();
                  }}
                  className="w-[2.7rem] h-[2.7rem] rounded-full bg-[#141414] flex items-center justify-center text-white hover:bg-nifs-red transition-colors cursor-pointer border-none"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            href="#apply"
            className="bg-white text-black font-sans rounded-[48px] max-md:rounded-[32px] px-[32px] py-[14px] transition-all duration-300 ease-linear border-2 border-black border-solid text-[24px] max-sm:text-[18px] font-bold cursor-pointer hover:bg-nifs-red hover:border-nifs-red hover:text-white inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
