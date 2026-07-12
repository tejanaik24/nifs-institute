"use client";

import { SpineLayout } from "@/components/SpineLayout";
import { TunnelHero } from "@/components/sections/tunnel-hero";
import { AboutNifs } from "@/components/sections/about-nifs";
import { CentersHighlight } from "@/components/sections/centers-highlight";
import { ExploreNifs } from "@/components/sections/ExploreNifs";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-viewport scroll image tunnel with headline overlay */}
      <TunnelHero />

      {/* About + Centers — clean white sections before the spine begins */}
      <AboutNifs />
      <CentersHighlight />

      {/* Explore NIFS — the red spine beats live here */}
      <SpineLayout>
        <ExploreNifs />
      </SpineLayout>
    </>
  );
}
