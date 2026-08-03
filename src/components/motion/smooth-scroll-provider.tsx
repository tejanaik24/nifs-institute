"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { scroll: number }) => {
      ScrollTrigger.update();
      // Broadcast Lenis's own render-synced scroll position so listeners
      // (e.g. the header's solid/transparent switch) never desync from
      // what's actually painted — native `window` scroll events can lag
      // a frame behind Lenis's RAF-driven virtual scroll during fast
      // scrolling, which let page content show through a still-transparent
      // header.
      window.dispatchEvent(
        new CustomEvent("app-scroll", { detail: { scrollY: e.scroll } })
      );
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
