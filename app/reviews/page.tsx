import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { reviews } from "@/lib/schema";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ReviewCard, RatingSummary } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Top Tin Roofing Reviews, Brisbane Homeowners",
  description:
    "Google reviews from Brisbane homeowners who had their roof replaced by Top Tin Roofing. Read what they say about the crew, the quote and the clean up.",
  path: "/reviews",
  ogTitle: "Reviews from Brisbane homeowners",
});

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Reviews", path: "/reviews" }]}
        eyebrow="Reviews"
        title="What homeowners say."
        intro={<p>A selection of our Google reviews, shown word for word. <RatingSummary dark /></p>}
      />
      <Section tone="page" label="Google reviews">
        <div className="wrap">
          <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>div]:mb-5">
            {reviews.reviews.map((r) => (
              <div key={r.author} className="break-inside-avoid"><ReviewCard review={r} /></div>
            ))}
          </div>
          {siteConfig.reviews.googleProfileUrl ? (
            <p className="mt-8 text-[15px] text-mute">
              Read more on <a className="font-semibold text-navy underline" href={siteConfig.reviews.googleProfileUrl} target="_blank" rel="noopener noreferrer">our Google profile</a>.
            </p>
          ) : null}
        </div>
      </Section>
      <CtaBand title="Want the same result? Get a free quote." />
    </>
  );
}
