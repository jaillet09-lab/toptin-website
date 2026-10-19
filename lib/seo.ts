import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/site.config";

export type PageMeta = {
  /** Page title without the " | Top Tin Roofing" suffix (the layout template adds it). */
  title: string;
  description: string;
  /** Site path starting with "/". */
  path: string;
  ogTitle?: string;
  ogSubtitle?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export const TITLE_SUFFIX = ` | ${siteConfig.name}`;

/** URL of the generated Open Graph image for a page. */
export function ogImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams();
  params.set("t", title.slice(0, 90));
  if (subtitle) params.set("s", subtitle.slice(0, 120));
  return absoluteUrl(`/og?${params.toString()}`);
}

/** Metadata for a page. Titles 50 to 60 characters with the suffix, descriptions 140 to 160 (the audit warns). */
export function buildMetadata(meta: PageMeta): Metadata {
  const url = absoluteUrl(meta.path);
  const image = ogImageUrl(meta.ogTitle ?? meta.title, meta.ogSubtitle);
  const fullTitle = `${meta.title}${TITLE_SUFFIX}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    robots: meta.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: meta.type ?? "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: meta.description,
      locale: "en_AU",
      images: [{ url: image, width: 1200, height: 630, alt: meta.ogTitle ?? meta.title }],
      ...(meta.type === "article" ? { publishedTime: meta.publishedTime, modifiedTime: meta.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: meta.description, images: [image] },
  };
}
