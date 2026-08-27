import json

blog_path = r"C:\claude code\nifs-india\src\lib\data\blog-posts.json"

with open(blog_path, "r", encoding="utf-8") as f:
    posts = json.load(f)

updates = {
    "how-safety-officer-training-equips-you-to-lead-in-industrial-environments": {
        "title": "Safety Officer Training: 12-Month Industry Guide 2026 | NIFS",
        "excerpt": "Comprehensive Safety Officer training guide 2026 — practical modules, risk assessment, emergency response skills, and career opportunities at NIFS India."
    },
    "how-nsdc-certified-courses-can-boost-your-career-opportunities": {
        "title": "NSDC Approved Safety Courses: Career Guide 2026 | NIFS",
        "excerpt": "Explore NSDC approved fire and safety courses at NIFS India. National skill certification, government recognition, and 100% placement assistance."
    },
    "why-safety-engineering-courses-by-nifs-are-your-best-for-a-secure-future": {
        "title": "Why Safety Engineering Courses Boost Your Career 2026 | NIFS",
        "excerpt": "Why safety engineering courses are in high demand across oil & gas, construction, and manufacturing. High salary scope and career stability."
    },
    "fire-and-safety-jobs-in-india-the-courses-offered-at-nifs": {
        "title": "Fire and Safety Jobs in India 2026: Salaries & Roles | NIFS",
        "excerpt": "Top fire and safety jobs in India for 2026. Salary expectations, required qualifications (DFS, ADIS, BSc), and top hiring companies."
    }
}

updated_count = 0
for post in posts:
    slug = post.get("slug")
    if slug in updates:
        post["title"] = updates[slug]["title"]
        post["excerpt"] = updates[slug]["excerpt"]
        updated_count += 1

with open(blog_path, "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Successfully updated {updated_count} blog posts in {blog_path}")
