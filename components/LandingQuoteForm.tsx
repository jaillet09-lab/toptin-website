"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import { extraOptions, insuranceOptions, optionLabel, roofTypeOptions, storeyOptions, timingOptions } from "@/lib/lead/types";
import { validateLeadInput, type FieldErrors, type LeadInput } from "@/lib/lead/validate";
import { track, trackConversion } from "@/lib/analytics";
import { readRecentRequest, recentDate, saveRecentRequest, type RecentRequest } from "@/lib/lead/recent";
import { callbackLine, nextSteps } from "@/data/next-steps";
import { AddressField, addressPickError, type AddressStatus } from "@/components/AddressField";
import { Icon } from "@/components/ui/Icon";
import { TelLink } from "@/components/ui/TelLink";

type Input = Required<LeadInput>;
const EMPTY: Input = { name: "", phone: "", email: "", address: "", service: "roof-replacement", roofType: "", roofAge: "", storeys: "", extras: "", timing: "", insurance: "", message: "" };
const STEPS = 6;

/** The tap questions, in order. Each answer fills a question in the System's quote flow. */
const TAPS = [
  { key: "roofType", title: "What is on the roof now?", options: roofTypeOptions },
  { key: "storeys", title: "Single or double storey?", options: storeyOptions },
  // Asked instead of the roof's age (owner, 27 Oct 2026)
  { key: "insurance", title: "Is this an insurance job?", options: insuranceOptions },
] as const;

/**
 * The paid-ads landing form (owner, 27 Oct 2026: low friction, but fill as much of the quote
 * flow as we can and get people invested). Five quick taps, then name, phone and address. Every
 * tap pre-fills the System's quote flow for the team. Sent through /api/lead like every form,
 * with the page URL (and any ad click id) as the source. After sending, the person sees their
 * roof at a glance and exactly what happens next.
 */
