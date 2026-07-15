import { RaftHero } from "@/components/raft-mock/RaftHero";
import { TrustBar } from "@/components/raft-mock/TrustBar";
import { FeatureGrid } from "@/components/raft-mock/FeatureGrid";
import { StatStrip } from "@/components/raft-mock/StatStrip";
import { AccentStatBlock } from "@/components/raft-mock/AccentStatBlock";
import { CentersSection } from "@/components/raft-mock/CentersSection";
import { FacilitiesSection } from "@/components/raft-mock/FacilitiesSection";
import { StudentGrid } from "@/components/raft-mock/StudentGrid";
import { CoursesGrid } from "@/components/raft-mock/CoursesGrid";
import { NewsSection } from "@/components/raft-mock/NewsSection";
import { UpdatesSection } from "@/components/raft-mock/UpdatesSection";
import { ClosingCTA } from "@/components/raft-mock/ClosingCTA";

export default function RaftMockPage() {
  return (
    <div className="bg-white">
      <RaftHero />
      <TrustBar />
      <FeatureGrid />
      <StatStrip />
      <AccentStatBlock />
      <CentersSection />
      <FacilitiesSection />
      <StudentGrid />
      <CoursesGrid />
      <NewsSection />
      <UpdatesSection />
      <ClosingCTA />
    </div>
  );
}
