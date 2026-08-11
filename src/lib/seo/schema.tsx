const ORG_ID = "https://nifsindia.net/#organization";
const WEBSITE_ID = "https://nifsindia.net/#website";
const LOCAL_BUSINESS_ID = "https://nifsindia.net/#hq";

const HQ_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:
    "Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor",
  addressLocality: "Visakhapatnam",
  addressRegion: "Andhra Pradesh",
  postalCode: "530016",
  addressCountry: "IN",
};

const COURSE_SERVICES = [
  { name: "Certificate Course in Fire & Safety (CCFS)", slug: "certificate-course-in-fire-safety" },
  { name: "Diploma in Fire & Safety (DFS)", slug: "diploma-in-fire-safety" },
  { name: "Diploma in Health, Safety & Environment (DHSE)", slug: "diploma-in-health-safety-environment" },
  { name: "Advanced Diploma in Fire & Safety (ADFS)", slug: "advanced-diploma-in-fire-safety-adfs" },
  { name: "Advanced Diploma in Industrial Safety (ADIS)", slug: "advanced-diploma-in-industrial-safety-adis" },
  { name: "PG Diploma in Fire & Safety (PG DFS)", slug: "pg-diploma-in-fire-safety-pg-dfs" },
  { name: "PG Diploma in Health, Safety & Environment (PG DHSE)", slug: "pg-diploma-in-health-safety-environment-pg-dhse" },
  { name: "B.Sc in Fire & Industrial Safety", slug: "b-sc-in-fire-industrial-safety" },
  { name: "B.Sc (Honours) in Fire & Industrial Safety", slug: "b-sc-honours-in-fire-industrial-safety" },
].map((c) => ({
  "@type": "Service",
  name: c.name,
  url: `https://nifsindia.net/courses/${c.slug}/`,
  provider: { "@id": ORG_ID },
}));

/**
 * Single combined @graph: Organization -> WebSite (with SpeakableSpecification)
 * -> LocalBusiness (Visakhapatnam HQ, the only center with a verified address).
 * The other 14 centers have no verified address/phone (see centers.ts) and are
 * deliberately not represented here to avoid fabricating LocalBusiness data.
 */
export function CombinedGraphSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@id": ORG_ID,
              "@type": "EducationalOrganization",
              name: "National Institute of Fire and Safety (NIFS)",
              alternateName: "NIFS India",
              url: "https://nifsindia.net",
              logo: "https://nifsindia.net/images/nifs-logo.png",
              description:
                "India's leading fire and industrial safety training institute since 2004. NSDC & Skill India approved, ISO 9001:2015 certified.",
              foundingDate: "2004",
              address: HQ_ADDRESS,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "admissions",
                telephone: "+918374340999",
                availableLanguage: ["English", "Hindi", "Telugu"],
              },
              sameAs: [
                "https://www.facebook.com/nifsindia",
                "https://www.instagram.com/nifsindia",
                "https://www.linkedin.com/company/nifs-india",
                "https://www.youtube.com/@nifsindia",
              ],
              makesOffer: COURSE_SERVICES,
            },
            {
              "@id": WEBSITE_ID,
              "@type": "WebSite",
              name: "NIFS India",
              url: "https://nifsindia.net",
              publisher: { "@id": ORG_ID },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://nifsindia.net/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", ".speakable-summary"],
              },
            },
            {
              "@id": LOCAL_BUSINESS_ID,
              "@type": ["LocalBusiness", "EducationalOrganization"],
              name: "National Institute of Fire and Safety (NIFS) — Visakhapatnam HQ",
              url: "https://nifsindia.net",
              telephone: "+918374340999",
              address: HQ_ADDRESS,
              parentOrganization: { "@id": ORG_ID },
            },
          ],
        }),
      }}
    />
  );
}

/**
 * Page-scoped LocalBusiness schema for a specific location landing page
 * (e.g. /centers/visakhapatnam/), distinct from the site-wide LocalBusiness
 * entity in CombinedGraphSchema — this one's @id matches the page it's on,
 * which is what a location landing page's structured data is supposed to do.
 */
export function LocalBusinessSchema({
  url,
  name = "National Institute of Fire and Safety (NIFS) — Visakhapatnam HQ",
}: {
  url: string;
  name?: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@id": `${url}#business`,
          "@type": ["LocalBusiness", "EducationalOrganization"],
          name,
          url,
          telephone: "+918374340999",
          address: HQ_ADDRESS,
          parentOrganization: { "@id": ORG_ID },
        }),
      }}
    />
  );
}

export function CourseSchema({
  name,
  description,
  url,
  duration,
  tier,
}: {
  name: string;
  description: string;
  url: string;
  duration: string;
  tier: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name,
          description,
          url,
          provider: {
            "@type": "EducationalOrganization",
            name: "NIFS India",
            url: "https://nifsindia.net",
          },
          educationalLevel: tier,
          occupationalCategory: "Fire Safety Officer",
          timeRequired: duration,
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }),
      }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}

