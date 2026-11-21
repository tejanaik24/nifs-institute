import { SITE } from "@/lib/data/site-constants";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { ThanePageView } from "./thane-page-view";

const PAGE_URL = "https://nifsindia.net/centers/thane/";

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

export const THANE_FAQS = [
  {
    question: "Where is the NIFS center located in Thane?",
    answer:
      "NIFS Thane campus is located at Krishna Plaza A, 4th Floor, Office No. 404, Beside Krishna Sweets, Opp. CKP Bank Ltd., Shivaji Path, Near Thane Railway Station (West), Thane – 400601. For instant batch details, fee structure, and counseling, call +91-9702-978-649 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Thane?",
    answer:
      "Graduates from NIFS Thane are hired across MIDC chemical zones, high-hazard process engineering, maritime port logistics (JNPT), and infrastructure developments.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Thane?",
    answer:
      "Fees depend on the course and the batch. Call or WhatsApp this NIFS centre for the current fee and the next batch date.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Thane?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. For Advanced and PG Diplomas, see each course page or call this centre.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Thane?",
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
  title: "Fire and Safety Course in Thane (Near Station) | NIFS",
  description:
    "NIFS Thane, near Thane Railway Station (West): fire and safety courses with an ANU certificate. Call or WhatsApp for fees and the next batch.",
  alternates: { canonical: "/centers/thane/" },
  openGraph: {
    title: "Fire and Safety Course in Thane (Near Station) | NIFS",
    description:
      "NIFS Thane, near Thane Railway Station (West): fire and safety courses with an ANU certificate. Call or WhatsApp for fees and the next batch.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function ThaneCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Thane", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Thane Center",
                alternateName: [
                  "NIFS Thane",
                  "National Institute of Fire and Safety Thane",
                ],
                url: PAGE_URL,
                telephone: "+919702978649",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Krishna Plaza A, 4th Floor, Office No. 404, Beside Krishna Sweets, Opp. CKP Bank Ltd., Shivaji Path, Near Thane Railway Station (West), Thane – 400601",
                  addressLocality: "Thane",
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

      <FAQSchema faqs={THANE_FAQS} />

      <ThanePageView courses={featuredCourses} faqs={THANE_FAQS} />
    </>
  );
}
