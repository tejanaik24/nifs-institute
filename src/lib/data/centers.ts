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

export const accreditations = [
  { name: "NSDC", desc: "National Skill Development Corporation" },
  { name: "Skill India", desc: "Ministry of Skill Development & Entrepreneurship" },
  { name: "Acharya Nagarjuna University", desc: "Academic Collaboration" },
  { name: "Annamalai University", desc: "Academic Collaboration" },
  { name: "National Safety Council", desc: "Affiliated Body" },
  { name: "SBTET", desc: "State Board of Technical Education, AP" },
  { name: "ISO 9001:2015", desc: "DNV GL IAF Certified" },
];
