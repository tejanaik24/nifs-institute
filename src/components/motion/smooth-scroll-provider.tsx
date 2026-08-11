"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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
      window.dispatchEvent(
        new CustomEvent("app-scroll", { detail: { scrollY: e.scroll } })
      );
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Watch dynamic height changes on body (lazy images, dynamic DOM elements, etc.)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      gsap.ticker.remove(ticker);
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  // Sync scroll height and reset scroll to top on client-side route changes
  useEffect(() => {
    if (lenisRef.current) {
      // Force instant scroll to top on navigation to match standard browser behavior
      lenisRef.current.scrollTo(0, { immediate: true });
      // Recalculate page height limits for the new route
      lenisRef.current.resize();
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  return <>{children}</>;
}
