import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuoteForm } from "@/components/QuoteForm";
import { QuoteFormFromParams } from "@/components/QuoteFormFromParams";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";
import { RatingSummary } from "@/components/Reviews";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Roof Replacement Quote in Brisbane",
  description:
    "Request a free, no-obligation roof replacement or Colorbond quote in Brisbane. Two short steps, optional photos, and a written price after we inspect the roof.",
  path: "/quote",
  ogTitle: "Get a free roofing quote",
});

export default function QuotePage() {
  return (
    <section className="on-dark bg-navy text-white">
      <div className="wrap grid gap-10 py-10 md:py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Breadcrumbs items={[{ name: "Free quote", path: "/quote" }]} dark />
          <h1 className="display-xl mt-6">Get a free quote.</h1>
          <p className="lead mt-5">Tell us about the roof in two short steps. We arrange a time to come out, inspect it and send you a written quote. There is no obligation.</p>
          <ul className="mt-8 grid gap-3 text-[16px] text-white/85">
            {["Free on-site inspection", "A written, itemised quote", "Help choosing colour and profile", `QBCC licence ${siteConfig.qbcc}`].map((t) => (
              <li key={t} className="flex items-center gap-3"><Icon name="check" size={18} className="text-tin" />{t}</li>
            ))}
          </ul>
          <div className="mt-8"><RatingSummary dark /></div>
          <div className="mt-8 rounded-[14px] bg-white/[0.06] p-5 ring-1 ring-white/12">
            <p className="text-[15px] text-white/80">Rather talk it through?</p>
            <TelLink location="quote-page" className="mt-1 inline-flex items-center gap-2 font-display text-[28px] font-extrabold text-white hover:text-tin">
              <Icon name="phone" size={22} className="text-tin" />{siteConfig.phone}
            </TelLink>
            <p className="mt-1 text-[14px] text-white/65">{siteConfig.hours.label}</p>
          </div>
        </div>
        <div className="rounded-[14px] bg-white/[0.05] p-6 ring-1 ring-white/12 md:p-8">
          <Suspense fallback={<QuoteForm source="quote-page" dark />}>
            <QuoteFormFromParams source="quote-page" dark />
          </Suspense>
        </div>
      </div>
      <div className="bg-page text-text">
        <div className="wrap section grid gap-8 md:grid-cols-3">
          {[
            { t: "What happens next", d: "We contact you to arrange a time to inspect the roof. If you sent photos, they help us prepare." },
            { t: "The written quote", d: "You get the scope, materials and price in writing, with the payment terms set out." },
            { t: "No pressure", d: "Take the time you need. The quote is free and there is no obligation to go ahead." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h2 className="font-display text-[20px] font-bold text-navy">{x.t}</h2>
              <p className="mt-2 text-[15.5px] text-mute">{x.d}</p>
            </div>
          ))}
          <p className="text-[15px] text-mute md:col-span-3">
            Want to know more first? Read <Link href="/how-it-works" className="font-semibold text-navy underline">how it works</Link>, see <Link href="/projects" className="font-semibold text-navy underline">our projects</Link> and <Link href="/reviews" className="font-semibold text-navy underline">reviews</Link>, or our guide to <Link href="/blog/how-much-does-a-roof-replacement-cost-in-brisbane" className="font-semibold text-navy underline">what a roof replacement costs</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
