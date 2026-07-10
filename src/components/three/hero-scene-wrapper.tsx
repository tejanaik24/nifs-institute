"use client";

import { useEffect, useState } from "react";
import { HeroScene } from "./hero-scene";

export function HeroSceneWrapper() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(!prefersReducedMotion);
  }, []);

  if (!enabled) return null;

  return <HeroScene />;
}
