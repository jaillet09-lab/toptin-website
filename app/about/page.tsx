import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "About Top Tin Roofing, Local Brisbane Roofers",
  description:
    "Top Tin Roofing is a Brisbane roofing business replacing roofs and installing Colorbond. Licensed with the QBCC, our own crew, and a written quote every time.",
  path: "/about",
  ogTitle: "About Top Tin Roofing",
});

const values = [
  { title: "Straight talk", text: "We tell you what we see on your roof, including when it does not need replacing yet." },
  { title: "Everything in writing", text: siteConfig.pricingLine },
  { title: "Our own crew", text: "The people who quote the job are the people responsible for doing it properly." },
  { title: "A tidy finish", text: "The old roof goes, the site is cleaned, and we walk you through the new roof." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About us"
        title="A Brisbane roofing crew that does the job properly."
        intro={<p>Top Tin Roofing replaces roofs and installs Colorbond on homes across Brisbane, Ipswich, Logan and the Gold Coast.</p>}
        photo={{ src: "/photos/green-roof-valleys.jpg", alt: "Top Tin roofer working on the ridge of a new green Colorbond roof" }}
      />
      <Section tone="white" label="Our story">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="prose">
            <h2>Who we are</h2>
            <p>
              Top Tin Roofing is a Queensland, owner-operated roofing company led by Ethan Farrell. We built the business on one idea: do one trade, and do it properly.
            </p>
            <p>
              <strong>Ethan quotes every job.</strong> The person who measures your roof is the person who runs the business. <strong>Tin roofs only.</strong> No side trades; every day is spent on Colorbond roof replacements. <strong>A young crew</strong>, up to date with modern systems and processes, so your job runs smoothly from start to finish. And <strong>everything in writing</strong>: scope, price and contract, all set out before we start.
            </p>
            <h2>How we work</h2>
            <p>
              We keep things simple. We come out and look at your roof, give you a written quote, and then our crew does the work and keeps you updated. When the job is done we clean up and walk you through it.
            </p>
            <p>
              Most of what we do is roof replacement, often taking an old concrete tile or rusted iron roof off and putting new Colorbond on. Doing that every day is how we get good at it.
            </p>
            <h2>Licensed and registered</h2>
            <p>
              Top Tin Roofing holds <strong>QBCC licence {siteConfig.qbcc}</strong>, and our ABN is <strong>{siteConfig.abn}</strong>. You can check any Queensland contractor&apos;s licence on the QBCC website before you hire them, and we encourage you to.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-paper">
            <Image src="/photos/green-roof-crew.jpg" alt="Top Tin crew member on a new green Colorbond roof" fill sizes="(max-width: 1024px) 92vw, 40vw" className="object-cover" />
          </div>
        </div>
      </Section>
      <Section tone="navy" label="What we stand for">
        <div className="wrap">
          <SectionHeading eyebrow="What we stand for" title="How we treat every job." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card-dark p-6">
                <Icon name="check" size={22} className="text-tin" />
                <h3 className="mt-4 font-display text-[19px] font-bold">{v.title}</h3>
                <p className="mt-2 text-[15px] text-white/75">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/reviews" className="btn btn-primary">Read our reviews <Icon name="arrow" size={18} /></Link>
            <Link href="/projects" className="btn btn-ghost">See our projects</Link>
            <Link href="/how-it-works" className="btn btn-ghost">How it works</Link>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