export function LandingQuoteForm({ source = "landing" }: { source?: string }) {
  const [v, setV] = useState<Input>(EMPTY);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState<Input | null>(null);
  const [addressStatus, setAddressStatus] = useState<AddressStatus>("");
  const [recent, setRecent] = useState<RecentRequest | null>(null);
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => setRecent(readRecentRequest()), []);

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

  function set<K extends keyof Input>(k: K, value: string) {
    touch();
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function tap(k: "roofType" | "storeys" | "insurance" | "timing", value: string) {
    set(k, value);
    setStep((s) => s + 1);
  }

  function toggleExtra(value: string) {
    touch();
    setV((p) => {
      if (value === "none") return { ...p, extras: p.extras === "none" ? "" : "none" };
      const now = p.extras === "none" ? [] : p.extras.split(",").filter(Boolean);
      const next = now.includes(value) ? now.filter((x) => x !== value) : [...now, value];
      return { ...p, extras: next.join(",") };
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLeadInput(v);
    errs.address ??= addressPickError(v.address, addressStatus);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setBusy(true);
    setFormError("");
    const fd = new FormData();
    Object.entries(v).forEach(([k, val]) => fd.append(k, val));
    fd.append("addressStatus", addressStatus);
    if (recent) fd.append("previousRequestAt", recent.at);
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
      saveRecentRequest(v.phone.trim());
      setSent(v);
    } catch {
      setFormError(`No connection. Please try again or call ${siteConfig.phone}.`);
      setBusy(false);
    }
  }

  /** "Tile · Double storey · More than 30 years · Solar panels": what they told us so far. */
  const summary = (x: Input) =>
    [
      x.roofType && x.roofType !== "unsure" ? `${optionLabel(roofTypeOptions, x.roofType)} roof` : "",
      x.storeys && x.storeys !== "unsure" ? optionLabel(storeyOptions, x.storeys) : "",
      x.insurance === "yes" ? "Insurance job" : "",
      ...(x.extras && x.extras !== "none" ? x.extras.split(",").map((e) => optionLabel(extraOptions, e)) : []),
    ].filter(Boolean);

  if (sent) {
    const first = sent.name.trim().split(/\s+/)[0] ?? "";
    const glance: [string, string][] = [
      ["Roof", optionLabel(roofTypeOptions, sent.roofType)],
      ["Storeys", optionLabel(storeyOptions, sent.storeys)],
      ["Insurance job", optionLabel(insuranceOptions, sent.insurance)],
      ["Also include", sent.extras === "none" ? "Nothing extra" : sent.extras.split(",").filter(Boolean).map((e) => optionLabel(extraOptions, e)).join(", ")],
      ["Timing", optionLabel(timingOptions, sent.timing)],
      ["Address", sent.address],
    ].filter(([, val]) => Boolean(val)) as [string, string][];
    return (
      <div ref={top} className="scroll-mt-24">
        <span className="grid size-12 place-items-center rounded-lg bg-tin text-navy-2"><Icon name="check" size={24} strokeWidth={3} /></span>
        <h2 ref={doneHeading} tabIndex={-1} className="mt-5 font-display text-[28px] font-semibold leading-tight text-ink outline-none">
          Thanks{first ? `, ${first}` : ""}. Your request is in.
        </h2>
        <div className="mt-5 rounded-lg border border-line bg-page p-4">
          <p className="eyebrow">Your roof at a glance</p>
          <dl className="mt-2 grid gap-1.5 text-[15px]">
            {glance.map(([k, val]) => (
              <div key={k} className="grid grid-cols-[104px_1fr] gap-3">
                <dt className="text-caption">{k}</dt>
                <dd className="font-semibold text-ink">{val}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[13.5px] text-caption">This is already on your quote, so we only ask what you could not tell us.</p>
        </div>
        <p className="mt-6 text-[16px] font-semibold text-ink">Here is what happens next.</p>
        <ol className="mt-4 grid gap-5">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="border-t-[1.5px] border-ink pt-3">
              <span className="eyebrow">Step {i + 1}</span>
              <h3 className="mt-1 text-[18px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-[15px] text-mute">
                {i === 0 ? `We call you on ${sent.phone.trim()} to ask a few questions and book a time for the inspection. ${callbackLine}` : s.text}
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
    `flex min-h-14 w-full items-center justify-between gap-3 rounded-lg px-4 text-left text-[16px] font-semibold transition-colors ${
      on ? "bg-navy-2 text-white" : "border border-line bg-white text-navy-2 hover:border-navy-2/50"
    }`;
  const back = (
    <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-navy-2 underline">
      <Icon name="chevronLeft" size={16} />Back
    </button>
  );
  const picked = v.extras === "none" ? [] : v.extras.split(",").filter(Boolean);
  const sofar = summary(v);

  return (
    <form onSubmit={submit} noValidate aria-label="Free quote request">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-[21px] font-semibold leading-tight text-ink sm:text-[24px]">Get your free quote</h2>
        <span className="shrink-0 text-[14px] font-semibold text-caption">{step < STEPS ? `Step ${step} of ${STEPS}` : "Last step"}</span>
      </div>
      <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${STEPS}, 1fr)` }} aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => <span key={i} className={`h-1 rounded-full ${i < step ? "bg-tin" : "bg-line"}`} />)}
      </div>
      {step === 1 ? <p className="mt-3 text-[14.5px] text-mute">Five quick taps, then where to call you.</p> : null}

      {/* Honeypot: hidden from people */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input ref={honeypot} id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {recent && step === 1 ? (
        <p className="mt-4 rounded-lg border border-[var(--tin-line)] bg-[var(--tin-wash)] p-3.5 text-[14.5px] text-text">
          We already have your request from {recentDate(recent)} and will call you on {recent.phone}. Need to change something? Send it again below.
        </p>
      ) : null}

      <div className="mt-5">
        {TAPS.map((t, i) =>
          step === i + 1 ? (
            <fieldset key={t.key}>
              <legend className="mb-3 text-[17px] font-semibold text-ink">{t.title}</legend>
              <div className={`grid gap-2.5 ${t.options.length > 3 ? "sm:grid-cols-2" : ""}`}>
                {t.options.map((o) => (
                  <button key={o.value} type="button" onClick={() => tap(t.key, o.value)} aria-pressed={v[t.key] === o.value} className={choice(v[t.key] === o.value)}>
                    {o.label}
                    <Icon name="chevronRight" size={18} />
                  </button>
                ))}
              </div>
              {i > 0 ? back : null}
            </fieldset>
          ) : null,
        )}

        {step === 4 ? (
          <fieldset>
            <legend className="mb-1 text-[17px] font-semibold text-ink">Anything else we should include?</legend>
            <p className="mb-3 text-[14.5px] text-mute">Pick any that apply.</p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {[...extraOptions, { value: "none", label: "None of these" }].map((o) => {
                const on = o.value === "none" ? v.extras === "none" : picked.includes(o.value);
                return (
                  <button key={o.value} type="button" onClick={() => toggleExtra(o.value)} aria-pressed={on} className={choice(on)}>
                    {o.label}
                    <span className={`grid size-6 flex-none place-items-center rounded-md ${on ? "bg-tin text-navy-2" : "border border-line"}`}>
                      {on ? <Icon name="check" size={15} strokeWidth={3} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={() => setStep(5)} className="btn btn-navy btn-lg mt-4 w-full">
              {v.extras ? "Next" : "Skip"} <Icon name="arrow" size={18} />
            </button>
            {back}
          </fieldset>
        ) : null}

        {step === 5 ? (
          <fieldset>
            <legend className="mb-3 text-[17px] font-semibold text-ink">When would you like it done?</legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {timingOptions.map((o) => (
                <button key={o.value} type="button" onClick={() => tap("timing", o.value)} aria-pressed={v.timing === o.value} className={choice(v.timing === o.value)}>
                  {o.label}
                  <Icon name="chevronRight" size={18} />
                </button>
              ))}
            </div>
            {back}
          </fieldset>
        ) : null}

        {step === 6 ? (
          <div className="grid gap-4">
            <p className="text-[17px] font-semibold text-ink">Where should we call you?</p>
            {sofar.length ? (
              <p className="flex flex-wrap gap-1.5 text-[13.5px]" aria-label="Your answers so far">
                {sofar.map((s) => <span key={s} className="rounded-md bg-page px-2.5 py-1 font-semibold text-navy-2">{s}</span>)}
              </p>
            ) : null}
            <div>
              <label htmlFor={fid("name")} className="field-label">Name</label>
              <input id={fid("name")} className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
              {err("name")}
            </div>
            <div>
              <label htmlFor={fid("phone")} className="field-label">Phone</label>
              <input id={fid("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="04XX XXX XXX" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
              {err("phone")}
            </div>
            <AddressField
              id={fid("address")}
              label="Property address"
              value={v.address}
              status={addressStatus}
              onChange={(value, status) => { set("address", value); setAddressStatus(status); }}
              error={errors.address}
              errorId={fid("address-err")}
            />
            <div>
              <label htmlFor={fid("email")} className="field-label">Email <span className="font-normal text-caption">(optional, for your written quote)</span></label>
              <input id={fid("email")} className="field" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
              {err("email")}
            </div>
            <button type="submit" disabled={busy} className="btn btn-primary btn-lg mt-1 w-full disabled:opacity-60">
              {busy ? "Sending..." : "Get my free quote"}
              {busy ? null : <Icon name="arrow" size={18} />}
            </button>
            <div className="-mt-4">{back}</div>
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
