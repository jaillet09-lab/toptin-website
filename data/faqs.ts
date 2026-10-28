import type { Faq } from "@/lib/schema";
import { siteConfig } from "@/site.config";

/** Homepage FAQ (FAQPage schema). General answers only: no timeframes, prices or warranty terms. */
export const homeFaqs: Faq[] = [
  {
    q: "How does the free quote work?",
    a: `Call ${siteConfig.phone} or send the form. We arrange a time to come out, look at the roof and the access, talk through materials and colours, and then send you a written quote with the scope and price set out. There is no obligation.`,
  },
  {
    q: "How long does a roof replacement take?",
    a: "It depends on the size and shape of the roof, the type of roof being removed and the weather. We give you a realistic timeframe in your written quote and keep you updated through the job.",
  },
  {
    q: "What is included in a roof replacement?",
    // Owner, 28 Oct 2026: name the forms and certifications too.
    a: "Usually the removal and disposal of the old roof, any batten work needed, sarking or insulation if you choose it, new Colorbond sheets, new flashings, ridges and valleys, and a full clean up. We also look after the paperwork: building approval, the independent certifier, the Form 16 and Form 21 certificates, and QBCC Home Warranty Insurance. Everything included, forms and certifications too, is listed in your written quote.",
  },
  {
    q: "Can you replace an asbestos roof?",
    a: "Roofs containing asbestos must be removed by licensed people under Queensland rules. If we suspect asbestos, we tell you during the quote and explain how its removal is arranged before any work starts.",
  },
  {
    q: "What about solar panels?",
    a: "If you already have solar, we take the panels off and put them back, with a licensed electrician handling the disconnect and reconnect. If you want a new solar system, we have a supplier we highly recommend. When we do your roof, we put you in direct contact with them: no middleman and no markup from us.",
  },
  {
    q: "Are you licensed?",
    a: `Yes. Top Tin Roofing holds QBCC licence ${siteConfig.qbcc}, and our ABN is ${siteConfig.abn}. You can check any Queensland builder or contractor licence on the QBCC website.`,
  },
  {
    q: "How does payment work?",
    a: "The payment terms are set out in your written quote before you agree to anything, so you know what is due and when.",
  },
  {
    q: "Do you clean up after the job?",
    a: "Yes. The old roof is taken away, the site is cleaned up, and we walk you through the finished roof before we leave.",
  },
  {
    q: "My roof was damaged in a storm. Can you help?",
    a: "Yes. We can inspect the roof and give you a written quote for the work, which you can send to your insurer. Your insurer decides what the policy covers.",
  },
  {
    q: "How do I choose a Colorbond colour?",
    a: "We bring colour samples to the quote so you can see them against your house in daylight. Lighter colours reflect more heat, darker colours can suit the look of some homes. We talk you through the trade-offs.",
  },
  {
    q: "Do I need council approval for a new roof?",
    a: "Like-for-like roof replacements often do not need a building approval, but it depends on the work and the property, for example heritage-listed homes or changes to the roof structure. We tell you if we think approval may be needed.",
  },
];
