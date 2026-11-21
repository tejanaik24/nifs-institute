import { SITE } from "@/lib/data/site-constants";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { ChennaiPageView } from "./chennai-page-view";

const PAGE_URL = "https://nifsindia.net/centers/chennai/";

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

export const CHENNAI_FAQS = [
  {
    question: "Where is the NIFS center located in Chennai?",
    answer:
      "NIFS Chennai campus is located at New No. 483, Old No. 283, P.H. Road, Aminjikarai, Chennai – 600029. For instant batch details, fee structure, and counseling, call +91-9283-762-538 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Chennai?",
    answer:
      "Graduates from NIFS Chennai are hired across Automotive manufacturing corridors, SIPCOT engineering hubs, petrochemical complexes, and export processing zones.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Chennai?",
    answer:
      "Fees depend on the course and the batch. Call or WhatsApp this NIFS centre for the current fee and the next batch date.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Chennai?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. For Advanced and PG Diplomas, see each course page or call this centre.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Chennai?",
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
  title: "Fire and Safety Course in Chennai (Aminjikarai) | NIFS",
  description:
    "NIFS Chennai on P.H. Road, Aminjikarai: ADIS, DFS, DHSE, PG DFS and B.Sc courses with an ANU certificate. Call or WhatsApp for fees.",
  alternates: { canonical: "/centers/chennai/" },
  openGraph: {
    title: "Fire and Safety Course in Chennai (Aminjikarai) | NIFS",
    description:
      "NIFS Chennai on P.H. Road, Aminjikarai: ADIS, DFS, DHSE, PG DFS and B.Sc courses with an ANU certificate. Call or WhatsApp for fees.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function ChennaiCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Chennai", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Chennai Center",
                alternateName: [
                  "NIFS Chennai",
                  "National Institute of Fire and Safety Chennai",
                ],
                url: PAGE_URL,
                telephone: "+919283762538",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "New No. 483, Old No. 283, P.H. Road, Aminjikarai, Chennai – 600029",
                  addressLocality: "Chennai",
                  addressRegion: "Tamil Nadu",
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

      <FAQSchema faqs={CHENNAI_FAQS} />

      <ChennaiPageView courses={featuredCourses} faqs={CHENNAI_FAQS} />
    </>
  );
}
