"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Type-only imports — erased at runtime, zero bundle impact
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<typeof ScrollTriggerType | null>(null);
  const gsapTickerRef = useRef<typeof GsapType.ticker | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Mobile has native momentum scroll — Lenis adds zero benefit there.
    // Skipping saves the async import + initialization cost on phones.
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Flags and cleanup collectors for async init
    let destroyed = false;
    let tickerFn: ((time: number) => void) | undefined;
    let resizeObserver: ResizeObserver | undefined;

    // Dynamically import heavy libs — keeps them out of the initial JS parse,
    // reducing Total Blocking Time. Same singleton instance as other components
    // that also dynamic-import GSAP (webpack deduplicates shared async chunks).
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapMod, stMod, lenisMod]) => {
      if (destroyed) return;

      const { gsap } = gsapMod;
      const { ScrollTrigger } = stMod;
      const LenisClass = lenisMod.default;

      gsap.registerPlugin(ScrollTrigger);

      // Store refs for the pathname effect and cleanup
      scrollTriggerRef.current = ScrollTrigger;
      gsapTickerRef.current = gsap.ticker;

      const lenis = new LenisClass({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", (e: { scroll: number }) => {
        ScrollTrigger.update();
        window.dispatchEvent(
          new CustomEvent("app-scroll", { detail: { scrollY: e.scroll } }),
        );
      });

      tickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Watch dynamic height changes on body with debounce (prevents desktop main-thread thrashing)
      let debounceTimer: ReturnType<typeof setTimeout> | null = null;
      resizeObserver = new ResizeObserver(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 150);
      });
      resizeObserver.observe(document.body);
    });

    return () => {
      destroyed = true;
      if (tickerFn && gsapTickerRef.current) {
        gsapTickerRef.current.remove(tickerFn);
      }
      if (resizeObserver) resizeObserver.disconnect();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      scrollTriggerRef.current = null;
      gsapTickerRef.current = null;
    };
  }, []);

  // Sync scroll height and reset scroll to top on client-side route changes
  useEffect(() => {
    if (lenisRef.current) {
      // Force instant scroll to top on navigation to match standard browser behavior
      lenisRef.current.scrollTo(0, { immediate: true });
      // Recalculate page height limits for the new route
      lenisRef.current.resize();
      if (scrollTriggerRef.current) scrollTriggerRef.current.refresh();
    }
  }, [pathname]);

  return <>{children}</>;
}
