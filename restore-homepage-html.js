const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 1. Copy public/homepage.html to out/index.html
const hpPath = path.join(__dirname, 'public/homepage.html');
const indexPath = path.join(__dirname, 'out/index.html');
fs.copyFileSync(hpPath, indexPath);
console.log('✅ Copied public/homepage.html to out/index.html');

const USER = 'nifsindi';
const PASS = '0xyg3N@751023';
const HOST = '85.25.43.146';

async function deployHomepageHTML() {
  // 2. Upload out/index.html to /public_html/index.html
  const cmd1 = `curl.exe -s -S --ftp-pasv -T "${indexPath}" -u "${USER}:${PASS}" "ftp://${HOST}/public_html/index.html"`;
  await new Promise((resolve) => {
    exec(cmd1, (err) => {
      if (err) console.error('Err index:', err.message);
      else console.log('✅ Overwrote /public_html/index.html with full homepage.html!');
      resolve();
    });
  });

  // 3. Upload public/homepage.html to /public_html/homepage.html
  const cmd2 = `curl.exe -s -S --ftp-pasv -T "${hpPath}" -u "${USER}:${PASS}" "ftp://${HOST}/public_html/homepage.html"`;
  await new Promise((resolve) => {
    exec(cmd2, (err) => {
      if (err) console.error('Err homepage:', err.message);
      else console.log('✅ Uploaded /public_html/homepage.html!');
      resolve();
    });
  });
}

deployHomepageHTML();
