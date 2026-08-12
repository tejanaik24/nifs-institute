import os
import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

FTP_BASE = 'ftp://nifsindia.net/public_html'
USER = 'nifsindi'
PASS = '0xyg3N@751023'

base_dir = 'C:/claude code/nifs-india'

uploads = [
    (
        os.path.join(base_dir, 'out/blog/safety-intelligence-predict-before-you-protect-dr-gpr-krishna/index.html'),
        f'{FTP_BASE}/blog/safety-intelligence-predict-before-you-protect-dr-gpr-krishna/index.html'
    )
]

# Add images
img_dir = os.path.join(base_dir, 'public/images/blog/dr-gpr-krishna')
for f in os.listdir(img_dir):
    if f.endswith('.png'):
        local_path = os.path.join(img_dir, f)
        remote_path = f'{FTP_BASE}/images/blog/dr-gpr-krishna/{f}'
        uploads.append((local_path, remote_path))

print(f'Uploading {len(uploads)} article files & images to cPanel FTP...')

for local, remote in uploads:
    cmd = f'curl.exe -s -S --ftp-pasv --max-time 60 --retry 3 -T "{local}" -u "{USER}:{PASS}" "{remote}" --ftp-create-dirs'
    try:
        res = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        print(f'✅ Uploaded: {remote}')
    except Exception as e:
        print(f'❌ Failed: {remote} | Error: {e}')

print('🎉 Article & images successfully uploaded to cPanel FTP!')
