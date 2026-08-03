const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const FTP_BASE = 'ftp://nifsindia.net/public_html';
const USER = 'nifsindi';
const PASS = '0xyg3N@751023';

// Sync homepage.html
const outDir = path.join(__dirname, 'out');
const hpPath = path.join(__dirname, 'public', 'homepage.html');
if (fs.existsSync(hpPath)) {
  fs.copyFileSync(hpPath, path.join(outDir, 'index.html'));
  fs.copyFileSync(hpPath, path.join(outDir, 'homepage.html'));
  console.log('✅ Synchronized public/homepage.html');
}

const logoUploads = [
  { local: path.join(__dirname, 'public', 'images', 'nifs-official-logo-v3.png'), remote: `${FTP_BASE}/images/nifs-official-logo-v3.png` },
  { local: path.join(__dirname, 'public', 'images', 'nifs-official-logo-v2.png'), remote: `${FTP_BASE}/images/nifs-official-logo-v2.png` },
  { local: path.join(__dirname, 'public', 'images', 'nifs-crest.png'), remote: `${FTP_BASE}/images/nifs-crest.png` },
  { local: path.join(__dirname, 'public', 'images', 'nifs-logo.png'), remote: `${FTP_BASE}/images/nifs-logo.png` },
  { local: path.join(__dirname, 'public', 'images', 'nifs-official-logo.png'), remote: `${FTP_BASE}/images/nifs-official-logo.png` },
  { local: path.join(__dirname, 'out', 'index.html'), remote: `${FTP_BASE}/index.html` },
  { local: path.join(__dirname, 'out', 'homepage.html'), remote: `${FTP_BASE}/homepage.html` },
];

let count = 0;
for (const item of logoUploads) {
  const dir = path.dirname(item.remote).replace('ftp://nifsindia.net/public_html', '/public_html');
  const cmd = `curl -s --ftp-create-dirs -u "${USER}:${PASS}" -T "${item.local.replace(/\\/g, '/')}" "${item.remote}"`;
  exec(cmd, (err) => {
    count++;
    if (err) console.error(`❌ Failed: ${item.remote}`, err);
    else console.log(`✅ Uploaded (${count}/${logoUploads.length}): ${item.remote}`);
    if (count === logoUploads.length) {
      console.log('🚀 Urgent logo deployment completed!');
    }
  });
}
