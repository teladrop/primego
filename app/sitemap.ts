import type { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { getPosts, getAdminProjects } from "@/lib/storage";

const BASE = "https://www.westmarkservicesltd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const projects = await getAdminProjects();

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/projects`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/careers`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE}/testimonials`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const blogPages = posts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: new Date(p.updated_at),
    }));

  const projectPages = projects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: new Date(p.updated_at),
    }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages];
}
