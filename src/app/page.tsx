"use client";

import { SpineLayout } from "@/components/SpineLayout";
import { TunnelHero } from "@/components/sections/tunnel-hero";
import { AboutNifs } from "@/components/sections/about-nifs";
import { CentersGrid } from "@/components/sections/centers-grid";
import { ExploreNifs } from "@/components/sections/ExploreNifs";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-viewport scroll image tunnel with headline overlay */}
      <TunnelHero />

      {/* Continuous spine through About → Map → Explore */}
      <SpineLayout>
        <AboutNifs />
        <CentersGrid />
        <ExploreNifs />
      </SpineLayout>
    </>
  );
}
