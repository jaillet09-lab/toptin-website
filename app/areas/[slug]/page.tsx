import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, type Faq } from "@/lib/schema";
import { getAllPosts, getPostsRelatedTo } from "@/lib/blog";
import { areas, getArea, regionLabels } from "@/data/areas";
import { services } from "@/data/services";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { PostGrid } from "@/components/PostCards";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

function titleFor(name: string): string {
  const base = `Roof Replacement ${name}, Colorbond Roofing`;
  return base.length + 18 <= 60 ? base : `Roof Replacement ${name} QLD`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return buildMetadata({
    title: titleFor(a.name),
    description: `Roof replacement and Colorbond roof installation in ${a.name}. Free on-site quote, a written price and a QBCC licensed local crew. Call ${siteConfig.phone}.`.slice(0, 160),
    path: `/areas/${a.slug}`,
    ogTitle: `Roof replacement in ${a.name}`,
  });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const path = `/areas/${a.slug}`;
  const idx = areas.findIndex((x) => x.slug === a.slug);
  const photo = photos[idx % photos.length];
  const neighbours = a.neighbours.map(getArea).filter((n): n is NonNullable<typeof n> => Boolean(n));
  const related = getPostsRelatedTo("area", a.slug);
  const posts = related.length ? related : getAllPosts().slice(idx % 4, (idx % 4) + 3);

  const faqs: Faq[] = [
    a.faq,
    {
      q: `How do I get a quote for a new roof in ${a.name}?`,
      a: `Call ${siteConfig.phone} or send the form on this page. We arrange a time to come to your ${a.name} property, look at the roof and send you a written quote. It is free and there is no obligation.`,
    },
    {
      q: "Are you licensed?",
      a: `Yes. Top Tin Roofing holds QBCC licence ${siteConfig.qbcc}. Our ABN is ${siteConfig.abn}.`,
    },
  ];

  return (
    <>
      {services.map((s) => (
        <JsonLd key={s.slug} data={serviceSchema({ name: `${s.name} in ${a.name}`, description: `${s.name} for homes in ${a.name}, ${regionLabels[a.region]}.`, path, serviceType: s.serviceType, areaName: a.name })} />
      ))}
      <PageHero
        crumbs={[{ name: "Areas", path: "/areas" }, { name: a.name, path }]}
        eyebrow={regionLabels[a.region]}
        title={`Roof replacement in ${a.name}`}
        intro={<p>{a.summary} Free on-site quote and a written price before any work starts.</p>}
        photo={{ src: photo.src, alt: photo.alt }}
        quoteHref={`/quote?suburb=${encodeURIComponent(a.name)}`}
      />

      <Section tone="white" label={`Roofing in ${a.name}`}>
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose">
            <h2>Homes in {a.name}</h2>
            <p>{a.homes}</p>
            <h2>Roofs we see in {a.name}</h2>
            <p>{a.roofs}</p>
            <h2>Weather and exposure</h2>
            <p>{a.exposure}</p>
          </div>
          <aside className="grid gap-5 self-start">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover group p-6">
                <h2 className="font-display text-[21px] font-semibold text-navy">{s.name} in {a.name}</h2>
                <p className="mt-2 text-[15px] text-mute">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-navy"><span className="hl">How it works</span><Icon name="arrow" size={17} /></span>
              </Link>
            ))}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper">
              <Image src={photos[(idx + 3) % photos.length].src} alt={photos[(idx + 3) % photos.length].alt} fill sizes="(max-width: 1024px) 92vw, 30vw" className="object-cover" />
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="page" label="Questions">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={`Roofing in ${a.name}: questions.`} />
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <Section tone="navy" id="quote" label="Get a free quote">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Free quote" title={`Get a free quote in ${a.name}.`} lead="Two short steps. Your suburb is already filled in." />
          <div className="rounded-lg bg-white/[0.05] p-6 ring-1 ring-white/12 md:p-8">
            <QuoteForm source={`area-${a.slug}`} suburb={a.name} dark />
          </div>
        </div>
      </Section>

      <Section tone="white" label="Nearby areas and guides">
        <div className="wrap">
          {neighbours.length ? (
            <>
              <SectionHeading eyebrow="Nearby" title="We also work nearby." />
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {neighbours.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/areas/${n.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-4 text-[15px] font-semibold text-navy hover:border-navy">
                      Roof replacement in {n.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/areas" className="inline-flex min-h-11 items-center rounded-lg bg-navy px-4 text-[15px] font-semibold text-white">All areas</Link>
                </li>
              </ul>
            </>
          ) : null}
          <div className="mt-14">
            <SectionHeading eyebrow="Guides" title="Before you replace your roof." />
            <div className="mt-8"><PostGrid posts={posts} /></div>
          </div>
        </div>
      </Section>
    </>
  );
}
