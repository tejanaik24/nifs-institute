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
const nextFiles = getAllFiles(path.join(outDir, '_next'));
const blogFiles = getAllFiles(path.join(outDir, 'blog'));
const courseFiles = getAllFiles(path.join(outDir, 'courses'));
const imageFiles = getAllFiles(path.join(__dirname, 'public', 'images'));

const allUploads = [];

const blogIndexPath = path.join(outDir, 'blog', 'index.html');
if (fs.existsSync(blogIndexPath)) {
  allUploads.push({ local: blogIndexPath, remote: `${FTP_BASE}/blog/index.html` });
}

nextFiles.forEach(f => {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  allUploads.push({ local: f, remote: `${FTP_BASE}/${rel}` });
});

blogFiles.forEach(f => {
  if (f === blogIndexPath) return;
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  allUploads.push({ local: f, remote: `${FTP_BASE}/${rel}` });
});

courseFiles.forEach(f => {
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
