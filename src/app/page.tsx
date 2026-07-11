import { SpineLayout } from "@/components/SpineLayout";

// Homepage stripped to skeleton for a fresh rebuild — see branch
// `homepage-backup-pre-strip` for the previous full section set
// (HeroSection, LogoBar, TransformSection, StatsSection, CoursesSection,
// PlacementWall, TestimonialsSection, WhyNIFS, TrainingYard, TrustStrip,
// CentersGrid, AccreditationsSection, AdmissionsCTA). Header/nav and footer
// are untouched (see layout.tsx). Only the spine stays visible on its own.
export default function HomePage() {
  return (
    <SpineLayout>
      <div aria-hidden="true" className="h-[70vh]" />
    </SpineLayout>
  );
}
