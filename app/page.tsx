import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";
import { averageRating, reviews } from "@/lib/schema";
import { services } from "@/data/services";
import { areas } from "@/data/areas";
import { heroPhoto, photos } from "@/data/photos";
import { homeFaqs } from "@/data/faqs";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewCard, RatingSummary } from "@/components/Reviews";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { FaqList } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Roof Replacement and Colorbond Brisbane",
  absoluteTitle: true,
  description:
    "Roof replacement and Colorbond roof installation across Brisbane by a local QBCC licensed crew. Free on-site quote, written price and a clean site at the end.",
  path: "/",
  ogTitle: "Roof replacement and Colorbond roofing in Brisbane",
});

const steps = [
  { title: "Free quote and roof inspection", text: "We come out, look at the roof and access, and listen to what you want." },
  { title: "Written quote and colour choice", text: "The scope and price in writing, then you choose your profile and colour." },
  { title: "Installation by our crew", text: "Old roof off, structure checked, new roof on, with updates as we go." },
  { title: "Clean up and final walk-through", text: "We clear the site and walk you through the finished roof." },
];

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: "users", title: "A local Brisbane crew", text: "Our own team does the work. You know who is on your roof, and you can reach us on the phone." },
  { icon: "file", title: "A clear, written quote", text: siteConfig.pricingLine + " If something changes, we talk to you first." },
  { icon: "message", title: "You are kept in the loop", text: "Updates through the job, so you always know what is happening and what comes next." },
  { icon: "broom", title: "A clean site at the end", text: "The old roof goes, the yard is cleaned up, and we walk you through the new roof before we leave." },
];

