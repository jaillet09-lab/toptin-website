import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { getPostsBySlugs } from "@/lib/blog";
import { getService, services } from "@/data/services";
import { areas } from "@/data/areas";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { QuoteForm } from "@/components/QuoteForm";
import { PostGrid } from "@/components/PostCards";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.seoTitle, description: s.description, path: `/services/${s.slug}`, ogTitle: s.h1 });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const posts = getPostsBySlugs(s.relatedPosts);
  const gallery = photos.filter((p) => p.src !== s.photo).slice(s.slug === "roof-replacement" ? 0 : 4, s.slug === "roof-replacement" ? 4 : 8);

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.description, path, serviceType: s.serviceType })} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }, { name: s.name, path }]}
        eyebrow="Service"
        title={s.h1}
        intro={<p>{s.intro[0]}</p>}
        photo={{ src: s.photo, alt: `${s.name} by Top Tin Roofing` }}
        quoteHref={`/quote?service=${s.slug}`}
      />

      <Section tone="white" label="Overview">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose">
            {s.intro.slice(1).map((p) => <p key={p}>{p}</p>)}
            {s.sections.map((sec) => (
              <div key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            ))}
          </div>
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <div className="card p-6 md:p-7">
              <h2 className="font-display text-[22px] font-extrabold text-navy">What is included</h2>
              <ul className="mt-5 grid gap-3">
                {s.included.map((item) => (
                  <li key={item} className="flex gap-3 text-[15.5px]">
                    <Icon name="check" size={18} className="mt-0.5 flex-none text-tin-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/quote?service=${s.slug}`} className="btn btn-primary mt-7 w-full">Get a free quote</Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="page" label="Materials and options">
        <div className="wrap">
          <SectionHeading eyebrow="Materials" title="Materials and options." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {s.materials.map((m) => (
              <div key={m.title} className="card p-6">
                <h3 className="font-display text-[20px] font-bold text-navy">{m.title}</h3>
                <p className="mt-2 text-[15.5px] text-mute">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white" label="How we do it">
        <div className="wrap">
          <SectionHeading eyebrow="How we do it" title="Four steps, start to finish." />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <li key={st.title} className="card p-6">
                <span className="font-display text-[40px] font-extrabold leading-none text-tin">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[19px] font-bold text-navy">{st.title}</h3>
                <p className="mt-2 text-[15px] text-mute">{st.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((p) => (
              <div key={p.src} className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-paper">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 46vw, 23vw" className="object-cover" />
              </div>
            ))}
          </div>
          <Link href="/projects" className="mt-6 inline-flex items-center gap-2 font-bold text-navy"><span className="hl">See more of our work</span><Icon name="arrow" size={18} /></Link>
        </div>
      </Section>

      <CtaBand tone="navy" title={`Thinking about ${s.short.toLowerCase()}? Get a free quote.`} service={s.slug} />

      <Section tone="page" label="Questions">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={`${s.name} questions.`} />
          <FaqList faqs={s.faqs} />
        </div>
      </Section>

      <Section tone="white" label="Areas">
        <div className="wrap">
          <SectionHeading eyebrow="Areas" title={`${s.name} near you.`} lead="We work across Brisbane, Moreton Bay and Logan. Find your suburb." />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-[15px] font-semibold text-navy hover:border-navy">
                  {s.short} in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {posts.length ? (
        <Section tone="page" label="Guides">
          <div className="wrap">
            <SectionHeading eyebrow="Guides" title="Helpful reading." />
            <div className="mt-10"><PostGrid posts={posts} /></div>
          </div>
        </Section>
      ) : null}

      <Section tone="navy" id="quote" label="Get a free quote">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Free quote" title={`Get a price for ${s.short.toLowerCase()}.`} lead="Two short steps. We come out, look at the roof and send a written quote." />
          <div className="rounded-[14px] bg-white/[0.05] p-6 ring-1 ring-white/12 md:p-8">
            <QuoteForm source={`service-${s.slug}`} service={s.slug} dark />
          </div>
        </div>
      </Section>
    </>
  );
}
