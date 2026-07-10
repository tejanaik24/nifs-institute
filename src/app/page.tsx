import { HeroSection } from "@/components/sections/hero-section";
import { SpineLayout } from "@/components/SpineLayout";
import { LogoBar } from "@/components/sections/LogoBar";
import { TransformSection } from "@/components/sections/TransformSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { PlacementWall } from "@/components/sections/PlacementWall";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyNIFS } from "@/components/sections/WhyNIFS";
import { TrainingYard } from "@/components/sections/TrainingYard";
import { AccreditationsSection } from "@/components/sections/AccreditationsSection";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SpineLayout>
        <LogoBar />
        <TransformSection />
        <StatsSection />
        <CoursesSection />
        <PlacementWall />
        <TestimonialsSection />
        <WhyNIFS />
        <TrainingYard />
        <AccreditationsSection />
        <AdmissionsCTA />
      </SpineLayout>
    </>
  );
}
