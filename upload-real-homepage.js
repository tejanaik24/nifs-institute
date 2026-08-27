const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const USER = 'nifsindi';
const PASS = '0xyg3N@751023';
const HOST = 'nifsindia.net';

async function updateHomepage() {
  // 0. Ensure public/homepage.html is copied to out/index.html and out/homepage.html
  const hpPath = path.join(__dirname, 'public/homepage.html');
  const indexPath = path.join(__dirname, 'out/index.html');
  fs.copyFileSync(hpPath, indexPath);
  fs.copyFileSync(hpPath, path.join(__dirname, 'out/homepage.html'));
  console.log('✅ Synchronized public/homepage.html to out/index.html');

  // 1. Delete remote homepage.html if it exists
  const delCmd = `curl.exe -s -S --ftp-pasv -u "${USER}:${PASS}" -X "DELE /public_html/homepage.html" "ftp://${HOST}/public_html/"`;
  await new Promise((res) => exec(delCmd, () => res()));

  // 2. Upload out/index.html to /public_html/index.html
  const htmlCmd = `curl.exe -s -S --ftp-pasv -T "C:\\claude code\\nifs-india\\out\\index.html" -u "${USER}:${PASS}" "ftp://${HOST}/public_html/index.html"`;
  await new Promise((resolve) => {
    exec(htmlCmd, (err) => {
      if (err) console.error('HTML upload err:', err.message);
      else console.log('✅ Real index.html uploaded to cPanel root!');
      resolve();
    });
  });

  // 3. Upload public/.htaccess
  const htCmd = `curl.exe -s -S --ftp-pasv -T "C:\\claude code\\nifs-india\\public\\.htaccess" -u "${USER}:${PASS}" "ftp://${HOST}/public_html/.htaccess"`;
  await new Promise((resolve) => {
    exec(htCmd, (err) => {
      if (err) console.error('htaccess upload err:', err.message);
      else console.log('✅ Updated .htaccess uploaded with 301 redirect!');
      resolve();
    });
  });
}

updateHomepage();
