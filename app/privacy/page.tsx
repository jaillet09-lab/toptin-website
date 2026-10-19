import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy, How We Handle Your Details",
  description:
    "How Top Tin Roofing collects, uses and protects the details you give us through this website, including quote requests and roof photos, and how to contact us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy", path: "/privacy" }]} eyebrow="Privacy" title="Privacy policy." intro={<p>How we handle the details you give us.</p>} />
      <Section tone="white" label="Privacy policy">
        <div className="wrap prose">
          <h2>What we collect</h2>
          <p>When you request a quote or contact us, we collect the details you enter: your name, phone number, email address, property address, information about your roof, your message and any photos you attach. We also record the page you sent the form from and basic technical details such as your browser type.</p>
          <h2>How we use it</h2>
          <p>We use your details to contact you about your enquiry, inspect your roof, prepare a quote and carry out any work you ask us to do. We do not sell your details or use them for unrelated marketing.</p>
          <h2>Who we share it with</h2>
          <p>Your enquiry is delivered to us through service providers that send email and run our systems. They handle your details only to provide those services to us. We may also disclose information where the law requires it.</p>
          <h2>Cookies and analytics</h2>
          <p>This website does not set tracking cookies by default. If we turn on Google analytics or advertising measurement in future, consent defaults are set to denied, and we will update this policy.</p>
          <h2>Keeping your details safe</h2>
          <p>We take reasonable steps to protect the information we hold and keep it only as long as we need it for the purposes above or as the law requires.</p>
          <h2>Access and correction</h2>
          <p>You can ask to see or correct the information we hold about you, or ask us to delete it, by contacting us using the details below.</p>
          <h2>Contact</h2>
          <p>{siteConfig.name}, {siteConfig.base.city} {siteConfig.base.state}. Phone {siteConfig.phone}. Email <a href={siteConfig.emailHref}>{siteConfig.email}</a>. ABN {siteConfig.abn}.</p>
          <p>If you are not satisfied with how we handle a privacy concern, you can contact the Office of the Australian Information Commissioner.</p>
          <p>See also our <Link href="/terms">website terms</Link>, or <Link href="/contact">contact us</Link>. Ready for a roof? <Link href="/quote">Get a free quote</Link>.</p>
        </div>
      </Section>
    </>
  );
}
