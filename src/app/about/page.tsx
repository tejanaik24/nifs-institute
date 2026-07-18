import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { StoryBlock } from "@/components/sections/story-block";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About NIFS — Chairman's Desk & Our Mission | NIFS India",
  description:
    "NIFS is a unit of SSB Institute of Higher Studies Educational Society, ISO 9001:2015 certified, training India's industrial safety workforce since inception.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NIFS"
        title="Building India's industrial safety workforce"
        description="A unit of SSB Institute of Higher Studies Educational Society — ISO 9001:2015 certified, NSDC and Skill India approved."
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 lg:px-10">
        <div data-path-target="true" className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <Image
            src="/images/nifs-chairman-portrait.jpg"
            alt="From the Chairman's Desk"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            From the Chairman&apos;s Desk
          </span>
          <h2 className="font-display mt-2 text-4xl italic leading-tight">
            &ldquo;To impart futuristic and comprehensive fire engineering and
            industrial safety education &amp; consultancy of global standards
            with a sense of high quality, discipline and social
            respect.&rdquo;
          </h2>
          <p className="mt-6 text-sm font-semibold text-foreground">
            Sri. Suneel Mahanty
          </p>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Chairman and CEO, NIFS — M Sc., M Phil. &amp; MBA (FISM)
          </p>
        </div>
      </section>

      <StoryBlock
        eyebrow="Vision & Mission"
        title="A global leader in fire engineering and industrial safety education"
        body="To impart futuristic, comprehensive fire engineering and industrial safety education and consultancy of global standards — with a sense of high quality, discipline, and social responsibility."
        ctaLabel="Explore our courses"
        ctaHref="/courses"
        imageSlot="classroom-lecture.jpg"
        imageLabel="Modern EHS training classroom"
      />
    </>
  );
}
