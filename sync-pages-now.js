const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const FTP_BASE = 'ftp://nifsindia.net/public_html';
const USER = 'nifsindi';
const PASS = '0xyg3N@751023';

const outDir = path.join(__dirname, 'out');

function getPageFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getPageFiles(fullPath, arrayOfFiles);
    } else {
      // Collect only HTML, CSS, JS, and root config files
      if (file.endsWith('.html') || fullPath.includes('_next') || file === '.htaccess' || file === 'sitemap.xml' || file === 'robots.txt' || file === 'llms.txt') {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const pageFiles = getPageFiles(outDir);
console.log(`🚀 Priority syncing ${pageFiles.length} HTML pages and JS/CSS bundles...`);

const allUploads = pageFiles.map(f => {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  return { local: f, remote: `${FTP_BASE}/${rel}` };
});

let index = 0;
let active = 0;
const CONCURRENCY = 10;
let completed = 0;

function uploadItem(item, retries = 3, cb) {
  const cmd = `curl.exe -s -S --max-time 15 --retry 2 -T "${item.local}" -u "${USER}:${PASS}" "${item.remote}" --ftp-create-dirs`;

  exec(cmd, (err) => {
    if (err && retries > 0) {
      setTimeout(() => uploadItem(item, retries - 1, cb), 300);
    } else {
      cb(err);
    }
  });
}

function uploadNext() {
  if (index >= allUploads.length) {
    if (active === 0) {
      console.log(`🎉 ALL ${completed} CORE HTML PAGES AND JS/CSS BUNDLES SYNCED LIVE!`);
    }
    return;
  }

  const item = allUploads[index++];
  active++;

  uploadItem(item, 3, (err) => {
    active--;
    completed++;
    if (completed % 25 === 0 || completed === allUploads.length) {
      console.log(`✅ Synced (${completed}/${allUploads.length}): ${item.remote.replace(FTP_BASE, '')}`);
    }
    uploadNext();
  });
}

for (let i = 0; i < CONCURRENCY; i++) {
  uploadNext();
}
