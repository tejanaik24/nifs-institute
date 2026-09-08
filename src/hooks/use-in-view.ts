"use client";

import { useEffect, useRef, useState } from "react";

// Fires true once the element is near the viewport, then stops observing.
// Used to defer per-section animation/autoplay setup (GSAP, setInterval, DOM
// writes) on below-the-fold sections until they're actually about to be seen —
// so 18 homepage sections don't all do that work on mount at the same time.
export function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
