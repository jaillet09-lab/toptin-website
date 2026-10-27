import { quoteServiceOptions } from "@/data/services";
import { extraOptions, optionLabel, roofAgeOptions, roofTypeOptions, storeyOptions, timingOptions, toQuoteAnswers, type Lead, type LeadPhoto } from "./types";

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  roofType: string;
  roofAge: string;
  /** The ads landing page asks these too. "" when not asked. */
  storeys?: string;
  /** Comma-separated extraOptions values, or "none". */
  extras?: string;
  timing?: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export const MIN_FILL_MS = 3000;
export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalisePhone(raw: string): string {
  return raw.replace(/[\s().-]/g, "");
}

/**
 * Australian numbers only (owner, 27 Oct 2026): a mobile starting 04 (10 digits), or any
 * number written with +61 (nine digits after it; a stray 0 after +61 is allowed).
 */
export function isValidPhone(raw: string): boolean {
  const p = normalisePhone(raw);
  return /^04\d{8}$/.test(p) || /^\+610?\d{9}$/.test(p);
}

/** The same number as +61 and nine digits, so GHL matches an existing contact. "" when not Australian. */
export function toAuE164(raw: string): string {
  const p = normalisePhone(raw);
  if (/^04\d{8}$/.test(p)) return "+61" + p.slice(1);
  const m = /^\+610?(\d{9})$/.exec(p);
  return m ? "+61" + m[1] : "";
}

/** Field-level validation shared by the browser and the API. Name, phone and suburb are required. */
export function validateLeadInput(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!input.phone.trim()) errors.phone = "Please enter a phone number so we can call you about the quote.";
  else if (!isValidPhone(input.phone)) errors.phone = "Please enter an Australian number starting with 04 or +61.";
  if (input.email.trim() && !emailRe.test(input.email.trim())) errors.email = "That email address does not look right.";
  if (input.address.trim().length < 3) errors.address = "Please enter the suburb or address of the property.";
  if (!quoteServiceOptions.some((o) => o.value === input.service)) errors.service = "Please choose a service, or Not sure yet.";
  if (input.roofType && !roofTypeOptions.some((o) => o.value === input.roofType)) errors.roofType = "Pick a roof type from the list.";
  if (input.roofAge && !roofAgeOptions.some((o) => o.value === input.roofAge)) errors.roofAge = "Pick a roof age from the list.";
  if (input.storeys && !storeyOptions.some((o) => o.value === input.storeys)) errors.storeys = "Pick single or double storey.";
  if (input.extras && input.extras !== "none" && !input.extras.split(",").every((x) => extraOptions.some((o) => o.value === x))) errors.extras = "Pick from the list.";
  if (input.timing && !timingOptions.some((o) => o.value === input.timing)) errors.timing = "Pick when you would like it done.";
  if (input.message.length > 4000) errors.message = "Please keep the message under 4,000 characters.";
  if (input.address.length > 300) errors.address = "Address is too long.";
  return errors;
}

function str(fd: FormData, key: string, max = 500): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export type ParsedSubmission =
  | { ok: true; lead: Lead; photos: LeadPhoto[]; suspectedBot: boolean; previousRequestAt: string }
  | { ok: false; status: number; message: string; errors?: FieldErrors };

/** Parse and validate a multipart submission from the quote form. */
export async function parseSubmission(fd: FormData, meta: { userAgent: string }): Promise<ParsedSubmission> {
  // Honeypot: real people never fill this field. The route still answers "sent" and logs the
  // request in full, so a real person caught by it (a password manager, say) is never lost.
  const suspectedBot = Boolean(str(fd, "website"));
  // Time check: bots submit instantly.
  const startedAt = Number(str(fd, "startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: false, status: 400, message: "Please take a moment to check the form before sending." };
  }

  const input: LeadInput = {
    name: str(fd, "name", 120),
    phone: str(fd, "phone", 40),
    email: str(fd, "email", 200),
    address: str(fd, "address", 300),
    service: str(fd, "service", 60) || "not-sure",
    roofType: str(fd, "roofType", 30),
    roofAge: str(fd, "roofAge", 30),
    storeys: str(fd, "storeys", 20),
    extras: str(fd, "extras", 100),
    timing: str(fd, "timing", 20),
    message: str(fd, "message", 4000),
  };
  const errors = validateLeadInput(input);
  if (Object.keys(errors).length) return { ok: false, status: 422, message: "Please fix the highlighted fields.", errors };

  const photos: LeadPhoto[] = [];
  const files = fd.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_PHOTOS) return { ok: false, status: 422, message: `Please attach no more than ${MAX_PHOTOS} photos.` };
  for (const file of files) {
    if (!file.type.startsWith("image/")) return { ok: false, status: 422, message: "Only image files can be attached." };
    if (file.size > MAX_PHOTO_BYTES) return { ok: false, status: 422, message: "Each photo must be under 8 MB." };
    photos.push({
      filename: file.name.replace(/[^\w.\-]+/g, "_").slice(0, 120) || "photo",
      contentType: file.type,
      size: file.size,
      data: Buffer.from(await file.arrayBuffer()),
    });
  }

  const lead: Lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    ...input,
    phone: normalisePhone(input.phone),
    serviceLabel: optionLabel(quoteServiceOptions, input.service),
    roofType: input.roofType ? optionLabel(roofTypeOptions, input.roofType) : "",
    roofAge: input.roofAge ? optionLabel(roofAgeOptions, input.roofAge) : "",
    storeys: input.storeys ? optionLabel(storeyOptions, input.storeys) : "",
    extras: input.extras === "none" ? "None of these" : (input.extras ?? "").split(",").filter(Boolean).map((x) => optionLabel(extraOptions, x)).join(", "),
    timing: input.timing ? optionLabel(timingOptions, input.timing) : "",
    quoteAnswers: toQuoteAnswers({ roofType: input.roofType, storeys: input.storeys ?? "", extras: input.extras === "none" ? "none" : input.extras ?? "" }),
    addressStatus: (["picked", "manual"] as const).find((s) => s === str(fd, "addressStatus", 10)) ?? "",
    flags: [],
    sourcePage: str(fd, "sourcePage", 300) || "/",
    submittedAt: new Date().toISOString(),
    userAgent: meta.userAgent.slice(0, 300),
  };
  return { ok: true, lead, photos, suspectedBot, previousRequestAt: str(fd, "previousRequestAt", 40) };
}
