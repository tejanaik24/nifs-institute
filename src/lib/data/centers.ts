export type Center = {
  city: string;
  state: string;
  isHQ?: boolean;
};

export const centers: Center[] = [
  { city: "Visakhapatnam", state: "Andhra Pradesh", isHQ: true },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Guntur", state: "Andhra Pradesh" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Bhubaneswar", state: "Odisha" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Warangal", state: "Telangana" },
  { city: "Delhi", state: "Delhi NCR" },
  { city: "Kakinada", state: "Andhra Pradesh" },
  { city: "Jamshedpur", state: "Jharkhand" },
  { city: "Tambaram", state: "Tamil Nadu" },
  { city: "Nagpur", state: "Maharashtra" },
  { city: "Rourkela", state: "Odisha" },
  { city: "Pondicherry", state: "Puducherry" },
];

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
