import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { GurgaonPageView } from "./gurgaon-page-view";

const PAGE_URL = "https://nifsindia.net/centers/gurgaon/";

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

export const GURGAON_FAQS = [
  {
    question: "Where is the NIFS center in Gurgaon?",
    answer:
      "NIFS Gurgaon is located at Sector 5, Palm Vihar Road (Near HP Petrol Pump, Dataram Mandir), Phase II, Ashok Vihar, Gurgaon, Haryana – 122001. For instant directions and counseling, call +91 99104 09821 or +91 93103 39821.",
  },
  {
    question: "Which industries hire safety officers near Manesar?",
    answer:
      "Maruti Suzuki, Hero MotoCorp, Bosch, Tata Motors, and hundreds of auto ancillary manufacturers in IMT Manesar and Udyog Vihar regularly recruit certified fire and safety officers.",
  },
  {
    question: "What is the fee for safety courses at NIFS Gurgaon?",
    answer:
      "Course fees range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Gurgaon?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Gurgaon and Gulf countries?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf (UAE, Saudi Arabia, Qatar, Oman). Recruiter partners include L&T, Adani, Maruti Suzuki, Hero MotoCorp, and Bosch. Placement drives and interviews are organized regularly at our regional centers.",
  },
  {
    question: "Are NIFS certifications recognized by the Government and industry?",
    answer:
      "Yes. NIFS courses are approved by NSDC (National Skill Development Corporation) and Skill India, certified under ISO 9001:2015, with academic university affiliations including Acharya Nagarjuna University (ANU). Certificates are officially accepted across private corporations, public sector undertakings (PSUs), and international Gulf recruitment agencies.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Gurgaon | Govt Approved NIFS Ashok Vihar",
  description:
    "Join Gurgaon's top-rated Fire & Safety Officer training institute in Ashok Vihar. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support in Auto & Manufacturing.",
  alternates: { canonical: "/centers/gurgaon/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Gurgaon | NIFS Institute Ashok Vihar",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Gurgaon. 45,000+ placements with Maruti Suzuki, Hero MotoCorp, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function GurgaonCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Gurgaon (Ashok Vihar)", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Gurgaon Center (Ashok Vihar)",
                alternateName: [
                  "NIFS Gurgaon",
                  "NIFS Ashok Vihar",
                  "National Institute of Fire and Safety Gurgaon",
                ],
                url: PAGE_URL,
                telephone: "+919910409821",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Sector 5, Palm Vihar Road (Near HP Petrol Pump, Dataram Mandir), Phase II, Ashok Vihar",
                  addressLocality: "Gurgaon",
                  addressRegion: "Haryana",
                  postalCode: "122001",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 28.4595,
                  longitude: 77.0266,
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

      <FAQSchema faqs={GURGAON_FAQS} />

      <GurgaonPageView courses={featuredCourses} faqs={GURGAON_FAQS} />
    </>
  );
}
