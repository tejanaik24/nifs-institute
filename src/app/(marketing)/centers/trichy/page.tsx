import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { TrichyPageView } from "./trichy-page-view";

const PAGE_URL = "https://nifsindia.net/centers/trichy/";

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

export const TRICHY_FAQS = [
  {
    question: "Where is the NIFS center located in Trichy?",
    answer:
      "NIFS Trichy campus is located at C/o School of Safety, No. 6E, Rishivanam, Near Bishop Heber College, Vayalur Road, Puthur, Trichy – 620017. For instant batch details, fee structure, and counseling, call +91-9842-208-221 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Trichy?",
    answer:
      "Graduates from NIFS Trichy are hired across Automotive manufacturing corridors, SIPCOT engineering hubs, petrochemical complexes, and export processing zones, including recruiters such as Hyundai Motor India, Saint-Gobain India, L&T Shipbuilding, and Gulf EPC projects.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Trichy?",
    answer:
      "Course fees range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Trichy?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Trichy and Gulf countries?",
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
  title: "Fire and Safety Course in Trichy | Govt Approved NIFS Campus",
  description:
    "Join Trichy's top-rated Fire & Safety Officer training institute. NSDC approved 1-Year Diploma (DFS, ADIS), live practical training yard drills, and 100% placement support in Tamil Nadu.",
  alternates: { canonical: "/centers/trichy/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Trichy | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Trichy, Tamil Nadu. Live practical training and 100% placement support.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function TrichyCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Trichy", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Trichy Center",
                alternateName: [
                  "NIFS Trichy",
                  "National Institute of Fire and Safety Trichy",
                ],
                url: PAGE_URL,
                telephone: "+919842208221",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "C/o School of Safety, No. 6E, Rishivanam, Near Bishop Heber College, Vayalur Road, Puthur, Trichy – 620017",
                  addressLocality: "Trichy",
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

      <FAQSchema faqs={TRICHY_FAQS} />

      <TrichyPageView courses={featuredCourses} faqs={TRICHY_FAQS} />
    </>
  );
}
