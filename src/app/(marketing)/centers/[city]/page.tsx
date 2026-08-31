import { PageHero } from "@/components/sections/page-hero";
import { centers } from "@/lib/data/centers";
import { courses } from "@/lib/data/courses";
import {
  BreadcrumbSchema,
  CourseSchema,
  FAQSchema,
  LocalBusinessSchema,
} from "@/lib/seo/schema";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function slugifyCity(cityName: string): string {
  return cityName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// City-specific industrial ecosystems
const CITY_DATA: Record<
  string,
  {
    tagline: string;
    heroDesc: string;
    industries: { name: string; detail: string }[];
    localFaqs: { question: string; answer: string }[];
  }
> = {
  visakhapatnam: {
    tagline: "Headquarters & Practical Fire Ground",
    heroDesc:
      "Certificate, Diploma, ADIS & B.Sc programs run from NIFS's national headquarters in Dwarakanagar, with live fire training at our dedicated Practical Training Yard.",
    industries: [
      {
        name: "Visakhapatnam Steel Plant (RINL)",
        detail:
          "7.3 MTPA liquid steel capacity with over 25,000 workforce requiring continuous EHS monitoring.",
      },
      {
        name: "HPCL Visakhapatnam Refinery",
        detail:
          "India's premier east coast hydrocarbon processing refinery with high-hazard fire suppression protocols.",
      },
      {
        name: "Visakhapatnam Port & Gangavaram",
        detail:
          "Major bulk cargo and container terminals with strict maritime safety regulations.",
      },
      {
        name: "Jawaharlal Nehru Pharma City (JNPC)",
        detail:
          "Parawada pharma SEZ with 50+ bulk drug manufacturing units requiring dedicated safety officers.",
      },
      {
        name: "Hindustan Shipyard & Naval Dockyard",
        detail:
          "Heavy naval engineering, ship repair, and defense marine safety operations.",
      },
    ],
    localFaqs: [
      {
        question: "Where is NIFS located in Visakhapatnam?",
        answer:
          "NIFS national headquarters is located at Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam (A.P.) – 530016. Phone: +91 83743 40999.",
      },
      {
        question: "Does NIFS Visakhapatnam have a practical fire drill ground?",
        answer:
          "Yes, NIFS operates a dedicated Practical Fire Safety Training Yard in Visakhapatnam featuring live-fire suppression chambers, SCBA smoke labyrinths, and high-altitude rescue rigs.",
      },
      {
        question: "Which courses are most popular in Visakhapatnam?",
        answer:
          "The Advanced Diploma in Industrial Safety (ADIS), Diploma in Fire & Safety (DFS), and B.Sc in Fire & Industrial Safety are highly sought after by local steel, pharma, and petrochemical industries.",
      },
    ],
  },
  hyderabad: {
    tagline: "Telangana Central Hub",
    heroDesc:
      "Govt-approved Fire & Safety Officer training for Hyderabad's booming pharma hubs, IT corridors, data centers, and heavy engineering zones.",
    industries: [
      {
        name: "Genome Valley & Pharma Hub",
        detail:
          "Bharat Biotech, Dr. Reddy's, Aurobindo Pharma, and Hetero Drugs requiring specialized chemical EHS compliance.",
      },
      {
        name: "HITEC City & Data Center Corridor",
        detail:
          "Hyperscale data centers, multinational tech parks, and commercial towers mandating advanced fire alarm & suppression systems.",
      },
      {
        name: "BHEL, DRDO & Defense Aerospace",
        detail:
          "Heavy public sector electrical and defense manufacturing with strict factory act safety requirements.",
      },
      {
        name: "Cherlapally & Jeedimetla Industrial Estates",
        detail:
          "Over 2,000 SME manufacturing, fabrication, and chemical processing facilities.",
      },
    ],
    localFaqs: [
      {
        question: "Where is the NIFS center in Hyderabad?",
        answer:
          "NIFS operates active admissions and counseling centers in Hyderabad serving students across Telangana. Contact +91 83743 40999 for center location and batch schedules.",
      },
      {
        question:
          "Which safety course is best for jobs in Hyderabad pharma companies?",
        answer:
          "The Advanced Diploma in Industrial Safety (ADIS) and Diploma in Health, Safety & Environment (DHSE) are ideal for jobs in Genome Valley, Pashamylaram, and Jeedimetla pharma units.",
      },
      {
        question:
          "Are NIFS courses recognized for Telangana state factory inspectorates?",
        answer:
          "Yes, NIFS programs are NSDC and Skill India approved, ISO 9001:2015 certified, and accepted by industrial employers across Telangana.",
      },
    ],
  },
  vijayawada: {
    tagline: "Andhra Pradesh Commercial Hub",
    heroDesc:
      "Industrial safety and fire officer training serving the capital region, thermal power stations, Autonagar, and coastal logistics corridors.",
    industries: [
      {
        name: "Dr. Narla Tata Rao Thermal Power Station (NTTPS)",
        detail:
          "1,760 MW coal-fired mega power plant in Ibrahimpatnam with rigorous high-voltage and coal-handling safety protocols.",
      },
      {
        name: "Jawahar Autonagar",
        detail:
          "One of Asia's largest automobile body building and industrial fabrication hubs with over 1,500 industrial units.",
      },
      {
        name: "Vijayawada Railway Division & Gannavaram Airport",
        detail:
          "Vital transportation and cargo hub requiring emergency response and civil fire safety supervisors.",
      },
    ],
    localFaqs: [
      {
        question: "Where is NIFS located in Vijayawada?",
        answer:
          "NIFS Vijayawada center is located at Door No. 26-9-38, 2nd Floor, Yerneni Mansion, Gandhinagar, Vijayawada – 520003. Helpline: +91 95505 39202.",
      },
      {
        question:
          "Can 12th pass students join fire safety courses in Vijayawada?",
        answer:
          "Yes, 12th pass students from Science, Arts, or Commerce can enroll in the 1-Year Diploma in Fire & Safety (DFS) with full placement assistance.",
      },
    ],
  },
  guntur: {
    tagline: "University Campus Center",
    heroDesc:
      "Official Fire & Industrial Safety academic wing in collaboration with Acharya Nagarjuna University (ANU), Guntur.",
    industries: [
      {
        name: "Acharya Nagarjuna University Campus",
        detail:
          "Direct regular degree and diploma courses affiliated with UGC-recognized university.",
      },
      {
        name: "Spices & Agro-Processing Hub",
        detail:
          "Asia's largest chili market, cold storage complexes, and food processing plants with strict fire safety norms.",
      },
      {
        name: "Tobacco Board & Textile Mills",
        detail:
          "Combustible dust and chemical fumigation safety in major export processing zones.",
      },
    ],
    localFaqs: [
      {
        question: "Where is the NIFS Guntur branch?",
        answer:
          "NIFS runs programs at the Department of Fire and Industrial Safety, Acharya Nagarjuna University, Nagarjuna Nagar, Guntur – 522510. Phone: +91 78429 11536.",
      },
      {
        question: "What university degrees are offered at NIFS Guntur?",
        answer:
          "The 3-Year B.Sc in Fire and Industrial Safety is awarded in association with Acharya Nagarjuna University.",
      },
    ],
  },
  chennai: {
    tagline: "Tamil Nadu Automotive & Port Hub",
    heroDesc:
      "Premier Fire and Industrial Safety certification for the Detroit of Asia — automotive corridors, Sriperumbudur electronics SEZs, and Ennore port refineries.",
    industries: [
      {
        name: "Sriperumbudur & Oragadam Auto Corridor",
        detail:
          "Hyundai, Renault-Nissan, Royal Enfield, Daimler, and Ford automotive plants requiring machinery and robotic safety officers.",
      },
      {
        name: "Chennai Port & Kamarajar Port (Ennore)",
        detail:
          "High-volume container, petroleum, and coal terminals operating under strict maritime safety standards.",
      },
      {
        name: "CPCL Manali Petrochemicals",
        detail:
          "Refinery and fertilizer complex with stringent chemical process hazard management mandates.",
      },
    ],
    localFaqs: [
      {
        question: "How to apply for NIFS safety courses from Chennai?",
        answer:
          "Students from Chennai can enroll for regular classroom, weekend hybrid, or live virtual batches with hands-on practical yard training. Call +91 83743 40999 for enrollment.",
      },
      {
        question: "Are NIFS diplomas eligible for Gulf jobs from Chennai?",
        answer:
          "Yes, NIFS diplomas paired with NEBOSH IGC are widely accepted by Gulf employers hiring through Chennai recruitment channels.",
      },
    ],
  },
  bangalore: {
    tagline: "Karnataka Tech & Aerospace Center",
    heroDesc:
      "Accredited safety engineering programs tailored for aerospace, defense, electronic manufacturing, and hyperscale cloud data centers in Karnataka.",
    industries: [
      {
        name: "Aerospace & Defense Hub (HAL, ISRO, BEL)",
        detail:
          "Precision aerospace manufacturing, avionics, and defense fabrication requiring zero-defect safety standards.",
      },
      {
        name: "Peenya Industrial Area",
        detail:
          "One of South East Asia's largest industrial estates housing over 5,000 engineering and chemical units.",
      },
      {
        name: "Whitefield & Electronic City Data Centers",
        detail:
          "High-tier cloud infrastructure, clean agent fire suppression, and battery energy storage safety.",
      },
    ],
    localFaqs: [
      {
        question: "What is the fee for Safety Officer courses in Bangalore?",
        answer:
          "Course fees for 1-year diplomas range from ₹35,000 to ₹65,000 with flexible installment options. Contact +91 83743 40999 for details.",
      },
      {
        question: "Is ADIS course available in Bangalore?",
        answer:
          "Yes, NIFS offers the Advanced Diploma in Industrial Safety (ADIS) with complete practical drill support and campus placement.",
      },
    ],
  },
  mumbai: {
    tagline: "Maharashtra Industrial & Port Center",
    heroDesc:
      "Safety officer qualifications for Maharashtra's premier industrial belts — JNPT port, Thane-Belapur chemical zones, and high-rise commercial infrastructure.",
    industries: [
      {
        name: "Thane-Belapur & Rasayani Chemical Zone",
        detail:
          "Heavy specialty chemicals, petrochemicals, and hazardous bulk storage plants.",
      },
      {
        name: "Jawaharlal Nehru Port Trust (JNPT)",
        detail:
          "India's largest container port with intensive cargo handling, hazmat transportation, and crane safety.",
      },
      {
        name: "Mumbai High-Rise & Infrastructure Projects",
        detail:
          "Metro rail construction, coastal road, and skyscraper construction safety supervision.",
      },
    ],
    localFaqs: [
      {
        question: "Can I do fire safety training online from Mumbai?",
        answer:
          "Yes, NIFS provides online theory lectures combined with modular on-site practical training yard sessions.",
      },
      {
        question: "Which recruiters hire NIFS safety graduates in Mumbai?",
        answer:
          "L&T, Tata Projects, Shapoorji Pallonji, Reliance, and Godrej regularly recruit NIFS certified officers.",
      },
    ],
  },
  kolkata: {
    tagline: "Eastern India Industrial Gateway",
    heroDesc:
      "Leading Fire & Safety institute serving steel plants, Haldia petrochemicals, Kolkata port, and mining heavy industries across Eastern India.",
    industries: [
      {
        name: "Haldia Petrochemical Complex & Port",
        detail:
          "Refining, polymer manufacturing, and petrochemical tanker safety.",
      },
      {
        name: "Durgapur & Asansol Steel & Mining Belt",
        detail:
          "Blast furnace operations, heavy rolling mills, and underground coal mine safety.",
      },
      {
        name: "Syama Prasad Mookerjee Port & Jute Mills",
        detail:
          "Combustible fiber warehouse safety and maritime hazardous goods storage.",
      },
    ],
    localFaqs: [
      {
        question: "How to enroll for NIFS Fire and Safety courses in Kolkata?",
        answer:
          "Call our national admissions desk at +91 83743 40999 or apply online for immediate seat booking in upcoming batches.",
      },
    ],
  },
};

export function generateStaticParams() {
  const citySlugs = new Set<string>();
  for (const c of centers) {
    citySlugs.add(slugifyCity(c.city));
  }
  for (const slug of Object.keys(CITY_DATA)) {
    citySlugs.add(slug);
  }
  return Array.from(citySlugs).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const normalizedSlug = slugifyCity(city);
  const matchedCenter = centers.find(
    (c) => slugifyCity(c.city) === normalizedSlug,
  );
  const cityName =
    matchedCenter?.city ?? city.charAt(0).toUpperCase() + city.slice(1);
  const stateName = matchedCenter?.state ?? "India";

  return {
    title: `Fire and Safety Officer Course in ${cityName}, ${stateName} | NIFS India`,
    description: `Enroll in government-approved Fire and Safety Officer courses in ${cityName}, ${stateName}. 1-Year Diploma (DFS, ADIS), B.Sc degree, practical training yard, and 100% placement support.`,
    alternates: { canonical: `/centers/${normalizedSlug}/` },
  };
}

export default async function DynamicCenterPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const normalizedSlug = slugifyCity(city);
  const matchedCenter = centers.find(
    (c) => slugifyCity(c.city) === normalizedSlug,
  );
  const cityMeta = CITY_DATA[normalizedSlug];

  const cityName =
    matchedCenter?.city ??
    (cityMeta ? city.charAt(0).toUpperCase() + city.slice(1) : "");
  if (!cityName) notFound();

  const stateName = matchedCenter?.state ?? "India";
  const address =
    matchedCenter?.address ??
    `NIFS Information & Admissions Desk, ${cityName}, ${stateName}`;
  const phone = matchedCenter?.phones?.[0] ?? "8374340999";
  const phoneDisplay = `+91 ${phone}`;
  const phoneTel = `tel:+91${phone.replace(/[^0-9]/g, "")}`;
  const pageUrl = `https://nifsindia.net/centers/${normalizedSlug}/`;

  const topCourses = courses.slice(0, 3);
  const industries = cityMeta?.industries ?? [
    {
      name: `${cityName} Industrial & Manufacturing Plants`,
      detail: `Local factories and industrial units requiring statutory Safety Officers under the Factories Act 1948.`,
    },
    {
      name: `Construction & Infrastructure in ${cityName}`,
      detail: `High-rise, commercial complexes, and civil infrastructure projects hiring safety supervisors.`,
    },
    {
      name: `Warehousing, Logistics & Commercial Centers`,
      detail: `Supply chain facilities, hospitals, and malls mandating certified fire wardens.`,
    },
  ];

  const faqs = cityMeta?.localFaqs ?? [
    {
      question: `Which is the best Fire and Safety course in ${cityName}?`,
      answer: `The Advanced Diploma in Industrial Safety (ADIS) and 1-Year Diploma in Fire & Safety (DFS) are the top-rated courses for fast placement in ${cityName} and surrounding industrial zones.`,
    },
    {
      question: `What is the eligibility for Safety Officer training in ${cityName}?`,
      answer: `Students who have completed 10th, 12th (Science, Arts, Commerce), ITI, Polytechnic Diploma, or any Graduate Degree (B.Sc, B.Com, B.Tech) are eligible to apply.`,
    },
    {
      question: `Does NIFS provide placement assistance in ${cityName}?`,
      answer: `Yes, NIFS provides 100% placement support with over 45,000 alumni working in top recruiters like L&T, Adani, ITC, and Amazon across India and Gulf countries.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Centers", url: "https://nifsindia.net/centers/" },
          { name: cityName, url: pageUrl },
        ]}
      />
      <LocalBusinessSchema url={pageUrl} />
      {topCourses.map((c) => (
        <CourseSchema
          key={c.slug}
          name={c.name}
          description={c.summary}
          url={`https://nifsindia.net/courses/${c.slug}/`}
          duration={c.duration}
          tier={c.tier}
        />
      ))}
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36 bg-background text-foreground">
        <PageHero
          eyebrow={`NIFS Training Center • ${stateName}`}
          title={`Fire and Safety Officer Training in ${cityName}`}
          description={
            cityMeta?.heroDesc ??
            `Govt-approved NSDC & Skill India accredited Fire and Industrial Safety Officer programs serving ${cityName} and surrounding industrial belts.`
          }
        />

        {/* Quick Contact & WhatsApp Strip */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 py-6 sm:flex-row lg:px-10">
            <a
              href={`https://wa.me/918374340999?text=${encodeURIComponent(`Hi NIFS, I am looking for Fire & Safety courses in ${cityName}. Please provide fee and batch details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all"
            >
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={phoneTel}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>Call Helpline: {phoneDisplay}</span>
            </a>
            <Link
              href="/admissions"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Apply Online
            </Link>
          </div>
        </div>

        {/* Local Industries Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Industrial Hiring Demand in &amp; Around {cityName}
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Safety officers are statutory appointments legally required across{" "}
            {cityName}&apos;s industrial and commercial infrastructure.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <p className="font-bold text-foreground text-sm sm:text-base">
                  {ind.name}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ind.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Courses Available for {cityName} Students
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {topCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {course.tier} · {course.duration}
                  </span>
                  <p className="font-display mt-3 text-lg font-bold text-foreground group-hover:text-primary">
                    {course.name}
                  </p>
                  <p className="mt-2 flex-1 text-xs text-muted-foreground leading-relaxed">
                    {course.summary}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <span>View Curriculum</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Center Details & Address */}
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Why Choose NIFS in {cityName}?
              </h2>
              <ul className="space-y-3">
                {[
                  "Government recognized: NSDC, Skill India & State Board approved",
                  "25+ years educational legacy with 45,000+ placed alumni nationwide",
                  "Access to Asia's dedicated Practical Firefighting Training Yard in Visakhapatnam",
                  "Regular campus interview drives with L&T, Adani, ITC, Reliance & Amazon",
                  "Direct counseling and flexible batch timings (Classroom & Virtual)",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <MapPin className="h-5 w-5" /> NIFS {cityName} Center
              </div>
              <p className="text-sm text-foreground font-medium">{address}</p>
              <div className="pt-2 border-t border-border space-y-2">
                <p className="text-xs text-muted-foreground">
                  <strong>Contact Helpline:</strong> {phoneDisplay}
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Admissions Status:</strong> 2026 Batch Admissions Open
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/918374340999?text=${encodeURIComponent(`Hi NIFS, I want to visit the ${cityName} center or enroll for safety courses.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-3 text-sm font-bold text-white transition-all"
                >
                  <span>Chat on WhatsApp with {cityName} Desk</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Localized FAQ */}
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked
              Questions in {cityName}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 space-y-2"
                >
                  <h3 className="font-bold text-base text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
