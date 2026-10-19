import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/site.config";
import { services } from "@/data/services";
import { areas } from "@/data/areas";
import { getAllPosts } from "@/lib/blog";

const BUILT = new Date();

/** Every indexable page. /thank-you (noindex) and /og are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const e = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified: Date | string = BUILT) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    e("/", 1, "weekly"),
    e("/services", 0.9, "monthly"),
    ...services.map((s) => e(`/services/${s.slug}`, 0.9, "monthly")),
    e("/quote", 0.9, "monthly"),
    e("/projects", 0.8, "monthly"),
    e("/reviews", 0.7, "monthly"),
    e("/how-it-works", 0.7, "monthly"),
    e("/about", 0.7, "monthly"),
    e("/contact", 0.7, "monthly"),
    e("/areas", 0.8, "monthly"),
    ...areas.map((a) => e(`/areas/${a.slug}`, 0.7, "monthly")),
    e("/blog", 0.7, "weekly"),
    ...getAllPosts().map((p) => e(`/blog/${p.slug}`, 0.6, "monthly", p.updated)),
    e("/privacy", 0.2, "yearly"),
    e("/terms", 0.2, "yearly"),
  ];
}
