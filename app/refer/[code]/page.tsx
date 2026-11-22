import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { QuoteForm } from "@/components/QuoteForm";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";
import { RatingSummary } from "@/components/Reviews";
import { REFERRAL_REWARD, isReferralCode, referrerFirstName } from "@/lib/referral";

/**
 * Referral page (owner, 22 Nov 2026). A finished client shares toptinroofing.com/refer/<code>; their
 * friend lands here, sees who sent them and asks for a quote. The form carries the code, so the lead
 * reaches GHL marked "Referred by" and the TopTin System adds it to its referral list. Not indexed.
 */
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  return buildMetadata({
    title: "A friend recommended Top Tin Roofing",
    description: "Get a free roof inspection and a written quote from Top Tin Roofing, a QBCC licensed Brisbane roofer recommended by someone you know.",
    path: `/refer/${code}`,
    ogTitle: "A friend recommended Top Tin Roofing",
    noindex: true,
  });
}

export default async function ReferPage({ params }: { params: Promise<{ code: string }> }) {
  const code = String((await params).code ?? "").toLowerCase();
  const valid = isReferralCode(code);
  const name = valid ? await referrerFirstName(code) : "";
  const who = name || "A friend";

  return (
    <section className="on-dark bg-navy text-white">
      <div className="wrap grid gap-10 py-10 md:py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="eyebrow">Recommended to you</span>
          <h1 className="display-xl mt-4">{who} recommended us for your roof.</h1>
          <p className="lead mt-5">
            Tell us about the roof in two short steps. We arrange a time to come out, inspect it and send you a written quote. There is no obligation.
          </p>
          <ul className="mt-8 grid gap-3 text-[16px] text-white/85">
            {["Free on-site inspection", "A written, itemised quote", "Help choosing colour and profile", `QBCC licence ${siteConfig.qbcc}`].map((t) => (
              <li key={t} className="flex items-center gap-3"><Icon name="check" size={18} className="text-tin" />{t}</li>
            ))}
          </ul>
          {name ? (
            <div className="mt-8 rounded-lg bg-white/[0.06] p-5 ring-1 ring-white/12">
              <p className="text-[16px] leading-7 text-white/90">
                Because {name} sent you, we thank {name} with {REFERRAL_REWARD} once your new roof is finished and paid for. {name} can choose to pass it on to you as {REFERRAL_REWARD} off your quote instead.
              </p>
            </div>
          ) : null}
          <div className="mt-8"><RatingSummary dark /></div>
          <div className="mt-8 rounded-lg bg-white/[0.06] p-5 ring-1 ring-white/12">
            <p className="text-[15px] text-white/80">Rather talk it through? Call us{name ? ` and mention ${name}` : ""}.</p>
            <TelLink location="referral-page" className="mt-1 inline-flex items-center gap-2 font-display text-[28px] font-semibold text-white hover:text-tin">
              <Icon name="phone" size={22} className="text-tin" />{siteConfig.phone}
            </TelLink>
            <p className="mt-1 text-[14px] text-white/65">{siteConfig.hours.label}</p>
          </div>
        </div>
        <div className="rounded-lg bg-white/[0.05] p-6 ring-1 ring-white/12 md:p-8">
          <QuoteForm source="referral-page" dark referralCode={valid ? code : undefined} />
        </div>
      </div>
      <div className="bg-page text-text">
        <div className="wrap section grid gap-8 md:grid-cols-3">
          {[
            { t: "What happens next", d: "We contact you to arrange a time to inspect the roof. If you sent photos, they help us prepare." },
            { t: "The written quote", d: "You get the scope, materials and price in writing, with the payment terms set out." },
            { t: "Why we pay for referrals", d: "A big part of what a roofing company spends goes on advertising. We would rather give that money to the people who recommend us." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h2 className="font-display text-[20px] font-semibold text-navy">{x.t}</h2>
              <p className="mt-2 text-[15.5px] text-mute">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
