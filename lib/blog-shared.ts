/** Blog types and helpers that are safe to import from client components (no Node APIs). */

export type PostFrontmatter = {
  title: string;
  /** Short title for the <title> tag. Falls back to title. */
  seoTitle?: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  slug: string;
  relatedServices: string[];
  relatedAreas: string[];
  faqs?: { q: string; a: string }[];
};

export type PostSummary = PostFrontmatter & { readingMinutes: number; wordCount: number };

export const categories = [
  { key: "costs", label: "Costs and quotes" },
  { key: "replacement", label: "Roof replacement" },
  { key: "colorbond", label: "Colorbond" },
  { key: "safety", label: "Safety and insurance" },
] as const;

export function categoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label ?? key;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
