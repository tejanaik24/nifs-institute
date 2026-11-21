import { SITE } from "@/lib/data/site-constants";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { BangalorePageView } from "./bangalore-page-view";

const PAGE_URL = "https://nifsindia.net/centers/bangalore/";

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

export const BANGALORE_FAQS = [
  {
    question: "Where is the NIFS center located in Bangalore?",
    answer:
      "NIFS Bangalore campus is located at Brundavan Homes, House No. 1, 1st Floor, 103 E-Cross, Horamavu Agara, Hennur Gardens, Bangalore – 560043, Karnataka. For instant batch details, fee structure, and counseling, call +91-9986-425-655 or +91 83743 40999.",
  },
  {
    question: "Which industries hire safety officers near Bangalore?",
    answer:
      "Graduates from NIFS Bangalore are hired across Aerospace manufacturing, precision engineering, hyperscale data centers, and biotechnology processing clusters.",
  },
  {
    question: "What is the fee for Fire and Safety courses at NIFS in Bangalore?",
    answer:
      "Fees depend on the course and the batch. Call or WhatsApp this NIFS centre for the current fee and the next batch date.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Bangalore?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream) or ITI. For Advanced and PG Diplomas, see each course page or call this centre.Sc, B.Com, B.A, B.Tech/B.E).",
  },
  {
    question: "Does NIFS provide placement assistance in Bangalore?",
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
  title: "Fire and Safety Course in Bangalore | NIFS Karnataka",
  description:
    "NIFS Bangalore: fire and safety courses with an Acharya Nagarjuna University certificate. NSDC approved, 25+ years. Call or WhatsApp for fees.",
  alternates: { canonical: "/centers/bangalore/" },
  openGraph: {
    title: "Fire and Safety Course in Bangalore | NIFS Karnataka",
    description:
      "NIFS Bangalore: fire and safety courses with an Acharya Nagarjuna University certificate. NSDC approved, 25+ years. Call or WhatsApp for fees.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function BangaloreCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Bangalore", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Bangalore Center",
                alternateName: [
                  "NIFS Bangalore",
                  "National Institute of Fire and Safety Bangalore",
                ],
                url: PAGE_URL,
                telephone: "+919986425655",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Brundavan Homes, House No. 1, 1st Floor, 103 E-Cross, Horamavu Agara, Hennur Gardens, Bangalore – 560043, Karnataka",
                  addressLocality: "Bangalore",
                  addressRegion: "Karnataka",
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

      <FAQSchema faqs={BANGALORE_FAQS} />

      <BangalorePageView courses={featuredCourses} faqs={BANGALORE_FAQS} />
    </>
  );
}
