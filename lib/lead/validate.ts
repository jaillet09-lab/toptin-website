import { quoteServiceOptions } from "@/data/services";
import { optionLabel, roofAgeOptions, roofTypeOptions, type Lead, type LeadPhoto } from "./types";

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  roofType: string;
  roofAge: string;
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

export function isValidPhone(raw: string): boolean {
  return /^\+?\d{8,15}$/.test(normalisePhone(raw));
}

/** Field-level validation shared by the browser and the API. Name, phone and suburb are required. */
export function validateLeadInput(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!input.phone.trim()) errors.phone = "Please enter a phone number so we can call you about the quote.";
  else if (!isValidPhone(input.phone)) errors.phone = "That phone number does not look right.";
  if (input.email.trim() && !emailRe.test(input.email.trim())) errors.email = "That email address does not look right.";
  if (input.address.trim().length < 3) errors.address = "Please enter the suburb or address of the property.";
  if (!quoteServiceOptions.some((o) => o.value === input.service)) errors.service = "Please choose a service, or Not sure yet.";
  if (input.roofType && !roofTypeOptions.some((o) => o.value === input.roofType)) errors.roofType = "Pick a roof type from the list.";
  if (input.roofAge && !roofAgeOptions.some((o) => o.value === input.roofAge)) errors.roofAge = "Pick a roof age from the list.";
  if (input.message.length > 4000) errors.message = "Please keep the message under 4,000 characters.";
  if (input.address.length > 300) errors.address = "Address is too long.";
  return errors;
}

function str(fd: FormData, key: string, max = 500): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export type ParsedSubmission =
  | { ok: true; lead: Lead; photos: LeadPhoto[] }
  | { ok: false; status: number; message: string; errors?: FieldErrors };

/** Parse and validate a multipart submission from the quote form. */
export async function parseSubmission(fd: FormData, meta: { userAgent: string }): Promise<ParsedSubmission> {
  // Honeypot: real people never fill this field.
  if (str(fd, "website")) return { ok: false, status: 400, message: "Submission rejected." };
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
    sourcePage: str(fd, "sourcePage", 300) || "/",
    submittedAt: new Date().toISOString(),
    userAgent: meta.userAgent.slice(0, 300),
  };
  return { ok: true, lead, photos };
}
