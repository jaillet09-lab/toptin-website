import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { areas, regionLabels, type Region } from "@/data/areas";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Cover, Brisbane, Moreton Bay and Logan",
  description:
    "Top Tin Roofing replaces roofs and installs Colorbond across Brisbane, Moreton Bay and Logan. Find your suburb, or call for a free quote anywhere nearby.",
  path: "/areas",
  ogTitle: "Areas we cover",
});

const order: Region[] = ["north", "west", "east", "south", "logan", "moreton-bay"];

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Areas", path: "/areas" }]}
        eyebrow="Areas"
        title="Areas we cover."
        intro={<p>{siteConfig.serviceArea.long} If your suburb is not listed, call us. There is a good chance we cover it.</p>}
        photo={{ src: "/photos/light-grey-roof-trees.jpg", alt: "Light grey Colorbond roof on a Brisbane home among gum trees" }}
      />
      <Section tone="page" label="Suburbs">
        <div className="wrap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {order.map((region) => {
            const list = areas.filter((a) => a.region === region);
            if (!list.length) return null;
            return (
              <div key={region} className="card p-6">
                <h2 className="font-display text-[22px] font-extrabold text-navy">{regionLabels[region]}</h2>
                <ul className="mt-4 grid gap-1">
                  {list.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/areas/${a.slug}`} className="group flex min-h-11 items-center justify-between border-b border-line text-[16px] font-semibold text-navy">
                        {a.name}
                        <Icon name="chevronRight" size={16} className="text-mute transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>
      <Section tone="white" label="Working in your area">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <div className="prose">
            <h2>How we work in your suburb</h2>
            <p>Every job starts with a free inspection at your home. We look at the roof, the access and the structure, then send you a written quote with the scope and price set out. Our own crew does the work, keeps you updated and cleans up at the end.</p>
            <p>Homes across Brisbane vary a lot: character homes and Queenslanders in the inner and western suburbs, brick and tile homes from the 1960s to the 1990s across the north and south, and homes near the bay that need materials suited to salt air. Each suburb page explains what we usually see there.</p>
          </div>
          <div className="prose">
            <h2>Not on the list?</h2>
            <p>These are the suburbs with their own pages, not the limit of where we work. If you are nearby, call us or send the <a href="/quote">quote form</a> with your suburb and we will let you know.</p>
            <p>Before you call, you might find these useful: <a href="/blog/signs-your-roof-needs-replacing">signs your roof needs replacing</a> and <a href="/blog/what-to-check-before-you-hire-a-roofer">what to check before you hire a roofer</a>.</p>
          </div>
        </div>
      </Section>
      <CtaBand title="Not sure if we cover your suburb? Ask us." />
    </>
  );
}
