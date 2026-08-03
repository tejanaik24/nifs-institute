import os
from PIL import Image, ImageDraw, ImageFont

# Path to the base logo
base_logo_path = r"C:\Users\user\Downloads\nifs png logo.png"
img = Image.open(base_logo_path).convert("RGBA")
w, h = img.size

# We want to replace the bottom text area (from y = int(h * 0.62) to h)
# Erase the existing sans-serif text in the bottom region
# Let's inspect where the circle ends: the circle ends at around y = 0.62 * h (y = 496 for an 800x800 image)

draw = ImageDraw.Draw(img)

# Clear the bottom region (from y = 490 to 800) by making it fully transparent
# We create a new image of size (800, 800) with transparent background
clean_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))

# Copy the top crest circle (y=0 to 495)
top_crop = img.crop((0, 0, w, 495))
clean_img.paste(top_crop, (0, 0))

# Load Times New Roman Bold font for official NIFS serif lettering
font_path = r"C:\Windows\Fonts\timesbd.ttf"
if not os.path.exists(font_path):
    font_path = r"C:\Windows\Fonts\georgiab.ttf"

# Target font size for NIFS text
nifs_font = ImageFont.truetype(font_path, 150)
reg_font = ImageFont.truetype(font_path, 40)

draw_clean = ImageDraw.Draw(clean_img)

# Red color matching official NIFS red: #E31B23 / #DC1711
nifs_red = (220, 23, 17, 255)

# Render "NIFS" text
text = "NIFS"
# Get text bounding box to center it horizontally
bbox = draw_clean.textbbox((0, 0), text, font=nifs_font)
text_w = bbox[2] - bbox[0]
text_h = bbox[3] - bbox[1]

# Position NIFS centered
text_x = (w - text_w) // 2 - 15  # slightly shift left to leave room for ®
text_y = 515

draw_clean.text((text_x, text_y), text, font=nifs_font, fill=nifs_red)

# Draw registered symbol ® at the top right of S
reg_x = text_x + text_w + 5
reg_y = text_y + 15
draw_clean.text((reg_x, reg_y), "®", font=reg_font, fill=nifs_red)

# Save the crisp new official logo
output_path = r"C:\claude code\nifs-india\public\images\nifs-official-logo.png"
clean_img.save(output_path, "PNG")
print("Successfully generated clean official logo at:", output_path)

# Also update all target files in public/images/
targets = [
    r"C:\claude code\nifs-india\public\images\nifs-crest.png",
    r"C:\claude code\nifs-india\public\images\nifs-logo.png",
    r"C:\claude code\nifs-india\public\images\nifs-emblem.png",
    r"C:\claude code\nifs-india\public\images\nifs-logo-full.png",
]

for t in targets:
    clean_img.save(t, "PNG")
    print(f"Updated {t}")
