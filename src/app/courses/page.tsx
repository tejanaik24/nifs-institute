import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CourseCatalog } from "@/components/sections/course-catalog";

export const metadata: Metadata = {
  title: "Courses — Certificate to B.Sc in Fire & Industrial Safety | NIFS India",
  description:
    "Explore NIFS India's full course ladder: Certificate, Diploma, Advanced Diploma, PG Diploma, and B.Sc programs in Fire & Industrial Safety and Health, Safety & Environment.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificate → Diploma → PG Diploma → B.Sc"
        title="A course for every stage of a safety career"
        description="Nine programs, one ladder — start where you are, whether that's your first certificate or a full degree."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <CourseCatalog />
      </section>
    </>
  );
}
