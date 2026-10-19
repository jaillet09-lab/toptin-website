import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Blog loader: MDX posts in /content/blog with frontmatter. Synchronous so pages prerender. */

import { slugify, type PostFrontmatter, type PostSummary } from "./blog-shared";

export { categories, categoryLabel, slugify } from "./blog-shared";
export type { PostFrontmatter, PostSummary } from "./blog-shared";

export type Post = PostSummary & { content: string; headings: { depth: number; text: string; id: string }[] };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function read(slug: string): { data: PostFrontmatter; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, "utf8"));
  return { data: parsed.data as PostFrontmatter, content: parsed.content };
}

function countWords(md: string): number {
  return md.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ").replace(/[#>*_`\-|]/g, " ").split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
}

export function extractHeadings(md: string): Post["headings"] {
  const out: Post["headings"] = [];
  for (const line of md.split("\n")) {
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[2].replace(/[*_`]/g, "");
      out.push({ depth: m[1].length, text, id: slugify(text) });
    }
  }
  return out;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostSummary(slug: string): PostSummary | null {
  const file = read(slug);
  if (!file) return null;
  const wordCount = countWords(file.content);
  return { ...file.data, slug, wordCount, readingMinutes: Math.max(1, Math.round(wordCount / 220)) };
}

export function getAllPosts(): PostSummary[] {
  return getAllPostSlugs()
    .map(getPostSummary)
    .filter((p): p is PostSummary => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export function getPost(slug: string): Post | null {
  const file = read(slug);
  if (!file) return null;
  return { ...(getPostSummary(slug) as PostSummary), content: file.content, headings: extractHeadings(file.content) };
}

export function getPostsBySlugs(slugs: string[]): PostSummary[] {
  return slugs.map(getPostSummary).filter((p): p is PostSummary => p !== null);
}

export function getPostsRelatedTo(kind: "service" | "area", slug: string, limit = 3): PostSummary[] {
  return getAllPosts().filter((p) => (kind === "service" ? p.relatedServices : p.relatedAreas)?.includes(slug)).slice(0, limit);
}
