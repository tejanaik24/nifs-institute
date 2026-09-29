// Source: "ERGONOMIC SAFETY - free online course" (NIFS ES). Wording tightened, no new claims added.

export const COURSE_TAG = "NIFS ES - Ergonomic Safety (Free)";

export const chapters = [
  { id: "introduction", title: "Introduction" },
  { id: "outcomes", title: "Training outcomes" },
  { id: "importance", title: "Why it matters" },
  { id: "benefits", title: "Key benefits" },
  { id: "hazards", title: "Workplace hazards" },
  { id: "msd", title: "Musculoskeletal disorders" },
  { id: "principles", title: "Key principles" },
] as const;

export const outcomes = [
  "Understand the concept of ergonomics and its basic principles",
  "Identify ergonomic hazards in workstations",
  "Identify ergonomic risk factors and evaluate risk levels and severity",
  "Understand the importance of ergonomic safety",
  "Understand workplace design principles",
];

export const importance = [
  "Ergonomics principles",
  "Ergonomic hazards in the workplace",
  "Ergonomic risks associated with the workplace",
  "Applying ergonomic principles in workplace design",
  "Primary and secondary factors of musculoskeletal disorders (MSDs)",
  "Material handling equipment",
  "Various environmental risks",
];

export const benefits = [
  {
    title: "Reduce risk and injuries",
    body: "Prevent the awkward postures, repetitive strain and heavy lifting that cause musculoskeletal disorders (MSDs).",
  },
  {
    title: "Better posture and body mechanics",
    body: "Practical techniques for safe lifting, sitting, standing and tool handling in offices and industrial settings.",
  },
  {
    title: "Early preparedness and hazard reporting",
    body: "Recognise the early signs of physical strain and know when to report symptoms, before they become serious lost-time injuries.",
  },
  {
    title: "Lower direct and indirect costs",
    body: "Preventing workplace pain reduces absenteeism, healthcare expenses and workers' compensation claims.",
  },
];

export const hazards = [
  "Poor workstation setup",
  "Repetitive movements",
  "Prolonged static postures",
  "Forceful exertions",
  "Vibration",
  "Extreme temperatures",
  "Inadequate lighting",
  "Improper tools or equipment",
  "Stress and workload",
];

export const factors = [
  "Body posture",
  "Movement",
  "Environmental factors",
  "Information processing",
];

export const disorders = [
  "Musculoskeletal disorders (MSDs)",
  "Cumulative trauma disorders",
  "Repetitive motion injuries",
  "Back injuries",
  "Strains and sprains",
];

export const symptoms = [
  { label: "Pain", body: "Aching, throbbing, sharp or dull pain, sometimes constant, sometimes intermittent." },
  { label: "Stiffness", body: "Especially after rest or on waking, limiting movement." },
  { label: "Weakness", body: "Loss of strength or increased muscle fatigue." },
  { label: "Swelling", body: "Inflammation around joints or tissues, sometimes with warmth or redness." },
  { label: "Reduced range of motion", body: "Difficulty bending or moving joints fully." },
  { label: "Joint noises", body: "Clicking, popping or grinding sounds (crepitus)." },
  { label: "Numbness / tingling", body: "\"Pins and needles\", burning, or body parts \"falling asleep\"." },
  { label: "Tenderness", body: "Pain when a specific muscle or joint is touched." },
  { label: "Fatigue", body: "Feeling tired or lacking energy in the affected areas." },
];

export const principles = [
  { title: "Maintain neutral postures", body: "Work in natural, relaxed positions. Avoid awkward wrist, elbow, shoulder or back angles." },
  { title: "Work in the power zone", body: "Keep frequently used tools and items within easy reach, between mid-thigh and shoulder height, to minimise reaching." },
  { title: "Reduce excessive force", body: "Lighten loads, use larger muscles and mechanical assists, or ask for help to avoid straining." },
  { title: "Minimise excessive motion", body: "Optimise tasks to reduce repetitive movements, which can cause conditions like tendinitis." },
  { title: "Minimise static load", body: "Avoid holding one position for long. Use jigs or clamps to reduce manual positioning." },
  { title: "Minimise contact stress", body: "Avoid hard or sharp surfaces pressing on the body, which can restrict nerves and blood flow." },
  { title: "Allow movement and stretching", body: "Build in breaks, exercise and position changes to reduce fatigue and improve muscle balance." },
  { title: "Provide adequate clearance", body: "Leave enough space under desks and around workstations for proper leg and body positioning." },
  { title: "Keep a comfortable environment", body: "Control lighting (avoid glare), temperature, noise and vibration." },
];

export const assignment = [
  { q: "Why is ergonomic safety important at any workplace?", marks: 5 },
  { q: "Explain the symptoms of musculoskeletal disorders (MSDs).", marks: 5 },
];

export const faqs = [
  {
    question: "Is the Ergonomic Safety course really free?",
    answer: "Yes. The NIFS Ergonomic Safety course (course code NIFS ES) is a free online course. There is no fee to register, read the material, submit the assignment or take the final assessment.",
  },
  {
    question: "How long is the course?",
    answer: "Three hours in total: two hours of theory and one hour for assessment.",
  },
  {
    question: "How do I complete the course?",
    answer: "Four steps: register, download and read the study guide, submit the assignment (10 marks), then take the final assessment (20 marks).",
  },
  {
    question: "Will I get a certificate?",
    answer: "NIFS sends a certificate of completion after you finish the assignment and final assessment.",
  },
  {
    question: "Who is this course for?",
    answer: "Anyone who works at a desk, on a shop floor or on a site and wants to prevent work-related injuries: employees, supervisors, safety trainees and students. The material covers both office and industrial settings.",
  },
];

export const examRules = [
  "20 multiple-choice questions, 1 mark each. There is no negative marking.",
  "You have 10 minutes. The clock starts when you press Begin and cannot be paused.",
  "When the time is over, the exam is over. Your saved answers are submitted automatically and unanswered questions score zero.",
  "Every question must be answered before you can submit early.",
  "Closing or refreshing the page does not stop or reset the clock.",
  "Do not leave the exam window. Leaving it is recorded as a warning.",
  "One attempt only. Answers cannot be changed after submission.",
  "After the exam, your certificate is sent to your registered email within 3 days.",
];
