import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { courses } from "@/lib/data/courses";
import { BreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Online Courses — Certificate to PG Diploma in Fire & Industrial Safety | NIFS India",
  description:
    "Study anywhere with NIFS India's online-mode programs — ANU-NIFS and NSDC affiliated Certificate, Diploma, Advanced Diploma & PG Diploma courses in Fire, Industrial Safety & HSE.",
  alternates: { canonical: "/courses/online/" },
};

// Online-mode programs, per ANU-NIFS and NSDC online-course documentation.
// Excludes the B.Sc (regular, on-campus) and the SBTET program (regular, full-time).
const onlineCourses = courses.filter(
  (c) => c.tier !== "B.Sc" && c.slug !== "industrial-safety-engineer-sbtet"
);

export default function OnlineCoursesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Courses", url: "https://nifsindia.net/courses/" },
          { name: "Online Courses", url: "https://nifsindia.net/courses/online/" },
        ]}
      />
      <PageHero
        eyebrow="ANU-NIFS & NSDC Affiliated"
        title="Online courses, studied from anywhere"
        description="Certificate, Diploma, Advanced Diploma, and PG Diploma programs delivered online, with personal contact sessions at your nearest NIFS center."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {onlineCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group border border-border p-6 transition-colors hover:border-primary"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-5 block text-xs font-semibold uppercase tracking-widest text-primary">
                {course.tier} · {course.duration}
              </span>
              <h2 className="font-display mt-2 text-xl italic leading-snug">
                {course.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{course.eligibility}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
                View curriculum <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border pt-10">
          <Link
            href="/admissions"
            className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
          >
            Join Now &amp; Secure Your Future
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            All courses (incl. B.Sc &amp; SBTET) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
