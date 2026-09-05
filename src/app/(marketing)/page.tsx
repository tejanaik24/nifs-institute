import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HomeHero from "@/components/sections/home/home-hero";
import HomeRecruiterMarquee from "@/components/sections/home/home-recruiter-marquee";
import HomeTrained from "@/components/sections/home/home-trained";
import HomeWhyNifs from "@/components/sections/home/home-why-nifs";
import HomeCourses from "@/components/sections/home/home-courses";
import HomeFacilities from "@/components/sections/home/home-facilities";
import HomeOutcomes from "@/components/sections/home/home-outcomes";

// These two use gsap/ScrollTrigger — dynamic-import so the library loads in
// its own chunk instead of blocking the initial page JS (was causing slow
// tap response / high INP on load).
const HomeIfesm = dynamic(() => import("@/components/sections/home/home-ifesm"));
const HomePlacements = dynamic(() => import("@/components/sections/home/home-placements"));
import HomeProcess from "@/components/sections/home/home-process";
import HomeCentersMap from "@/components/sections/home/home-centers-map";
import HomeFeaturedNews from "@/components/sections/home/home-featured-news";
import HomeUpdatesTabs from "@/components/sections/home/home-updates-tabs";
import HomeBlogMarquee from "@/components/sections/home/home-blog-marquee";
import HomeTestimonials from "@/components/sections/home/home-testimonials";
import HomeFaq from "@/components/sections/home/home-faq";
import HomePopularSearches from "@/components/sections/home/home-popular-searches";
import HomeApplyCta from "@/components/sections/home/home-apply-cta";
import HomeAnimations from "@/components/sections/home/home-animations";

export const metadata: Metadata = {
  title: "Fire & Industrial Safety Training Institute in India",
  description:
    "India's leading fire and industrial safety training institute — 70+ centers, NSDC approved, ISO certified, 45,000+ alumni placed.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeRecruiterMarquee />
      <HomeIfesm />
      <HomeTrained />
      <HomeWhyNifs />
      <HomeCourses />
      <HomeFacilities />
      <HomeOutcomes />
      <HomePlacements />
      <HomeProcess />
      <HomeCentersMap />
      <HomeFeaturedNews />
      <HomeUpdatesTabs />
      <HomeBlogMarquee />
      <HomeTestimonials />
      <HomeFaq />
      <HomePopularSearches />
      <HomeApplyCta />
      <HomeAnimations />
    </>
  );
}
