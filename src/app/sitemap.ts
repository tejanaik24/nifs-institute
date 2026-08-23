import type { MetadataRoute } from "next";
import { courses } from "@/lib/data/courses";
import { blogPosts } from "@/lib/data/blog";

export const dynamic = "force-static";

const baseUrl = "https://nifsindia.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/admissions/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/courses/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/centers/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/centers/visakhapatnam/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/placements/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery/`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/industrial-services/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog/`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/courses/safety-officer-course/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/fire-and-safety-course/`, changeFrequency: "weekly", priority: 0.8 },
  ] as const;

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...courseRoutes, ...blogRoutes];
}
