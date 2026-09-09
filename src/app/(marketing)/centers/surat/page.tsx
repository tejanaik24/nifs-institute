import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { SuratPageView } from "./surat-page-view";

const PAGE_URL = "https://nifsindia.net/centers/surat/";

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

export const SURAT_FAQS = [
  {
    question: "Where is the NIFS center in Surat?",
    answer:
      "NIFS Surat is located at 304, 3rd Floor, Rajhans Stadium Plaza, Near L.P. Savani School, Palanpur, Gauravpath, Surat – 395009, Gujarat. For instant directions and counseling, call +91 92777 08217 or +91 99246 69967.",
  },
  {
    question: "Which safety course is best for Surat textile factory jobs?",
    answer:
      "The Advanced Diploma in Industrial Safety (ADIS) and the 1-Year Diploma in Fire & Safety (DFS) are most sought after for textile dyeing, printing, and chemical factory positions in Surat's Katargam, Varachha, and Udhana industrial zones.",
  },
  {
    question: "What is the fee for Fire and Safety courses in Surat?",
    answer:
      "Course fees at NIFS Surat range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Surat?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Surat and Gulf countries?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf (UAE, Saudi Arabia, Qatar, Oman). Recruiter partners include Reliance, L&T, Adani, ITC, and Hazira petrochemical employers. Placement drives and interviews are organized regularly at our regional centers.",
  },
  {
    question: "Are NIFS diplomas accepted by Gujarat factory inspectorates?",
    answer:
      "Yes. NIFS programs are NSDC and Skill India approved, ISO 9001:2015 certified, and recognized by industrial employers across Gujarat including the Hazira petrochemical belt and Surat textile manufacturing zones.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Surat | Govt Approved NIFS Gauravpath (4.9★)",
  description:
    "Join Surat's premier Fire & Safety Officer training institute in Gauravpath. 4.9★ on Google with 420+ reviews. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support in Textile & Petrochemical.",
  alternates: { canonical: "/centers/surat/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Surat | NIFS Institute Gauravpath",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Surat. 4.9★ Google Rating, 45,000+ placements with Reliance, L&T, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function SuratCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Surat (Gauravpath)", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Surat Center (Gauravpath)",
                alternateName: [
                  "NIFS Surat",
                  "NIFS Gauravpath",
                  "National Institute of Fire and Safety Surat",
                ],
                url: PAGE_URL,
                telephone: "+919277708217",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "304, 3rd Floor, Rajhans Stadium Plaza, Near L.P. Savani School, Palanpur, Gauravpath",
                  addressLocality: "Surat",
                  addressRegion: "Gujarat",
                  postalCode: "395009",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 21.1702,
                  longitude: 72.8311,
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  bestRating: "5",
                  worstRating: "1",
                  reviewCount: "423",
                },
                review: [
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Dharmesh Patel" },
                    datePublished: "2026-06-08",
                    reviewBody:
                      "Completed my ADIS from NIFS Surat. Excellent training for textile and chemical industry safety. Got placed in Reliance Industries Hazira as Safety Officer.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Priya Mehta" },
                    datePublished: "2026-05-12",
                    reviewBody:
                      "Best fire safety institute in Gujarat. The practical fire yard training was world-class. Working with Adani Hazira Port as EHS Coordinator.",
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

      <FAQSchema faqs={SURAT_FAQS} />

      <SuratPageView courses={featuredCourses} faqs={SURAT_FAQS} />
    </>
  );
}
