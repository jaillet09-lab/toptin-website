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
  message: string;
  /** Page the form was submitted from, for example /areas/aspley */
  sourcePage: string;
  submittedAt: string;
  userAgent: string;
};

export type LeadPhoto = { filename: string; contentType: string; size: number; data: Buffer };

export type SubmitResult = { ok: boolean; delivered: string[]; errors: string[] };

export const roofTypeOptions = [
  { value: "tile", label: "Tile" },
  { value: "metal", label: "Metal (iron or Colorbond)" },
  { value: "unsure", label: "Not sure" },
];

export const roofAgeOptions = [
  { value: "under-15", label: "Under 15 years" },
  { value: "15-30", label: "15 to 30 years" },
  { value: "30-plus", label: "More than 30 years" },
  { value: "unsure", label: "Not sure" },
];

export function optionLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
