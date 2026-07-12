import { SpineLayout } from "@/components/SpineLayout";
import { HeroSection } from "@/components/sections/hero-section";
import { ExploreNifs } from "@/components/sections/ExploreNifs";

export default function HomePage() {
  return (
    <SpineLayout>
      <HeroSection />
      <ExploreNifs />
    </SpineLayout>
  );
}