export default function HomePage() {
  const rating = averageRating();
  const gallery = photos.filter((p) => !p.hero).slice(0, 8);

  return (
    <>
      {/* 1. Hero: text on navy, the photo as its own block, a yellow rule along the bottom (docs/BRAND.md) */}
      <section className="on-dark border-b-4 border-tin bg-navy text-white">
        <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">Brisbane roofing contractor · QBCC {siteConfig.qbcc}</span>
            <h1 className="display-xl mt-4 max-w-[16ch]">
              Roof replacement and <span className="text-tin">Colorbond roofing</span> in Brisbane.
            </h1>
            <p className="lead mt-6">
              When patching stops working, we replace the roof properly. Old roof off, frame checked, new Colorbond on, and a written price before we start.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn btn-primary btn-lg">Get a free quote <Icon name="arrow" size={18} /></Link>
              <TelLink location="hero" className="btn btn-ghost btn-lg"><Icon name="phone" size={18} />Call {siteConfig.phone}</TelLink>
            </div>
            <div className="mt-7"><RatingSummary dark /></div>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg bg-navy-2 lg:block">
            <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="(max-width: 1023px) 1px, 46vw" quality={75} className="object-cover" />
          </div>
        </div>
        <div className="wrap pb-14 md:pb-20">
          <div className="border-t border-white/15 pt-8">
            <h2 className="display-md">What do you need?</h2>
            <p className="mt-1.5 text-[15px] text-mist">Pick one and we will set up your free quote.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                { href: "/quote?service=roof-replacement", label: "Roof replacement", sub: "Old tile or metal roof" },
                { href: "/quote?service=colorbond-roof-installation", label: "Colorbond installation", sub: "New Colorbond roof" },
                { href: "/quote?service=not-sure", label: "Not sure", sub: "We will help you work it out" },
              ].map((o) => (
                <Link key={o.href} href={o.href} className="group flex min-h-16 items-center justify-between rounded-lg bg-white px-4 text-navy hover:bg-page">
                  <span>
                    <b className="block text-[16px] font-semibold">{o.label}</b>
                    <span className="text-[14px] text-mute">{o.sub}</span>
                  </span>
                  <Icon name="arrow" size={18} className="text-tin-ink transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section aria-label="Why you can trust us" className="border-b border-line bg-white">
        <ul className="wrap grid grid-cols-2 gap-x-6 gap-y-4 py-6 text-[14.5px] font-semibold text-navy md:grid-cols-5">
          {[
            { icon: "shield" as IconName, text: `QBCC licence ${siteConfig.qbcc}` },
            { icon: "file" as IconName, text: `ABN ${siteConfig.abn}` },
            { icon: "check" as IconName, text: "Free, no-obligation quote" },
            { icon: "pin" as IconName, text: "Brisbane based" },
            ...(rating ? [{ icon: "star" as IconName, text: siteConfig.reviews.googleCount ? `${(siteConfig.reviews.googleRating ?? rating).toFixed(1)} on Google (${siteConfig.reviews.googleCount}+ reviews)` : "5-star Google reviews" }] : []),
            ...(siteConfig.claims.projectsCount.enabled ? [{ icon: "home" as IconName, text: siteConfig.claims.projectsCount.label }] : []),
            ...(siteConfig.claims.experience.enabled ? [{ icon: "users" as IconName, text: siteConfig.claims.experience.label }] : []),
          ].map((t) => (
            <li key={t.text} className="flex items-center gap-2.5">
              <span className="grid size-9 flex-none place-items-center rounded-lg bg-tin/15 text-tin-ink"><Icon name={t.icon} size={17} /></span>
              {t.text}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Services */}
      <Section tone="page" label="Services">
        <div className="wrap">
          <SectionHeading eyebrow="What we do" title="Two things, done properly." lead="We focus on roof replacement and Colorbond roofing, so that is what our crew does every day." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link href={`/services/${s.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] bg-paper">
                    <Image src={s.photo} alt={`${s.name} by Top Tin Roofing in Brisbane`} fill sizes="(max-width: 768px) 92vw, 46vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-display text-[26px] font-semibold text-navy">{s.name}</h3>
                    <p className="mt-3 flex-1 text-[16px] text-mute">{s.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-navy">
                      <span className="hl">Learn about {s.short.toLowerCase()}</span>
                      <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border border-line bg-white px-6 py-5">
            <b className="text-[15px] text-navy">Materials we work with:</b>
            {["Colorbond steel", "Corrugated profile", "Trimdek-style profile", "Sarking and insulation blanket", "New flashings, ridges and valleys"].map((m) => (
              <span key={m} className="inline-flex items-center gap-2 text-[15px] text-mute"><Icon name="check" size={16} className="text-tin-ink" />{m}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Projects */}
      <Section tone="white" label="Our work">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Our work" title="Real roofs, finished by our crew." lead="Every photo here is a Top Tin job. No stock images." />
            <Link href="/projects" className="btn btn-outline shrink-0">See all projects <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((p) => (
                <div key={p.src} className="relative aspect-square overflow-hidden rounded-lg bg-paper">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 46vw, 18vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 5. How it works */}
      <Section tone="page" label="How it works">
        <div className="wrap">
          <SectionHeading eyebrow="How it works" title="From quote to clean up, in four steps." />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="card p-6">
                <span aria-hidden="true" className="font-display text-[40px] font-semibold leading-none text-tin-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[19px] font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-[15px] text-mute">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/how-it-works" className="mt-8 inline-flex items-center gap-2 font-semibold text-navy"><span className="hl">More on how we work</span><Icon name="arrow" size={18} /></Link>
        </div>
      </Section>

      {/* 6. Why Top Tin */}
      <Section tone="navy" label="Why Top Tin">
        <div className="wrap">
          <SectionHeading eyebrow="Why Top Tin" title="What our customers mention most." lead="These come straight from what people say in their reviews." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="card-dark p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-tin text-navy"><Icon name={r.icon} size={20} /></span>
                <h3 className="mt-5 font-display text-[19px] font-semibold">{r.title}</h3>
                <p className="mt-2 text-[15px] text-white/75">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Reviews */}
      <Section tone="page" label="Reviews">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Reviews" title="What homeowners say." lead={<RatingSummary />} />
            <Link href="/reviews" className="btn btn-outline shrink-0">Read more reviews <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="mt-10">
            <h3 className="text-[15px] font-semibold uppercase tracking-[0.12em] text-tin">Hear it from the homeowners</h3>
            <p className="mt-2 max-w-[640px] text-[16px] text-mute">Ethan asks a few quick questions once the roof is done. These are real customers on real jobs, unscripted.</p>
            <div className="mt-6"><VideoTestimonials /></div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.reviews.slice(0, 6).map((r) => <ReviewCard key={r.author} review={r} />)}
          </div>
        </div>
      </Section>

      {/* 8. Colorbond */}
      <Section tone="white" label="Colorbond roofing">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Colorbond roofing" title="Why Colorbond suits Queensland homes." />
            <div className="mt-6 grid gap-4 text-[16.5px] text-mute">
              <p>Colorbond steel is made for Australian conditions. It is much lighter than concrete tile, which takes load off an older frame, and it sheds water quickly in a Brisbane downpour.</p>
              <p>Lighter colours reflect more of the sun&apos;s heat, which can help keep the roof space cooler in summer. Sarking or an insulation blanket under the sheets makes the biggest difference to comfort and rain noise, so we cover both in every quote.</p>
              <p>The range runs from light to dark tones in corrugated and square-rib profiles, so it suits a Queenslander as well as a new build.</p>
            </div>
            <Link href="/services/colorbond-roof-installation" className="btn btn-navy mt-8">Colorbond roof installation <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper">
            <Image src="/photos/pale-green-roof.jpg" alt="New pale green Colorbond roof on an acreage home in Brisbane" fill sizes="(max-width: 1024px) 92vw, 46vw" className="object-cover" />
          </div>
        </div>
      </Section>

      {/* 9. Areas */}
      <Section tone="paper" label="Areas we cover">
        <div className="wrap">
          <SectionHeading eyebrow="Areas" title="Across Brisbane, Ipswich, Logan and the Gold Coast." lead={siteConfig.serviceArea.long} />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-4 text-[15px] font-semibold text-navy hover:border-navy">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 10. FAQ */}
      <Section tone="page" label="Common questions">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Common questions." lead="Straight answers about quotes, timing and what is included." />
          <FaqList faqs={homeFaqs} />
        </div>
      </Section>

      {/* 11. Quote form */}
      <Section tone="navy" id="quote" label="Get a free quote">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Free quote" title="Tell us about your roof." lead="Two short steps. We come out, look at the roof and send you a written price." />
            <ul className="mt-8 grid gap-3 text-[16px] text-white/85">
              {["No obligation", "A written, itemised quote", `QBCC licence ${siteConfig.qbcc}`].map((t) => (
                <li key={t} className="flex items-center gap-3"><Icon name="check" size={18} className="text-tin" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-white/[0.05] p-6 ring-1 ring-white/12 md:p-8">
            <QuoteForm source="home" dark />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
