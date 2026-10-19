import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";
import { ConversionPing } from "./ConversionPing";

export const metadata: Metadata = buildMetadata({
  title: "Thank You, Your Quote Request Is In",
  description: "Thanks for your quote request. Top Tin Roofing will be in touch Mon to Fri, 9am to 5pm, to arrange a time to inspect your roof and prepare a written quote.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="bg-page">
      <ConversionPing />
      <div className="wrap section max-w-[760px] text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-tin text-navy"><Icon name="check" size={30} strokeWidth={3} /></span>
        <h1 className="display-lg mt-6">Thanks. Your quote request is in.</h1>
        <p className="lead mx-auto mt-5">
          We reply {siteConfig.hours.label}. We will be in touch to arrange a time to look at your roof, then send you a written quote.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <TelLink location="thank-you" className="btn btn-navy btn-lg"><Icon name="phone" size={18} />Call {siteConfig.phone}</TelLink>
          <Link href="/projects" className="btn btn-outline btn-lg">See our projects</Link>
        </div>
        <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
          {[
            { href: "/how-it-works", t: "How it works", d: "What happens from quote to clean up." },
            { href: "/reviews", t: "Reviews", d: "What other homeowners say." },
            { href: "/blog", t: "Guides", d: "Costs, colours and what to check." },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="card card-hover p-5">
              <b className="font-display text-[18px] text-navy">{l.t}</b>
              <p className="mt-1 text-[14.5px] text-mute">{l.d}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
