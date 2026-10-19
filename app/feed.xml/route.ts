import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/site.config";

export const dynamic = "force-static";

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** RSS 2.0 feed of the guides. */
export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <description>${escape(p.description)}</description>
      <pubDate>${new Date(`${p.date}T07:00:00+10:00`).toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)}: roofing guides</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Plain-English roofing guides for Brisbane homeowners.</description>
    <language>en-AU</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
