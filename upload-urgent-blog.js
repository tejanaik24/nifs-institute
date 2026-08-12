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
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const outDir = path.join(__dirname, 'out');

// Priority 1: blog/index.html
const urgentFiles = [
  path.join(outDir, 'blog', 'index.html')
];

// Priority 2: everything inside out/_next
const nextFiles = getAllFiles(path.join(outDir, '_next'));
urgentFiles.push(...nextFiles);

console.log(`Uploading ${urgentFiles.length} URGENT blog & script assets...`);

let completed = 0;
for (const f of urgentFiles) {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  const remote = `${FTP_BASE}/${rel}`;
  const cmd = `curl.exe -s -S --ftp-pasv --max-time 15 --retry 2 -T "${f}" -u "${USER}:${PASS}" "${remote}" --ftp-create-dirs`;
  try {
    require('child_process').execSync(cmd);
    completed++;
    console.log(`✅ [URGENT ${completed}/${urgentFiles.length}] Uploaded: ${rel}`);
  } catch (err) {
    console.error(`❌ Failed: ${rel}`, err.message);
  }
}

console.log('🎉 URGENT BLOG & JS/CSS ASSETS UPLOADED!');
