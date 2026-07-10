import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { CoursesLadder } from "@/components/sections/courses-ladder";
import { Accreditations } from "@/components/sections/accreditations";
import { IndustrialServices } from "@/components/sections/services";
import { Recruiters } from "@/components/sections/recruiters";
import { Centers } from "@/components/sections/centers";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      {/* Hide original layout header and footer surgically */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header { display: none !important; }
            footer.bg-foreground.text-background { display: none !important; }
          `,
        }}
      />

      <div className="relative min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />
        <Hero />
        <StatsBar />
        <CoursesLadder />
        <Accreditations />
        <IndustrialServices />
        <Recruiters />
        <Centers />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
