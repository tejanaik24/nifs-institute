export type AboutCard = {
  title: string;
  body: string;
  meta?: string;
};

export type AboutSection =
  | {
      type: "split";
      items: { eyebrow: string; title: string; paragraphs: string[] }[];
    }
  | {
      type: "stats";
      stats: { value: string; label: string }[];
    }
  | {
      type: "cards";
      eyebrow?: string;
      title?: string;
      cols: 2 | 3;
      cards: AboutCard[];
    }
  | { type: "logos" }
  | { type: "list"; eyebrow: string; title: string; note?: string }
  | {
      type: "cta";
      eyebrow: string;
      title: string;
      body?: string;
    };

export type AboutPage = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; description?: string };
  sections: AboutSection[];
};

export const aboutPages: AboutPage[] = [
  {
    slug: "company-profile",
    seoTitle: "Company Profile — 25+ Years in Safety Training | NIFS India",
    seoDescription:
      "NIFS India: 25+ years, 70+ centers, 45,000+ alumni. NSDC approved, ISO 9001:2015 certified, HQ in Visakhapatnam.",
    hero: {
      eyebrow: "Company Profile",
      title: "25+ years of building India's industrial safety workforce",
      description:
        "NIFS is a unit of SSB Institute of Higher Studies Educational Society — NSDC approved, ISO 9001:2015 certified, and headquartered in Visakhapatnam.",
    },
    sections: [
      {
        type: "stats",
        stats: [
          { value: "25+", label: "Years of Excellence" },
          { value: "70+", label: "Centers Nationwide" },
          { value: "24", label: "States Covered" },
          { value: "45,000+", label: "Alumni Placed" },
        ],
      },
      {
        type: "split",
        items: [
          {
            eyebrow: "Who We Are",
            title: "A national training institution with a real track record",
            paragraphs: [
              "NIFS India — the National Institute of Fire & Safety — is a unit of the SSB Institute of Higher Studies Educational Society. From the classroom to the refinery floor, we turn classroom training into real industrial safety careers, trusted by recruiters across construction, EPC, manufacturing, and FMCG.",
              "Our real differentiator is a genuine university-recognized degree path through Acharya Nagarjuna University — so students can progress from certificate courses to B.Sc degrees while training hands-on in real hazard environments.",
            ],
          },
          {
            eyebrow: "What We Do",
            title: "Education, training, and industrial safety services",
            paragraphs: [
              "NIFS runs certificate, diploma, PG diploma, and degree programs in fire and industrial safety — plus a full industrial services division (IFESM) covering safety audits, compliance, emergency preparedness, and corporate training.",
              "Led by Chairman & CEO Sri. Suneel Mahanty (M.Sc., M.Phil. & MBA), the institute is guided by an advisory board of academic, legal, medical, and industrial safety specialists.",
            ],
          },
        ],
      },
      {
        type: "cards",
        eyebrow: "Our Journey",
        title: "Milestones",
        cols: 2,
        cards: [
          {
            meta: "Since 2004",
            title: "Training the industrial safety workforce",
            body: "NIFS has trained professionals in fire engineering and industrial safety for over two decades.",
          },
          {
            meta: "Network",
            title: "70+ centers across 24 states",
            body: "Learn near home, with the freedom to transfer between centers as the network grows.",
          },
          {
            meta: "Recognized",
            title: "NSDC & Skill India approved",
            body: "Government-recognized programs and ISO 9001:2015 certified systems across all centers.",
          },
          {
            meta: "Outcomes",
            title: "45,000+ alumni placed",
            body: "Graduates working as safety officers and EHS professionals at Adani, L&T, GMR, ITC, Amazon and more.",
          },
        ],
      },
    ],
  },
  {
    slug: "vision-mission",
    seoTitle: "Vision & Mission — Why NIFS Exists | NIFS India",
    seoDescription:
      "NIFS vision: to impart futuristic fire engineering and industrial safety education of global standards.",
    hero: {
      eyebrow: "Vision & Mission",
      title: "Why NIFS exists, and where we're headed",
      description:
        "The purpose that has guided NIFS for 25+ years and the direction we are moving — grounded in quality, discipline, and social responsibility.",
    },
    sections: [
      {
        type: "split",
        items: [
          {
            eyebrow: "Our Vision",
            title:
              "A global leader in fire engineering and industrial safety education",
            paragraphs: [
              "From a network of 70+ centers across 24 states, NIFS is building India's industrial safety workforce — recognized by NSDC and Skill India, ISO 9001:2015 certified, and trusted by 45,000+ alumni placed with companies like Adani, L&T, ITC, GMR, and Amazon.",
            ],
          },
          {
            eyebrow: "Our Mission",
            title:
              "To impart futuristic and comprehensive fire engineering and industrial safety education & consultancy of global standards",
            paragraphs: [
              "with a sense of high quality, discipline, and social respect. Every program NIFS runs — from certificate courses to university degree collaborations — is built to turn students into safety professionals ready for real industrial environments.",
            ],
          },
        ],
      },
      {
        type: "cards",
        eyebrow: "The Values We Train To",
        title: "Guiding principles",
        cols: 3,
        cards: [
          {
            title: "Quality",
            body: "ISO 9001:2015 certified systems across every center, curriculum, and training yard.",
          },
          {
            title: "Discipline",
            body: "Structured, industry-grade training that builds the habits safety careers demand.",
          },
          {
            title: "Social Respect",
            body: "Building a workforce that protects lives, plants, and communities across India.",
          },
        ],
      },
    ],
  },
  {
    slug: "accreditations",
    seoTitle: "Accreditations — NSDC, ISO 9001:2015 | NIFS India",
    seoDescription:
      "NIFS accreditations: NSDC, Skill India, Acharya Nagarjuna University, Annamalai University, National Safety Council, SBTET, ISO 9001:2015 certified.",
    hero: {
      eyebrow: "Accreditations",
      title: "Government recognized. University affiliated. ISO certified.",
      description:
        "Every NIFS program is backed by real government, university, and quality-system recognition — valid across India, the Gulf, and international markets.",
    },
    sections: [
      { type: "logos" },
      {
        type: "list",
        eyebrow: "What it means for you",
        title: "Recognition that travels with your career",
        note: "Certification from a government-approved institute means your qualification is valid for safety officer and EHS roles in India, the Gulf, and international markets.",
      },
    ],
  },
];
