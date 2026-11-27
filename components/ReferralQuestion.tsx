"use client";

/**
 * "Did someone refer you to us?" on every quote form (owner, 27 Nov 2026: "make sure on the site that
 * they need to tell us it was a referral and from who"). Yes or No must be picked; Yes asks for the
 * name. On a referral page it starts at Yes with the name from the link filled in.
 */
type Props = {
  id: string;
  referred: string;
  referrerName: string;
  onReferred: (value: "yes" | "no") => void;
  onName: (value: string) => void;
  errors: { referred?: string; referrerName?: string };
  dark?: boolean;
};

export function ReferralQuestion({ id, referred, referrerName, onReferred, onName, errors, dark = false }: Props) {
  const label = dark ? "field-label !text-white" : "field-label";
  const errClass = dark ? "mt-1.5 text-[13.5px] text-[#ffb4ab]" : "field-error";
  const choice = (on: boolean) =>
    `min-h-12 rounded-lg px-4 text-[15px] font-semibold transition-colors ${
      on ? "bg-navy text-white ring-2 ring-tin" : dark ? "bg-white/10 text-white hover:bg-white/15" : "border border-line bg-white text-navy hover:border-navy/40"
    }`;

  return (
    <fieldset aria-describedby={errors.referred ? `${id}-referred-err` : undefined}>
      <legend className={label}>Did someone refer you to us?</legend>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" aria-pressed={referred === "no"} onClick={() => onReferred("no")} className={choice(referred === "no")}>No</button>
        <button type="button" aria-pressed={referred === "yes"} onClick={() => onReferred("yes")} className={choice(referred === "yes")}>Yes</button>
      </div>
      {errors.referred ? <p id={`${id}-referred-err`} className={errClass}>{errors.referred}</p> : null}

      {referred === "yes" ? (
        <div className="mt-4">
          <label htmlFor={`${id}-referrerName`} className={label}>
            Who referred you? <span className="font-normal opacity-70">(their full name, so we can thank them)</span>
          </label>
          <input
            id={`${id}-referrerName`}
            className="field"
            autoComplete="off"
            maxLength={120}
            value={referrerName}
            onChange={(e) => onName(e.target.value)}
            aria-invalid={errors.referrerName ? true : undefined}
            aria-describedby={errors.referrerName ? `${id}-referrerName-err` : undefined}
          />
          {errors.referrerName ? <p id={`${id}-referrerName-err`} className={errClass}>{errors.referrerName}</p> : null}
        </div>
      ) : null}
    </fieldset>
  );
}
