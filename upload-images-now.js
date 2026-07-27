const { exec } = require('child_process');
const path = require('path');

const files = [
  'public/images/blog/safety-officer-salary-hero.png',
  'public/images/blog/safety-officer-city-breakdown.png',
  'public/images/blog/safety-certifications-guide.png',
  'public/images/blog/safety-gulf-career.png',
  'out/blog/safety-officer-salary-in-india-2026-complete-guide/index.html'
];

const USER = 'nifsindi';
const PASS = '0xyg3N@751023';
const HOST = '85.25.43.146';

async function uploadAll() {
  for (const localFile of files) {
    const absPath = path.join(__dirname, localFile);
    let remotePath = '';
    if (localFile.startsWith('public/')) {
      const rel = localFile.replace('public/', '');
      remotePath = `ftp://${HOST}/public_html/${rel}`;
    } else {
      const rel = localFile.replace('out/', '');
      remotePath = `ftp://${HOST}/public_html/${rel}`;
    }

    const cmd = `curl.exe -s -S --ftp-pasv -T "${absPath}" -u "${USER}:${PASS}" "${remotePath}" --ftp-create-dirs`;
    
    await new Promise((resolve) => {
      exec(cmd, (err) => {
        if (err) {
          console.error(`❌ Failed: ${localFile}`, err.message);
        } else {
          console.log(`✅ Priority Uploaded: ${localFile}`);
        }
        resolve();
      });
    });
  }
  console.log('🎉 Priority images and article page uploaded successfully!');
}

uploadAll();
