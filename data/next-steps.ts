import { siteConfig } from "@/site.config";

/**
 * What happens after a quote request, shown on the landing page and after its form is sent.
 * We answer every enquiry, Ethan inspects and quotes, then takes over the job. Never name anyone else (owner, 27 Oct 2026).
 * The call line only promises business hours until the owner confirms a faster reply time.
 */
export const callbackLine = `We call ${siteConfig.hours.label}.`;

export const nextSteps = [
  {
    title: "We call you",
    text: `We ask a few questions about the roof and book a time for the inspection. ${callbackLine}`,
  },
  {
    title: "Ethan inspects the roof",
    text: "He checks the roof, the gutters and the access, and brings Colorbond colour samples. The inspection is free.",
  },
  {
    title: "You get a written quote",
    text: "It sets out the scope, the materials and the price, with the payment terms in writing.",
  },
  {
    title: "You decide",
    text: "There is no obligation. If you go ahead, Ethan takes over the job and books your start date.",
  },
];
