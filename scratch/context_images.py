import zipfile
import xml.etree.ElementTree as ET
import os

docx_path = 'C:/Users/user/Downloads/3_Dr. GPR Krishna_BLOG_Safety_Intelligence_Predict Before You Protect_Final_12.08.2026.docx'
z = zipfile.ZipFile(docx_path)

rels_xml = z.read('word/_rels/document.xml.rels')
rels_root = ET.fromstring(rels_xml)
rid_map = {}
for child in rels_root:
    target = child.attrib.get('Target', '')
    rid = child.attrib.get('Id', '')
    if target.startswith('media/'):
        rid_map[rid] = os.path.basename(target)

doc_xml = z.read('word/document.xml')
doc_root = ET.fromstring(doc_xml)

ns = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

body = doc_root.find('w:body', ns)
children = list(body) if body is not None else []

for i, child in enumerate(children):
    blips = child.findall('.//a:blip', ns)
    img_names = [rid_map.get(b.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed'), '') for b in blips]
    if img_names:
        print(f"\n=======================================================")
        print(f"IMAGE BLOCK #{i} -> {img_names}")
        print("--- PARAGRAPHS BEFORE ---")
        for j in range(max(0, i-4), i):
            t = ''.join(children[j].itertext()).strip()
            if t:
                print(f"  [#{j}]: {t[:120]}")
        print("--- PARAGRAPHS AFTER ---")
        for j in range(i+1, min(len(children), i+5)):
            t = ''.join(children[j].itertext()).strip()
            if t:
                print(f"  [#{j}]: {t[:120]}")
