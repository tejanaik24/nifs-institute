const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'lib', 'data', 'blog-posts.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const posts = JSON.parse(rawData);

// Update post 1: why-fresh-engineers-are-switching-to-fire-safety-careers-2026
const p1 = posts.find(p => p.slug === "why-fresh-engineers-are-switching-to-fire-safety-careers-2026");
if (p1) {
  p1.contentHtml = p1.contentHtml.replace(
    '<h2>5 Reasons Why Engineers & B.Sc Graduates Are Switching to Safety</h2>',
    `<figure class="my-8">
  <img src="/images/blog/safety-officer-city-breakdown.png" alt="Safety Officer Salary and Growth Rate by City in India 2026" class="w-full h-auto rounded-xl border border-slate-200 shadow-md" loading="lazy" />
  <figcaption class="mt-2 text-center text-xs text-slate-500 font-medium">Figure 1: Salary growth trajectory and city-by-city compensation for Safety Professionals in India.</figcaption>
</figure>

<h2>5 Reasons Why Engineers & B.Sc Graduates Are Switching to Safety</h2>`
  );

  p1.contentHtml = p1.contentHtml.replace(
    '<h3>3. High Value Placed on Technical Backgrounds</h3>',
    `<figure class="my-8">
  <img src="/images/blog/safety-certifications-guide.png" alt="Industrial Safety Officer conducting site audit and compliance inspection" class="w-full h-auto rounded-xl border border-slate-200 shadow-md" loading="lazy" />
  <figcaption class="mt-2 text-center text-xs text-slate-500 font-medium">Figure 2: Safety Engineer carrying out industrial risk evaluation and safety audit.</figcaption>
</figure>

<h3>3. High Value Placed on Technical Backgrounds</h3>`
  );

  p1.contentHtml = p1.contentHtml.replace(
    '<h2>How to Switch to a Fire & Safety Career at NIFS India (3 Clear Paths)</h2>',
    `<figure class="my-8">
  <img src="/images/placement-graduate-worksite.png" alt="NIFS Graduate Safety Officer working in industrial plant environment" class="w-full h-auto rounded-xl border border-slate-200 shadow-md" loading="lazy" />
  <figcaption class="mt-2 text-center text-xs text-slate-500 font-medium">Figure 3: NIFS Graduate placed in high-demand industrial safety engineering role.</figcaption>
</figure>

<h2>How to Switch to a Fire & Safety Career at NIFS India (3 Clear Paths)</h2>`
  );

  console.log('✅ Updated why-fresh-engineers-are-switching-to-fire-safety-careers-2026 with 3 inline images!');
}

// Update post 2: top-fire-and-safety-courses-after-10th-12th-graduation-2026
const p2 = posts.find(p => p.slug === "top-fire-and-safety-courses-after-10th-12th-graduation-2026");
if (p2) {
  p2.contentHtml = p2.contentHtml.replace(
    '<h2>Detailed Breakdown of Top 10 Fire and Safety Courses</h2>',
    `<figure class="my-8">
  <img src="/images/blog/safety-certifications-guide.png" alt="Top recognized fire and safety course certifications guide" class="w-full h-auto rounded-xl border border-slate-200 shadow-md" loading="lazy" />
  <figcaption class="mt-2 text-center text-xs text-slate-500 font-medium">Figure 1: Certified Safety Training and Inspection Training at NIFS India.</figcaption>
</figure>

<h2>Detailed Breakdown of Top 10 Fire and Safety Courses</h2>`
  );

  p2.contentHtml = p2.contentHtml.replace(
    '<h2>Salary Outlook & Gulf Job Opportunities (2026)</h2>',
    `<figure class="my-8">
  <img src="/images/blog/safety-officer-city-breakdown.png" alt="Fire & Safety Officer Salary by City and Industry 2026" class="w-full h-auto rounded-xl border border-slate-200 shadow-md" loading="lazy" />
  <figcaption class="mt-2 text-center text-xs text-slate-500 font-medium">Figure 2: Average monthly compensation across metro cities and industrial hubs in India.</figcaption>
</figure>

<h2>Salary Outlook & Gulf Job Opportunities (2026)</h2>`
  );

  p2.contentHtml = p2.contentHtml.replace(
    '<h2>How to Enroll at NIFS India (NSDC Approved)</h2>',
    `<figure class="my-8">
  <img src="/images/blog/safety-gulf-career.png" alt="Senior Gulf HSE Officer overseeing oil refinery safety operations" class="w-full h-auto rounded-xl border border-slate-200 shadow-md" loading="lazy" />
  <figcaption class="mt-2 text-center text-xs text-slate-500 font-medium">Figure 3: NIFS Alumni placed in high-paying Gulf oil & gas safety roles.</figcaption>
</figure>

<h2>How to Enroll at NIFS India (NSDC Approved)</h2>`
  );

  console.log('✅ Updated top-fire-and-safety-courses-after-10th-12th-graduation-2026 with 3 inline images!');
}

fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
console.log('Successfully saved updated blog-posts.json!');
