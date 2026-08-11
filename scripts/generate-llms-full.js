// Regenerates public/llms-full.txt — a full company + course + blog
// listing for AI bulk ingestion. Run: node scripts/generate-llms-full.js
const fs = require("fs");
const path = require("path");

const blogPosts = require("../src/lib/data/blog-posts.json");

// courses.ts and centers.ts are TypeScript (not directly requirable from
// this plain Node script) — mirrored here from src/lib/data/courses.ts and
// src/lib/data/centers.ts. Update all three if a course/center ever changes.
const courses = [
  { slug: "certificate-course-in-fire-safety", name: "Certificate Course in Fire & Safety (CCFS)", duration: "3–6 Months", eligibility: "10th Pass / 10+2", mode: "Classroom / Online", summary: "A fast-track entry point into industrial safety — fire prevention fundamentals, PPE handling, and workplace hazard awareness for those starting their safety career." },
  { slug: "diploma-in-fire-safety", name: "Diploma in Fire & Safety (DFS)", duration: "1 Year", eligibility: "10+2 / ITI / Any Stream", mode: "Classroom / Online", summary: "Builds working knowledge of fire engineering and site safety protocols, preparing graduates for supervisory-track roles on industrial and construction sites." },
  { slug: "diploma-in-health-safety-environment", name: "Diploma in Health, Safety & Environment (DHSE)", duration: "1 Year", eligibility: "10+2 / ITI / Any Stream", mode: "Classroom / Online", summary: "Covers occupational health, environmental compliance, and workplace risk management — the core EHS skillset demanded across manufacturing, construction, and process industries." },
  { slug: "advanced-diploma-in-fire-safety-adfs", name: "Advanced Diploma in Fire & Safety (ADFS)", duration: "12 Months", eligibility: "10+2 / Diploma (Any Stream)", mode: "Classroom / Online", summary: "An in-depth program combining fire engineering with hands-on drills at NIFS's practical training yard, built for candidates targeting mid-level safety leadership roles." },
  { slug: "advanced-diploma-in-industrial-safety-adis", name: "Advanced Diploma in Industrial Safety (ADIS)", duration: "12 Months", eligibility: "10+2 / Diploma (Any Stream)", mode: "Classroom / Online", summary: "Focused on plant-floor safety management — hazard control, machine safeguarding, and safety audits — for candidates aiming at core industrial safety officer roles." },
  { slug: "pg-diploma-in-fire-safety-pg-dfs", name: "PG Diploma in Fire & Safety (PG DFS)", duration: "1 Year", eligibility: "Any Graduate", mode: "Classroom / Online", summary: "A graduate-level program for career-changers and professionals seeking to move into fire and safety management roles across large industrial operations." },
  { slug: "pg-diploma-in-health-safety-environment-pg-dhse", name: "PG Diploma in Health, Safety & Environment (PG DHSE)", duration: "1 Year", eligibility: "Any Graduate", mode: "Classroom / Online", summary: "Graduate-level EHS management training aligned with international standards — designed for professionals targeting HSE management roles at MNCs and EPC contractors." },
  { slug: "b-sc-in-fire-industrial-safety", name: "B.Sc in Fire & Industrial Safety", duration: "3 Years (6 Semesters)", eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)", mode: "Classroom / Online", summary: "A full 3-year degree program preparing students to manage fire hazards, implement safety protocols, and lead workplace safety compliance from day one of their career." },
  { slug: "b-sc-honours-in-fire-industrial-safety", name: "B.Sc (Honours) in Fire & Industrial Safety", duration: "4 Years (8 Semesters)", eligibility: "10+2 / ITI (2 Yrs) / Diploma (3 Yrs, Any Stream)", mode: "Classroom / Online", summary: "An advanced 4-year honours degree program providing deep specialization in fire engineering, industrial safety management, environmental risk, and practical industry research." },
  { slug: "diploma-in-industrial-safety-dis", name: "Diploma in Industrial Safety (DIS)", duration: "12 Months", eligibility: "10th / SSC / HSE", mode: "Online", summary: "An NSDC-affiliated online diploma building foundational plant-floor safety skills — hazard spotting, PPE discipline, and basic risk control for those starting an industrial safety career." },
  { slug: "advance-diploma-in-quality-health-safety-environment-adqhse", name: "Advance Diploma in Quality Health Safety Environment (ADQHSE)", duration: "One Year", eligibility: "Bachelor's Degree / Diploma (3 Yrs, Any Stream) / Equivalent", mode: "Online", summary: "An ANU-NIFS online program pairing quality management with health, safety & environment practice — for graduates aiming at combined QHSE roles across manufacturing and process industries." },
  { slug: "certificate-course-in-chemical-safety", name: "Certificate Course in Chemical Safety (CCCS)", duration: "1 Month", eligibility: "10th / SSC / HSE", mode: "Online", summary: "A short NSDC-affiliated online certificate covering safe handling, storage, and emergency response for hazardous chemicals in industrial settings." },
  { slug: "certificate-course-in-construction-safety", name: "Certificate Course in Construction Safety (CCCS)", duration: "1 Month", eligibility: "10th / SSC / HSE", mode: "Online", summary: "A short NSDC-affiliated online certificate covering site hazard control, scaffolding & fall protection, and basic safety supervision on construction sites." },
  { slug: "industrial-safety-engineer-sbtet", name: "Industrial Safety Engineer (SBTET)", duration: "One Year", eligibility: "Degree or Diploma in any branch of Engineering/Technology + 3 Years' Experience", mode: "Classroom (Regular, Full-Time)", summary: "A regular full-time program affiliated to the State Board of Technical Education & Training, Andhra Pradesh, for practicing engineers moving into dedicated industrial safety roles." },
];

