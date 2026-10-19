import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { categoryLabel, getAllPostSlugs, getAllPosts, getPost } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { getService } from "@/data/services";
import { getArea, areas } from "@/data/areas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { PostGrid } from "@/components/PostCards";
import { mdxComponents, PostCta } from "@/components/blog/mdx";
import { Logo } from "@/components/Logo";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogTitle: post.title,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

function fmt(d: string) {
  return new Date(`${d}T00:00:00+10:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Brisbane" });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });
  const relatedServices = post.relatedServices.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedAreas = (post.relatedAreas.length ? post.relatedAreas.map(getArea) : areas.slice(0, 4)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  const primaryService = relatedServices[0]?.slug;

  return (
    <>
      <JsonLd data={articleSchema({ title: post.title, description: post.description, path, datePublished: post.date, dateModified: post.updated, wordCount: post.wordCount })} />
      <article>
        <header className="on-dark bg-navy text-white">
          <div className="wrap py-12 md:py-16">
            <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path }]} dark />
            <span className="eyebrow mt-6">{categoryLabel(post.category)}</span>
            <h1 className="display-lg mt-3 max-w-[26ch]">{post.title}</h1>
            <p className="lead mt-5">{post.description}</p>
            <p className="mt-6 text-[14px] text-white/65">
              By {siteConfig.name} · Updated {fmt(post.updated)} · {post.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="bg-white">
          <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_280px] lg:py-16">
            <div className="prose min-w-0">
              {content}
              <PostCta service={primaryService} />
            </div>
            <aside className="order-first lg:order-none">
              {post.headings.length ? (
                <nav aria-label="On this page" className="card p-5 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
                  <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-mute">On this page</p>
                  <ol className="mt-3 grid gap-2 text-[14.5px]">
                    {post.headings.filter((h) => h.depth === 2).map((h) => (
                      <li key={h.id}><a href={`#${h.id}`} className="text-navy hover:underline">{h.text}</a></li>
                    ))}
                  </ol>
                </nav>
              ) : null}
            </aside>
          </div>
        </div>

        {post.faqs?.length ? (
          <section className="bg-page section" aria-label="Questions">
            <div className="wrap max-w-[900px]">
              <h2 className="display-md">Questions</h2>
              <FaqList faqs={post.faqs} className="mt-6" />
            </div>
          </section>
        ) : null}

        <section className="bg-page pb-16" aria-label="About the author and related pages">
          <div className="wrap grid gap-6 md:grid-cols-2">
            <div className="card flex flex-col gap-4 p-6">
              <Logo height={30} />
              <p className="text-[15px] text-mute">
                Written by the team at {siteConfig.name}, a Brisbane roofing business replacing roofs and installing Colorbond. QBCC licence {siteConfig.qbcc}.
              </p>
              <Link href="/about" className="text-[15px] font-bold text-navy underline">About us</Link>
            </div>
            <div className="card p-6">
              <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-mute">Related services and areas</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {relatedServices.map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-navy px-4 text-[14px] font-semibold text-white">{s.name}</Link></li>
                ))}
                {relatedAreas.map((a) => (
                  <li key={a.slug}><Link href={`/areas/${a.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-[14px] font-semibold text-navy">{a.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </article>

      <section className="bg-white section" aria-label="More guides">
        <div className="wrap">
          <h2 className="display-md">More guides</h2>
          <div className="mt-8"><PostGrid posts={related} /></div>
        </div>
      </section>
    </>
  );
}
