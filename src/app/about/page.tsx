import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { StoryBlock } from "@/components/sections/story-block";
import Image from "next/image";

const aboutSections = [
  {
    title: "Company Profile",
    body: "25+ years, 70+ centers, 45,000+ alumni.",
    href: "/about/company-profile",
  },
  {
    title: "Vision & Mission",
    body: "Why NIFS exists and where we're headed.",
    href: "/about/vision-mission",
  },
  {
    title: "Our Accreditations",
    body: "NSDC, ISO 9001:2015 & university affiliations.",
    href: "/about/accreditations",
  },
  {
    title: "Governance & Advisors",
    body: "Board of Advisors & organization hierarchy.",
    href: "/about/governance",
  },
];

export const metadata: Metadata = {
  title: "About NIFS — Chairman's Desk & Our Mission | NIFS India",
  description:
    "NIFS is a unit of SSB Institute of Higher Studies Educational Society, ISO 9001:2015 certified, training India's industrial safety workforce since inception.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NIFS"
        title="Building India's industrial safety workforce"
        description="A unit of SSB Institute of Higher Studies Educational Society — ISO 9001:2015 certified, NSDC and Skill India approved."
      />

      <section id="chairman" className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 lg:px-10">
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

      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Explore NIFS
          </span>
          <h2 className="font-display mt-2 text-4xl italic">About us, in depth</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutSections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                data-path-target="true"
                className="group flex flex-col justify-between border border-border bg-white p-6 shadow-sm transition-colors hover:border-primary"
              >
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
                <span className="mt-4 text-sm font-semibold text-primary">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
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
