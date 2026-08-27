import json
from collections import Counter

with open('src/lib/data/blog-posts.json', encoding='utf-8') as f:
    posts = json.load(f)

print(f'Total blog posts: {len(posts)}')
long_titles = [p for p in posts if len(p.get('title','')) > 65]
print(f'Titles > 65 chars: {len(long_titles)}')
with_faq = [p for p in posts if p.get('faqs')]
print(f'Posts with FAQ schema: {len(with_faq)}')
with_links = [p for p in posts if p.get('internalLinks')]
print(f'Posts with internal links: {len(with_links)}')
dates = sorted([p.get('date','') for p in posts if p.get('date')], reverse=True)
print(f'Newest post: {dates[0] if dates else "N/A"}')
print(f'Oldest post: {dates[-1] if dates else "N/A"}')
no_img = [p for p in posts if not p.get('image') and not p.get('coverImage')]
print(f'Posts without cover image: {len(no_img)}')
cats = Counter(p.get('category','') for p in posts)
print('Top categories:', cats.most_common(10))

# Check slug quality
short_slugs = [p for p in posts if len(p.get('slug','')) < 20]
print(f'Posts with short slugs (<20 chars): {len(short_slugs)}')

# Estimate avg word count from content field
import re
word_counts = []
for p in posts:
    content = p.get('content', '') or p.get('body', '') or ''
    if isinstance(content, list):
        content = ' '.join(str(x) for x in content)
    wc = len(re.findall(r'\w+', content))
    if wc > 0:
        word_counts.append(wc)
if word_counts:
    print(f'Posts with content field: {len(word_counts)}')
    print(f'Avg word count: {sum(word_counts)//len(word_counts)}')
    print(f'Min/Max: {min(word_counts)}/{max(word_counts)}')
