const fs = require('fs');
const filePath = 'src/lib/data/blog-posts.json';
const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 1. Update hero image
posts[0].coverImage = '/images/blog/safety-officer-salary-hero.png';

let html = posts[0].contentHtml;

// 2. Insert City Breakdown Image
const img1 = '<img src="/images/blog/safety-officer-city-breakdown.png" alt="Safety officer salary by city in India metro and industrial hubs" loading="lazy" />';
if (!html.includes('safety-officer-city-breakdown.png')) {
  html = html.replace('<h2>Safety Officer Salary by Industry</h2>', img1 + '<h2>Safety Officer Salary by Industry</h2>');
}

// 3. Insert Certifications Image
const img2 = '<img src="/images/blog/safety-certifications-guide.png" alt="Safety officer conducting safety audit and training inspection" loading="lazy" />';
if (!html.includes('safety-certifications-guide.png')) {
  html = html.replace('<h2>Career Growth Path for Safety Officers</h2>', img2 + '<h2>Career Growth Path for Safety Officers</h2>');
}

// 4. Insert Gulf Career Image
const img3 = '<img src="/images/blog/safety-gulf-career.png" alt="Senior oil and gas HSE safety manager in Gulf refinery" loading="lazy" />';
if (!html.includes('safety-gulf-career.png')) {
  html = html.replace('<h2>How to Increase Your Safety Officer Salary</h2>', img3 + '<h2>How to Increase Your Safety Officer Salary</h2>');
}

posts[0].contentHtml = html;

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
console.log('Successfully updated blog-posts.json with 4 new image assets!');
