export type Course = {
  slug: string;
  name: string;
  shortName: string;
  tier: "Certificate" | "Diploma" | "Advanced Diploma" | "PG Diploma" | "B.Sc";
  duration: string;
  eligibility: string;
  mode: string;
  summary: string;
  subjects: string[];
  careers: string[];
  image: string;
};

export const courses: Course[] = [
  {
    slug: "certificate-course-in-fire-safety",
    name: "Certificate Course in Fire & Safety (CCFS)",
    shortName: "CCFS",
    tier: "Certificate",
    duration: "3–6 Months",
    eligibility: "10th Pass / 10+2",
    mode: "Classroom / Online",
    summary:
      "A fast-track entry point into industrial safety — fire prevention fundamentals, PPE handling, and workplace hazard awareness for those starting their safety career.",
    subjects: ["Fire Prevention Basics", "PPE & Safety Equipment", "Workplace Hazard Awareness", "First Aid Fundamentals"],
    careers: ["Safety Assistant", "Fire Warden", "Site Safety Trainee"],
    image: "/images/courses/certificate-course-in-fire-safety.jpg",
  },
  {
    slug: "diploma-in-fire-safety",
    name: "Diploma in Fire & Safety (DFS)",
    shortName: "DFS",
    tier: "Diploma",
    duration: "1 Year",
    eligibility: "10+2 / ITI / Any Stream",
    mode: "Classroom / Online",
    summary:
      "Builds working knowledge of fire engineering and site safety protocols, preparing graduates for supervisory-track roles on industrial and construction sites.",
    subjects: ["Fire Science & Engineering", "Industrial Safety Fundamentals", "Emergency Planning", "Safety Auditing Basics"],
    careers: ["Fire & Safety Supervisor", "Site Safety Officer"],
    image: "/images/courses/diploma-in-fire-safety.jpg",
  },
  {
    slug: "diploma-in-health-safety-environment",
    name: "Diploma in Health, Safety & Environment (DHSE)",
    shortName: "DHSE",
    tier: "Diploma",
    duration: "1 Year",
    eligibility: "10+2 / ITI / Any Stream",
    mode: "Classroom / Online",
    summary:
      "Covers occupational health, environmental compliance, and workplace risk management — the core EHS skillset demanded across manufacturing, construction, and process industries.",
    subjects: ["Occupational Health", "Environmental Management", "Risk Assessment", "Regulatory Compliance"],
    careers: ["EHS Officer", "Compliance Coordinator"],
    image: "/images/courses/diploma-in-health-safety-environment.jpg",
  },
  {
    slug: "advanced-diploma-in-fire-safety-adfs",
    name: "Advanced Diploma in Fire & Safety (ADFS)",
    shortName: "ADFS",
    tier: "Advanced Diploma",
    duration: "18 Months",
    eligibility: "10+2 / Diploma (Any Stream)",
    mode: "Classroom / Online",
    summary:
      "An in-depth program combining fire engineering with hands-on drills at NIFS's practical training yard, built for candidates targeting mid-level safety leadership roles.",
    subjects: ["Advanced Fire Engineering", "Hazard Identification & Risk Assessment", "Fire Prevention & Control Techniques", "Emergency Response Planning"],
    careers: ["Fire Safety Officer", "Industrial Safety Supervisor"],
    image: "/images/training-yard-drill.jpg",
  },
  {
    slug: "advanced-diploma-in-industrial-safety-adis",
    name: "Advanced Diploma in Industrial Safety (ADIS)",
    shortName: "ADIS",
    tier: "Advanced Diploma",
    duration: "18 Months",
    eligibility: "10+2 / Diploma (Any Stream)",
    mode: "Classroom / Online",
    summary:
      "Focused on plant-floor safety management — hazard control, machine safeguarding, and safety audits — for candidates aiming at core industrial safety officer roles.",
    subjects: ["Industrial Safety Management", "Machine Safeguarding", "Hazardous Zone Safety (HT/LT)", "Safety Audits & Inspections"],
    careers: ["Industrial Safety Officer", "Plant Safety Coordinator"],
    image: "/images/course-card-industrial-safety.jpg",
  },
  {
    slug: "pg-diploma-in-fire-safety-pg-dfs",
    name: "PG Diploma in Fire & Safety (PG DFS)",
    shortName: "PG DFS",
    tier: "PG Diploma",
    duration: "1 Year",
    eligibility: "Any Graduate",
    mode: "Classroom / Online",
    summary:
      "A graduate-level program for career-changers and professionals seeking to move into fire and safety management roles across large industrial operations.",
    subjects: ["Fire Risk Engineering", "Safety Management Systems", "Legal & Regulatory Framework", "Emergency Response Coordination"],
    careers: ["Fire & Safety Manager", "Emergency Response Coordinator"],
    image: "/images/course-card-fire-safety.jpg",
  },
  {
    slug: "pg-diploma-in-health-safety-environment-pg-dhse",
    name: "PG Diploma in Health, Safety & Environment (PG DHSE)",
    shortName: "PG DHSE",
    tier: "PG Diploma",
    duration: "1 Year",
    eligibility: "Any Graduate",
    mode: "Classroom / Online",
    summary:
      "Graduate-level EHS management training aligned with international standards — designed for professionals targeting HSE management roles at MNCs and EPC contractors.",
    subjects: ["HSE Management Systems", "Environmental Compliance", "Behavioral Safety", "Incident Investigation"],
    careers: ["HSE Manager", "Risk Analyst"],
    image: "/images/corporate-training-onsite.jpg",
  },
  {
    slug: "b-sc-in-fire-industrial-safety",
    name: "B.Sc in Fire & Industrial Safety",
    shortName: "B.Sc FIS",
    tier: "B.Sc",
    duration: "3 Years",
    eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)",
    mode: "Classroom / Online",
    summary:
      "A full degree program preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance from day one of their career.",
    subjects: ["Fire Science & Engineering", "Industrial Safety Management", "Hazard Identification & Risk Assessment", "Fire Prevention & Control Techniques", "Emergency Planning & First Aid"],
    careers: ["Fire Safety Officer", "Industrial Safety Supervisor", "Emergency Response Coordinator", "Risk Analyst"],
    image: "/images/gallery-practical-yard.jpg",
  },
  {
    slug: "b-sc-in-health-safety-environment",
    name: "B.Sc in Health, Safety & Environment",
    shortName: "B.Sc HSE",
    tier: "B.Sc",
    duration: "4 Years",
    eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)",
    mode: "Classroom / Online",
    summary:
      "A degree-level EHS program combining occupational health, environmental science, and industrial risk management — built for the corporate safety careers of today's EPC and manufacturing sector.",
    subjects: ["Occupational Health Science", "Environmental Risk Management", "Industrial Hygiene", "Safety Legislation"],
    careers: ["HSE Officer", "Environmental Compliance Analyst", "Industrial Hygienist"],
    image: "/images/gallery-industrial-visit.jpg",
  },
];

export const courseTiers = ["Certificate", "Diploma", "Advanced Diploma", "PG Diploma", "B.Sc"] as const;
