"use client";

import { SpineLayout } from "@/components/SpineLayout";
import { TunnelHero } from "@/components/sections/tunnel-hero";
import { WhyNIFS } from "@/components/sections/WhyNIFS";
import { AboutNifs } from "@/components/sections/about-nifs";
import { CentersGrid } from "@/components/sections/centers-grid";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-viewport scroll image tunnel with headline overlay */}
      <TunnelHero />

      {/* Continuous spine through Welcome → About → Map */}
      <SpineLayout>
        <WhyNIFS />
        <AboutNifs />
        <CentersGrid />
      </SpineLayout>
    </>
  );
}
