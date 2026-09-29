import type { Metadata } from "next";
import { CourseApp } from "@/components/sections/ergonomic-course/course-app";
import { faqs } from "@/components/sections/ergonomic-course/course-data";
import { Landing } from "@/components/sections/ergonomic-course/landing-sections";
import { BreadcrumbSchema, CourseSchema, FAQSchema } from "@/lib/seo/schema";

const URL = "https://nifsindia.net/courses/ergonomic-safety/";
const TITLE = "Free Ergonomic Safety Course Online (3 Hours) | NIFS India";
const DESC =
  "Free online Ergonomic Safety course by NIFS India. Learn ergonomic hazards, musculoskeletal disorders (MSDs) and key ergonomic principles in 3 hours. Register free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/courses/ergonomic-safety/" },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website" },
};

export default function ErgonomicSafetyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Courses", url: "https://nifsindia.net/courses/" },
          { name: "Ergonomic Safety (Free)", url: URL },
        ]}
      />
      <CourseSchema
        name="Ergonomic Safety (NIFS ES) - Free Online Course"
        description={DESC}
        url={URL}
        duration="PT3H"
        tier="Free short course"
        occupationalCategory="Occupational Health and Safety"
        courseCode="NIFS ES"
        timeRequired="PT3H"
        free
      />
      <FAQSchema faqs={faqs} />
      <CourseApp landing={<Landing />} />
    </>
  );
}
