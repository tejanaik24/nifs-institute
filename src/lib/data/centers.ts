export type Center = {
  city: string;
  state: string;
  isHQ?: boolean;
  /** Position on the India map image, as a percentage of width/height.
   * Calibrated by pixel-detecting known landmarks (Kashmir tip, Kanyakumari,
   * Kutch peninsula, Arunachal tip) and mapping each city's real lat/long
   * onto that linear scale — single source of truth, used by both the map
   * dots and any list/detail view. */
  x: number;
  y: number;
  /** Only set for HQ — no verified street address exists for the other
   * centers, so don't fabricate one (see BRAIN.md "real facts" rule). */
  address?: string;
};

export const centers: Center[] = [
  {
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    isHQ: true,
    x: 49.68,
    y: 61.26,
    address:
      "Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam (A.P.) – 530016",
  },
  { city: "Hyderabad", state: "Telangana", x: 40.24, y: 62.24 },
  { city: "Guntur", state: "Andhra Pradesh", x: 44.13, y: 65.71 },
  { city: "Chennai", state: "Tamil Nadu", x: 43.8, y: 76.1 },
  { city: "Bhubaneswar", state: "Odisha", x: 54.89, y: 52.86 },
  { city: "Kolkata", state: "West Bengal", x: 59.95, y: 45.53 },
  { city: "Mumbai", state: "Maharashtra", x: 29.04, y: 56.79 },
  { city: "Warangal", state: "Telangana", x: 42.45, y: 60.36 },
  { city: "Delhi", state: "Delhi NCR", x: 37.48, y: 25.78 },
  { city: "Kakinada", state: "Andhra Pradesh", x: 47.75, y: 63.51 },
  { city: "Jamshedpur", state: "Jharkhand", x: 55.64, y: 44.78 },
  { city: "Tambaram", state: "Tamil Nadu", x: 43.46, y: 76.6 },
  { city: "Nagpur", state: "Maharashtra", x: 41.44, y: 50.12 },
  { city: "Rourkela", state: "Odisha", x: 52.95, y: 46.53 },
  { city: "Pondicherry", state: "Puducherry", x: 42.88, y: 79.77 },
];

/** Only HQ has a verified street address today — drives the detail-card
 * branch in CentersGrid so the other 14 centers never render fabricated
 * contact details. */
export function hasVerifiedAddress(c: Center): boolean {
  return !!c.address;
}

export const recruiters = [
  "Adani",
  "L&T",
  "MEIL",
  "GMR",
  "ITC",
  "Amazon",
  "Asian Paints",
  "Coca-Cola",
  "Power Mech",
  "Nilkamal",
  "NSL",
  "Sarda",
  "Rotek",
  "Rotopack",
  "KCP",
  "Interarch",
  "Petron",
  "Bothra",
  "Indwell",
  "Lansum",
  "Skillease",
];

export type Recruiter = { name: string; logo: string | null };

export const recruiterLogos: Recruiter[] = [
  { name: "Adani", logo: "/images/logos/recruiters/adani_logo.png" },
  { name: "Amazon", logo: "/images/logos/recruiters/amazon.png" },
  { name: "Asian Paints", logo: "/images/logos/recruiters/asianpaints.png" },
  { name: "Coca-Cola", logo: "/images/logos/recruiters/coca-cola.png" },
  { name: "GMR", logo: "/images/logos/recruiters/gmr.png" },
  { name: "ITC", logo: "/images/logos/recruiters/itc.png" },
  { name: "L&T", logo: "/images/logos/recruiters/lt.png" },
  { name: "MEIL", logo: "/images/logos/recruiters/meil.png" },
  { name: "Nilkamal", logo: "/images/logos/recruiters/nilkamal.png" },
  { name: "NSL", logo: "/images/logos/recruiters/nsl.png" },
  { name: "Power Mech", logo: "/images/logos/recruiters/power-mech.png" },
  { name: "KCP", logo: "/images/logos/recruiters/kcp.png" },
  { name: "Interarch", logo: "/images/logos/recruiters/interarch.png" },
  { name: "Petron", logo: "/images/logos/recruiters/petron.png" },
  { name: "Bothra", logo: "/images/logos/recruiters/bothra.png" },
  { name: "Indwell", logo: "/images/logos/recruiters/indwell.png" },
  { name: "Lansum", logo: "/images/logos/recruiters/lansum.png" },
  { name: "Skillease", logo: "/images/logos/recruiters/skillease.png" },
];

export const accreditations = [
  { name: "NSDC", desc: "National Skill Development Corporation" },
  { name: "Skill India", desc: "Ministry of Skill Development & Entrepreneurship" },
  { name: "Acharya Nagarjuna University", desc: "Academic Collaboration" },
  { name: "Annamalai University", desc: "Academic Collaboration" },
  { name: "National Safety Council", desc: "Affiliated Body" },
  { name: "SBTET", desc: "State Board of Technical Education, AP" },
  { name: "DNV IAF Management", desc: "ISO 9001:2015 Certified" },
  { name: "Lincon", desc: "Academic Collaboration" },
  { name: "QCFI", desc: "Quality Circle Forum of India" },
];

export const accreditationLogos: Recruiter[] = [
  { name: "NSDC", logo: "/images/logos/accreditations/nsdc.png" },
  { name: "Skill India", logo: "/images/logos/accreditations/skill-india.png" },
  {
    name: "Acharya Nagarjuna University",
    logo: "/images/logos/accreditations/acharya_nagaarjuna_university.jpg",
  },
  {
    name: "Annamalai University",
    logo: "/images/logos/accreditations/annamalai_university.png",
  },
  {
    name: "National Safety Council",
    logo: "/images/logos/accreditations/national-safety-council.png",
  },
  { name: "SBTET", logo: "/images/logos/accreditations/sbtet.png" },
  { name: "DNV IAF Management", logo: "/images/logos/accreditations/dnv-iaf-mgmt.png" },
  { name: "Lincon", logo: "/images/logos/accreditations/lincon.png" },
  { name: "QCFI", logo: "/images/logos/accreditations/qcfi.png" },
];
