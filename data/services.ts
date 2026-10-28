/**
 * Service pages. Copy is original (not from the old site) and only states facts
 * from site.config.ts or general, well-established information about roofing.
 * No warranty lengths, timeframes or prices (brief section 1). The forms and certifications on every
 * job (building approval, certifier, Form 16, Form 21, QBCC Home Warranty Insurance) may be named
 * (owner, 28 Oct 2026).
 */
import type { Faq } from "@/lib/schema";

export type Service = {
  slug: string;
  name: string;
  /** Short name for nav and cards. */
  short: string;
  /** Title tag (without the site suffix) and meta description. */
  seoTitle: string;
  description: string;
  h1: string;
  intro: string[];
  /** Card summary on the home page and services overview. */
  summary: string;
  included: string[];
  materials: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  /** Extra sections of body copy. */
  sections: { heading: string; paragraphs: string[] }[];
  faqs: Faq[];
  /** Photo used on cards and in the page hero. */
  photo: string;
  serviceType: string;
  relatedPosts: string[];
};

export const services: Service[] = [
  {
    slug: "roof-replacement",
    name: "Roof replacement",
    short: "Roof replacement",
    seoTitle: "Roof Replacement Brisbane, Tile to Metal",
    description:
      "Roof replacement in Brisbane by a QBCC licensed local crew. Old tile or metal roofs replaced with new Colorbond, a written quote first and a clean site after.",
    h1: "Roof replacement in Brisbane",
    summary:
      "Old tile or tired metal roof? We strip it, fix what sits underneath and install a new Colorbond roof, with the price in writing before we start.",
    intro: [
      "Every roof reaches a point where patching stops working. Tiles go porous, mortar on the ridges cracks, iron rusts through at the laps and screws, and leaks start turning up in new places after every storm. When that happens, a full replacement is usually the fix that lasts.",
      "Top Tin Roofing replaces roofs on homes across Brisbane, Ipswich, Logan and the Gold Coast. We take the old roof off, check the battens and frame underneath, and install a new Colorbond steel roof with new flashings, ridges and valleys. You get a written quote first, the crew keeps you updated through the job, and the site is cleaned up when we leave.",
    ],
    included: [
      "A free on-site inspection and a written, itemised quote",
      "Safe removal and disposal of the old roof sheets or tiles",
      "Batten checks, with new battens where the roof needs them",
      "Sarking or insulation blanket if you choose it",
      "New Colorbond roof sheets in the profile and colour you pick",
      "New ridge capping, flashings and valley iron",
      "Gutter and downpipe work where it is included in your quote",
      "A full clean up and a walk-through with you at the end",
    ],
    materials: [
      {
        title: "Colorbond steel",
        text: "Our standard roofing material. Pre-painted steel made for Australian conditions, available in a wide range of colours and in corrugated and trimdek-style profiles.",
      },
      {
        title: "Metal roofing options",
        text: "Other metal roofing products can suit particular homes, for example sites very close to the coast. We explain the options during the quote.",
      },
      {
        title: "Sarking and insulation",
        text: "A layer under the sheets that helps with heat, condensation and noise. Worth considering on any replacement, and easiest to add while the old roof is off.",
      },
    ],
    steps: [
      { title: "Free quote and roof inspection", text: "We look at the roof, the frame and access, and listen to what you want." },
      { title: "Written quote and colour choice", text: "You get the price and scope in writing, then pick your profile and colour." },
      { title: "Installation by our crew", text: "Old roof off, structure checked, new roof on, with updates as we go." },
      { title: "Clean up and final walk-through", text: "We clear the site and walk you through the finished roof." },
    ],
    sections: [
      {
        heading: "When a replacement makes more sense than a repair",
        paragraphs: [
          "A single cracked tile or a loose sheet is a repair. A replacement starts to make sense when the problems are spread across the whole roof: tiles that are porous and crumbling, ridge bedding failing in many places, rust through the sheets, or leaks that keep moving after each fix.",
          "Age matters too. Many Brisbane homes built in the 1960s, 1970s and 1980s are still on their first concrete tile roof. When we inspect, we tell you honestly what we see, including when we think a roof still has life left in it.",
        ],
      },
      {
        heading: "Tile to Colorbond",
        paragraphs: [
          "Going from concrete tile to Colorbond is one of the most common replacements we do. Steel is much lighter than tile, so it takes load off the frame, and it sheds water quickly in a Queensland downpour. Tile roofs often use different batten spacing to metal, so we check the battens during the quote and allow for any changes in writing.",
        ],
      },
      {
        heading: "Asbestos roofs",
        paragraphs: [
          "Some older homes have fibre cement roofs that may contain asbestos. That material must be handled and removed by licensed people under Queensland rules. If we suspect asbestos, we tell you during the quote and explain how removal is arranged before any work starts.",
        ],
      },
      {
        heading: "Storm damage and insurance",
        paragraphs: [
          "If storm damage is the reason for the new roof, we can give you a written quote to send to your insurer. Your insurer decides what your policy covers. We do not give advice on insurance claims, but we are happy to explain the work we found and quoted.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I know if my roof needs replacing rather than repairing?",
        a: "Look for problems spread across the whole roof: porous or crumbling tiles, cracked ridge bedding in many places, rust through the sheets, or leaks that move after each repair. We inspect the roof for free and tell you honestly whether a replacement is the right call.",
      },
      {
        q: "How long does a roof replacement take?",
        a: "It depends on the size and shape of the roof, what is being removed and the weather. We give you a realistic timeframe in the written quote and keep you updated through the job.",
      },
      {
        q: "What is included in the quote?",
        a: "The written quote sets out the removal of the old roof, any batten work, sarking or insulation if chosen, the new sheets, flashings, ridges and valleys, and the clean up. It also lists the forms and certifications: building approval, the independent certifier, the Form 16 and Form 21 certificates, and QBCC Home Warranty Insurance. If something is not included, the quote says so.",
      },
      {
        q: "What happens with my solar panels?",
        a: "If you already have solar, we take the panels off and put them back, with a licensed electrician handling the disconnect and reconnect. If you want a new solar system, we have a supplier we highly recommend. When we do your roof, we put you in direct contact with them: no middleman and no markup from us.",
      },
      {
        q: "Can you replace a tile roof with Colorbond?",
        a: "Yes. Tile to Colorbond is one of our most common jobs. We check the battens and frame during the quote and allow for any changes in writing.",
      },
      {
        q: "What if my roof contains asbestos?",
        a: "Asbestos must be removed by licensed people under Queensland rules. If we suspect your roof contains asbestos, we tell you during the quote and explain how its removal is arranged before work starts.",
      },
      {
        q: "Do I need council approval to replace my roof?",
        a: "Like-for-like roof replacements often do not need a building approval, but it depends on the work and the property, for example heritage-listed homes or changes to the roof structure. We will tell you if we think approval may be needed, and you can check with your local council.",
      },
    ],
    photo: "/photos/dark-roof-skylights-wide.jpg",
    serviceType: "Roof replacement",
    relatedPosts: ["signs-your-roof-needs-replacing", "how-a-roof-replacement-works-step-by-step", "how-much-does-a-roof-replacement-cost-in-brisbane"],
  },
  {
    slug: "colorbond-roof-installation",
    name: "Colorbond roof installation",
    short: "Colorbond roofing",
    seoTitle: "Colorbond Roof Installation Brisbane",
    description:
      "Colorbond roof installation in Brisbane. Help choosing the colour and profile for Queensland heat, a written quote and a local QBCC licensed crew. Free quote.",
    h1: "Colorbond roof installation in Brisbane",
    summary:
      "A new Colorbond steel roof in the colour and profile that suits your home, installed by our own crew with new flashings, ridges and valleys.",
    intro: [
      "Colorbond is the roof you see on homes all over Queensland, and for good reason. It is light, it sheds rain quickly, and it comes in a wide range of colours, so it suits an old Queenslander as well as a new build.",
      "Top Tin Roofing installs Colorbond roofs on homes across Brisbane, Ipswich, Logan and the Gold Coast, as a replacement for an old tile or metal roof or on new and extended roof areas. We help you choose the profile and colour, set the price out in writing, and install it with new flashings, ridges and valleys.",
    ],
    included: [
      "A free on-site quote with colour and profile samples",
      "A written quote with the full scope and price",
      "Removal of the existing roof where it is a replacement",
      "Sarking or insulation blanket if you choose it",
      "New Colorbond sheets, ridge capping, flashings and valleys",
      "A full clean up and a final walk-through",
    ],
    materials: [
      {
        title: "Corrugated profile",
        text: "The classic wave profile. Suits character homes and Queenslanders and gives a traditional look.",
      },
      {
        title: "Trimdek-style profile",
        text: "A bolder, square-rib profile with a cleaner modern look. Popular on newer homes and extensions.",
      },
      {
        title: "Colour range",
        text: "Light, mid and dark tones. We bring samples to the quote and explain how colour affects the look of the home and the heat in the roof space.",
      },
    ],
    steps: [
      { title: "Free quote and roof inspection", text: "We measure up, check the structure and bring colour samples." },
      { title: "Written quote and colour choice", text: "You confirm the scope, the profile and the colour in writing." },
      { title: "Installation by our crew", text: "Sheets, flashings and capping installed with care, updates as we go." },
      { title: "Clean up and final walk-through", text: "The site is cleared and we check the finished roof with you." },
    ],
    sections: [
      {
        heading: "Why Colorbond suits Queensland homes",
        paragraphs: [
          "Colorbond steel is made for Australian conditions. A steel roof is far lighter than concrete tile, which matters on older frames, and it sheds water fast in the heavy downpours Brisbane gets in storm season.",
          "Lighter Colorbond colours reflect more of the sun's heat than darker ones, which can help keep the roof space cooler in summer. Good sarking or an insulation blanket under the sheets makes the biggest difference to comfort, so we cover both when we quote.",
        ],
      },
      {
        heading: "Choosing a colour",
        paragraphs: [
          "Colour is the decision most people spend the longest on, and it is worth taking your time. Look at the colour on a real roof in daylight, not only on a screen, and think about the walls, trim and gutters it has to sit with. We bring samples to the quote so you can hold them up against the house.",
          "If keeping the home cool is a priority, a lighter roof colour helps. If the look of the street matters most, a mid or dark tone may suit better, with insulation doing more of the work. We talk you through both.",
        ],
      },
      {
        heading: "Homes near the coast",
        paragraphs: [
          "Salt in the air is harder on metal roofing. For homes very close to the bay, we explain which roofing products and fixings suit the location during the quote.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Colorbond colour suits Queensland heat?",
        a: "Lighter colours reflect more of the sun's heat than darker ones, which can help keep the roof space cooler. Insulation under the sheets also makes a big difference. We bring samples and explain the trade-offs at the quote.",
      },
      {
        q: "Corrugated or trimdek-style: which profile should I choose?",
        a: "Corrugated suits character homes and gives a traditional look. A square-rib trimdek-style profile looks cleaner and more modern. Both perform well; it mostly comes down to the look of your home.",
      },
      {
        q: "Is a Colorbond roof noisy in the rain?",
        a: "Rain on a steel roof is louder than on tile, but sarking or an insulation blanket under the sheets reduces the noise a lot. It is worth including when the roof is replaced.",
      },
      {
        q: "Can you install Colorbond on an extension or patio roof?",
        a: "Ask us during the quote. If it is roofing work we can do, we will include it in the written quote or price it separately.",
      },
      {
        q: "Do you remove the old roof as well?",
        a: "Yes. For a replacement, the removal and disposal of the old roof is included in the quote, and we check the battens and frame once it is off.",
      },
    ],
    photo: "/photos/green-roof-crew.jpg",
    serviceType: "Colorbond roof installation",
    relatedPosts: ["choosing-a-colorbond-colour-for-queensland-heat", "colorbond-vs-tile-roofing-in-queensland", "roof-insulation-and-thermal-performance-basics"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Options for the quote form's service field. */
export const quoteServiceOptions = [
  { value: "roof-replacement", label: "Roof replacement" },
  { value: "colorbond-roof-installation", label: "Colorbond roof installation" },
  { value: "not-sure", label: "Not sure yet" },
];
