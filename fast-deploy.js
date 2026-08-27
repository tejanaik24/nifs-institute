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
      // At the out/ root, .txt files (robots, llms, IndexNow key) and the
      // __next.__PAGE__.txt payload are owned by the explicit allowlists
      // below. In subdirectories, every .txt file is an RSC payload
      // (index.txt, __next.*.txt, __PAGE__.txt, $d$slug.txt) that embeds
      // the buildId — they must reach production or client-side navigation
      // falls back to stale payloads after each rebuild.
      const isRoot = dirPath === outDir;
      if (!isRoot || (!file.startsWith('__next') && !file.endsWith('.txt'))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const outDir = path.join(__dirname, 'out');
// The homepage used to be a standalone public/homepage.html copied into
// out/index.html and uploaded separately (upload-real-homepage.js). It is
// now a real Next.js route, so `next build` already emits a correct
// out/index.html — no special-casing needed, walk the ENTIRE out/
// directory rather than a hand-picked folder list, which previously missed
// routes whenever layout-wide changes were made.
const allOutFiles = getAllFiles(outDir);
const imageFiles = getAllFiles(path.join(__dirname, 'public', 'images'));

const allUploads = [];

['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', '.htaccess'].forEach((name) => {
  const p = path.join(outDir, name);
  if (fs.existsSync(p)) {
    allUploads.push({ local: p, remote: `${FTP_BASE}/${name}` });
  }
});

// IndexNow verification key file (see scripts/ping-indexnow.cjs) — the general
// walk below skips .txt files by design, so the key file needs the same
// explicit allowlist treatment or it silently never reaches production.
fs.readdirSync(outDir)
  .filter((f) => f.endsWith('.txt') && f !== 'robots.txt' && f !== 'llms.txt' && f !== 'llms-full.txt')
  .forEach((name) => {
    allUploads.push({ local: path.join(outDir, name), remote: `${FTP_BASE}/${name}` });
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
