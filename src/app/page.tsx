'use client';
import Navbar from '@/components/sections/navbar';
import Hero from '@/components/sections/hero';
import StatsBar from '@/components/sections/stats-bar';
import CoursesLadder from '@/components/sections/courses-ladder';
import Accreditations from '@/components/sections/accreditations';
import Services from '@/components/sections/services';
import Recruiters from '@/components/sections/recruiters';
import Centers from '@/components/sections/centers';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/sections/footer';
import { ScrollPathLine } from '@/components/ScrollPathLine';

export default function HomePage() {
  return (
    <>
      <style>{`
        header { display: none !important; }
        footer.bg-foreground { display: none !important; }
      `}</style>
      {/* Relative wrapper so ScrollPathLine absolute SVG is positioned correctly */}
      <div className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <ScrollPathLine />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <StatsBar />
          <CoursesLadder />
          <Accreditations />
          <Services />
          <Recruiters />
          <Centers />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </>
  );
}
