"use client";

import { useEffect, useRef } from "react";

const INDUSTRIES = [
  { label: "Oil & Gas", job: "HSE Officer" },
  { label: "Fire & Rescue", job: "Fire Safety Officer" },
  { label: "Airport Safety", job: "Airport Safety Officer" },
  { label: "Marine Safety", job: "Marine Safety Officer" },
  { label: "Power Plant", job: "Industrial Safety Officer" },
];

const IMAGES = [
  { src: "/images/hero/oil-gas.webp", alt: "Safety officer at an oil and gas refinery" },
  { src: "/images/hero/fire-officer.webp", alt: "Fire and rescue safety officer on duty" },
  { src: "/images/hero/airplane-officer.webp", alt: "Airport safety officer at an airfield" },
  { src: "/images/hero/shipyard-officer.webp", alt: "Marine and shipyard safety officer" },
  { src: "/images/hero/power-plant-officer.webp", alt: "Power plant industrial safety officer" },
];

const RECRUITERS = [
  { src: "/images/logos/recruiters/adani_logo.png", alt: "Adani" },
  { src: "/images/logos/recruiters/lt.png", alt: "L&T" },
  { src: "/images/logos/recruiters/itc.png", alt: "ITC" },
  { src: "/images/logos/recruiters/gmr.png", alt: "GMR" },
  { src: "/images/logos/recruiters/amazon.png", alt: "Amazon" },
];

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const industryRef = useRef<HTMLSpanElement>(null);
  const jobRef = useRef<HTMLSpanElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cineImgs = Array.from(section?.querySelectorAll<HTMLImageElement>(".home-cine-img") ?? []);
    if (!section || !cineImgs.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mobile detection: no mouse cursor, no ember canvas needed, skip both rAF loops
    const isMobile = window.innerWidth < 768;
    const cleanups: (() => void)[] = [];

    if (reducedMotion) {
      cineImgs.forEach((img, i) => {
        img.style.opacity = i === 0 ? "1" : "0";
      });
      return;
    }

    // Dynamically import GSAP so it doesn't block initial JS parse (TBT fix)
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        // Support both named and default exports across GSAP versions
        const gsap = gsapMod.gsap ?? (gsapMod as unknown as { default: typeof gsapMod.gsap }).default;
        const { ScrollTrigger } = stMod;
        gsap.registerPlugin(ScrollTrigger);

        let current = 0;
        const crossfade = () => {
          const next = (current + 1) % cineImgs.length;
          const outImg = cineImgs[current];
          const inImg = cineImgs[next];
          const info = INDUSTRIES[next];

          gsap.to(outImg, {
            opacity: 0,
            scale: 1.03,
            filter: "blur(6px)",
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: () => outImg.removeAttribute("data-active"),
          });
          inImg.style.zIndex = "2";
          outImg.style.zIndex = "1";
          gsap.fromTo(
            inImg,
            { opacity: 0, scale: 1.05, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power3.inOut",
              onComplete: () => {
                inImg.setAttribute("data-active", "true");
                inImg.style.zIndex = "";
                outImg.style.zIndex = "";
              },
            }
          );

          if (industryRef.current && jobRef.current) {
            gsap.to(industryRef.current, {
              opacity: 0,
              y: 6,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                industryRef.current!.textContent = info.label;
                gsap.to(industryRef.current!, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
              },
            });
            gsap.to(jobRef.current, {
              opacity: 0,
              y: 6,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                jobRef.current!.textContent = `— ${info.job}`;
                gsap.to(jobRef.current!, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
              },
            });
          }

          current = next;
        };

        let loaded = 0;

        const startCinematic = () => {
          const intervalId = setInterval(crossfade, 3200);
          // Push interval cleanup into the shared array so the outer return handles it
          cleanups.push(() => clearInterval(intervalId));

          // ── Mouse parallax — desktop only (mobile has no hover/cursor) ──
          if (!isMobile) {
            let mouseX = 0;
            let mouseY = 0;
            let curX = 0;
            let curY = 0;
            let rafId = 0;
            const onMouseMove = (e: MouseEvent) => {
              mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
              mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            };
            document.addEventListener("mousemove", onMouseMove, { passive: true });
            const animParallax = () => {
              curX += (mouseX - curX) * 0.06;
              curY += (mouseY - curY) * 0.06;
              cineImgs.forEach((img) => {
                img.style.transform = `translate(${curX.toFixed(2)}px,${curY.toFixed(2)}px) scale(1.02)`;
              });
              rafId = requestAnimationFrame(animParallax);
            };
            animParallax();
            cleanups.push(() => {
              document.removeEventListener("mousemove", onMouseMove);
              cancelAnimationFrame(rafId);
            });
          }

          const scrollTween = gsap.to(cineImgs, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.25 },
          });

          let driftTween: ReturnType<typeof gsap.to> | undefined;
          if (driftRef.current) {
            driftTween = gsap.to(driftRef.current, { x: 8, duration: 20, repeat: -1, yoyo: true, ease: "linear" });
          }

          // ── Ember canvas — desktop only (rAF loop wastes mobile main-thread) ──
          if (!isMobile) {
            const canvas = canvasRef.current;
            let emberRaf = 0;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
                const resizeCanvas = () => {
                  canvas.width = section.offsetWidth;
                  canvas.height = section.offsetHeight;
                };
                resizeCanvas();
                window.addEventListener("resize", resizeCanvas, { passive: true });
                for (let i = 0; i < 18; i++) {
                  particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: -Math.random() * 0.4 - 0.1,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.08,
                  });
                }
                const drawEmbers = () => {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  particles.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.y < -10) {
                      p.y = canvas.height + 10;
                      p.x = Math.random() * canvas.width;
                    }
                    if (p.x < -10) p.x = canvas.width + 10;
                    if (p.x > canvas.width + 10) p.x = -10;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(252,128,16,${p.opacity})`;
                    ctx.fill();
                  });
                  emberRaf = requestAnimationFrame(drawEmbers);
                };
                drawEmbers();
                cleanups.push(() => {
                  window.removeEventListener("resize", resizeCanvas);
                  cancelAnimationFrame(emberRaf);
                });
              }
            }
          }

          cleanups.push(() => {
            scrollTween.scrollTrigger?.kill();
            scrollTween.kill();
            driftTween?.kill();
          });
        };

        const onImgLoad = () => {
          loaded++;
          if (loaded >= cineImgs.length) startCinematic();
        };
        cineImgs.forEach((img) => {
          if (img.complete && img.naturalWidth > 0) onImgLoad();
          else {
            img.onload = onImgLoad;
            img.onerror = onImgLoad;
          }
        });

        if (h1Ref.current) {
          const entrance = gsap.from(h1Ref.current, { opacity: 0, y: 40, duration: 0.8, ease: "power3.out", delay: 0.3 });
          cleanups.push(() => entrance.kill());
        }
      }
    );

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      data-path-target="true"
      className="relative w-full overflow-hidden flex flex-col md:min-h-screen md:flex-row md:items-center md:justify-start pt-28 md:pt-40 max-lg:md:pt-36 pb-10 md:pb-[100px] max-lg:md:pb-[70px]"
    >
      <div ref={driftRef} className="home-bg-drift absolute inset-0" aria-hidden="true" />

      {IMAGES.map((img, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={img.src}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : undefined}
          decoding="async"
          src={img.src}
          alt={img.alt}
          className="home-cine-img"
          data-cine={i}
          data-active={i === 0 ? "true" : undefined}
        />
      ))}

      <canvas ref={canvasRef} className="home-ember-canvas" aria-hidden="true" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/5 md:bg-gradient-to-r md:from-white md:from-[10%] md:via-white/85 md:via-[30%] md:to-white/0 md:to-[42%] z-[4]" />

      <div className="relative z-10 flex flex-col items-start w-full px-[5%] md:pt-0 md:w-[90%] md:max-w-[620px] gap-6 md:gap-10 md:pl-[3%]">
        <div className="flex flex-col justify-start items-start relative gap-7 max-sm:gap-5 w-full">
          <div className="home-pill" aria-live="polite">
            <span className="home-pill-dot" />
            <span ref={industryRef} className="home-pill-text">
              Oil &amp; Gas
            </span>
            <span ref={jobRef} className="home-pill-job">
              — HSE Officer
            </span>
          </div>

          <h1
            ref={h1Ref}
            className="font-sans text-[7.5vh] font-black text-left max-lg:text-[9vw] max-sm:text-[9vw] leading-[105%] max-lg:leading-[100%] max-sm:leading-[112%] w-full text-white md:text-black break-words"
          >
            India&apos;s Leader in Fire &amp;<span className="font-display italic text-nifs-red"> Industrial Safety</span> Organization
          </h1>
        </div>

        <div className="flex flex-col gap-5 items-start">
          <p className="font-sans text-[15px] font-semibold uppercase tracking-wider text-left text-white/70 md:text-gray-500">25+ Years of Excellence</p>

          <h2 className="font-sans text-[22px] max-md:text-[20px] max-sm:text-[15px] font-bold text-left text-white md:text-black">Our Graduates Work At</h2>

          <div className="flex gap-8 max-sm:gap-3 max-md:gap-6 justify-start items-center flex-wrap">
            {RECRUITERS.map((r) => (
              <span key={r.alt} className="bg-white/90 md:bg-transparent rounded-lg p-1.5 md:p-0 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  decoding="async"
                  src={r.src}
                  alt={r.alt}
                  className="h-9 max-sm:h-6 object-contain hover:scale-105 transition-transform duration-300"
                  style={{ clipPath: "inset(4px)" }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
