"use client";

import { useEffect } from "react";

export default function HomeAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Wait for the browser to be idle (or a short fallback timeout) before
    // loading GSAP and wiring up scroll-triggers. This is a page-wide setup
    // touching every h2/parallax/reveal element, so running it immediately
    // on mount competes with the main thread right when the page is trying
    // to become interactive — deferring it keeps first taps responsive.
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200);

    const idleId = idle(() => {
      if (cancelled) return;

      // Dynamically import GSAP so it stays out of the initial JS parse (TBT fix)
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([gsapMod, stMod]) => {
          if (cancelled) return;
          const gsap = gsapMod.gsap ?? (gsapMod as unknown as { default: typeof gsapMod.gsap }).default;
          const { ScrollTrigger } = stMod;
          gsap.registerPlugin(ScrollTrigger);

          const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>("h2").forEach((h) => {
              if (h.closest(".home-blog-track") || h.closest(".faq-hidden")) return;
              gsap.from(h, { scale: 1.5, scrollTrigger: { trigger: h, scrub: true } });
            });

            document.querySelectorAll<HTMLElement>(".course-parallax").forEach((img) => {
              gsap.to(img, { y: -60, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
            });

            document.querySelectorAll<HTMLElement>(".infra-parallax").forEach((img) => {
              gsap.to(img, { y: -40, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
            });

            document.querySelectorAll<HTMLElement>(".home-bar-fill").forEach((bar) => {
              gsap.to(bar, { width: bar.dataset.width, scrollTrigger: { trigger: bar, scrub: true, start: "top bottom" } });
            });

            gsap.utils.toArray<HTMLElement>(".text-slide-left").forEach((el) => {
              gsap.from(el, { x: -100, scrollTrigger: { trigger: el, scrub: true, start: "top bottom" } });
            });

            gsap.utils.toArray<HTMLElement>(".text-slide-right").forEach((el) => {
              gsap.from(el, { x: 100, scrollTrigger: { trigger: el, scrub: true, start: "top bottom" } });
            });

            gsap.utils.toArray<HTMLElement>(".faq-hidden").forEach((card) => {
              gsap.fromTo(card, { opacity: 0, x: -80 }, { opacity: 1, x: 0, scrollTrigger: { trigger: card, start: "top 85%", end: "top 50%", scrub: true } });
            });
          });

          const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest('a[href^="#"]');
            if (!a) return;
            const href = a.getAttribute("href");
            if (!href || href === "#") return;
            const t = document.querySelector(href);
            if (t) {
              e.preventDefault();
              t.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          };
          document.addEventListener("click", onClick);

          cleanup = () => {
            ctx.revert();
            document.removeEventListener("click", onClick);
          };
        },
      );
    });

    return () => {
      cancelled = true;
      cleanup?.();
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return null;
}
