// Builds public/downloads/NIFS-Ergonomic-Safety-Study-Guide.pdf from the course data, so site and PDF never drift.
// Run: node scripts/pdf/build-study-guide.mjs   (Node 24 runs the .ts data file directly; uses installed Edge to print.)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "../..");
const d = await import(pathToFileURL(path.join(root, "src/components/sections/ergonomic-course/course-data.ts")).href);
const logo = "data:image/png;base64," + fs.readFileSync(path.join(root, "public/images/nifs-official-logo-v3.png")).toString("base64");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const li = (a) => a.map((x) => `<li>${esc(x)}</li>`).join("");
const num = (i) => String(i + 1).padStart(2, "0");

const figure = (neutral) => neutral
  ? `<svg viewBox="0 0 320 420"><rect x="20" y="112" width="280" height="168" fill="#DC171122" stroke="#DC1711" stroke-dasharray="6 5"/><line x1="20" y1="392" x2="300" y2="392" stroke="#cfc8bb" stroke-width="2"/><rect x="222" y="176" width="44" height="34" fill="#DC1711"/><g stroke="#141414" fill="none" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M150 232 L134 390 M150 232 L166 390"/><path d="M150 232 L150 130"/><path d="M150 134 L150 186 L216 190"/></g><circle cx="150" cy="108" r="17" fill="#141414"/></svg>`
  : `<svg viewBox="0 0 320 420"><rect x="20" y="112" width="280" height="168" fill="#DC171111" stroke="#DC171166" stroke-dasharray="6 5"/><line x1="20" y1="392" x2="300" y2="392" stroke="#cfc8bb" stroke-width="2"/><rect x="238" y="22" width="44" height="34" fill="#DC1711"/><g stroke="#141414" fill="none" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M150 230 L128 390 M150 230 L172 390"/><path d="M150 230 L196 132"/><path d="M196 132 L232 72 L250 58"/><path d="M196 132 L214 178"/></g><circle cx="214" cy="112" r="17" fill="#141414"/></svg>`;

const page = (inner, cls = "") => `<section class="page ${cls}">${inner}</section>`;
const head = (n, title) => `<p class="eyebrow">Chapter ${String(n).padStart(2, "0")}</p><h2>${esc(title)}</h2>`;
const foot = (p) => `<footer><span>NIFS India · Ergonomic Safety (NIFS ES)</span><span>${p}</span></footer>`;

