import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { licenceLine, siteConfig } from "@/site.config";
import { reviews } from "@/lib/schema";
import { homeFaqs } from "@/data/faqs";
import { callbackLine, nextSteps } from "@/data/next-steps";
import { photos } from "@/data/photos";
import { Logo } from "@/components/Logo";
import { LandingQuoteForm } from "@/components/LandingQuoteForm";
import { RatingSummary, ReviewCard } from "@/components/Reviews";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { FaqList } from "@/components/Faq";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

/**
 * Google Ads landing page for roof replacement (built 27 Oct 2026 to replace the old GHL funnel at
 * offer.toptinroofing.com/reroof). Not indexed and not in the sitemap: it exists for ad clicks.
 * The root layout swaps in a slim header and drops the site footer and mobile bar here
 * (components/layout/landing.ts), so this page renders its own footer and sticky bar.
 */
export const metadata: Metadata = buildMetadata({
  title: "Free Roof Replacement Quote, Brisbane",
  description:
    "Replace your old tile or metal roof with Colorbond. A free inspection and a written quote from a QBCC licensed Brisbane roofer. Three quick questions.",
  path: "/roof-replacement-quote",
  ogTitle: "Free roof replacement quote",
  noindex: true,
});

const checks = ["Tile to metal and metal to metal", "Free inspection and a written quote", `QBCC licence ${siteConfig.qbcc}`];

const shownReviews = ["Nicholas Delany", "Pheonix Su'a", "Zvarn Perenara", "Lilia Carter", "Holly Clark", "Elijah Hayward"]
  .map((a) => reviews.reviews.find((r) => r.author === a))
  .filter((r): r is (typeof reviews.reviews)[number] => Boolean(r));

const gallery = ["/photos/dark-grey-roof-skylights.jpg", "/photos/red-roof-crew.jpg", "/photos/pale-green-roof.jpg", "/photos/light-grey-hip-roof.jpg", "/photos/green-roof-valleys.jpg", "/photos/grey-roof-cream-cladding.jpg"]
  .map((src) => photos.find((p) => p.src === src))
  .filter((p): p is (typeof photos)[number] => Boolean(p));

const trust: { icon: IconName; title: string; text: string; href?: string }[] = [
  { icon: "shield", title: `QBCC licence ${siteConfig.qbcc}`, text: "You can check it before you book on the", href: "https://www.qbcc.qld.gov.au" },
  { icon: "file", title: "A written quote", text: siteConfig.pricingLine },
  { icon: "home", title: "Local to Brisbane", text: `We work across ${siteConfig.serviceArea.summary}.` },
  { icon: "users", title: "Who you deal with", text: "We answer your enquiry and call you back. Ethan inspects, gives the quote and takes over the job once you go ahead." },
];

const faqFromHome = (q: string) => homeFaqs.filter((f) => f.q === q);
const faqs = [
  { q: "When will you call me?", a: `We call you back to book the inspection. ${callbackLine} If you would rather not wait, call ${siteConfig.phone}.` },
  { q: "Is the inspection really free?", a: "Yes. The inspection and the written quote are free, and there is no obligation to go ahead." },
  ...faqFromHome("How long does a roof replacement take?"),
  ...faqFromHome("What is included in a roof replacement?"),
  ...faqFromHome("Can you replace an asbestos roof?"),
  ...faqFromHome("What about solar panels?"),
  ...faqFromHome("How does payment work?"),
  ...faqFromHome("My roof was damaged in a storm. Can you help?"),
  ...faqFromHome("Are you licensed?"),
];

/** A quote and call prompt closing each section, so there is always a next step in reach. */
function CtaRow({ text, location }: { text: string; location: string }) {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
      <p className="text-[18px] font-semibold text-ink">{text}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="#quote" className="btn btn-navy btn-lg">Get my free quote <Icon name="arrow" size={18} /></a>
        <TelLink location={location} className="btn btn-outline btn-lg"><Icon name="phone" size={18} />Call {siteConfig.phone}</TelLink>
      </div>
    </div>
  );
}

