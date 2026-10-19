"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import { quoteServiceOptions } from "@/data/services";
import { roofAgeOptions, roofTypeOptions } from "@/lib/lead/types";
import { MAX_PHOTOS, MAX_PHOTO_BYTES, validateLeadInput, type FieldErrors, type LeadInput } from "@/lib/lead/validate";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

type Props = {
  /** Pre-selected service value (roof-replacement, colorbond-roof-installation, not-sure). */
  service?: string;
  /** Pre-filled suburb, for example on area pages. */
  suburb?: string;
  /** Where the form sits, for reporting. */
  source: string;
  dark?: boolean;
  /** Pre-fill service and suburb from ?service= and ?suburb= in the page URL (the /quote page). */
  fromUrl?: boolean;
};

const EMPTY: LeadInput = { name: "", phone: "", email: "", address: "", service: "not-sure", roofType: "", roofAge: "", message: "" };

/**
 * The one quote form, used everywhere. Two short steps: contact first (so a lead is
 * never lost to a long form), then roof details and optional photos.
 */
export function QuoteForm({ service, suburb, source, dark = false, fromUrl = false }: Props) {
  const router = useRouter();
  const [v, setV] = useState<LeadInput>({
    ...EMPTY,
    service: quoteServiceOptions.some((o) => o.value === service) ? (service as string) : "not-sure",
    address: suburb ?? "",
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);

  // Read ?service= and ?suburb= after mount, so the page itself can stay static.
  useEffect(() => {
    if (!fromUrl) return;
    const sp = new URLSearchParams(window.location.search);
    const s = sp.get("service");
    const sub = sp.get("suburb");
    setV((p) => ({
      ...p,
      ...(s && quoteServiceOptions.some((o) => o.value === s) ? { service: s } : {}),
      ...(sub && !p.address ? { address: sub.slice(0, 120) } : {}),
    }));
  }, [fromUrl]);

  function touch() {
    if (!startedAt.current) {
      startedAt.current = Date.now();
      track("quote_started", { source });
    }
  }

  function set<K extends keyof LeadInput>(k: K, value: string) {
    touch();
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function next() {
    const all = validateLeadInput(v);
    const stepOne: FieldErrors = { name: all.name, phone: all.phone, address: all.address, service: all.service };
    const has = Object.values(stepOne).some(Boolean);
    setErrors(stepOne);
    if (!has) setStep(2);
  }

  function pickFiles(list: FileList | null) {
    setFileError("");
    const picked = Array.from(list ?? []).filter((f) => f.type.startsWith("image/"));
    const merged = [...files, ...picked].slice(0, MAX_PHOTOS);
    if (files.length + picked.length > MAX_PHOTOS) setFileError(`Up to ${MAX_PHOTOS} photos.`);
    if (merged.some((f) => f.size > MAX_PHOTO_BYTES)) {
      setFileError("Each photo must be under 8 MB.");
      setFiles(merged.filter((f) => f.size <= MAX_PHOTO_BYTES));
      return;
    }
    setFiles(merged);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) return next();
    const errs = validateLeadInput(v);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      if (errs.name || errs.phone || errs.address || errs.service) setStep(1);
      return;
    }
    setBusy(true);
    setFormError("");
    const fd = new FormData();
    Object.entries(v).forEach(([k, val]) => fd.append(k, val));
    files.forEach((f) => fd.append("photos", f));
    fd.append("startedAt", String(startedAt.current || Date.now() - 10000));
    fd.append("sourcePage", typeof window !== "undefined" ? window.location.pathname : source);
    fd.append("website", honeypot.current?.value ?? "");
    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        if (j.errors) setErrors(j.errors);
        setFormError(j.message ?? `Something went wrong. Please call ${siteConfig.phone}.`);
        setBusy(false);
        return;
      }
      track("quote_submitted", { source, service: v.service });
      router.push("/thank-you");
    } catch {
      setFormError(`No connection. Please try again or call ${siteConfig.phone}.`);
      setBusy(false);
    }
  }

  const label = dark ? "field-label !text-white" : "field-label";
  const err = (k: keyof LeadInput) =>
    errors[k] ? <p id={`${source}-${k}-err`} className={dark ? "mt-1.5 text-[13.5px] text-[#ffb4ab]" : "field-error"}>{errors[k]}</p> : null;
  const aria = (k: keyof LeadInput) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${source}-${k}-err` : undefined });
  const fid = (k: string) => `${source}-${k}`;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5" aria-label="Free quote request">
      <div className="flex items-center gap-3 text-[13px] font-semibold">
        <span className={`grid size-7 place-items-center rounded-full ${step === 1 ? "bg-tin text-navy" : dark ? "bg-white/15 text-white" : "bg-paper text-mute"}`}>1</span>
        <span className={dark ? "text-white/80" : "text-mute"}>Your details</span>
        <span className={`h-px flex-1 ${dark ? "bg-white/20" : "bg-line"}`} />
        <span className={`grid size-7 place-items-center rounded-full ${step === 2 ? "bg-tin text-navy" : dark ? "bg-white/15 text-white" : "bg-paper text-mute"}`}>2</span>
        <span className={dark ? "text-white/80" : "text-mute"}>Your roof</span>
      </div>

      {/* Honeypot: hidden from people */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input ref={honeypot} id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {step === 1 ? (
        <>
          <fieldset>
            <legend className={label}>What do you need?</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {quoteServiceOptions.map((o) => {
                const on = v.service === o.value;
                return (
                  <button key={o.value} type="button" onClick={() => set("service", o.value)} aria-pressed={on}
                    className={`min-h-12 rounded-[10px] px-3 text-[14.5px] font-semibold transition-colors ${
                      on ? "bg-navy text-white ring-2 ring-tin" : dark ? "bg-white/10 text-white hover:bg-white/15" : "border border-line bg-white text-navy hover:border-navy/40"
                    }`}>
                    {o.label}
                  </button>
                );
              })}
            </div>
            {err("service")}
          </fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={fid("name")} className={label}>Name</label>
              <input id={fid("name")} className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
              {err("name")}
            </div>
            <div>
              <label htmlFor={fid("phone")} className={label}>Phone</label>
              <input id={fid("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
              {err("phone")}
            </div>
          </div>
          <div>
            <label htmlFor={fid("address")} className={label}>Property address <span className="font-normal opacity-70">(suburb is enough to start)</span></label>
            <input id={fid("address")} className="field" autoComplete="street-address" value={v.address} onChange={(e) => set("address", e.target.value)} {...aria("address")} />
            {err("address")}
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full">Next: your roof <Icon name="arrow" size={18} /></button>
        </>
      ) : (
        <>
          <div>
            <label htmlFor={fid("email")} className={label}>Email <span className="font-normal opacity-70">(optional)</span></label>
            <input id={fid("email")} className="field" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
            {err("email")}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={fid("roofType")} className={label}>Current roof</label>
              <select id={fid("roofType")} className="field" value={v.roofType} onChange={(e) => set("roofType", e.target.value)}>
                <option value="">Choose one</option>
                {roofTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={fid("roofAge")} className={label}>Roughly how old?</label>
              <select id={fid("roofAge")} className="field" value={v.roofAge} onChange={(e) => set("roofAge", e.target.value)}>
                <option value="">Choose one</option>
                {roofAgeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={fid("message")} className={label}>Anything else? <span className="font-normal opacity-70">(optional)</span></label>
            <textarea id={fid("message")} className="field min-h-28" rows={4} value={v.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} />
            {err("message")}
          </div>
          <div>
            <span className={label}>Photos of the roof <span className="font-normal opacity-70">(optional, up to {MAX_PHOTOS})</span></span>
            <label htmlFor={fid("photos")} className={`flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-[10px] border-2 border-dashed px-4 text-[14.5px] font-semibold ${dark ? "border-white/30 text-white" : "border-line bg-white text-navy"}`}>
              <Icon name="camera" size={18} />
              {files.length ? `${files.length} photo${files.length > 1 ? "s" : ""} added. Add more` : "Add photos"}
            </label>
            <input id={fid("photos")} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => pickFiles(e.target.files)} />
            {files.length ? (
              <ul className={`mt-2 flex flex-wrap gap-2 text-[13px] ${dark ? "text-white/80" : "text-mute"}`}>
                {files.map((f, i) => (
                  <li key={i} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${dark ? "bg-white/10" : "bg-paper"}`}>
                    {f.name.slice(0, 22)}
                    <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}><Icon name="close" size={13} /></button>
                  </li>
                ))}
              </ul>
            ) : null}
            {fileError ? <p className="field-error">{fileError}</p> : null}
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setStep(1)} className={`btn btn-lg ${dark ? "btn-ghost" : "btn-outline"}`}>Back</button>
            <button type="submit" disabled={busy} className="btn btn-primary btn-lg flex-1 disabled:opacity-60">
              {busy ? "Sending..." : "Send my quote request"}
            </button>
          </div>
        </>
      )}

      {formError ? <p role="alert" className="rounded-[10px] bg-[#fef3f2] px-4 py-3 text-[14.5px] text-[#b42318]">{formError}</p> : null}
      <p className={`text-[13.5px] ${dark ? "text-white/65" : "text-mute"}`}>
        {siteConfig.replyLine} Prefer to talk?{" "}
        <TelLink location={`${source}-form`} className={`font-semibold underline ${dark ? "text-white" : "text-navy"}`}>Call {siteConfig.phone}</TelLink>
      </p>
    </form>
  );
}
