export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const primaryNav: NavItem[] = [
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "Certificate Course (CCFS)", href: "/courses/certificate-course-in-fire-safety" },
      { label: "Diploma in Fire & Safety", href: "/courses/diploma-in-fire-safety" },
      { label: "Diploma in HSE", href: "/courses/diploma-in-health-safety-environment" },
      { label: "Advanced Diploma (ADFS)", href: "/courses/advanced-diploma-in-fire-safety-adfs" },
      { label: "Advanced Diploma (ADIS)", href: "/courses/advanced-diploma-in-industrial-safety-adis" },
      { label: "PG Diploma in Fire & Safety", href: "/courses/pg-diploma-in-fire-safety-pg-dfs" },
      { label: "PG Diploma in HSE", href: "/courses/pg-diploma-in-health-safety-environment-pg-dhse" },
      { label: "B.Sc Fire & Industrial Safety", href: "/courses/b-sc-in-fire-industrial-safety" },
      { label: "B.Sc Health, Safety & Environment", href: "/courses/b-sc-in-health-safety-environment" },
      { label: "MBA in Safety Management", href: "/courses/mba-in-safety-management" },
    ],
  },
  {
    label: "Industrial Services",
    href: "/industrial-services",
    children: [
      { label: "In-House Training", href: "/industrial-services#in-house-training" },
      { label: "Corporate Training", href: "/industrial-services#corporate-training" },
      { label: "Safety Audits", href: "/industrial-services#safety-audits" },
      { label: "Manpower Consultancy", href: "/industrial-services#manpower-consultancy" },
    ],
  },
  { label: "Centers", href: "/centers" },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

// Explicit order for the mobile burger menu (Home | About | Courses |
// Industrial Services | Centers | Placements | Contact) — distinct from
// primaryNav's order/membership, which also drives the footer columns.
export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  primaryNav.find((item) => item.label === "Courses")!,
  primaryNav.find((item) => item.label === "Industrial Services")!,
  { label: "Centers", href: "/centers" },
  { label: "Placements", href: "/placements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  courses: "/courses",
  admissions: "/admissions",
  contact: "/contact",
};
