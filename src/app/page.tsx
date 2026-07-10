import { HeroSection } from "@/components/sections/hero-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { TrustStrip } from "@/components/sections/trust-strip";
import { SalaryOutcomes } from "@/components/sections/salary-outcomes";
import { IndustrialServicesPreview } from "@/components/sections/industrial-services-preview";
import { StoryBlock } from "@/components/sections/story-block";
import { CourseGrid } from "@/components/sections/course-grid";
import { HowToApply } from "@/components/sections/how-to-apply";
import { CentersGrid } from "@/components/sections/centers-grid";
import { Facilities } from "@/components/sections/facilities";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <TrustStrip />
      <SalaryOutcomes />
      <IndustrialServicesPreview />

      <StoryBlock
        eyebrow="Practical Training Yard"
        title="Classrooms aren't enough. We train on real hazards."
        body="Every NIFS program runs alongside hands-on drills at our practical training yard — hazard identification, PPE handling, fire suppression, and emergency response, rehearsed until it's instinct, not theory."
        ctaLabel="See the training yard"
        ctaHref="/gallery"
        imageSlot="training-yard-drill.jpg"
        imageLabel="Trainees running a hazard drill at the practical training yard"
        pathTarget
      />

      <StoryBlock
        eyebrow="From Classroom to Site"
        title="We build safety officers, not just certificate holders"
        body="Our curriculum moves fast from theory to practice — the same student who maps a risk-assessment matrix in class is auditing a live plant floor within weeks, under real supervision."
        ctaLabel="View the curriculum"
        ctaHref="/courses"
        imageSlot="classroom-to-site-split-plant.jpg"
        imageLabel="Graduate conducting a safety audit on an industrial plant floor"
        reverse
      />

      <CourseGrid />

      <section className="bg-muted/30 py-14 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 lg:px-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/placement-success-story.jpg"
              alt="Placement story: NIFS graduate, now a corporate safety officer"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Placement Story
            </span>
            <h2 className="font-display mt-2 text-4xl italic leading-tight md:text-5xl">
              &ldquo;NIFS didn&apos;t just place me — it prepared me for the
              floor.&rdquo;
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Our placement cell partners directly with recruiters like
              Adani, L&amp;T, ITC, GMR and Amazon — matching every graduating
              batch to real openings in industrial safety, EHS, and
              compliance roles.
            </p>
            <Link
              href="/placements"
              className="mt-8 inline-block bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Explore Placements
            </Link>
          </div>
        </div>
      </section>

      <HowToApply />
      <CentersGrid />
      <Facilities />

      <section
        data-path-target="true"
        className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24 lg:px-10"
      >
        <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
          Admissions open for 2026 batches
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Diploma, PG Diploma, Degree and International courses in Fire &amp;
          Industrial Safety, Construction Safety, and Health, Safety &amp;
          Environment. Education loans available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/admissions"
            className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
          >
            How to Apply
          </Link>
          <Link
            href="/centers"
            className="border border-border px-7 py-3.5 text-sm font-medium text-foreground"
          >
            Find a Center Near You
          </Link>
        </div>
      </section>
    </>
  );
}
