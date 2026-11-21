import { SITE } from "@/lib/data/site-constants";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { VashiNaviMumbaiPageView } from "./vashi-navi-mumbai-page-view";

const PAGE_URL = "https://nifsindia.net/centers/vashi-navi-mumbai/";

const FEATURED_SLUGS = [
  "advanced-diploma-in-industrial-safety-adis",
  "diploma-in-fire-safety",
  "diploma-in-health-safety-environment",
  "pg-diploma-in-fire-safety-pg-dfs",
  "b-sc-in-fire-industrial-safety",
];

const featuredCourses = FEATURED_SLUGS.map(
  (slug) => courses.find((c) => c.slug === slug)!
).filter(Boolean);

export const VASHINAVIMUMBAI_FAQS = [
  {
    question: "Where is the NIFS center located in Vashi (Navi Mumbai)?",
    answer:
      "NIFS Vashi (Navi Mumbai) campus is located at Office No. F29, 1st Floor, Neno Wing, Haware Fantasia Business Park, Near Inorbit Mall, Vashi (W), Navi Mumbai. For instant batch details, fee structure, and counseling, call +91-022-40136161 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Vashi (Navi Mumbai)?",
    answer:
      "Graduates from NIFS Vashi (Navi Mumbai) are hired across MIDC chemical zones, high-hazard process engineering, maritime port logistics (JNPT), and infrastructure developments.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Vashi (Navi Mumbai)?",
    answer:
      "Fees depend on the course and the batch. Call or WhatsApp this NIFS centre for the current fee and the next batch date.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Vashi (Navi Mumbai)?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. For Advanced and PG Diplomas, see each course page or call this centre.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Vashi (Navi Mumbai)?",
    answer:
      `Yes. NIFS provides dedicated placement assistance with over ${SITE.studentsPlaced} alumni working across India.`,
  },
  {
    question: "Are NIFS certifications recognized by the Government and industry?",
    answer:
      "Yes. NIFS courses are approved by NSDC (National Skill Development Corporation) and Skill India, certified under ISO 9001:2015, with academic university affiliations including Acharya Nagarjuna University (ANU). Certificates are officially accepted across private corporations, PSUs, and international industrial compliance standards.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Vashi, Navi Mumbai | NIFS",
  description:
    "NIFS Vashi, near Inorbit Mall, Navi Mumbai: fire and safety courses with an ANU certificate. Also in Thane and Borivali. Contact for fees.",
  alternates: { canonical: "/centers/vashi-navi-mumbai/" },
  openGraph: {
    title: "Fire and Safety Course in Vashi, Navi Mumbai | NIFS",
    description:
      "NIFS Vashi, near Inorbit Mall, Navi Mumbai: fire and safety courses with an ANU certificate. Also in Thane and Borivali. Contact for fees.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function VashiNaviMumbaiCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Vashi (Navi Mumbai)", url: PAGE_URL },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@id": `${PAGE_URL}#business`,
                "@type": ["LocalBusiness", "EducationalOrganization"],
                name: "National Institute of Fire and Safety (NIFS) — Vashi (Navi Mumbai) Center",
                alternateName: [
                  "NIFS Vashi (Navi Mumbai)",
                  "National Institute of Fire and Safety Vashi (Navi Mumbai)",
                ],
                url: PAGE_URL,
                telephone: "+9102240136161",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Office No. F29, 1st Floor, Neno Wing, Haware Fantasia Business Park, Near Inorbit Mall, Vashi (W), Navi Mumbai",
                  addressLocality: "Vashi (Navi Mumbai)",
                  addressRegion: "Maharashtra",
                  addressCountry: "IN",
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "09:00",
                    closes: "19:00",
                  },
                ],
                parentOrganization: {
                  "@id": "https://nifsindia.net/#organization",
                },
              },
            ],
          }),
        }}
      />

      {featuredCourses.map((c) => (
        <CourseSchema
          key={c.slug}
          name={c.name}
          description={c.summary}
          url={`https://nifsindia.net/courses/${c.slug}/`}
          duration={c.duration}
          tier={c.tier}
        />
      ))}

      <FAQSchema faqs={VASHINAVIMUMBAI_FAQS} />

      <VashiNaviMumbaiPageView courses={featuredCourses} faqs={VASHINAVIMUMBAI_FAQS} />
    </>
  );
}
