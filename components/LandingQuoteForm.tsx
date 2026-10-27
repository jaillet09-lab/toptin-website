"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import { roofAgeOptions, roofTypeOptions } from "@/lib/lead/types";
import { validateLeadInput, type FieldErrors, type LeadInput } from "@/lib/lead/validate";
import { track, trackConversion } from "@/lib/analytics";
import { callbackLine, nextSteps } from "@/data/next-steps";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

const EMPTY: LeadInput = { name: "", phone: "", email: "", address: "", service: "roof-replacement", roofType: "", roofAge: "", message: "" };

/**
 * The paid-ads landing form. Two taps (roof type, roof age) then contact details, so the first
 * steps take seconds. Sent through /api/lead like every other form, with the page URL (and any
 * ad click id) as the source. After sending, the form is replaced by what happens next.
 */
export function LandingQuoteForm({ source = "landing" }: { source?: string }) {
  const [v, setV] = useState<LeadInput>(EMPTY);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState<{ first: string; phone: string } | null>(null);
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sent) return;
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    doneHeading.current?.focus({ preventScroll: true });
  }, [sent]);

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

  function pick(k: "roofType" | "roofAge", value: string) {
    set(k, value);
    setStep(k === "roofType" ? 2 : 3);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLeadInput(v);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setBusy(true);
    setFormError("");
    const fd = new FormData();
    Object.entries(v).forEach(([k, val]) => fd.append(k, val));
    fd.append("startedAt", String(startedAt.current || Date.now() - 10000));
    fd.append("sourcePage", window.location.pathname + window.location.search);
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
      trackConversion(siteConfig.features.adsConversionId);
      setSent({ first: v.name.trim().split(/\s+/)[0] ?? "", phone: v.phone.trim() });
    } catch {
      setFormError(`No connection. Please try again or call ${siteConfig.phone}.`);
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div ref={top} className="scroll-mt-24">
        <span className="grid size-12 place-items-center rounded-lg bg-tin text-navy-2"><Icon name="check" size={24} strokeWidth={3} /></span>
        <h2 ref={doneHeading} tabIndex={-1} className="mt-5 font-display text-[28px] font-semibold leading-tight text-ink outline-none">
          Thanks{sent.first ? `, ${sent.first}` : ""}. Your request is in.
        </h2>
        <p className="mt-2 text-[16px] text-mute">Here is what happens next.</p>
        <ol className="mt-6 grid gap-5">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="border-t-[1.5px] border-ink pt-3">
              <span className="eyebrow">Step {i + 1}</span>
              <h3 className="mt-1 text-[18px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-[15px] text-mute">
                {i === 0 ? `We call you on ${sent.phone} to ask a few questions and book a time for the inspection. ${callbackLine}` : s.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-lg border border-[var(--tin-line)] bg-[var(--tin-wash)] p-4 text-[15px] text-text">
          Save our number, <b className="font-semibold text-ink">{siteConfig.phone}</b>, so you know it is us calling. Rather not wait?{" "}
          <TelLink location="landing-thanks" className="font-semibold text-navy-2 underline">Call us now</TelLink>.
        </div>
      </div>
    );
  }

  const fid = (k: string) => `${source}-${k}`;
  const err = (k: keyof LeadInput) => (errors[k] ? <p id={fid(`${k}-err`)} className="field-error">{errors[k]}</p> : null);
  const aria = (k: keyof LeadInput) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? fid(`${k}-err`) : undefined });
  const choice = (on: boolean) =>
    `flex min-h-14 w-full items-center justify-between rounded-lg px-4 text-left text-[16px] font-semibold transition-colors ${
      on ? "bg-navy-2 text-white" : "border border-line bg-white text-navy-2 hover:border-navy-2/50"
    }`;

  return (
    <form onSubmit={submit} noValidate aria-label="Free quote request">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-[21px] font-semibold leading-tight text-ink sm:text-[24px]">Get your free quote</h2>
        <span className="shrink-0 text-[14px] font-semibold text-caption">Step {step} of 3</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((n) => <span key={n} className={`h-1 rounded-full ${n <= step ? "bg-tin" : "bg-line"}`} />)}
      </div>

      {/* Honeypot: hidden from people */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input ref={honeypot} id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        {step === 1 ? (
          <fieldset>
            <legend className="mb-3 text-[17px] font-semibold text-ink">What is on the roof now?</legend>
            <div className="grid gap-2.5">
              {roofTypeOptions.map((o) => (
                <button key={o.value} type="button" onClick={() => pick("roofType", o.value)} aria-pressed={v.roofType === o.value} className={choice(v.roofType === o.value)}>
                  {o.label}
                  <Icon name="chevronRight" size={18} />
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="mb-3 text-[17px] font-semibold text-ink">Roughly how old is it?</legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {roofAgeOptions.map((o) => (
                <button key={o.value} type="button" onClick={() => pick("roofAge", o.value)} aria-pressed={v.roofAge === o.value} className={choice(v.roofAge === o.value)}>
                  {o.label}
                  <Icon name="chevronRight" size={18} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(1)} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-navy-2 underline">
              <Icon name="chevronLeft" size={16} />Back
            </button>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <p className="text-[17px] font-semibold text-ink">Where should we call you?</p>
            <div>
              <label htmlFor={fid("name")} className="field-label">Name</label>
              <input id={fid("name")} className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
              {err("name")}
            </div>
            <div>
              <label htmlFor={fid("phone")} className="field-label">Phone</label>
              <input id={fid("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
              {err("phone")}
            </div>
            <div>
              <label htmlFor={fid("address")} className="field-label">Suburb or address</label>
              <input id={fid("address")} className="field" autoComplete="street-address" value={v.address} onChange={(e) => set("address", e.target.value)} {...aria("address")} />
              {err("address")}
            </div>
            <div>
              <label htmlFor={fid("email")} className="field-label">Email <span className="font-normal text-caption">(optional, for your written quote)</span></label>
              <input id={fid("email")} className="field" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
              {err("email")}
            </div>
            <button type="submit" disabled={busy} className="btn btn-primary btn-lg mt-1 w-full disabled:opacity-60">
              {busy ? "Sending..." : "Get my free quote"}
              {busy ? null : <Icon name="arrow" size={18} />}
            </button>
            <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-11 items-center gap-1.5 justify-self-start text-[15px] font-semibold text-navy-2 underline">
              <Icon name="chevronLeft" size={16} />Back
            </button>
          </div>
        ) : null}
      </div>

      {formError ? <p role="alert" className="mt-4 rounded-lg bg-[#fef3f2] px-4 py-3 text-[14.5px] text-[#b42318]">{formError}</p> : null}

      <p className="mt-5 text-[13.5px] text-caption">
        Free, with no obligation. We only use your details to contact you about your roof. See our{" "}
        <a href="/privacy" className="underline">privacy policy</a>. Prefer to talk?{" "}
        <TelLink location={`${source}-form`} className="font-semibold text-navy-2 underline">Call {siteConfig.phone}</TelLink>.
      </p>
    </form>
  );
}
