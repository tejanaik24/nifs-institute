"use client";

/**
 * Sitewide ambient background — soft drifting gradient auroras + fine grain,
 * in the spirit of antigravity.google. Replaces the old Three.js ember
 * particle field, which scattered sharp red dots over every section
 * (stats, logos, footer) instead of staying confined to the hero.
 */
export function HeroScene() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg__aurora ambient-bg__aurora--a" />
      <div className="ambient-bg__aurora ambient-bg__aurora--b" />
      <div className="ambient-bg__aurora ambient-bg__aurora--c" />
      <div className="ambient-bg__grain" />
    </div>
  );
}
