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
  /** The specific accrediting/affiliating body for THIS course, only when its summary already states one — never inferred. */
  accreditedBy?: "NSDC" | "ANU" | "SBTET-AP";
  /** Real, research-backed FAQ (from GSC search data + verified PAA research) — never invented. Falls back to generic FAQ when unset. */
  faqs?: { question: string; answer: string }[];
};

export const courses: Course[] = [
  {
    slug: "certificate-course-in-fire-safety",
    faqs: [
      {
        question: "What is the Certificate Course in Fire and Safety (CCFS)?",
        answer:
          "CCFS is NIFS India's entry-level fire and safety course, 3-6 months long, open to candidates who have passed 10th or 10+2. It covers fire prevention basics, PPE and safety equipment handling, workplace hazard awareness, and first aid fundamentals, preparing you for roles like Safety Assistant, Fire Warden, or Site Safety Trainee.",
      },
      {
        question:
          "Is there a fire and safety certificate course near me / in India?",
        answer:
          "Yes. NIFS India runs the Certificate Course in Fire & Safety (CCFS) across its network of 86+ centers in 24 states, in classroom and online mode.",
      },
      {
        question: "What is the duration of a fire safety certificate course?",
        answer:
          "The NIFS Certificate Course in Fire & Safety (CCFS) runs 3-6 months, delivered in classroom or online mode.",
      },
      {
        question:
          "What jobs can you get after a fire safety certificate course?",
        answer:
          "Graduates of CCFS typically start as a Safety Assistant, Fire Warden, or Site Safety Trainee before progressing to supervisory safety roles.",
      },
    ],
    seoDescription:
      "A fast-track entry into industrial safety — fire prevention, PPE handling, and workplace hazard awareness for career starters.",
    name: "Certificate Course in Fire & Safety (CCFS)",
    shortName: "CCFS",
    tier: "Certificate",
    duration: "3–6 Months",
    eligibility: "10th Pass / 10+2",
    mode: "Classroom / Online",
    summary:
      "A fast-track entry point into industrial safety — fire prevention fundamentals, PPE handling, and workplace hazard awareness for those starting their safety career.",
    subjects: [
      "Fire Prevention Basics",
      "PPE & Safety Equipment",
      "Workplace Hazard Awareness",
      "First Aid Fundamentals",
    ],
    careers: ["Safety Assistant", "Fire Warden", "Site Safety Trainee"],
    image: "/images/courses/certificate-course-in-fire-safety.jpg",
  },
  {
    slug: "diploma-in-fire-safety",
    faqs: [
      {
        question: "What is the Diploma in Fire and Safety (DFS)?",
        answer:
          "DFS is a 1-year NIFS India diploma open to candidates with 10+2, ITI, or any stream background. It covers fire science & engineering, industrial safety fundamentals, emergency planning, and safety auditing basics, building toward supervisory-track roles like Fire & Safety Supervisor or Site Safety Officer.",
      },
      {
        question: "What is the eligibility for a diploma in fire and safety?",
        answer:
          "The NIFS Diploma in Fire & Safety (DFS) requires 10+2, ITI, or any stream as the minimum qualification.",
      },
      {
        question: "How long is the 1-year fire and safety diploma course?",
        answer:
          "The Diploma in Fire & Safety (DFS) at NIFS India is a 1-year program, offered in classroom or online mode.",
      },
      {
        question: "What is DFS qualification / what does DFS stand for?",
        answer:
          "DFS stands for Diploma in Fire & Safety — a 1-year NIFS India program covering fire science & engineering, industrial safety fundamentals, emergency planning, and safety auditing, leading to roles such as Fire & Safety Supervisor or Site Safety Officer.",
      },
    ],
    seoDescription:
      "Fire engineering and site safety protocols, preparing graduates for supervisory-track roles on industrial and construction sites.",
    name: "Diploma in Fire & Safety (DFS)",
    shortName: "DFS",
    tier: "Diploma",
    duration: "1 Year",
    eligibility: "10+2 / ITI / Any Stream",
    mode: "Classroom / Online",
    summary:
      "Builds working knowledge of fire engineering and site safety protocols, preparing graduates for supervisory-track roles on industrial and construction sites.",
    subjects: [
      "Fire Science & Engineering",
      "Industrial Safety Fundamentals",
      "Emergency Planning",
      "Safety Auditing Basics",
    ],
    careers: ["Fire & Safety Supervisor", "Site Safety Officer"],
    image: "/images/courses/diploma-in-fire-safety.jpg",
  },
  {
    slug: "diploma-in-health-safety-environment",
    faqs: [
      {
        question: "What does DHSE full form / DHSE mean?",
        answer:
          "DHSE stands for Diploma in Health, Safety & Environment — a 1-year NIFS India diploma covering occupational health, environmental management, risk assessment, and regulatory compliance, open to 10+2/ITI/any-stream candidates.",
      },
      {
        question:
          "What is the eligibility for the Diploma in Health, Safety & Environment?",
        answer:
          "The NIFS Diploma in Health, Safety & Environment (DHSE) requires 10+2, ITI, or any stream as the minimum qualification.",
      },
      {
        question: "What jobs can you get after a DHSE diploma?",
        answer:
          "DHSE graduates from NIFS India typically move into roles such as EHS Officer or Compliance Coordinator.",
      },
      {
        question: "What subjects are covered in the DHSE course?",
        answer:
          "The DHSE curriculum covers Occupational Health, Environmental Management, Risk Assessment, and Regulatory Compliance over the 1-year program.",
      },
    ],
    seoDescription:
      "Covers occupational health, environmental compliance, and workplace risk management for manufacturing and process industries.",
    name: "Diploma in Health, Safety & Environment (DHSE)",
    shortName: "DHSE",
    tier: "Diploma",
    duration: "1 Year",
    eligibility: "10+2 / ITI / Any Stream",
    mode: "Classroom / Online",
    summary:
      "Covers occupational health, environmental compliance, and workplace risk management — the core EHS skillset demanded across manufacturing, construction, and process industries.",
    subjects: [
      "Occupational Health",
      "Environmental Management",
      "Risk Assessment",
      "Regulatory Compliance",
    ],
    careers: ["EHS Officer", "Compliance Coordinator"],
    image: "/images/courses/diploma-in-health-safety-environment.jpg",
  },
  {
    slug: "advanced-diploma-in-fire-safety-adfs",
    faqs: [
      {
        question: "What does ADFS full form / stand for in safety?",
        answer:
          "ADFS stands for Advanced Diploma in Fire & Safety — a 12-month NIFS India program combining fire engineering with hands-on drills at NIFS's practical training yard, open to candidates with 10+2 or a diploma in any stream.",
      },
      {
        question: "What is the Advance Diploma in Fire and Safety course?",
        answer:
          "ADFS is a 12-month advanced diploma at NIFS India covering advanced fire engineering, hazard identification & risk assessment, fire prevention & control techniques, and emergency response planning, aimed at candidates targeting mid-level safety leadership roles such as Fire Safety Officer or Industrial Safety Supervisor.",
      },
      {
        question: "What is the eligibility for ADFS?",
        answer:
          "ADFS requires 10+2 or a Diploma in any stream as the minimum eligibility.",
      },
    ],
    seoDescription:
      "Fire engineering with hands-on drills at NIFS's practical training yard, for candidates targeting mid-level safety leadership roles.",
    name: "Advanced Diploma in Fire & Safety (ADFS)",
    shortName: "ADFS",
    tier: "Advanced Diploma",
    duration: "12 Months",
    eligibility: "10+2 / Diploma (Any Stream)",
    mode: "Classroom / Online",
    summary:
      "An in-depth program combining fire engineering with hands-on drills at NIFS's practical training yard, built for candidates targeting mid-level safety leadership roles.",
    subjects: [
      "Advanced Fire Engineering",
      "Hazard Identification & Risk Assessment",
      "Fire Prevention & Control Techniques",
      "Emergency Response Planning",
    ],
    careers: ["Fire Safety Officer", "Industrial Safety Supervisor"],
    image: "/images/training-yard-drill.jpg",
  },
  {
    slug: "advanced-diploma-in-industrial-safety-adis",
    faqs: [
      {
        question: "What is ADIS full form?",
        answer:
          "ADIS stands for Advanced Diploma in Industrial Safety — a 12-month NIFS India program under the Factories Act framework, focused on plant-floor safety management: hazard control, machine safeguarding, hazardous zone (HT/LT) safety, and safety audits & inspections.",
      },
      {
        question: "What is the eligibility and duration for the ADIS course?",
        answer:
          "ADIS requires 10+2 or a Diploma in any stream, and runs for 12 months in classroom or online mode.",
      },
      {
        question: "What jobs can you get after ADIS?",
        answer:
          "ADIS graduates from NIFS India go on to roles such as Industrial Safety Officer, Plant Safety Coordinator, and EHS Engineer, with placement support drawing on NIFS's recruiter network including L&T, Adani, and Amazon.",
      },
      {
        question: "Is ADIS the same as ADFS?",
        answer:
          "No. ADIS (Advanced Diploma in Industrial Safety) focuses on plant-floor industrial safety — machine safeguarding and hazardous zone safety — while ADFS (Advanced Diploma in Fire & Safety) focuses on fire engineering and fire prevention & control. Both are 12-month NIFS programs with the same 10+2/Diploma eligibility.",
      },
    ],
    name: "Advanced Diploma in Industrial Safety (ADIS)",
    shortName: "ADIS",
    tier: "Advanced Diploma",
    duration: "12 Months",
    eligibility: "10+2 / Diploma (Any Stream)",
    mode: "Classroom / Online",
    summary:
      "Focused on plant-floor safety management — hazard control, machine safeguarding, and safety audits — for candidates aiming at core industrial safety officer roles.",
    subjects: [
      "Industrial Safety Management",
      "Machine Safeguarding",
      "Hazardous Zone Safety (HT/LT)",
      "Safety Audits & Inspections",
    ],
    careers: [
      "Industrial Safety Officer",
      "Plant Safety Coordinator",
      "EHS Engineer",
    ],
    image: "/images/course-card-industrial-safety.jpg",
    seoTitle: "ADIS Full Form: Advanced Diploma in Industrial Safety | NIFS",
    h1: "Advanced Diploma in Industrial Safety — ADIS",
    seoDescription:
      "ADIS full form: Advanced Diploma in Industrial Safety, a 1-year NIFS India course under the Factories Act 1948. Eligibility, fees, syllabus & placement with L&T, Adani, Amazon.",
  },
  {
    slug: "pg-diploma-in-fire-safety-pg-dfs",
    faqs: [
      {
        question: "What is the PG Diploma in Fire and Safety (PG DFS)?",
        answer:
          "PG DFS is a 1-year graduate-level NIFS India program for career-changers and professionals moving into fire and safety management roles across large industrial operations. It requires any graduate degree as eligibility and covers fire risk engineering, safety management systems, legal & regulatory framework, and emergency response coordination.",
      },
      {
        question:
          "What is the eligibility for a PG diploma in fire and safety?",
        answer:
          "The NIFS PG Diploma in Fire & Safety (PG DFS) requires any graduate degree as the minimum eligibility.",
      },
      {
        question: "What career roles follow a PG Diploma in Fire and Safety?",
        answer:
          "PG DFS graduates from NIFS India typically move into roles such as Fire & Safety Manager or Emergency Response Coordinator.",
      },
    ],
    name: "PG Diploma in Fire & Safety (PG DFS)",
    shortName: "PG DFS",
    tier: "PG Diploma",
    duration: "1 Year",
    eligibility: "Any Graduate",
    mode: "Classroom / Online",
    summary:
      "A graduate-level program for career-changers and professionals seeking to move into fire and safety management roles across large industrial operations.",
    subjects: [
      "Fire Risk Engineering",
      "Safety Management Systems",
      "Legal & Regulatory Framework",
      "Emergency Response Coordination",
    ],
    careers: ["Fire & Safety Manager", "Emergency Response Coordinator"],
    image: "/images/course-card-fire-safety.jpg",
  },
  {
    slug: "pg-diploma-in-health-safety-environment-pg-dhse",
    faqs: [
      {
        question:
          "What is an HSE diploma / PG diploma in health, safety and environment?",
        answer:
          "The PG Diploma in Health, Safety & Environment (PG DHSE) at NIFS India is a 1-year graduate-level program aligned with international EHS management standards, requiring any graduate degree as eligibility. It covers HSE management systems, environmental compliance, behavioral safety, and incident investigation.",
      },
      {
        question: "What does PGDHSE mean / what is PGDHSE?",
        answer:
          "PGDHSE (PG DHSE) stands for PG Diploma in Health, Safety & Environment — a 1-year NIFS India program for professionals targeting HSE management roles at MNCs and EPC contractors.",
      },
      {
        question:
          "What jobs can you get after a PG diploma in health, safety and environment?",
        answer:
          "PG DHSE graduates from NIFS India typically move into roles such as HSE Manager or Risk Analyst.",
      },
    ],
    seoDescription:
      "Graduate-level EHS management training aligned with international standards, for professionals targeting HSE roles at MNCs and EPC contractors.",
    name: "PG Diploma in Health, Safety & Environment (PG DHSE)",
    seoTitle: "PG Diploma in Health, Safety & Environment | NIFS India",
    shortName: "PG DHSE",
    tier: "PG Diploma",
    duration: "1 Year",
    eligibility: "Any Graduate",
    mode: "Classroom / Online",
    summary:
      "Graduate-level EHS management training aligned with international standards — designed for professionals targeting HSE management roles at MNCs and EPC contractors.",
    subjects: [
      "HSE Management Systems",
      "Environmental Compliance",
      "Behavioral Safety",
      "Incident Investigation",
    ],
    careers: ["HSE Manager", "Risk Analyst"],
    image: "/images/corporate-training-onsite.jpg",
  },
  {
    slug: "b-sc-in-fire-industrial-safety",
    faqs: [
      {
        question:
          "What is a B.Sc in Fire and Industrial Safety / Fire Science degree?",
        answer:
          "The B.Sc in Fire & Industrial Safety at NIFS India is a full 3-year (6 semester) degree preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance from day one of their career. Eligibility is 10+2, ITI (2 years), or Diploma (3 years, any stream).",
      },
      {
        question: "Which colleges offer a B.Sc in fire and industrial safety?",
        answer:
          "NIFS India offers the B.Sc in Fire & Industrial Safety across its network of 86+ centers in 24 states, in classroom or online mode.",
      },
      {
        question:
          "What subjects are in the B.Sc fire and industrial safety syllabus?",
        answer:
          "The program covers Fire Science & Engineering, Industrial Safety Management, Hazard Identification & Risk Assessment, Fire Prevention & Control Techniques, and Emergency Planning & First Aid over 3 years.",
      },
      {
        question: "What careers are available after B.Sc in industrial safety?",
        answer:
          "Graduates move into roles such as Fire Safety Officer, Industrial Safety Supervisor, Emergency Response Coordinator, or Risk Analyst.",
      },
      {
        question: "Can I apply for this course online / study it online?",
        answer:
          "Yes — the B.Sc in Fire & Industrial Safety at NIFS India is available in both classroom and online mode.",
      },
    ],
    seoDescription:
      "A 3-year degree preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance.",
    name: "B.Sc in Fire & Industrial Safety",
    shortName: "B.Sc FIS",
    tier: "B.Sc",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)",
    mode: "Classroom / Online",
    summary:
      "A full 3-year degree program preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance from day one of their career.",
    subjects: [
      "Fire Science & Engineering",
      "Industrial Safety Management",
      "Hazard Identification & Risk Assessment",
      "Fire Prevention & Control Techniques",
      "Emergency Planning & First Aid",
    ],
    careers: [
      "Fire Safety Officer",
      "Industrial Safety Supervisor",
      "Emergency Response Coordinator",
      "Risk Analyst",
    ],
    image: "/images/gallery-practical-yard.jpg",
  },
  {
    slug: "b-sc-honours-in-fire-industrial-safety",
    faqs: [
      {
        question:
          "What is a B.Sc (Honours) in Fire and Industrial Safety and how is it different from the regular B.Sc?",
        answer:
          "The B.Sc (Honours) in Fire & Industrial Safety at NIFS India is a 4-year (8 semester) advanced degree, one year longer than the standard 3-year B.Sc, adding deeper specialization: advanced fire science & engineering, industrial safety & hygiene, environmental risk management, safety legislation & audits, plus an honours research project & internship.",
      },
      {
        question:
          "What is the eligibility for a B.Sc Honours fire safety course?",
        answer:
          "Eligibility for NIFS India's B.Sc (Honours) in Fire & Industrial Safety is 10+2, ITI (2 years), or Diploma (3 years, any stream) — the same entry point as the standard B.Sc, with the Honours track running an extra year.",
      },
      {
        question:
          "What careers can you pursue after a Fire & Industrial Safety honours degree?",
        answer:
          "NIFS India lists Senior Safety Officer, Industrial Safety Specialist, EHS Consultant, and Risk Analyst as career paths after the B.Sc (Honours).",
      },
    ],
    seoDescription:
      "An advanced 4-year honours degree with specialization in fire engineering, industrial safety management, and environmental risk.",
    name: "B.Sc (Honours) in Fire & Industrial Safety",
    shortName: "B.Sc (Hons) FIS",
    tier: "B.Sc",
    duration: "4 Years (8 Semesters)",
    eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)",
    mode: "Classroom / Online",
    summary:
      "An advanced 4-year honours degree program providing deep specialization in fire engineering, industrial safety management, environmental risk, and practical industry research.",
    subjects: [
      "Advanced Fire Science & Engineering",
      "Industrial Safety & Hygiene",
      "Environmental Risk Management",
      "Safety Legislation & Audits",
      "Honours Research Project & Internship",
    ],
    careers: [
      "Senior Safety Officer",
      "Industrial Safety Specialist",
      "EHS Consultant",
      "Risk Analyst",
    ],
    image: "/images/gallery-industrial-visit.jpg",
  },
  {
    slug: "diploma-in-industrial-safety-dis",
    faqs: [
      {
        question: "What is the Diploma in Industrial Safety (DIS)?",
        answer:
          "DIS is an NSDC-affiliated online diploma from NIFS India, 12 months long, open to candidates with 10th/SSC/HSE. It builds foundational plant-floor safety skills — hazard spotting, PPE discipline, and basic risk control — for those starting an industrial safety career.",
      },
      {
        question: "Is the Diploma in Industrial Safety NSDC certified?",
        answer:
          "Yes — NIFS India's Diploma in Industrial Safety (DIS) is NSDC-affiliated.",
      },
      {
        question: "What jobs can you get after a Diploma in Industrial Safety?",
        answer:
          "DIS graduates from NIFS India typically start as a Safety Assistant, Site Safety Trainee, or Industrial Safety Junior Officer.",
      },
    ],
    seoDescription:
      "An NSDC-affiliated online diploma building foundational plant-floor safety skills — hazard spotting, PPE, and basic risk control.",
    name: "Diploma in Industrial Safety (DIS)",
    shortName: "DIS",
    tier: "Diploma",
    duration: "12 Months",
    eligibility: "10th / SSC / HSE",
    mode: "Online",
    summary:
      "An NSDC-affiliated online diploma building foundational plant-floor safety skills — hazard spotting, PPE discipline, and basic risk control for those starting an industrial safety career.",
    subjects: [
      "Industrial Hazard Awareness",
      "PPE & Safety Equipment",
      "Basic Risk Control",
      "Workplace Safety Practices",
    ],
    careers: [
      "Safety Assistant",
      "Site Safety Trainee",
      "Industrial Safety Junior Officer",
    ],
    image: "/images/classroom-lecture.jpg",
    accreditedBy: "NSDC",
  },
  {
    slug: "advance-diploma-in-quality-health-safety-environment-adqhse",
    faqs: [
      {
        question: "What is ADQHSE / QHSE course full form?",
        answer:
          "ADQHSE stands for Advance Diploma in Quality Health Safety Environment — an ANU-NIFS online program pairing quality management with health, safety & environment practice, for graduates aiming at combined QHSE roles.",
      },
      {
        question: "What is the eligibility for the QHSE course?",
        answer:
          "NIFS India's ADQHSE requires a Bachelor's Degree, a 3-year Diploma (any stream), or an equivalent qualification, and runs for one year online.",
      },
      {
        question: "What jobs can you get after a QHSE diploma?",
        answer:
          "ADQHSE graduates from NIFS India typically move into roles such as QHSE Officer, Compliance Coordinator, or Quality & Safety Auditor.",
      },
    ],
    seoDescription:
      "An ANU-NIFS online program pairing quality management with health, safety & environment practice for combined QHSE roles.",
    name: "Advance Diploma in Quality Health Safety Environment (ADQHSE)",
    seoTitle: "Advance Diploma in Quality, Health & Safety | NIFS India",
    shortName: "ADQHSE",
    tier: "Advanced Diploma",
    duration: "One Year",
    eligibility: "Bachelor's Degree / Diploma (3 Yrs, Any Stream) / Equivalent",
    mode: "Online",
    summary:
      "An ANU-NIFS online program pairing quality management with health, safety & environment practice — for graduates aiming at combined QHSE roles across manufacturing and process industries.",
    subjects: [
      "Quality Management Systems",
      "Occupational Health & Environment",
      "Risk Assessment",
      "Regulatory Compliance",
    ],
    careers: [
      "QHSE Officer",
      "Compliance Coordinator",
      "Quality & Safety Auditor",
    ],
    image: "/images/control-room-risk-assessment.jpg",
    accreditedBy: "ANU",
  },
  {
    slug: "certificate-course-in-chemical-safety",
    faqs: [
      {
        question: "What is the Certificate Course in Chemical Safety?",
        answer:
          "NIFS India's Certificate Course in Chemical Safety (CCCS) is a short, NSDC-affiliated online course, 1 month long, covering hazardous chemical handling, chemical storage safety, PPE for chemical exposure, and spill & emergency response. Eligibility is 10th/SSC/HSE.",
      },
      {
        question: "What jobs can you get after a chemical safety certificate?",
        answer:
          "Graduates typically start as a Chemical Safety Assistant or Site Safety Trainee.",
      },
    ],
    name: "Certificate Course in Chemical Safety (CCCS)",
    shortName: "CCCS",
    tier: "Certificate",
    duration: "1 Month",
    eligibility: "10th / SSC / HSE",
    mode: "Online",
    summary:
      "A short NSDC-affiliated online certificate covering safe handling, storage, and emergency response for hazardous chemicals in industrial settings.",
    subjects: [
      "Hazardous Chemical Handling",
      "Chemical Storage Safety",
      "PPE for Chemical Exposure",
      "Spill & Emergency Response",
    ],
    careers: ["Chemical Safety Assistant", "Site Safety Trainee"],
    image: "/images/training-ppe.png",
    accreditedBy: "NSDC",
  },
  {
    slug: "certificate-course-in-construction-safety",
    faqs: [
      {
        question: "What is the Certificate Course in Construction Safety?",
        answer:
          "NIFS India's Certificate Course in Construction Safety (CCCS) is a short, NSDC-affiliated online course, 1 month long, covering construction site hazards, scaffolding & fall protection, PPE on site, and basic safety supervision. Eligibility is 10th/SSC/HSE.",
      },
      {
        question:
          "Are there construction safety courses in India / diploma courses in construction safety?",
        answer:
          "Yes — NIFS India offers a dedicated Certificate Course in Construction Safety online, alongside its broader diploma and advanced diploma safety programs.",
      },
      {
        question:
          "What roles can a construction safety officer course lead to?",
        answer:
          "NIFS India's Certificate Course in Construction Safety leads to entry roles such as Construction Safety Assistant or Site Safety Trainee.",
      },
    ],
    name: "Certificate Course in Construction Safety (CCCS)",
    seoTitle: "Certificate Course in Construction Safety | NIFS India",
    shortName: "CCCS",
    tier: "Certificate",
    duration: "1 Month",
    eligibility: "10th / SSC / HSE",
    mode: "Online",
    summary:
      "A short NSDC-affiliated online certificate covering site hazard control, scaffolding & fall protection, and basic safety supervision on construction sites.",
    subjects: [
      "Construction Site Hazards",
      "Scaffolding & Fall Protection",
      "PPE on Site",
      "Basic Safety Supervision",
    ],
    careers: ["Construction Safety Assistant", "Site Safety Trainee"],
    image: "/images/classroom-to-site-split-plant.jpg",
    accreditedBy: "NSDC",
  },
  {
    slug: "industrial-safety-engineer-sbtet",
    faqs: [
      {
        question: "What is SBTET full form / what does SBTET mean?",
        answer:
          "SBTET stands for the State Board of Technical Education & Training, Andhra Pradesh — the body that affiliates NIFS India's Industrial Safety Engineer program.",
      },
      {
        question: "What is the Industrial Safety Engineer (SBTET) course?",
        answer:
          "It's a one-year, full-time regular NIFS India program affiliated to SBTET Andhra Pradesh, for practicing engineers moving into dedicated industrial safety roles. Eligibility is a Degree or Diploma in any Engineering/Technology branch plus 3 years' experience.",
      },
      {
        question:
          "What jobs can you get after the SBTET industrial safety course?",
        answer:
          "Graduates typically move into roles such as Industrial Safety Engineer or Plant Safety Officer.",
      },
      {
        question:
          "What subjects does the SBTET industrial safety engineer course cover?",
        answer:
          "The one-year course covers Industrial Safety Engineering, Hazard Identification & Risk Assessment, Safety Legislation, and Project & Practical Training.",
      },
    ],
    seoDescription:
      "A full-time SBTET Andhra Pradesh-affiliated program for practicing engineers moving into dedicated industrial safety roles.",
    name: "Industrial Safety Engineer (SBTET)",
    shortName: "SBTET ISE",
    tier: "Advanced Diploma",
    duration: "One Year",
    eligibility:
      "Degree or Diploma in any branch of Engineering/Technology + 3 Years' Experience",
    mode: "Classroom (Regular, Full-Time)",
    summary:
      "A regular full-time program affiliated to the State Board of Technical Education & Training, Andhra Pradesh, for practicing engineers moving into dedicated industrial safety roles.",
    subjects: [
      "Industrial Safety Engineering",
      "Hazard Identification & Risk Assessment",
      "Safety Legislation",
      "Project & Practical Training",
    ],
    careers: ["Industrial Safety Engineer", "Plant Safety Officer"],
    image: "/images/courses-classroom.png",
    accreditedBy: "SBTET-AP",
  },
  {
    slug: "nebosh-igc",
    faqs: [
      {
        question: "What is NEBOSH IGC and is it recognized internationally?",
        answer:
          "NEBOSH IGC (International General Certificate) is a globally recognized occupational health & safety qualification. At NIFS India it's delivered in classroom or virtual live interactive mode over 10-14 days (modular) / 110 hours, essential for opportunities across Gulf countries (UAE, Saudi Arabia, Qatar, Oman), multinational construction, oil & gas operators, and top-tier industrial corporations.",
      },
      {
        question: "What is the eligibility for NEBOSH IGC?",
        answer:
          "NIFS India's NEBOSH IGC accepts 10+2, any degree, or working safety professionals/aspirants as eligible.",
      },
      {
        question: "What is covered in NEBOSH IGC (IG1, IG2)?",
        answer:
          "The course covers Unit IG1 (Management of Health and Safety, open book exam), Unit IG2 (Risk Assessment & Practical Application), workplace hazards identification & control strategies, and international health & safety legal frameworks including ISO 45001 standards.",
      },
      {
        question: "What jobs can you get with NEBOSH IGC certification?",
        answer:
          "NEBOSH IGC opens roles such as International HSE Officer, Offshore Safety Specialist, EHS Advisor & Consultant, and Corporate Safety Auditor.",
      },
    ],
    name: "NEBOSH International General Certificate (IGC)",
    shortName: "NEBOSH IGC",
    tier: "Certificate",
    duration: "10–14 Days (Modular) / 110 Hours",
    eligibility: "10+2 / Any Degree / Safety Aspirants & Working Professionals",
    mode: "Classroom / Virtual Live Interactive",
    summary:
      "The globally recognized gold standard in occupational health & safety management. Essential for career opportunities across Gulf countries (UAE, Saudi Arabia, Qatar, Oman), multinational construction, oil & gas operators, and top-tier industrial corporations.",
    subjects: [
      "Unit IG1: Management of Health and Safety (Open Book Examination)",
      "Unit IG2: Risk Assessment & Practical Application",
      "Workplace Hazards Identification & Control Strategies",
      "International Health and Safety Legal Frameworks & ISO 45001 Standards",
    ],
    careers: [
      "International HSE Officer",
      "Offshore Safety Specialist",
      "EHS Advisor & Consultant",
      "Corporate Safety Auditor",
    ],
    image: "/images/training-yard-drill.jpg",
    seoTitle:
      "NEBOSH IGC Course Training in India — Syllabus, Exam & Fees | NIFS India",
    h1: "NEBOSH International General Certificate (IGC) in Occupational Health & Safety",
    seoDescription:
      "Enroll in NEBOSH IGC training at NIFS India. Global standard OHS qualification, expert live training, comprehensive IG1/IG2 exam prep, and 100% placement support.",
  },
];

export const courseTiers = [
  "Certificate",
  "Diploma",
  "Advanced Diploma",
  "PG Diploma",
  "B.Sc",
] as const;
