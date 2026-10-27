export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  /** Property address. A suburb is enough to start. */
  address: string;
  service: string;
  serviceLabel: string;
  roofType: string;
  roofAge: string;
  /** Labels, "" when not asked (the main quote form asks fewer questions than the ads landing page). */
  storeys: string;
  extras: string;
  timing: string;
  message: string;
  /**
   * The answers in the TopTin System quote flow's own ids and values (lib/questions.ts there), sent
   * to GHL as a "Quote answers:" line so the System can pre-select them when the quote is started.
   */
  quoteAnswers: Record<string, string>;
  /** "picked" from the address suggestions, "manual" when they chose to type it, "" from older forms. */
  addressStatus: "picked" | "manual" | "";
  /** Reasons to check this lead before calling (lib/lead/quality.ts). Never used to drop a lead. */
  flags: string[];
  /** Page the form was submitted from, for example /areas/aspley */
  sourcePage: string;
  submittedAt: string;
  userAgent: string;
};

export type LeadPhoto = { filename: string; contentType: string; size: number; data: Buffer };

export type SubmitResult = { ok: boolean; delivered: string[]; errors: string[] };

type Option = { value: string; label: string };

export const roofTypeOptions: Option[] = [
  { value: "tile", label: "Tile" },
  { value: "metal", label: "Metal (iron or Colorbond)" },
  { value: "fibro", label: "Fibro or asbestos sheets" },
  { value: "unsure", label: "Not sure" },
];

export const roofAgeOptions: Option[] = [
  { value: "under-15", label: "Under 15 years" },
  { value: "15-30", label: "15 to 30 years" },
  { value: "30-plus", label: "More than 30 years" },
  { value: "unsure", label: "Not sure" },
];

export const storeyOptions: Option[] = [
  { value: "single", label: "Single storey" },
  { value: "double", label: "Double storey" },
  { value: "unsure", label: "Not sure" },
];

/** "Anything else we should include?" Several can be picked; "none" stands alone. */
export const extraOptions: Option[] = [
  { value: "solar", label: "Solar panels" },
  { value: "skylights", label: "Skylights" },
  { value: "whirlybirds", label: "Whirlybirds" },
  { value: "gutters", label: "New gutters too" },
];

export const timingOptions: Option[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "3-months", label: "In the next 3 months" },
  { value: "later", label: "Later this year" },
  { value: "prices", label: "Just getting prices" },
];

export function optionLabel(options: Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Website answers in the System quote flow's ids and values. Only what the homeowner can know:
 * the team confirms every one (the System pre-selects, it never answers for them).
 */
export function toQuoteAnswers(input: { roofType: string; storeys: string; extras: string }): Record<string, string> {
  const a: Record<string, string> = {};
  const job = ({ tile: "tile_tin", metal: "tin_tin", fibro: "asb_s6" } as Record<string, string>)[input.roofType];
  if (job) a.job_type = job;
  if (input.storeys === "single" || input.storeys === "double") a.storeys = input.storeys;
  const extras = input.extras.split(",").filter(Boolean);
  if (extras.length) {
    for (const k of ["solar", "skylights", "whirlybirds"]) a[k] = extras.includes(k) ? "yes" : "no";
    if (extras.includes("gutters")) a.gutters = "yes";
  }
  return a;
}
