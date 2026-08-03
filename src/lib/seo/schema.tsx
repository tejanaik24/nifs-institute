export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "National Institute of Fire and Safety (NIFS)",
          alternateName: "NIFS India",
          url: "https://nifsindia.net",
          logo: "https://nifsindia.net/images/nifs-logo.png",
          description:
            "India's leading fire and industrial safety training institute since 2004. NSDC & Skill India approved, ISO 9001:2015 certified.",
          foundingDate: "2004",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor",
            addressLocality: "Visakhapatnam",
            addressRegion: "Andhra Pradesh",
            postalCode: "530016",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "admissions",
            availableLanguage: ["English", "Hindi", "Telugu"],
          },
          sameAs: [
            "https://www.facebook.com/nifsindia",
            "https://www.instagram.com/nifsindia",
            "https://www.linkedin.com/company/nifs-india",
            "https://www.youtube.com/@nifsindia",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Fire & Safety Courses",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Certificate Course in Fire & Safety (CCFS)",
                  url: "https://nifsindia.net/courses/certificate-course-in-fire-safety/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Diploma in Fire & Safety (DFS)",
                  url: "https://nifsindia.net/courses/diploma-in-fire-safety/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Diploma in Health, Safety & Environment (DHSE)",
                  url: "https://nifsindia.net/courses/diploma-in-health-safety-environment/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Advanced Diploma in Fire & Safety (ADFS)",
                  url: "https://nifsindia.net/courses/advanced-diploma-in-fire-safety-adfs/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Advanced Diploma in Industrial Safety (ADIS)",
                  url: "https://nifsindia.net/courses/advanced-diploma-in-industrial-safety-adis/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "PG Diploma in Fire & Safety (PG DFS)",
                  url: "https://nifsindia.net/courses/pg-diploma-in-fire-safety-pg-dfs/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "PG Diploma in Health, Safety & Environment (PG DHSE)",
                  url: "https://nifsindia.net/courses/pg-diploma-in-health-safety-environment-pg-dhse/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "B.Sc in Fire & Industrial Safety",
                  url: "https://nifsindia.net/courses/b-sc-in-fire-industrial-safety/",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "B.Sc (Honours) in Fire & Industrial Safety",
                  url: "https://nifsindia.net/courses/b-sc-honours-in-fire-industrial-safety/",
                },
              },
            ],
          },
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

export function WebsiteSearchActionSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "NIFS India",
          url: "https://nifsindia.net",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://nifsindia.net/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  );
}
