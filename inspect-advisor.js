const fs = require('fs');
const html = fs.readFileSync('public/homepage.html', 'utf8');

const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('cf-bubble') || line.includes('cf-panel')) {
    console.log(`=== LINE ${idx + 1} ===`);
    console.log(lines.slice(Math.max(0, idx - 10), Math.min(lines.length, idx + 40)).join('\n'));
  }
});
