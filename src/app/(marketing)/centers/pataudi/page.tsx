import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
} from "@/lib/seo/schema";
import { courses } from "@/lib/data/courses";
import { PataudiPageView } from "./pataudi-page-view";

const PAGE_URL = "https://nifsindia.net/centers/pataudi/";

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

export const PATAUDI_FAQS = [
  {
    question: "Where is the NIFS center in Pataudi, Haryana?",
    answer:
      "NIFS Pataudi is located at C/o Kitty Garden Senior Secondary Public School, Palam–Gurgaon Road, Near Hanuman Mandir, Vill. Dundaheri, Dist. Gurgaon, Haryana – 122016. For instant directions and counseling, call +91 93132 34145 or +91 99911 69982.",
  },
  {
    question:
      "Is the Pataudi center suitable for students from nearby villages?",
    answer:
      "Yes, NIFS Pataudi serves students from Dundaheri, Pataudi town, Sohna, and surrounding villages in Gurgaon district with accessible batch timings.",
  },
  {
    question: "What is the fee for Fire and Safety courses in Pataudi?",
    answer:
      "Course fees at NIFS Pataudi range from ₹25,000 to ₹35,000 for Certificate programs, ₹35,000 to ₹55,000 for 1-Year Government-Approved Diplomas (DFS/DHSE), and ₹45,000 to ₹65,000 for the Advanced Diploma in Industrial Safety (ADIS). Flexible no-cost installment plans and merit concessions are available for upcoming 2026 batches.",
  },
  {
    question: "What is the minimum qualification required to join NIFS in Pataudi?",
    answer:
      "Eligibility varies by course level: Certificate and Diploma in Fire & Safety (DFS) require a minimum 10th or 10+2 (Intermediate in any stream: MPC, BiPC, CEC, MEC) or ITI. Advanced Diplomas (ADIS/ADFS) and PG Diplomas require a Polytechnic Diploma or Graduate Degree (B.Sc, B.Com, B.A, B.Tech/B.E). Fresh graduates from all streams are eligible.",
  },
  {
    question: "Which safety courses are available at Pataudi?",
    answer:
      "NIFS Pataudi offers the 1-Year Diploma in Fire & Safety (DFS), Advanced Diploma in Industrial Safety (ADIS), and certificate programs with placement assistance.",
  },
  {
    question: "Does NIFS provide 100% placement assistance in Gurgaon district?",
    answer:
      "Yes. NIFS provides dedicated placement assistance with over 45,000 placed alumni working across India and the Gulf. Recruiter partners include L&T, Adani, Maruti Suzuki, and Hero MotoCorp. Placement drives and interviews are organized regularly at our regional centers.",
  },
];

export const metadata: Metadata = {
  title: "Fire and Safety Course in Pataudi Haryana | Govt Approved NIFS (4.9★)",
  description:
    "Join Pataudi's premier Fire & Safety Officer training center on Palam-Gurgaon Road. 4.9★ on Google with 390+ reviews. NSDC approved 1-Year Diploma (DFS, ADIS), live practical yard drills, and 100% placement support.",
  alternates: { canonical: "/centers/pataudi/" },
  openGraph: {
    title: "Fire & Safety Officer Course in Pataudi Haryana | NIFS Institute",
    description:
      "Govt-approved ADIS, Diploma in Fire & Safety, and EHS programs in Pataudi, Gurgaon district. 4.9★ Google Rating, 45,000+ placements with L&T, Maruti Suzuki, and Gulf employers.",
    url: PAGE_URL,
    siteName: "NIFS India",
    locale: "en_IN",
    type: "website",
  },
};

export default function PataudiCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Training Centers", url: "https://nifsindia.net/centers/" },
          { name: "Pataudi", url: PAGE_URL },
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
                name: "National Institute of Fire and Safety (NIFS) — Pataudi Center",
                alternateName: [
                  "NIFS Pataudi",
                  "NIFS Dundaheri",
                  "National Institute of Fire and Safety Pataudi",
                ],
                url: PAGE_URL,
                telephone: "+919313234145",
                priceRange: "₹₹",
                image: "https://nifsindia.net/images/nifs-crest.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "C/o Kitty Garden Senior Secondary Public School, Palam–Gurgaon Road, Near Hanuman Mandir, Vill. Dundaheri",
                  addressLocality: "Dist. Gurgaon",
                  addressRegion: "Haryana",
                  postalCode: "122016",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 28.3670,
                  longitude: 76.9480,
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  bestRating: "5",
                  worstRating: "1",
                  reviewCount: "392",
                },
                review: [
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Manoj Lamba" },
                    datePublished: "2026-06-14",
                    reviewBody:
                      "Completed my DFS from NIFS Pataudi. Excellent faculty with real practical fire yard experience. Got placed in KMP Expressway logistics as Safety Officer.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: { "@type": "Person", name: "Sunil Jangra" },
                    datePublished: "2026-05-22",
                    reviewBody:
                      "Best fire safety institute near Gurgaon. The live training yard drill at Vizag was world-class. Currently working with Bosch Manesar as EHS Supervisor.",
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

      <FAQSchema faqs={PATAUDI_FAQS} />

      <PataudiPageView courses={featuredCourses} faqs={PATAUDI_FAQS} />
    </>
  );
}
