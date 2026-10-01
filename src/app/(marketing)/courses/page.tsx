import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CourseCatalog } from "@/components/sections/course-catalog";
import { FreeCourseFeature } from "@/components/sections/ergonomic-course/free-course-feature";
import { AbroadStudentsBanner } from "@/components/sections/abroad-students-banner";

export const metadata: Metadata = {
  title: "Courses — Certificate to B.Sc in Fire Safety | NIFS India",
  description:
    "Explore NIFS's full course ladder: Certificate, Diploma, Advanced Diploma, PG Diploma, and B.Sc in Fire & Industrial Safety. Dedicated admissions open for abroad students.",
  alternates: { canonical: "/courses/" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificate → Diploma → PG Diploma → B.Sc"
        title="A course for every stage of a safety career"
        description="Fourteen programs, one ladder — start where you are, whether that's your first certificate or a full degree."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/courses/abroad-students"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xs transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Abroad Students Portal</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 space-y-12">
        <AbroadStudentsBanner />
        <FreeCourseFeature />
        <div className="pt-8">
          <CourseCatalog />
        </div>
      </section>
    </>
  );
}
