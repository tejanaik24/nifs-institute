"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Adds 3D depth to a page: every element tagged `data-3d-item` enters
 * with a perspective rotateX + translateZ "rise" as it scrolls into view,
 * and `data-3d-hero` elements get a scroll-linked parallax drift.
 * Reuses the same GSAP/ScrollTrigger approach as the governance page.
 */
export function About3DScroll({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Section heads — subtle 3D tilt-up on arrival
      gsap.utils.toArray<HTMLElement>("[data-3d-head]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, rotateX: -18, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Staggered 3D card/row entrances
      gsap.utils.toArray<HTMLElement>("[data-3d-item]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, rotateX: -25, transformPerspective: 900 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Hero — scroll-linked 3D parallax drift
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-3d-hero]");
      if (heroEls.length) {
        gsap.to(heroEls, {
          y: 90,
          rotateX: 10,
          transformPerspective: 800,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=500",
            scrub: 1,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