export default function RoofReplacementQuotePage() {
  const year = new Date().getFullYear();
  return (
    <>
      {/* 1. Hero and the form. On a phone the form comes straight after the headline. */}
      <section className="bg-navy text-white">
        <div className="wrap grid gap-8 py-8 md:py-14 lg:grid-cols-[1fr_460px] lg:gap-x-14 lg:gap-y-8">
          <div className="on-dark lg:pt-8">
            <span className="eyebrow">Roof replacement, Brisbane to the Gold Coast</span>
            <h1 className="display-xl mt-4 max-w-[14ch]">Replace your old roof with Colorbond.</h1>
            <p className="lead mt-5">Ethan inspects your roof for free. You get a written quote with the scope and price set out, and there is no obligation.</p>
            <div className="mt-6"><RatingSummary dark /></div>
          </div>
          <div id="quote" className="scroll-mt-24 rounded-lg bg-white p-6 text-text md:p-8 lg:row-span-2">
            <LandingQuoteForm />
          </div>
          <div className="on-dark">
            <ul className="grid content-start gap-3 text-[16px] text-white/85">
              {checks.map((t) => (
                <li key={t} className="flex items-center gap-3"><Icon name="check" size={18} className="text-tin" />{t}</li>
              ))}
            </ul>
            <p className="mt-6 text-[16px] text-[var(--mist)]">
              Prefer to talk?{" "}
              <TelLink location="landing-hero" className="inline-flex items-center gap-2 font-semibold text-white underline"><Icon name="phone" size={16} className="text-tin" />Call {siteConfig.phone}</TelLink>
            </p>
          </div>
        </div>
      </section>

      {/* 2. What happens next */}
      <Section tone="white" label="What happens next">
        <div className="wrap">
          <SectionHeading eyebrow="What happens next" title="From your request to a written quote." lead="Four steps, and you know who looks after each one." />
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="border-t-[1.5px] border-ink pt-4">
                <span className="font-display text-[32px] font-semibold leading-none text-tin-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[20px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15.5px] text-mute">{s.text}</p>
              </li>
            ))}
          </ol>
          <CtaRow text="It starts with a free inspection." location="landing-steps" />
        </div>
      </Section>

      {/* 3. Google reviews */}
      <Section tone="page" label="Google reviews">
        <div className="wrap">
          <SectionHeading eyebrow="Google reviews" title="What homeowners say." lead={<RatingSummary />} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shownReviews.map((r, i) => <div key={r.author} className={i >= 3 ? "hidden md:block" : undefined}><ReviewCard review={r} /></div>)}
          </div>
          {siteConfig.reviews.googleProfileUrl ? (
            <a href={siteConfig.reviews.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15.5px] font-semibold text-navy-2 underline">
              Read all our reviews on Google <Icon name="arrow" size={16} />
            </a>
          ) : null}
          <CtaRow text="Want a result like theirs on your roof?" location="landing-reviews" />
        </div>
      </Section>

      {/* 4. Video testimonials */}
      <Section tone="white" label="Video reviews">
        <div className="wrap">
          <SectionHeading eyebrow="Video" title="Hear it from homeowners." lead="Ethan talks to three homeowners on their finished roofs." />
          <div className="mt-10"><VideoTestimonials /></div>
          <CtaRow text="Ready to talk about your roof?" location="landing-videos" />
        </div>
      </Section>

      {/* 5. Recent roofs */}
      <Section tone="page" label="Recent roofs">
        <div className="wrap">
          <SectionHeading eyebrow="Recent roofs" title="New Colorbond roofs by Top Tin." />
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {gallery.map((p) => (
              <li key={p.src} className="relative aspect-square overflow-hidden rounded-lg bg-paper">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 46vw, 30vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <CtaRow text="Choose your colour with samples at the inspection." location="landing-photos" />
        </div>
      </Section>

      {/* 6. Licensed and local */}
      <Section tone="white" label="Licence and who you deal with">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Licensed and local" title="Licensed, local and in writing." />
          <ul className="grid gap-6 sm:grid-cols-2">
            {trust.map((t) => (
              <li key={t.title} className="border-t border-line pt-4">
                <Icon name={t.icon} size={22} className="text-navy-2" />
                <h3 className="mt-3 text-[18px] font-semibold text-ink">{t.title}</h3>
                <p className="mt-1 text-[15.5px] text-mute">
                  {t.text}
                  {t.href ? <> <a href={t.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-2 underline">QBCC website</a>.</> : null}
                </p>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-2"><CtaRow text="Ask us anything before you book." location="landing-licence" /></div>
        </div>
      </Section>

      {/* 7. FAQ */}
      <Section tone="page" label="Questions">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="Questions before you book." />
            <p className="mt-6 text-[16px] text-mute">
              Still have a question?{" "}
              <TelLink location="landing-faq" className="font-semibold text-navy-2 underline">Call {siteConfig.phone}</TelLink>
            </p>
            <a href="#quote" className="btn btn-navy btn-lg mt-6">Get my free quote <Icon name="arrow" size={18} /></a>
          </div>
          <FaqList faqs={faqs} schema={false} />
        </div>
      </Section>

      {/* 8. Last call to action */}
      <section className="bg-navy text-white" aria-label="Get a free quote">
        <div className="wrap section grid gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
          <div className="on-dark lg:pt-8">
            <span className="eyebrow">Free quote</span>
            <h2 className="display-lg mt-4 max-w-[16ch]">Ready for a written quote?</h2>
            <p className="lead mt-5">Answer three quick questions. We call you back to book a free inspection.</p>
            <p className="mt-8 text-[16px] text-[var(--mist)]">Rather talk it through now?</p>
            <TelLink location="landing-bottom" className="mt-1 inline-flex items-center gap-2 font-display text-[28px] font-semibold text-white hover:text-tin">
              <Icon name="phone" size={22} className="text-tin" />{siteConfig.phone}
            </TelLink>
          </div>
          <div id="quote-bottom" className="scroll-mt-24 rounded-lg bg-white p-6 text-text md:p-8">
            <LandingQuoteForm source="landing-bottom" />
          </div>
        </div>
      </section>

      {/* Slim footer: licence and ABN are required on Queensland building advertising */}
      <footer className="on-dark border-t border-white/10 bg-navy text-white">
        <div className="wrap grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Logo variant="reversed" height={36} />
            <p className="mt-4 text-[14px] text-[var(--mist)]">{licenceLine}</p>
            <p className="mt-1 text-[14px] text-[var(--mist)]">
              <TelLink location="landing-footer" className="font-semibold text-white hover:underline">{siteConfig.phone}</TelLink> · {siteConfig.hours.label}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[var(--navy-300)]">
            <li><Link href="/privacy" className="hover:text-white hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white hover:underline">Terms</Link></li>
            <li><Link href="/" className="hover:text-white hover:underline">toptinroofing.com</Link></li>
            <li>© {year} {siteConfig.name}</li>
          </ul>
        </div>
      </footer>

      {/* Sticky bar on phones and tablets */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy nav:hidden print:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="flex gap-2.5 px-3 py-2.5">
          <TelLink location="landing-bar" className="btn btn-ghost min-h-[50px] flex-1 px-2 text-[15px]"><Icon name="phone" size={17} />Call</TelLink>
          <a href="#quote" className="btn btn-primary min-h-[50px] flex-[1.4] px-2 text-[15px]">Get my free quote</a>
        </div>
      </div>
    </>
  );
}