const pages = [
  page(`
    <div class="cover-top"><img src="${logo}" alt="NIFS" class="logo"><p class="eyebrow">NIFS Free Online Course · NIFS ES</p></div>
    <div class="cover-mid"><h1>Ergonomic<br>Safety</h1><p class="lede">Fit the task to the person.</p></div>
    <div class="cover-bot"><div class="bar"></div><p>Study guide &amp; exam regulations</p><p class="dim">National Institute of Fire &amp; Safety · nifsindia.net</p></div>`, "cover"),

  page(`
    <p class="eyebrow">Inside</p><h2>Contents</h2>
    <ol class="toc">${d.chapters.map((c, i) => `<li><span>${num(i)}</span>${esc(c.title)}</li>`).join("")}<li><span>08</span>Assignment</li><li><span>09</span>Exam regulations &amp; certificate</li></ol>
    <div class="glance"><p class="eyebrow">Course at a glance</p>
      <div class="grid4"><div><b>Free</b>No fees at any step</div><div><b>3 hours</b>2h study, 1h assessment</div><div><b>Online</b>Study from anywhere</div><div><b>Certificate</b>Emailed within 3 days of the exam</div></div>
      <ol class="steps"><li><b>Register</b> name, mobile, email</li><li><b>Study</b> the seven chapters</li><li><b>Assignment</b> 10 marks</li><li><b>Final exam</b> 20 marks, 20 questions, 10 minutes</li></ol></div>${foot(2)}`),

  page(`${head(1, "Introduction: what is ergonomics?")}
    <p>Ergonomics is the field of study concerned with keeping people safe, comfortable and productive by accommodating human characteristics, capabilities and limitations in a product or process, at work and at home.</p>
    <blockquote>Rather than making the person adapt to fit the task, ergonomics fits the task to the person.</blockquote>
    <p>Also called human factors engineering, it is the scientific discipline of designing tools, tasks, environments and systems to fit the capabilities and limitations of people. It aims to optimise human well-being and system performance by reducing work-related musculoskeletal disorders (WMSDs), fatigue and discomfort, while maximising efficiency and productivity.</p>
    <div class="rule"></div>${head(2, "Training outcomes")}
    <p>Completing an ergonomic safety course reduces workplace injuries and boosts daily productivity by addressing occupational risks. After this course you will be able to:</p><ul>${li(d.outcomes)}</ul>${foot(3)}`),

  page(`${head(3, "Why ergonomic safety matters")}<p>Anyone on the job needs to know and understand:</p><ul>${li(d.importance)}</ul>
    <div class="rule"></div>${head(4, "Key benefits of the course")}
    <div class="cards">${d.benefits.map((b) => `<div class="card"><h3>${esc(b.title)}</h3><p>${esc(b.body)}</p></div>`).join("")}</div>${foot(4)}`),

  page(`${head(5, "Ergonomic hazards at the workplace")}<p>Nine common hazards. If you can name them, you can spot them.</p>
    <div class="hz">${d.hazards.map((h, i) => `<div><span>${num(i)}</span>${esc(h)}</div>`).join("")}</div>
    <div class="two"><div><p class="eyebrow">Ergonomic factors</p><ul>${li(d.factors)}</ul></div><div><p class="eyebrow">Ergonomic-related disorders</p><ul>${li(d.disorders)}</ul></div></div>${foot(5)}`),

  page(`${head(6, "Musculoskeletal disorders (MSDs)")}
    <p>MSDs affect muscles, bones, joints, ligaments and tendons. Symptoms range from mild aches to severe issues, may worsen with activity or improve with rest, and often become persistent if ignored.</p>
    <table>${d.symptoms.map((s) => `<tr><th>${esc(s.label)}</th><td>${esc(s.body)}</td></tr>`).join("")}</table>
    <p class="note">Notice it early. Report symptoms before they turn into a serious, lost-time injury.</p>${foot(6)}`),

  page(`${head(7, "Key ergonomic principles")}
    <p>Design work to fit the user: neutral postures, less force and motion, everything in the comfort zone.</p>
    <div class="fig"><div>${figure(false)}<p><b>Awkward.</b> The person goes to the task.</p></div><div>${figure(true)}<p><b>Neutral.</b> The task comes to the person, inside the power zone.</p></div></div>
    <div class="cards c3">${d.principles.map((p, i) => `<div class="card"><span>${num(i)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></div>`).join("")}</div>${foot(7)}`),

  page(`<p class="eyebrow">Step 03</p><h2>Assignment: 10 marks</h2><p>Answer both questions in your own words after reading the material. Submit them on the course page.</p>
    <ol class="q">${d.assignment.map((a) => `<li>${esc(a.q)}<em>${a.marks} marks</em></li>`).join("")}</ol>${foot(8)}`),

  page(`<p class="eyebrow">Step 04</p><h2>Exam regulations</h2><ol class="rules">${li(d.examRules)}</ol>
    <div class="cert"><p class="eyebrow">Your certificate</p><p class="big">After your exam is over, we send your certificate to your email within 3 days.</p><p class="dim">Use the same email you registered with. Questions? WhatsApp +91 83743 40999.</p></div>${foot(9)}`),
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500;1,600&family=Inter:wght@400;500;600&display=swap');
@page{size:A4;margin:0}
*{box-sizing:border-box}body{margin:0;font:10.5pt/1.55 Inter,sans-serif;color:#141414;background:#FAF8F4;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:20mm 20mm 22mm;position:relative;overflow:hidden;page-break-after:always;break-after:page}
h1,h2,h3,blockquote,.big,.toc,.lede{font-family:'Playfair Display',serif;font-style:italic;font-weight:500}
h2{font-size:26pt;line-height:1.1;margin:2mm 0 6mm}h3{font-size:12.5pt;margin:0 0 2mm}
.eyebrow{font-size:7.5pt;letter-spacing:.2em;text-transform:uppercase;color:#DC1711;font-weight:600;margin:0}
.dim{color:#6b675f}p{margin:0 0 4mm}ul{padding:0;list-style:none;margin:0 0 4mm}
ul li{padding-left:7mm;position:relative;margin-bottom:2mm}ul li:before{content:"";position:absolute;left:0;top:.7em;width:4mm;height:1px;background:#DC1711}
blockquote{margin:6mm 0;padding-left:6mm;border-left:2px solid #DC1711;font-size:17pt;line-height:1.3}
.rule{height:1px;background:#d9d3c7;margin:8mm 0}
footer{position:absolute;left:20mm;right:20mm;bottom:10mm;display:flex;justify-content:space-between;font-size:7.5pt;color:#8a857b;border-top:1px solid #d9d3c7;padding-top:3mm}
.cover{background:#FAF8F4;padding:0;display:flex;flex-direction:column;justify-content:space-between}
.cover-top{padding:18mm 20mm 0}.logo{width:38mm;display:block;margin-bottom:8mm}
.cover-mid{padding:0 20mm}.cover h1{font-size:74pt;line-height:.95;margin:0 0 8mm;color:#141414}.lede{font-size:20pt;color:#DC1711;margin:0}
.cover-bot{background:#141414;color:#FAF8F4;padding:14mm 20mm 16mm}.cover-bot .bar{width:22mm;height:3px;background:#DC1711;margin-bottom:6mm}.cover-bot p{margin:0 0 1.5mm}.cover-bot .dim{color:#a8a397;font-size:9pt}
.toc{list-style:none;padding:0;font-size:16pt;margin:6mm 0 12mm}.toc li{display:flex;gap:6mm;padding:3mm 0;border-bottom:1px solid #d9d3c7}.toc span{color:#DC1711;font-size:12pt;padding-top:1.5mm}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#d9d3c7;border:1px solid #d9d3c7;margin:4mm 0 6mm}.grid4 div{background:#FAF8F4;padding:4mm;font-size:8.5pt;color:#6b675f}.grid4 b{display:block;font:italic 500 13pt 'Playfair Display',serif;color:#141414}
.steps{padding-left:5mm;margin:0}.steps li{margin-bottom:1.5mm}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#d9d3c7;border:1px solid #d9d3c7}.card{background:#FAF8F4;padding:5mm}.cards .card:last-child:nth-child(odd){grid-column:span 2}.card p{font-size:9pt;color:#4a4740;margin:0}.card span{font:italic 500 9pt 'Playfair Display',serif;color:#DC1711}
.c3{grid-template-columns:1fr 1fr 1fr}.c3 .card{padding:4mm}.c3 h3{font-size:10.5pt}.c3 .card p{font-size:8.3pt}
.hz{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#d9d3c7;border:1px solid #d9d3c7;margin:4mm 0 8mm}.hz div{background:#FAF8F4;padding:4mm;min-height:24mm;display:flex;flex-direction:column;justify-content:space-between;font-weight:500;font-size:9.5pt}.hz span{font:italic 500 10pt 'Playfair Display',serif;color:#DC1711}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10mm}
table{border-collapse:collapse;width:100%;margin:4mm 0}th,td{text-align:left;padding:3mm 3mm;border-bottom:1px solid #d9d3c7;vertical-align:top}th{width:38mm;font:italic 500 11pt 'Playfair Display',serif;color:#DC1711}td{font-size:9.5pt;color:#4a4740}
.note{border-left:2px solid #DC1711;padding-left:4mm;margin-top:6mm}
.fig{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin:4mm 0 6mm;background:#F1ECE2;padding:4mm}.fig svg{height:62mm;display:block;margin:0 auto}.fig p{font-size:8.5pt;margin:2mm 0 0;text-align:center}
.q,.rules{padding:0 0 0 5mm;margin:6mm 0}.q li{padding:5mm 0;border-bottom:1px solid #d9d3c7;font:italic 500 14pt 'Playfair Display',serif}.q em{display:block;font:normal 400 8.5pt Inter;color:#6b675f;margin-top:1.5mm}
.rules li{margin-bottom:3mm;padding-left:2mm}
.cert{margin-top:10mm;background:#141414;color:#FAF8F4;padding:8mm}.cert .big{font-size:18pt;line-height:1.3;margin:3mm 0 4mm}.cert .dim{color:#a8a397;font-size:9pt;margin:0}
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>NIFS Ergonomic Safety Study Guide</title><style>${css}</style></head><body>${pages.join("")}</body></html>`;
const htmlPath = path.join(root, "scripts/pdf/study-guide.html");
fs.writeFileSync(htmlPath, html);

const out = path.join(root, "public/downloads/NIFS-Ergonomic-Safety-Study-Guide.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
execFileSync(edge, ["--headless", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=20000", `--user-data-dir=${path.join(root, "scripts/pdf/.edge-profile")}`, `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href], { stdio: "inherit", timeout: 120000 });
const pdf = fs.readFileSync(out).toString("latin1");
console.log("pages:", (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length, "bytes:", fs.statSync(out).size);
