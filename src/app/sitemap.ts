import { centers } from "@/lib/data/centers";
import { courses } from "@/lib/data/courses";
import { getOpenJobs } from "@/lib/db/jobs";
import { getPublishedPosts } from "@/lib/db/posts";
import type { MetadataRoute } from "next";
import { slugifyCity } from "./(marketing)/centers/[city]/page";

// Hourly refresh (not force-static) so a newly published job shows up in the
// sitemap without waiting for the next deploy.
export const revalidate = 3600;

const baseUrl = "https://nifsindia.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/admissions/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/courses/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/centers/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/placements/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery/`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact/`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${baseUrl}/industrial-services/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${baseUrl}/blog/`, changeFrequency: "daily", priority: 0.8 },
    {
      url: `${baseUrl}/courses/ergonomic-safety/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/online/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/abroad-students/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/safety-officer-course/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fire-and-safety-course/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-become-a-safety-officer-in-india/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/safety-officer-course-after-12th/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/safety-officer-salary-in-india/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ] as const;

  const centerSlugs = Array.from(
    new Set(centers.map((c) => slugifyCity(c.city))),
  );
  const centerRoutes = centerSlugs.map((slug) => ({
    url: `${baseUrl}/centers/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: slug === "visakhapatnam" ? 0.85 : 0.75,
  }));

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPosts = await getPublishedPosts();
  const blogRoutes = blogPosts
    .filter((post) => {
      // Exclude ultra-thin / noindex posts from the sitemap
      if ((post as any).noindex === true) return false;
      if (post.wordCount > 0 && post.wordCount < 400) return false;
      return true;
    })
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: post.publishedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  // Only open jobs: closed drives stay live for users but aren't pushed to crawlers.
  const jobRoutes = (await getOpenJobs()).map((job) => ({
    url: `${baseUrl}/placements/jobs/${job.slug}/`,
    lastModified: job.updatedAt ?? job.createdAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...centerRoutes,
    ...courseRoutes,
    ...blogRoutes,
    ...jobRoutes,
  ];
}
