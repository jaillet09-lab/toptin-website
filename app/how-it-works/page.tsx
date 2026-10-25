import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { FaqList } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "How a Roof Replacement Works, Quote to Clean Up",
  description:
    "How a Top Tin roof replacement works, step by step: free inspection, written quote and colour choice, installation by our crew, then clean up and a walk-through.",
  path: "/how-it-works",
  ogTitle: "How it works, from quote to clean up",
});

const steps = [
  {
    title: "Free quote and roof inspection",
    text: `Call ${siteConfig.phone} or send the form. We arrange a time to come out, look at the roof, the frame where we can see it, the gutters and the access, and talk through what you want.`,
    points: ["We check the condition of the roof honestly", "We look at access and safety needs", "We answer your questions on the spot"],
  },
  {
    title: "Written quote and colour choice",
    text: "You get a written quote that sets out the scope, the materials and the price. Once you are happy, you choose your Colorbond colour and profile. We bring samples so you can see them against the house.",
    points: ["Scope and price in writing", "Payment terms set out up front", "Colour and profile chosen with samples"],
  },
  {
    title: "Installation by our crew",
    text: "On the day, our crew sets up safety equipment, removes the old roof, checks the battens and frame, and installs the new roof with new flashings, ridges and valleys. We keep you updated as we go.",
    points: ["Safety set up before work starts", "Battens and frame checked", "Updates through the job"],
  },
  {
    title: "Clean up and final walk-through",
    text: "When the roof is on, the old material is taken away and the site is cleaned up. We walk you through the finished roof and answer any questions.",
    points: ["Old roof removed from site", "Yard and driveway cleaned", "A final walk-through with you"],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "How it works", path: "/how-it-works" }]}
        eyebrow="How it works"
        title="From free quote to clean up."
        intro={<p>Four steps, with no surprises. Here is what happens when you get a new roof with Top Tin.</p>}
        photo={{ src: "/photos/red-roof-crew.jpg", alt: "Top Tin roofer finishing a new red Colorbond roof" }}
      />
      <Section tone="white" label="The steps">
        <div className="wrap">
          <ol className="grid gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="card grid gap-6 p-6 md:grid-cols-[120px_1fr_1fr] md:p-8">
                <span aria-hidden="true" className="font-display text-[56px] font-semibold leading-none text-tin-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-display text-[26px] font-semibold text-navy">{s.title}</h2>
                  <p className="mt-3 text-[16px] text-mute">{s.text}</p>
                </div>
                <ul className="grid content-start gap-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15.5px]"><Icon name="check" size={18} className="mt-0.5 flex-none text-tin-ink" />{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section tone="page" label="Questions">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Questions about the process." lead={<>See also our <Link href="/services/roof-replacement" className="font-semibold text-navy underline">roof replacement</Link> and <Link href="/services/colorbond-roof-installation" className="font-semibold text-navy underline">Colorbond</Link> pages.</>} />
          <FaqList
            faqs={[
              { q: "Do I need to be home during the job?", a: "Not usually, as long as we have access to the roof and somewhere to place materials. We agree the details with you before the job starts." },
              { q: "What happens if it rains?", a: "Roofing work depends on the weather. If rain is coming, we plan around it and make sure the house is protected. We keep you updated if the schedule needs to change." },
              { q: "What happens to the old roof?", a: "We remove it from the site as part of the job. Asbestos roofs are a separate case and must be removed by licensed people under Queensland rules." },
              { q: "When do I pay?", a: "The payment terms are set out in the written quote before you agree to anything, so you know what is due and when." },
            ]}
          />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
