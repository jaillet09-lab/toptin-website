import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/data/services";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Roofing Services in Brisbane",
  description:
    "Top Tin Roofing services in Brisbane: full roof replacement and Colorbond roof installation, with metal roofing options. Free quote from a QBCC licensed crew.",
  path: "/services",
  ogTitle: "Roofing services in Brisbane",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Roofing services in Brisbane."
        intro={<p>We focus on two things: replacing old roofs and installing new Colorbond roofs. Doing fewer things means our crew does them well, every day.</p>}
        photo={{ src: "/photos/red-roof-crew.jpg", alt: "Top Tin roofer installing a new red Colorbond roof" }}
      />
      <Section tone="page" label="Our services">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] bg-paper">
                <Image src={s.photo} alt={`${s.name} by Top Tin Roofing`} fill sizes="(max-width: 768px) 92vw, 46vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-[28px] font-extrabold text-navy">{s.name}</h2>
                <p className="mt-3 text-[16px] text-mute">{s.summary}</p>
                <ul className="mt-5 grid gap-2.5">
                  {s.included.slice(0, 4).map((i) => (
                    <li key={i} className="flex gap-3 text-[15px]"><Icon name="check" size={18} className="mt-0.5 flex-none text-tin-ink" />{i}</li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-navy"><span className="hl">More about {s.short.toLowerCase()}</span><Icon name="arrow" size={18} /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="white" label="Metal roofing">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading eyebrow="Materials" title="Metal roofing as an option." lead="Colorbond steel is our standard material. For some homes, for example very close to the bay, other metal roofing products suit better. We explain the options during your free quote." />
          <div className="card p-7">
            <h2 className="font-display text-[22px] font-extrabold text-navy">Not sure what you need?</h2>
            <p className="mt-3 text-[16px] text-mute">Tell us about the roof and we will help you work it out. The quote is free and there is no obligation.</p>
            <Link href="/quote?service=not-sure" className="btn btn-primary mt-6">Get a free quote <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
