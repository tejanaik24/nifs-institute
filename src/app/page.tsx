"use client";

import { SpineLayout } from "@/components/SpineLayout";
import { TunnelHero } from "@/components/sections/tunnel-hero";
import { WhyNIFS } from "@/components/sections/WhyNIFS";
import { AboutNifs } from "@/components/sections/about-nifs";
import { Placements } from "@/components/sections/placements-section";
import { CentersGrid } from "@/components/sections/centers-grid";
import { FacilitiesShowcase } from "@/components/sections/facilities-showcase";
import { StudentPlacements } from "@/components/sections/student-placements";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { LatestNews } from "@/components/sections/latest-news";
import { UpdatesTabs } from "@/components/sections/updates-tabs";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-viewport scroll image tunnel with headline overlay */}
      <TunnelHero />

      {/* Continuous spine through Welcome → About → Placements → Map */}
      <SpineLayout>
        <WhyNIFS />
        <AboutNifs />
        <Placements />
        <CentersGrid />
      </SpineLayout>

      {/* Full-width break from the spine layout — campus photo showcase */}
      <FacilitiesShowcase />

      {/* Real, individually named students placed with real companies */}
      <StudentPlacements />

      {/* Course teaser + latest news + closing admissions CTA before the footer */}
      <CoursesSection />
      <LatestNews />
      <UpdatesTabs />
      <AdmissionsCTA />
    </>
  );
}
