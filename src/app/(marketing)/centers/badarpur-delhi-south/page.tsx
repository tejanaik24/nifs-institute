import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { BadarpurPageView } from "./badarpur-delhi-south-page-view";

const PAGE_URL = "https://nifsindia.net/centers/badarpur-delhi-south/";

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

export const BADARPUR_FAQS = [
  {
    question: "Where is the NIFS center in Badarpur, Delhi?",
    answer:
      "NIFS Badarpur is located at Office No. 31, 3rd Floor, Chaudhary Dharamveer Market, Opp. Badarpur Metro Station, Badarpur, New Delhi. For instant directions and counseling, call +91 99580 32663 or +91 95557 66661.",
  },
  {
    question:
      "Which industries hire safety officers near Badarpur and South Delhi?",
    answer:
      "The Badarpur Thermal Power Plant, Mohan Cooperative Industrial Estate, and Okhla Industrial Area Phase I & II are the primary employers of certified fire and safety officers in this zone.",
  },
  {
    question: "What is the fee for Fire and Safety courses in Badarpur?",
    answer:
      "Course fees at NIFS Badarpur range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Badarpur?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question:
      "Can I attend weekend batches at NIFS Badarpur while working?",
    answer:
      "Yes, NIFS offers flexible weekend and evening hybrid batches designed for working professionals in the South Delhi industrial belt. Contact +91 99580 32663 for batch schedules and enrollment.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Delhi NCR?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf. Recruiter partners include L&T, Adani, ITC, and major Delhi NCR industrial employers. Placement drives and interviews are organized regularly at our regional centers.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Badarpur Delhi South | Govt Approved NIFS",
  description:
    "Join Badarpur's premier Fire & Safety Officer training institute near Metro Station. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support.",
  alternates: { canonical: "/centers/badarpur-delhi-south/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Badarpur Delhi South | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Badarpur, South Delhi. 45,000+ placements with L&T, Adani, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function BadarpurCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Badarpur (Delhi South)", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Badarpur Center (Delhi South)",
                alternateName: [
                  "NIFS Badarpur",
                  "NIFS Badarpur Delhi South",
                  "National Institute of Fire and Safety Badarpur",
                ],
                url: PAGE_URL,
                telephone: "+919958032663",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Office No. 31, 3rd Floor, Chaudhary Dharamveer Market, Opp. Badarpur Metro Station, Badarpur",
                  addressLocality: "New Delhi",
                  addressRegion: "Delhi",
                  postalCode: "110044",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 28.4848,
                  longitude: 77.2996,
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

      <FAQSchema faqs={BADARPUR_FAQS} />

      <BadarpurPageView courses={featuredCourses} faqs={BADARPUR_FAQS} />
    </>
  );
}
