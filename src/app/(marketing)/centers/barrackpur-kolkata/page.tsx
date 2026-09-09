import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { BarrackpurKolkataPageView } from "./barrackpur-kolkata-page-view";

const PAGE_URL = "https://nifsindia.net/centers/barrackpur-kolkata/";

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

export const BARRACKPURKOLKATA_FAQS = [
  {
    question: "Where is the NIFS center located in Barrackpur (Kolkata)?",
    answer:
      "NIFS Barrackpur (Kolkata) campus is located at D.No. 220/B, East Station Road, New Barrackpore, Kolkata. For instant batch details, fee structure, and counseling, call +91-8420-650-604 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Barrackpur (Kolkata)?",
    answer:
      "Graduates from NIFS Barrackpur (Kolkata) are hired across Haldia petrochemical complexes, metallurgical rolling mills, marine container ports, and heavy engineering estates, including recruiters such as Haldia Petrochemicals, Tata Steel Processing, IOCL Refinery, and Gulf EPC projects.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Barrackpur (Kolkata)?",
    answer:
      "Course fees range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Barrackpur (Kolkata)?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Barrackpur (Kolkata) and Gulf countries?",
    answer:
      "Yes. NIFS provides 100% placement assistance with over 45,000 placed alumni working across India and the Gulf (UAE, Saudi Arabia, Qatar, Oman). Recruiter partners include L&T, Adani, Tata Projects, and multinational EPC contractors.",
  },
  {
    question: "Are NIFS certifications recognized by the Government and industry?",
    answer:
      "Yes. NIFS courses are approved by NSDC (National Skill Development Corporation) and Skill India, certified under ISO 9001:2015, with academic university affiliations including Acharya Nagarjuna University (ANU). Certificates are officially accepted across private corporations, PSUs, and international Gulf recruitment agencies.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Barrackpur (Kolkata) | Govt Approved NIFS Campus (4.9★)",
  description:
    "Join Barrackpur (Kolkata)'s top-rated Fire & Safety Officer training institute. 4.9★ on Google with verified alumni ratings. NSDC approved 1-Year Diploma (DFS, ADIS), live practical training yard drills, and 100% placement support in West Bengal.",
  alternates: { canonical: "/centers/barrackpur-kolkata/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Barrackpur (Kolkata) | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Barrackpur (Kolkata), West Bengal. 4.9★ Google Rating, live practical training, and 100% placement support.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function BarrackpurKolkataCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Barrackpur (Kolkata)", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Barrackpur (Kolkata) Center",
                alternateName: [
                  "NIFS Barrackpur (Kolkata)",
                  "National Institute of Fire and Safety Barrackpur (Kolkata)",
                ],
                url: PAGE_URL,
                telephone: "+918420650604",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "D.No. 220/B, East Station Road, New Barrackpore, Kolkata",
                  addressLocality: "Barrackpur (Kolkata)",
                  addressRegion: "West Bengal",
                  addressCountry: "IN",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  bestRating: "5",
                  worstRating: "1",
                  reviewCount: "428",
                },
                review: [
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Suresh Reddy" },
                    datePublished: "2026-06-12",
                    reviewBody:
                      "Completed my safety diploma from NIFS Barrackpur (Kolkata) center. The practical firefighting drills gave huge real-world exposure. Placed as Safety Officer.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                ],
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

      <FAQSchema faqs={BARRACKPURKOLKATA_FAQS} />

      <BarrackpurKolkataPageView courses={featuredCourses} faqs={BARRACKPURKOLKATA_FAQS} />
    </>
  );
}
