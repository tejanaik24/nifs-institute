import zipfile
import xml.etree.ElementTree as ET
import os
import sys

# Set stdout to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

docx_path = 'C:/Users/user/Downloads/3_Dr. GPR Krishna_BLOG_Safety_Intelligence_Predict Before You Protect_Final_12.08.2026.docx'
z = zipfile.ZipFile(docx_path)

# Extract images to public/images/blog/dr-gpr-krishna/
target_dir = 'C:/claude code/nifs-india/public/images/blog/dr-gpr-krishna'
os.makedirs(target_dir, exist_ok=True)
for item in z.namelist():
    if item.startswith('word/media/'):
        fname = os.path.basename(item)
        out_path = os.path.join(target_dir, fname)
        with open(out_path, 'wb') as f:
            f.write(z.read(item))

# Parse rels to map rId -> image filename
rels_xml = z.read('word/_rels/document.xml.rels')
rels_root = ET.fromstring(rels_xml)
rid_map = {}
for child in rels_root:
    target = child.attrib.get('Target', '')
    rid = child.attrib.get('Id', '')
    if target.startswith('media/'):
        rid_map[rid] = os.path.basename(target)

# Parse document.xml to see paragraphs and graphic blip rId references
doc_xml = z.read('word/document.xml')
doc_root = ET.fromstring(doc_xml)

ns = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

body = doc_root.find('w:body', ns)
if body is not None:
    for i, child in enumerate(body):
        tag = child.tag.split('}')[-1]
        text = ''.join(child.itertext()).strip()
        blips = child.findall('.//a:blip', ns)
        img_names = [rid_map.get(b.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed'), '') for b in blips]
        
        if img_names:
            print(f'=== IMAGE BLOCK #{i} [{tag}] -> {img_names} ===')
            if text:
                print(f'   Text in image block: "{text}"')
        elif text:
            print(f'P#{i} [{tag}]: "{text}"')
