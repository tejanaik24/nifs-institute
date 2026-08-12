import json

json_path = 'C:/claude code/nifs-india/src/lib/data/blog-posts.json'

with open(json_path, 'r', encoding='utf-8') as f:
    posts = json.load(f)

img1_html = '''<figure className="my-8">
  <img src="/images/blog/dr-gpr-krishna/image1.png" alt="Safety Intelligence: Predict Before You Protect" className="w-full rounded-2xl shadow-lg border border-slate-200" />
  <figcaption className="mt-2 text-center text-xs text-slate-500 font-semibold">Safety Intelligence™: Predict Before You Protect — How Predictive Safety Analytics is Preventing Tomorrow's Accidents Today</figcaption>
</figure>'''

img2_html = '''<figure className="my-8">
  <img src="/images/blog/dr-gpr-krishna/image2.png" alt="The Predictive Safety Pyramid Framework" className="w-full rounded-2xl shadow-lg border border-slate-200" />
  <figcaption className="mt-2 text-center text-xs text-slate-500 font-semibold">The Predictive Safety Pyramid™ — Shifting focus from lagging accident statistics to proactive risk signal intelligence</figcaption>
</figure>'''

img3_html = '''<figure className="my-8">
  <img src="/images/blog/dr-gpr-krishna/image3.png" alt="Traditional Safety vs Predictive Safety Paradigm Shift" className="w-full rounded-2xl shadow-lg border border-slate-200" />
  <figcaption className="mt-2 text-center text-xs text-slate-500 font-semibold">Paradigm Shift: Moving from Investigating Past Accidents to Predicting and Preventing Future Incidents</figcaption>
</figure>'''

img4_html = '''<figure className="my-8">
  <img src="/images/blog/dr-gpr-krishna/image4.png" alt="Executive Safety Intelligence Dashboard" className="w-full rounded-2xl shadow-lg border border-slate-200" />
  <figcaption className="mt-2 text-center text-xs text-slate-500 font-semibold">Executive Safety Intelligence Dashboard — Transforming safety metrics into boardroom decision-making tools</figcaption>
</figure>'''

img5_html = '''<figure className="my-8">
  <img src="/images/blog/dr-gpr-krishna/image5.png" alt="Predictive Safety Analytics and Operational Risk Management" className="w-full rounded-2xl shadow-lg border border-slate-200" />
  <figcaption className="mt-2 text-center text-xs text-slate-500 font-semibold">Predictive Safety Analytics in Action — Identifying high-risk activities before work begins</figcaption>
</figure>'''

img6_html = '''<figure className="my-8">
  <img src="/images/blog/dr-gpr-krishna/image6.png" alt="Dr. GPR Krishna, Ph.D. - Country Head NIFS & Industry AI Integrator" className="w-full rounded-2xl shadow-lg border border-slate-200" />
  <figcaption className="mt-2 text-center text-xs text-slate-500 font-semibold">Dr. GPR Krishna, Ph.D. — Country Head NIFS & Industry AI Integrator</figcaption>
</figure>'''

for p in posts:
    if 'safety-intelligence' in p['slug']:
        html = p['contentHtml']
        
        # Cover Image update
        p['coverImage'] = '/images/blog/dr-gpr-krishna/image6.png'
        
        # Clean any old embedded image figures if re-running
        # Insert image 1
        anchor1 = '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">The Anatomy of an Accident: Seven Days Before the Crash</h3>'
        if anchor1 in html and 'image1.png' not in html:
            html = html.replace(anchor1, img1_html + '\n' + anchor1)
            print('Injected Image 1')
            
        # Insert image 2
        anchor2 = 'The information was already there.'
        if anchor2 in html and 'image2.png' not in html:
            html = html.replace(anchor2, anchor2 + '\n' + img2_html)
            print('Injected Image 2')

        # Insert image 3
        anchor3 = '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Traditional Safety vs. Predictive Safety</h3>'
        if anchor3 in html and 'image3.png' not in html:
            html = html.replace(anchor3, img3_html + '\n' + anchor3)
            print('Injected Image 3')
            
        # Insert image 4
        anchor4 = '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">CEO\'s Corner: The Boardroom Business Case</h3>'
        if anchor4 in html and 'image4.png' not in html:
            # find next paragraph or section header
            idx = html.find(anchor4)
            if idx != -1:
                end_p = html.find('</p>', idx)
                if end_p != -1:
                    insert_pos = end_p + 4
                    html = html[:insert_pos] + '\n' + img4_html + html[insert_pos:]
                    print('Injected Image 4')

        # Insert image 5
        anchor5 = 'What action can prevent today\'s biggest risk?'
        if anchor5 in html and 'image5.png' not in html:
            html = html.replace(anchor5, anchor5 + '\n' + img5_html)
            print('Injected Image 5')

        # Insert image 6
        anchor6 = 'Every worker returns home safely. Every single day.'
        if anchor6 in html and 'image6.png' not in html:
            html = html.replace(anchor6, anchor6 + '\n' + img6_html)
            print('Injected Image 6')
            
        p['contentHtml'] = html

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print('Updated blog-posts.json successfully!')
