export type Center = {
  city: string;
  state: string;
  isHQ?: boolean;
  /** Position as a percentage of the map's cropped content box (the actual
   * India land-mass bounding box within india-map-v2.png, NOT the full
   * canvas — the source PNG has ~23%/9%/20%/9% of transparent padding on
   * L/T/R/B baked in, so IndiaMap crops to this box via CSS transform to
   * fill the panel with less dead space). Calibrated by pixel-detecting
   * known landmarks (Kashmir tip, Kanyakumari, Kutch peninsula, Arunachal
   * tip), mapping each city's real lat/long onto that linear scale, then
   * remapping into the cropped-box coordinate space (see
   * IndiaMap.tsx's CROP_BOX constant for the crop math) — single source of
   * truth, used by both the map dots and any list/detail view. */
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
    x: 47.49,
    y: 64.8,
    address:
      "Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam (A.P.) – 530016",
  },
  { city: "Hyderabad", state: "Telangana", x: 31.62, y: 65.89 },
  { city: "Guntur", state: "Andhra Pradesh", x: 38.16, y: 69.75 },
  { city: "Chennai", state: "Tamil Nadu", x: 37.61, y: 81.31 },
  { city: "Bhubaneswar", state: "Odisha", x: 56.24, y: 55.46 },
  { city: "Kolkata", state: "West Bengal", x: 64.75, y: 47.31 },
  { city: "Mumbai", state: "Maharashtra", x: 12.8, y: 59.83 },
  { city: "Warangal", state: "Telangana", x: 35.34, y: 63.8 },
  { city: "Delhi", state: "Delhi NCR", x: 26.99, y: 25.34 },
  { city: "Kakinada", state: "Andhra Pradesh", x: 44.24, y: 67.3 },
  { city: "Jamshedpur", state: "Jharkhand", x: 57.5, y: 46.47 },
  { city: "Tambaram", state: "Tamil Nadu", x: 37.04, y: 81.86 },
  { city: "Nagpur", state: "Maharashtra", x: 33.64, y: 52.41 },
  { city: "Rourkela", state: "Odisha", x: 52.98, y: 48.42 },
  { city: "Pondicherry", state: "Puducherry", x: 36.06, y: 85.39 },
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
