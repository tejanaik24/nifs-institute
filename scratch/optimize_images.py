"""
NIFS Image Optimizer — Resizes and compresses images in public/images/
Reduces LCP on mobile without breaking filename references.
"""
import os
from pathlib import Path
from PIL import Image

IMG_DIR = Path(r'C:\claude code\nifs-india\public\images')
MAX_WIDTH = 1200
JPEG_QUALITY = 80

saved_bytes = 0
processed = 0

print("Starting image optimization...")

for root, dirs, files in os.walk(IMG_DIR):
    for f in files:
        ext = f.lower().split('.')[-1]
        if ext in ('jpg', 'jpeg', 'png'):
            fp = Path(root) / f
            orig_sz = fp.stat().st_size
            
            try:
                with Image.open(fp) as img:
                    # Convert RGBA to RGB for JPEG if saving as JPG, or optimize PNG
                    is_png = (ext == 'png')
                    
                    # Check if resizing needed
                    w, h = img.size
                    if w > MAX_WIDTH:
                        new_h = int(h * (MAX_WIDTH / w))
                        img = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
                    
                    # Overwrite in place
                    if is_png:
                        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                            img.save(fp, 'PNG', optimize=True)
                        else:
                            img = img.convert('RGB')
                            img.save(fp, 'JPEG', quality=JPEG_QUALITY, optimize=True)
                    else:
                        img = img.convert('RGB')
                        img.save(fp, 'JPEG', quality=JPEG_QUALITY, optimize=True)
                    
                    new_sz = fp.stat().st_size
                    if new_sz < orig_sz:
                        saved_bytes += (orig_sz - new_sz)
                        processed += 1
            except Exception as e:
                print(f"Error processing {f}: {e}")

print(f"\nCompleted! Processed {processed} images.")
print(f"Saved: {saved_bytes / (1024 * 1024):.2f} MB of bandwidth!")
