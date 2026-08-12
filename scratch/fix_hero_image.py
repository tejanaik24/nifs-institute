import json
import re

json_path = 'C:/claude code/nifs-india/src/lib/data/blog-posts.json'

with open(json_path, 'r', encoding='utf-8') as f:
    posts = json.load(f)

for p in posts:
    if 'safety-intelligence' in p['slug']:
        print('Current coverImage:', p.get('coverImage'))
        # Set coverImage to image1.png (the Safety Intelligence main header graphic)
        p['coverImage'] = '/images/blog/dr-gpr-krishna/image1.png'
        
        # Remove duplicate image1 figure from body contentHtml so it only renders once as top hero
        if 'image1.png' in p['contentHtml']:
            p['contentHtml'] = re.sub(
                r'<figure className="my-8">\s*<img src="/images/blog/dr-gpr-krishna/image1\.png".*?</figure>\s*',
                '',
                p['contentHtml'],
                flags=re.DOTALL
            )
            print('Removed duplicate image1 figure from body contentHtml')
            
        print('Updated coverImage to:', p['coverImage'])

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print('Successfully updated blog-posts.json!')
