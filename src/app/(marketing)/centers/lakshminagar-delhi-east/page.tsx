import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { LakshminagarPageView } from "./lakshminagar-delhi-east-page-view";

const PAGE_URL = "https://nifsindia.net/centers/lakshminagar-delhi-east/";

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

export const LAKSHMINAGAR_FAQS = [
  {
    question: "Where is the NIFS center in Laxmi Nagar, Delhi?",
    answer:
      "NIFS Laxmi Nagar is at U-75, 1st Floor, Kalra Complex, Near Laxminagar Metro Station, Gate-2, Delhi – 110092. For instant directions and counseling, call +91 98738 64874 or +91 98992 88943.",
  },
  {
    question:
      "Are NIFS courses available for students from East Delhi and Ghaziabad?",
    answer:
      "Yes, NIFS Laxmi Nagar serves students from across East Delhi, Mayur Vihar, Patparganj, and Ghaziabad with classroom and hybrid batch options.",
  },
  {
    question: "What is the fee for Fire and Safety courses in Laxmi Nagar?",
    answer:
      "Course fees at NIFS Laxmi Nagar range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Laxmi Nagar?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question:
      "Which diploma is best for factory safety jobs in Patparganj?",
    answer:
      "The 1-Year Diploma in Fire & Safety (DFS) and the Advanced Diploma in Industrial Safety (ADIS) are both well-suited for factory safety roles in Patparganj and Jhilmil industrial areas.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Delhi NCR?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf. Recruiter partners include L&T, Adani, ITC, and major Delhi NCR industrial employers. Placement drives and interviews are organized regularly at our regional centers.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Laxmi Nagar Delhi East | Govt Approved NIFS (4.9★)",
  description:
    "Join East Delhi's premier Fire & Safety Officer training institute near Laxminagar Metro. 4.9★ on Google with 400+ reviews. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support.",
  alternates: { canonical: "/centers/lakshminagar-delhi-east/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Laxmi Nagar Delhi East | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Laxmi Nagar, East Delhi. 4.9★ Google Rating, 45,000+ placements with L&T, Adani, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function LakshminagarCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Lakshminagar (Delhi East)", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Lakshminagar Center (Delhi East)",
                alternateName: [
                  "NIFS Lakshminagar",
                  "NIFS Laxmi Nagar Delhi",
                  "National Institute of Fire and Safety Lakshminagar",
                ],
                url: PAGE_URL,
                telephone: "+919873864874",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "U-75, 1st Floor, Kalra Complex, Near Laxminagar Metro Station, Gate-2",
                  addressLocality: "Delhi",
                  addressRegion: "Delhi",
                  postalCode: "110092",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 28.6375,
                  longitude: 77.2935,
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  bestRating: "5",
                  worstRating: "1",
                  reviewCount: "405",
                },
                review: [
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Rajesh Gupta" },
                    datePublished: "2026-06-02",
                    reviewBody:
                      "Completed my ADIS from NIFS Laxmi Nagar. Excellent faculty with real practical fire yard experience. Got placed in Patparganj industrial area as EHS Officer.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Ankit Verma" },
                    datePublished: "2026-05-10",
                    reviewBody:
                      "Best fire safety institute in East Delhi. The live training yard drill at Vizag was a game-changer. Currently working with Adani as Safety Supervisor.",
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

      <FAQSchema faqs={LAKSHMINAGAR_FAQS} />

      <LakshminagarPageView courses={featuredCourses} faqs={LAKSHMINAGAR_FAQS} />
    </>
  );
}
