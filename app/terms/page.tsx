import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Website Terms of Use, Top Tin Roofing Brisbane",
  description:
    "The terms for using the Top Tin Roofing website. Information here is general. Work is done under a written quote and agreement that sets out the scope and price.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms", path: "/terms" }]} eyebrow="Terms" title="Website terms of use." intro={<p>The terms for using this website.</p>} />
      <Section tone="white" label="Terms of use">
        <div className="wrap prose">
          <h2>General information only</h2>
          <p>The information on this website, including our guides, is general in nature. It is not a quote and does not take the details of your property into account. Always get a written quote for your roof.</p>
          <h2>Quotes and work</h2>
          <p>Any work we carry out is done under a written quote and agreement that sets out the scope, the price and the payment terms. If anything on this website differs from your written quote or agreement, the quote and agreement apply.</p>
          <h2>Photos and content</h2>
          <p>The photos and text on this website belong to {siteConfig.name}. Please do not copy them without permission.</p>
          <h2>Links</h2>
          <p>We may link to other websites, such as government and industry sites. We are not responsible for their content.</p>
          <h2>Your rights</h2>
          <p>Nothing in these terms limits your rights under the Australian Consumer Law.</p>
          <h2>Contact</h2>
          <p>Questions about these terms: phone {siteConfig.phone} or email <a href={siteConfig.emailHref}>{siteConfig.email}</a>. See also our <Link href="/privacy">privacy policy</Link>.</p>
        </div>
      </Section>
    </>
  );
}
