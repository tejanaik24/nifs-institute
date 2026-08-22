const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const FTP_BASE = 'ftp://nifsindia.net/public_html';
const USER = 'nifsindi';
const PASS = '0xyg3N@751023';

const outDir = path.join(__dirname, 'out');
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i;

function getImageFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getImageFiles(fullPath, arrayOfFiles);
    } else if (IMAGE_EXT.test(file)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const imageFiles = getImageFiles(outDir);
console.log(`🚀 Syncing ${imageFiles.length} image files...`);

const allUploads = imageFiles.map(f => {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  return { local: f, remote: `${FTP_BASE}/${rel}` };
});

let index = 0;
let active = 0;
const CONCURRENCY = 10;
let completed = 0;
let failed = 0;

function uploadItem(item, retries = 3, cb) {
  const cmd = `curl.exe -s -S --max-time 20 --retry 2 -T "${item.local}" -u "${USER}:${PASS}" "${item.remote}" --ftp-create-dirs`;

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
      console.log(`🎉 ALL ${completed} IMAGES SYNCED (${failed} failed)`);
    }
    return;
  }

  const item = allUploads[index++];
  active++;

  uploadItem(item, 3, (err) => {
    active--;
    completed++;
    if (err) failed++;
    if (completed % 50 === 0 || completed === allUploads.length) {
      console.log(`✅ Synced (${completed}/${allUploads.length}): ${item.remote.replace(FTP_BASE, '')}`);
    }
    uploadNext();
  });
}

for (let i = 0; i < CONCURRENCY; i++) {
  uploadNext();
}
