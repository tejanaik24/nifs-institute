import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { LucknowPageView } from "./lucknow-page-view";

const PAGE_URL = "https://nifsindia.net/centers/lucknow/";

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

export const LUCKNOW_FAQS = [
  {
    question: "Where is the NIFS center located in Lucknow?",
    answer:
      "NIFS Lucknow campus is located at Basement II, Skylark Building, Newal Kishore Road, Hazratganj, Lucknow – 226001. For instant batch details, fee structure, and counseling, call +91-9956-999-767 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Lucknow?",
    answer:
      "Graduates from NIFS Lucknow are hired across Heavy electrical manufacturing, UPSIDC industrial areas, thermal power projects, and engineering fabrication corridors, including recruiters such as Tata Motors, BHEL Haridwar / Jhansi, NTPC Unchahar, and Gulf EPC projects.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Lucknow?",
    answer:
      "Course fees range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Lucknow?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Lucknow and Gulf countries?",
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
  title: "Fire and Safety Course in Lucknow | Govt Approved NIFS Campus (4.9★)",
  description:
    "Join Lucknow's top-rated Fire & Safety Officer training institute. 4.9★ on Google with verified alumni ratings. NSDC approved 1-Year Diploma (DFS, ADIS), live practical training yard drills, and 100% placement support in Uttar Pradesh.",
  alternates: { canonical: "/centers/lucknow/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Lucknow | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Lucknow, Uttar Pradesh. 4.9★ Google Rating, live practical training, and 100% placement support.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function LucknowCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Lucknow", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Lucknow Center",
                alternateName: [
                  "NIFS Lucknow",
                  "National Institute of Fire and Safety Lucknow",
                ],
                url: PAGE_URL,
                telephone: "+919956999767",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Basement II, Skylark Building, Newal Kishore Road, Hazratganj, Lucknow – 226001",
                  addressLocality: "Lucknow",
                  addressRegion: "Uttar Pradesh",
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
                      "Completed my safety diploma from NIFS Lucknow center. The practical firefighting drills gave huge real-world exposure. Placed as Safety Officer.",
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

      <FAQSchema faqs={LUCKNOW_FAQS} />

      <LucknowPageView courses={featuredCourses} faqs={LUCKNOW_FAQS} />
    </>
  );
}
