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

export default function HomePage() {
  return (
    <>
      <style>{`
        header { display: none !important; }
        footer.bg-foreground { display: none !important; }
      `}</style>
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
    </>
  );
}
