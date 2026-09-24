import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { TataJamshedpurPageView } from "./tata-jamshedpur-page-view";

const PAGE_URL = "https://nifsindia.net/centers/tata-jamshedpur/";

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

export const TATAJAMSHEDPUR_FAQS = [
  {
    question: "Where is the NIFS center located in Tata Jamshedpur?",
    answer:
      "NIFS Tata Jamshedpur campus is located at H-42, First Floor, New Development Area, Near A.B.M. College, PO Golmuri, Jamshedpur – 831003. For instant batch details, fee structure, and counseling, call +91-9234-500-272 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Tata Jamshedpur?",
    answer:
      "Graduates from NIFS Tata Jamshedpur are hired across Integrated blast furnaces, underground and open-cast coal mines, metallurgical mills, and mineral processing complexes, including recruiters such as Tata Steel Jamshedpur, SAIL Bokaro Steel, Usha Martin Ltd., and Gulf EPC projects.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Tata Jamshedpur?",
    answer:
      "Course fees range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Tata Jamshedpur?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Tata Jamshedpur and Gulf countries?",
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
  title: "Fire and Safety Course in Tata Jamshedpur | Govt Approved NIFS Campus",
  description:
    "Join Tata Jamshedpur's top-rated Fire & Safety Officer training institute. NSDC approved 1-Year Diploma (DFS, ADIS), live practical training yard drills, and 100% placement support in Jharkhand.",
  alternates: { canonical: "/centers/tata-jamshedpur/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Tata Jamshedpur | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Tata Jamshedpur, Jharkhand. Live practical training and 100% placement support.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function TataJamshedpurCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Tata Jamshedpur", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Tata Jamshedpur Center",
                alternateName: [
                  "NIFS Tata Jamshedpur",
                  "National Institute of Fire and Safety Tata Jamshedpur",
                ],
                url: PAGE_URL,
                telephone: "+919234500272",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "H-42, First Floor, New Development Area, Near A.B.M. College, PO Golmuri, Jamshedpur – 831003",
                  addressLocality: "Tata Jamshedpur",
                  addressRegion: "Jharkhand",
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

      <FAQSchema faqs={TATAJAMSHEDPUR_FAQS} />

      <TataJamshedpurPageView courses={featuredCourses} faqs={TATAJAMSHEDPUR_FAQS} />
    </>
  );
}
