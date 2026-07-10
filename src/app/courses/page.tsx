import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { courses, courseTiers } from "@/lib/data/courses";
import Image from "next/image";
import { TiltWrapper } from "@/components/motion/tilt-wrapper";

export const metadata: Metadata = {
  title: "Courses — Certificate to MBA in Fire & Industrial Safety | NIFS India",
  description:
    "Explore NIFS India's full course ladder: Certificate, Diploma, Advanced Diploma, PG Diploma, B.Sc and MBA programs in Fire & Industrial Safety and Health, Safety & Environment.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificate → Diploma → PG Diploma → B.Sc → MBA"
        title="A course for every stage of a safety career"
        description="Ten programs, one ladder — start where you are, whether that's your first certificate or a management-track MBA."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {courseTiers.map((tier) => {
          const tierCourses = courses.filter((c) => c.tier === tier);
          if (tierCourses.length === 0) return null;
          return (
            <div key={tier} className="mb-16">
              <h2 className="font-display mb-6 text-2xl italic">{tier}</h2>
              <div
                data-path-target="true"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {tierCourses.map((course) => (
                  <TiltWrapper key={course.slug} className="flex flex-col">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="group flex flex-1 flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                          {course.duration} · {course.mode}
                        </span>
                        <h3 className="font-display mt-2 text-lg italic leading-snug">
                          {course.name}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">
                          {course.summary}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium group-hover:text-primary">
                          View curriculum <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  </TiltWrapper>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
