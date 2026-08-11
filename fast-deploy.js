const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const FTP_BASE = 'ftp://nifsindia.net/public_html';
const USER = 'nifsindi';
const PASS = '0xyg3N@751023';

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (!file.startsWith('__next') && !file.endsWith('.txt')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const outDir = path.join(__dirname, 'out');
const hpPath = path.join(__dirname, 'public', 'homepage.html');
if (fs.existsSync(hpPath)) {
  fs.copyFileSync(hpPath, path.join(outDir, 'index.html'));
  fs.copyFileSync(hpPath, path.join(outDir, 'homepage.html'));
  console.log('✅ Synchronized public/homepage.html to out/index.html in fast-deploy.js');
}

// Walk the ENTIRE out/ directory rather than a hand-picked folder list —
// a hand-picked list (previously just _next/blog/courses) silently misses
// every other route (about, admissions, centers, contact, gallery,
// industrial-services, placements, ...) whenever layout-wide changes are
// made. index.html/homepage.html at the root are excluded here because
// they're owned by the dedicated upload-real-homepage.js script (which
// also deletes the stale remote homepage.html and re-uploads .htaccess).
const allOutFiles = getAllFiles(outDir).filter((f) => {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  return rel !== 'index.html' && rel !== 'homepage.html';
});
const imageFiles = getAllFiles(path.join(__dirname, 'public', 'images'));

const allUploads = [];

['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', '.htaccess'].forEach((name) => {
  const p = path.join(outDir, name);
  if (fs.existsSync(p)) {
    allUploads.push({ local: p, remote: `${FTP_BASE}/${name}` });
  }
});

allOutFiles.forEach(f => {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  allUploads.push({ local: f, remote: `${FTP_BASE}/${rel}` });
});

imageFiles.forEach(f => {
  const rel = path.relative(path.join(__dirname, 'public'), f).replace(/\\/g, '/');
  allUploads.push({ local: f, remote: `${FTP_BASE}/${rel}` });
});

console.log(`Total web assets to upload: ${allUploads.length}`);

let index = 0;
let active = 0;
const CONCURRENCY = 2; // Strict limit to prevent cPanel connection throttling
let completed = 0;

function uploadItem(item, retries = 3, cb) {
  const cmd = `curl.exe -s -S --max-time 15 --retry 2 -T "${item.local}" -u "${USER}:${PASS}" "${item.remote}" --ftp-create-dirs`;

  exec(cmd, (err) => {
    if (err && retries > 0) {
      setTimeout(() => uploadItem(item, retries - 1, cb), 500);
    } else {
      cb(err);
    }
  });
}

function uploadNext() {
  if (index >= allUploads.length) {
    if (active === 0) {
      console.log('🎉 ALL PRODUCTION WEB ASSETS UPLOADED SUCCESSFULLY!');
    }
    return;
  }

  const item = allUploads[index++];
  active++;

  uploadItem(item, 3, (err) => {
    active--;
    completed++;
    if (err) {
      console.error(`❌ Failed (${completed}/${allUploads.length}): ${item.remote.replace(FTP_BASE, '')}`);
    } else {
      console.log(`✅ Uploaded (${completed}/${allUploads.length}): ${item.remote.replace(FTP_BASE, '')}`);
    }
    uploadNext();
  });
}

for (let i = 0; i < CONCURRENCY; i++) {
  uploadNext();
}
