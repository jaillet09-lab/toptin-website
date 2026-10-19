import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Roofing Projects Brisbane, Real Colorbond Roofs",
  description:
    "Real roofs finished by the Top Tin Roofing crew across Brisbane: Colorbond roof replacements in red, green, grey and dark tones. No stock photos.",
  path: "/projects",
  ogTitle: "Our roofing projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Projects", path: "/projects" }]}
        eyebrow="Projects"
        title="Real roofs, finished by our crew."
        intro={<p>Every photo on this page is a Top Tin job. We are adding job details and before and after pairs as we photograph new work.</p>}
        photo={{ src: "/photos/dark-roof-skylights-wide.jpg", alt: "New dark Colorbond roof with skylights finished by Top Tin Roofing" }}
      />
      <Section tone="white" label="Before and after">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Before and after" title="Tile to Colorbond." lead="Drag the slider to compare. Real before and after photos are being added from upcoming jobs." />
          <BeforeAfter item={{ title: "Tile to Colorbond replacement", caption: "Before and after photos from a real job are coming soon." }} />
        </div>
      </Section>
      <Section tone="page" label="Gallery">
        <div className="wrap">
          <SectionHeading eyebrow="Gallery" title="Recent roofs." />
          <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
            {photos.map((p) => (
              <li key={p.src} className="break-inside-avoid">
                <figure className="card overflow-hidden">
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw" className="h-auto w-full" />
                  <figcaption className="px-4 py-3 text-[14px] text-mute">
                    <b className="text-navy">{p.colour} Colorbond roof</b> · Brisbane area
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <CtaBand title="Like what you see? Get a free quote." />
    </>
  );
}
