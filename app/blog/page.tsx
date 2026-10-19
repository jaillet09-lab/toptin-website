import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogList } from "./BlogList";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Roofing Guides for Brisbane Homeowners, Top Tin",
  description:
    "Plain-English roofing guides for Brisbane homeowners: replacement costs, signs a roof needs replacing, Colorbond colours, tile versus metal, asbestos and insurance.",
  path: "/blog",
  ogTitle: "Roofing guides for Brisbane homeowners",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Guides"
        title="Roofing guides for Brisbane homeowners."
        intro={<p>Straight answers about costs, materials and what to check before you replace your roof.</p>}
      />
      <Section tone="page" label="Guides">
        <div className="wrap">
          <BlogList posts={posts} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
