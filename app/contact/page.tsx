import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { MailLink, TelLink } from "@/components/ui/TelLink";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Contact Top Tin Roofing, Brisbane Roofers",
  description:
    "Contact Top Tin Roofing on 0480 095 902 or toptinroofing@gmail.com, Mon to Fri 7am to 6pm and Sat 9am to 5pm. QBCC licence 15587145.",
  path: "/contact",
  ogTitle: "Contact Top Tin Roofing",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Talk to Top Tin Roofing."
        intro={<p>Call, email or send the form. We reply {siteConfig.hours.label}.</p>}
      />
      <Section tone="page" label="Contact details and form">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid content-start gap-4">
            {[
              { icon: "phone" as const, label: "Phone", node: <TelLink location="contact" className="font-display text-[24px] font-semibold text-navy hover:underline" /> },
              { icon: "mail" as const, label: "Email", node: <MailLink location="contact" className="text-[17px] font-semibold text-navy hover:underline" /> },
              { icon: "clock" as const, label: "Hours", node: <span className="text-[17px] font-semibold text-navy">{siteConfig.hours.label}</span> },
              { icon: "pin" as const, label: "Service area", node: <span className="text-[17px] font-semibold text-navy">{siteConfig.serviceArea.summary}</span> },
            ].map((c) => (
              <div key={c.label} className="card flex items-start gap-4 p-5">
                <span className="grid size-11 flex-none place-items-center rounded-lg bg-tin/15 text-tin-ink"><Icon name={c.icon} size={20} /></span>
                <div>
                  <p className="text-[13.5px] font-semibold uppercase tracking-[0.1em] text-mute">{c.label}</p>
                  <div className="mt-1">{c.node}</div>
                </div>
              </div>
            ))}
            <div className="card p-5">
              <p className="text-[13.5px] font-semibold uppercase tracking-[0.1em] text-mute">Licence and registration</p>
              <p className="mt-2 text-[16px]"><strong className="text-navy">QBCC licence {siteConfig.qbcc}</strong></p>
              <p className="text-[16px]"><strong className="text-navy">ABN {siteConfig.abn}</strong></p>
              <p className="mt-2 text-[14px] text-mute">You can check any Queensland contractor licence on the QBCC website.</p>
            </div>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-[26px] font-semibold text-navy">Send us a message</h2>
            <p className="mt-2 mb-6 text-[15.5px] text-mute">For a quote, a question or anything else about your roof.</p>
            <QuoteForm source="contact" />
          </div>
        </div>
      </Section>
      <Section tone="white" label="Before you get in touch">
        <div className="wrap grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <h2 className="font-display text-[20px] font-semibold text-navy">Getting a quote</h2>
            <p className="mt-2 text-[15.5px] text-mute">The quickest way is the <Link href="/quote" className="font-semibold text-navy underline">free quote form</Link>. Add a few photos of the roof if you can. They help us prepare before we come out.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-[20px] font-semibold text-navy">What happens next</h2>
            <p className="mt-2 text-[15.5px] text-mute">We contact you to arrange a time to inspect the roof, then send a written quote. Read <Link href="/how-it-works" className="font-semibold text-navy underline">how it works</Link> from quote to clean up.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-[20px] font-semibold text-navy">Where we work</h2>
            <p className="mt-2 text-[15.5px] text-mute">Brisbane, Ipswich, Logan and the Gold Coast. See the <Link href="/areas" className="font-semibold text-navy underline">areas we cover</Link>, or call if your suburb is not listed.</p>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
