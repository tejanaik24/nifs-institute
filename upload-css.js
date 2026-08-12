const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FTP_BASE = 'ftp://nifsindia.net/public_html';
const USER = 'nifsindi';
const PASS = '0xyg3N@751023';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFiles(fullPath, files);
    } else if (item.name.endsWith('.css') || item.name.endsWith('.js') || item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const outDir = path.join(__dirname, 'out');
const cssAndJsFiles = getFiles(path.join(outDir, '_next'));
cssAndJsFiles.push(path.join(outDir, 'blog', 'index.html'));

console.log(`Uploading ${cssAndJsFiles.length} CSS, JS & HTML files synchronously...`);

let success = 0;
for (const f of cssAndJsFiles) {
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  const remote = `${FTP_BASE}/${rel}`;
  const cmd = `curl.exe -s -S --ftp-pasv --max-time 30 --retry 3 -T "${f}" -u "${USER}:${PASS}" "${remote}" --ftp-create-dirs`;
  try {
    execSync(cmd, { stdio: 'inherit' });
    success++;
    console.log(`✅ [${success}/${cssAndJsFiles.length}] Successfully uploaded: ${rel}`);
  } catch (err) {
    console.error(`❌ Failed: ${rel}`);
  }
}

console.log('🎉 ALL CSS & JS CHUNKS SUCCESSFULLY UPLOADED!');