const centers = [
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

const SITE_URL = "https://nifsindia.net";

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const lines = [];

lines.push("# National Institute of Fire and Safety (NIFS India)");
lines.push("");
lines.push("> Full company, course, and blog listing for AI bulk ingestion. See llms.txt for the short version.");
lines.push("");
lines.push("## Summary");
lines.push(
  "National Institute of Fire and Safety (NIFS) is India's premier vocational training institute for Fire Engineering, Industrial Safety, Health & Environment (HSE). Established in 2004, NIFS has trained over 45,000+ alumni working across top multinational corporations including Adani, L&T, ITC, GMR, and Amazon."
);
lines.push("");
lines.push("## Key Institutional Accreditations");
lines.push("- NSDC (National Skill Development Corporation) Approved Training Partner");
lines.push("- Skill India Recognized");
lines.push("- ISO 9001:2015 Certified Institution");
lines.push("- Academic Collaboration with Acharya Nagarjuna University (ANU)");
lines.push("- Academic Collaboration with Annamalai University");
lines.push("");

lines.push("## Courses (full list)");
for (const c of courses) {
  lines.push(`### ${c.name}`);
  lines.push(`- Duration: ${c.duration}`);
  lines.push(`- Eligibility: ${c.eligibility}`);
  lines.push(`- Mode: ${c.mode}`);
  lines.push(`- ${c.summary}`);
  lines.push(`- URL: ${SITE_URL}/courses/${c.slug}/`);
  lines.push("");
}

lines.push("## Centers");
lines.push(
  "NIFS operates training centers across India. Only the Head Office below has a verified street address; other centers are listed by city only."
);
for (const center of centers) {
  const label = center.isHQ ? `${center.city}, ${center.state} (Head Office)` : `${center.city}, ${center.state}`;
  lines.push(`- ${label}`);
}
lines.push("");

lines.push("## Head Office & Admissions Contact");
lines.push("- Address: Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam, Andhra Pradesh 530016");
lines.push("- Phone / WhatsApp: +91-8374-340-999");
lines.push("- Emails: headoffice@nifsindia.com, Counsellor@nifsindia.com");
lines.push("- Website: https://nifsindia.net");
lines.push("");

lines.push(`## Blog Posts (${blogPosts.length} total)`);
for (const post of blogPosts) {
  const excerpt = stripHtml(post.excerpt || "").slice(0, 200);
  lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}/) — ${excerpt}`);
}
lines.push("");

const out = lines.join("\n") + "\n";
fs.writeFileSync(path.join(__dirname, "../public/llms-full.txt"), out);
console.log(`Wrote public/llms-full.txt — ${courses.length} courses, ${centers.length} centers, ${blogPosts.length} blog posts`);
