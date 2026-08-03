import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nifsindia.net";

  const staticPages = [
    "",
    "/about",
    "/admissions",
    "/courses",
    "/centers",
    "/placements",
    "/gallery",
    "/contact",
    "/industrial-services",
    "/blog",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
