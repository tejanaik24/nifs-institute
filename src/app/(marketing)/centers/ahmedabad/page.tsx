import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { AhmedabadPageView } from "./ahmedabad-page-view";

const PAGE_URL = "https://nifsindia.net/centers/ahmedabad/";

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

export const AHMEDABAD_FAQS = [
  {
    question: "Where is the NIFS center in Ahmedabad?",
    answer:
      "NIFS Ahmedabad is located at 425, Kalasagar Shopping Hub, Near Satadhar Cross Road, Front of Saibaba Temple, Ghatlodia, Ahmedabad – 380061, Gujarat. For instant directions and counseling, call +91 79400 36356 or +91 98250 79730.",
  },
  {
    question: "Which safety course is best for Ahmedabad GIDC factory jobs?",
    answer:
      "The Advanced Diploma in Industrial Safety (ADIS) is ideal for GIDC factory roles in Naroda, Vatva, Sanand, and Changodar. The Diploma in Fire & Safety (DFS) is also popular for entry-level positions in pharmaceutical and chemical manufacturing units.",
  },
  {
    question: "What is the fee for Fire and Safety courses in Ahmedabad?",
    answer:
      "Course fees at NIFS Ahmedabad range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Ahmedabad?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Ahmedabad and Gulf countries?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf (UAE, Saudi Arabia, Qatar, Oman). Recruiter partners include Torrent Pharma, Cadila, L&T, Adani, and ITC. Placement drives and interviews are organized regularly at our regional centers.",
  },
  {
    question: "Does NIFS offer placement in Ahmedabad pharma companies?",
    answer:
      "Yes, NIFS provides placement assistance connecting graduates with Torrent Pharma, Zydus Cadila, Claris Lifesciences, and other pharma, chemical, and GIDC manufacturing employers across Ahmedabad, Gandhinagar, and surrounding industrial zones.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Ahmedabad | Govt Approved NIFS Ghatlodia",
  description:
    "Join Ahmedabad's top-rated Fire & Safety Officer training institute in Ghatlodia. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support in Pharma & GIDC.",
  alternates: { canonical: "/centers/ahmedabad/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Ahmedabad | NIFS Institute Ghatlodia",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Ahmedabad. 45,000+ placements with Torrent Pharma, Cadila, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function AhmedabadCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Ahmedabad (Ghatlodia)", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Ahmedabad Center (Ghatlodia)",
                alternateName: [
                  "NIFS Ahmedabad",
                  "NIFS Ghatlodia",
                  "National Institute of Fire and Safety Ahmedabad",
                ],
                url: PAGE_URL,
                telephone: "+917940036356",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "425, Kalasagar Shopping Hub, Near Satadhar Cross Road, Front of Saibaba Temple, Ghatlodia",
                  addressLocality: "Ahmedabad",
                  addressRegion: "Gujarat",
                  postalCode: "380061",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 23.0504,
                  longitude: 72.5313,
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

      <FAQSchema faqs={AHMEDABAD_FAQS} />

      <AhmedabadPageView courses={featuredCourses} faqs={AHMEDABAD_FAQS} />
    </>
  );
}
