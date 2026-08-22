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
  /** Overrides for the course detail page's <title>/H1/meta description — falls back to name/summary when unset. */
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
};

export const courses: Course[] = [
  {
    slug: "certificate-course-in-fire-safety",
    seoDescription: "A fast-track entry into industrial safety — fire prevention, PPE handling, and workplace hazard awareness for career starters.",
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
    seoDescription: "Fire engineering and site safety protocols, preparing graduates for supervisory-track roles on industrial and construction sites.",
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
    seoDescription: "Covers occupational health, environmental compliance, and workplace risk management for manufacturing and process industries.",
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
    seoDescription: "Fire engineering with hands-on drills at NIFS's practical training yard, for candidates targeting mid-level safety leadership roles.",
    name: "Advanced Diploma in Fire & Safety (ADFS)",
    shortName: "ADFS",
    tier: "Advanced Diploma",
    duration: "12 Months",
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
    duration: "12 Months",
    eligibility: "10+2 / Diploma (Any Stream)",
    mode: "Classroom / Online",
    summary:
      "Focused on plant-floor safety management — hazard control, machine safeguarding, and safety audits — for candidates aiming at core industrial safety officer roles.",
    subjects: ["Industrial Safety Management", "Machine Safeguarding", "Hazardous Zone Safety (HT/LT)", "Safety Audits & Inspections"],
    careers: ["Industrial Safety Officer", "Plant Safety Coordinator"],
    image: "/images/course-card-industrial-safety.jpg",
    seoTitle: "Advanced Diploma in Industrial Safety (ADIS) | NIFS India",
    h1: "Advanced Diploma in Industrial Safety — ADIS",
    seoDescription:
      "Plant-floor safety management — hazard control, machine safeguarding, and audits — for candidates aiming at safety officer roles.",
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
    seoDescription: "Graduate-level EHS management training aligned with international standards, for professionals targeting HSE roles at MNCs and EPC contractors.",
    name: "PG Diploma in Health, Safety & Environment (PG DHSE)",
    seoTitle: "PG Diploma in Health, Safety & Environment | NIFS India",
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
    seoDescription: "A 3-year degree preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance.",
    name: "B.Sc in Fire & Industrial Safety",
    shortName: "B.Sc FIS",
    tier: "B.Sc",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)",
    mode: "Classroom / Online",
    summary:
      "A full 3-year degree program preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance from day one of their career.",
    subjects: ["Fire Science & Engineering", "Industrial Safety Management", "Hazard Identification & Risk Assessment", "Fire Prevention & Control Techniques", "Emergency Planning & First Aid"],
    careers: ["Fire Safety Officer", "Industrial Safety Supervisor", "Emergency Response Coordinator", "Risk Analyst"],
    image: "/images/gallery-practical-yard.jpg",
  },
  {
    slug: "b-sc-honours-in-fire-industrial-safety",
    seoDescription: "An advanced 4-year honours degree with specialization in fire engineering, industrial safety management, and environmental risk.",
    name: "B.Sc (Honours) in Fire & Industrial Safety",
    shortName: "B.Sc (Hons) FIS",
    tier: "B.Sc",
    duration: "4 Years (8 Semesters)",
    eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)",
    mode: "Classroom / Online",
    summary:
      "An advanced 4-year honours degree program providing deep specialization in fire engineering, industrial safety management, environmental risk, and practical industry research.",
    subjects: ["Advanced Fire Science & Engineering", "Industrial Safety & Hygiene", "Environmental Risk Management", "Safety Legislation & Audits", "Honours Research Project & Internship"],
    careers: ["Senior Safety Officer", "Industrial Safety Specialist", "EHS Consultant", "Risk Analyst"],
    image: "/images/gallery-industrial-visit.jpg",
  },
  {
    slug: "diploma-in-industrial-safety-dis",
    seoDescription: "An NSDC-affiliated online diploma building foundational plant-floor safety skills — hazard spotting, PPE, and basic risk control.",
    name: "Diploma in Industrial Safety (DIS)",
    shortName: "DIS",
    tier: "Diploma",
    duration: "12 Months",
    eligibility: "10th / SSC / HSE",
    mode: "Online",
    summary:
      "An NSDC-affiliated online diploma building foundational plant-floor safety skills — hazard spotting, PPE discipline, and basic risk control for those starting an industrial safety career.",
    subjects: ["Industrial Hazard Awareness", "PPE & Safety Equipment", "Basic Risk Control", "Workplace Safety Practices"],
    careers: ["Safety Assistant", "Site Safety Trainee", "Industrial Safety Junior Officer"],
    image: "/images/classroom-lecture.jpg",
  },
  {
    slug: "advance-diploma-in-quality-health-safety-environment-adqhse",
    seoDescription: "An ANU-NIFS online program pairing quality management with health, safety & environment practice for combined QHSE roles.",
    name: "Advance Diploma in Quality Health Safety Environment (ADQHSE)",
    seoTitle: "Advance Diploma in Quality, Health & Safety | NIFS India",
    shortName: "ADQHSE",
    tier: "Advanced Diploma",
    duration: "One Year",
    eligibility: "Bachelor's Degree / Diploma (3 Yrs, Any Stream) / Equivalent",
    mode: "Online",
    summary:
      "An ANU-NIFS online program pairing quality management with health, safety & environment practice — for graduates aiming at combined QHSE roles across manufacturing and process industries.",
    subjects: ["Quality Management Systems", "Occupational Health & Environment", "Risk Assessment", "Regulatory Compliance"],
    careers: ["QHSE Officer", "Compliance Coordinator", "Quality & Safety Auditor"],
    image: "/images/control-room-risk-assessment.jpg",
  },
  {
    slug: "certificate-course-in-chemical-safety",
    name: "Certificate Course in Chemical Safety (CCCS)",
    shortName: "CCCS",
    tier: "Certificate",
    duration: "1 Month",
    eligibility: "10th / SSC / HSE",
    mode: "Online",
    summary:
      "A short NSDC-affiliated online certificate covering safe handling, storage, and emergency response for hazardous chemicals in industrial settings.",
    subjects: ["Hazardous Chemical Handling", "Chemical Storage Safety", "PPE for Chemical Exposure", "Spill & Emergency Response"],
    careers: ["Chemical Safety Assistant", "Site Safety Trainee"],
    image: "/images/training-ppe.png",
  },
  {
    slug: "certificate-course-in-construction-safety",
    name: "Certificate Course in Construction Safety (CCCS)",
    seoTitle: "Certificate Course in Construction Safety | NIFS India",
    shortName: "CCCS",
    tier: "Certificate",
    duration: "1 Month",
    eligibility: "10th / SSC / HSE",
    mode: "Online",
    summary:
      "A short NSDC-affiliated online certificate covering site hazard control, scaffolding & fall protection, and basic safety supervision on construction sites.",
    subjects: ["Construction Site Hazards", "Scaffolding & Fall Protection", "PPE on Site", "Basic Safety Supervision"],
    careers: ["Construction Safety Assistant", "Site Safety Trainee"],
    image: "/images/classroom-to-site-split-plant.jpg",
  },
  {
    slug: "industrial-safety-engineer-sbtet",
    seoDescription: "A full-time SBTET Andhra Pradesh-affiliated program for practicing engineers moving into dedicated industrial safety roles.",
    name: "Industrial Safety Engineer (SBTET)",
    shortName: "SBTET ISE",
    tier: "Advanced Diploma",
    duration: "One Year",
    eligibility: "Degree or Diploma in any branch of Engineering/Technology + 3 Years' Experience",
    mode: "Classroom (Regular, Full-Time)",
    summary:
      "A regular full-time program affiliated to the State Board of Technical Education & Training, Andhra Pradesh, for practicing engineers moving into dedicated industrial safety roles.",
    subjects: ["Industrial Safety Engineering", "Hazard Identification & Risk Assessment", "Safety Legislation", "Project & Practical Training"],
    careers: ["Industrial Safety Engineer", "Plant Safety Officer"],
    image: "/images/courses-classroom.png",
  },
];

export const courseTiers = ["Certificate", "Diploma", "Advanced Diploma", "PG Diploma", "B.Sc"] as const;
