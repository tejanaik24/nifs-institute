import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { HyderabadPageView } from "./hyderabad-page-view";

const PAGE_URL = "https://nifsindia.net/centers/hyderabad/";

// High-intent featured courses for Hyderabad
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

// Localized AEO & FAQ Schema
export const HYDERABAD_FAQS = [
  {
    question: "Where is the NIFS training center located in Hyderabad?",
    answer:
      "The NIFS Hyderabad branch is located in Ameerpet at H.No. 7-1-619/A, Flat No. 301, Santhi Nilayam, SAP Street, Gayathri Nagar, Ameerpet, Hyderabad – 500016. It is situated just 250 meters (3-minute walk) from the Ameerpet Metro Interchange Station (Red & Blue Line). For instant directions and counseling, call +91 92466 16282 or +91 83743 40999.",
  },
  {
    question: "What is the fee for Fire and Safety Officer courses in Hyderabad?",
    answer:
      "Course fees at NIFS Hyderabad range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "Which fire and safety course is best for jobs in Hyderabad pharma companies?",
    answer:
      "The Advanced Diploma in Industrial Safety (ADIS) and Diploma in Health, Safety & Environment (DHSE) are the most demanded qualifications in Hyderabad's pharmaceutical hubs (Genome Valley, Pashamylaram, and Jeedimetla). These courses cover hazardous chemical safety, Hazchem storage, toxic gas handling, and statutory EHS compliance under the Factories Act.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Hyderabad?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Hyderabad and Gulf countries?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf (UAE, Saudi Arabia, Qatar, Oman). Recruiter partners include L&T, Adani, ITC, Hetero Drugs, Dr. Reddy's, Amazon, and MEIL. Placement drives and interviews are organized regularly at our regional centers.",
  },
  {
    question: "Are NIFS Hyderabad certifications recognized by the Government and industry?",
    answer:
      "Yes. NIFS courses are approved by NSDC (National Skill Development Corporation) and Skill India, certified under ISO 9001:2015, with academic university affiliations including Acharya Nagarjuna University (ANU). Certificates are officially accepted across private corporations, public sector undertakings (PSUs), and international Gulf recruitment agencies.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Hyderabad | Govt Approved NIFS Ameerpet (4.9★)",
  description:
    "Join Hyderabad's #1 rated Fire & Safety Officer training institute in Ameerpet. 4.9★ on Google with 480+ reviews. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support in Pharma & Gulf.",
  alternates: { canonical: "/centers/hyderabad/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Hyderabad | NIFS Institute Ameerpet",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Ameerpet, Hyderabad. 4.9★ Google Rating, 45,000+ placements with L&T, Dr. Reddy's, Hetero, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function HyderabadCenterPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Hyderabad (Ameerpet)", url: PAGE_URL },
        ]}
      />

      {/* Enhanced LocalBusiness & AggregateRating Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@id": `${PAGE_URL}#business`,
                "@type": ["LocalBusiness", "EducationalOrganization"],
                name: "National Institute of Fire and Safety (NIFS) — Hyderabad Center (Ameerpet)",
                alternateName: [
                  "NIFS Hyderabad",
                  "NIFS Ameerpet",
                  "National Institute of Fire and Safety Hyderabad",
                ],
                url: PAGE_URL,
                telephone: "+918374340999",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "H.No. 7-1-619/A, Flat No. 301, Santhi Nilayam, SAP Street, Gayathri Nagar, Ameerpet",
                  addressLocality: "Hyderabad",
                  addressRegion: "Telangana",
                  postalCode: "500016",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 17.4375,
                  longitude: 78.4482,
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  bestRating: "5",
                  worstRating: "1",
                  reviewCount: "482",
                },
                review: [
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "K. Sai Praneeth" },
                    datePublished: "2026-06-15",
                    reviewBody:
                      "Completed my ADIS course from NIFS Ameerpet branch. Excellent faculty with real practical fire yard experience. Got placed in Dr. Reddy's Laboratories as Junior EHS Officer.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Mohammed Irfan" },
                    datePublished: "2026-05-20",
                    reviewBody:
                      "Best fire safety institute in Hyderabad. The live training yard drill at Vizag was a game-changer. Currently working with L&T Metro project in Hyderabad.",
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

      {/* Course Schemas */}
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

      {/* FAQ Schema */}
      <FAQSchema faqs={HYDERABAD_FAQS} />

      {/* Animated Interactive Page View */}
      <HyderabadPageView courses={featuredCourses} faqs={HYDERABAD_FAQS} />
    </>
  );
}
