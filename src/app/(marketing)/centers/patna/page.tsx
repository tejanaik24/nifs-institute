import { SITE } from "@/lib/data/site-constants";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { PatnaPageView } from "./patna-page-view";

const PAGE_URL = "https://nifsindia.net/centers/patna/";

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

export const PATNA_FAQS = [
  {
    question: "Where is the NIFS center located in Patna?",
    answer:
      "NIFS Patna campus is located at C/o Wasisth Educational and Charitable Trust, 3rd Floor, Room No. 35, Ashiyana Galaxy, Exhibition Road, Near Gandhi Maidan, Patna – 01, Bihar. For instant batch details, fee structure, and counseling, call +91-9204-615-085 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Patna?",
    answer:
      "Graduates from NIFS Patna are hired across Refinery complexes (Barauni), super thermal power stations (Barh/Kahalgaon), and large-scale infrastructure construction projects.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Patna?",
    answer:
      "Fees depend on the course and the batch. Call or WhatsApp this NIFS centre for the current fee and the next batch date.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Patna?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. For Advanced and PG Diplomas, see each course page or call this centre.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Patna?",
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
  title: "Fire and Safety Course in Patna | Govt Approved NIFS Campus",
  description:
    "Join Patna's recognized Fire & Safety Officer training institute. NSDC approved 1-Year Diploma (DFS, ADIS), live practical training yard drills, and placement support in Bihar.",
  alternates: { canonical: "/centers/patna/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Patna | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Patna, Bihar. Live practical training and placement support.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function PatnaCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Patna", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Patna Center",
                alternateName: [
                  "NIFS Patna",
                  "National Institute of Fire and Safety Patna",
                ],
                url: PAGE_URL,
                telephone: "+919204615085",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "C/o Wasisth Educational and Charitable Trust, 3rd Floor, Room No. 35, Ashiyana Galaxy, Exhibition Road, Near Gandhi Maidan, Patna – 01, Bihar",
                  addressLocality: "Patna",
                  addressRegion: "Bihar",
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

      <FAQSchema faqs={PATNA_FAQS} />

      <PatnaPageView courses={featuredCourses} faqs={PATNA_FAQS} />
    </>
  );
}
