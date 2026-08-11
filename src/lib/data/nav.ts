export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: { label: string; href: string; description?: string; external?: boolean }[];
};

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Chairman's Desk", href: "/about", description: "Our history, vision & mission" },
      { label: "Governance & Advisors", href: "/about/governance", description: "Board of Advisors & organization hierarchy" },
    ],
  },
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
      { label: "B.Sc (Honours) in Fire & Industrial Safety", href: "/courses/b-sc-honours-in-fire-industrial-safety" },
      { label: "Online Courses", href: "/courses/online", description: "All online-mode programs in one place" },
    ],
  },
  { label: "Placements", href: "/placements" },
  {
    label: "Industrial Services",
    href: "https://ifesm.com/",
    external: true,
    children: [
      { label: "Fire Engineering Services", href: "https://ifesm.com/", external: true },
      { label: "Industrial Safety Services", href: "https://ifesm.com/", external: true },
      { label: "Occupational Health & Environment", href: "https://ifesm.com/", external: true },
      { label: "HSE Consultancy & Compliance", href: "https://ifesm.com/", external: true },
      { label: "Safety Audits & Inspections", href: "https://ifesm.com/", external: true },
      { label: "Emergency Preparedness", href: "https://ifesm.com/", external: true },
      { label: "Corporate & In-House Trainings", href: "https://ifesm.com/", external: true },
      { label: "Manpower Deployment", href: "https://ifesm.com/", external: true },
      { label: "AI-Enabled Digital Safety", href: "https://ifesm.com/", external: true },
      { label: "Technical Education", href: "https://ifesm.com/", external: true },
    ],
  },
  { label: "Centers", href: "/centers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  primaryNav.find((item) => item.label === "About")!,
  primaryNav.find((item) => item.label === "Courses")!,
  { label: "Placements", href: "/placements" },
  primaryNav.find((item) => item.label === "Industrial Services")!,
  { label: "Centers", href: "/centers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  courses: "/courses",
  admissions: "/admissions",
  contact: "/contact",
};
