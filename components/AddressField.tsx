"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** "picked" from the list, "manual" when typed by hand (chosen, or nothing matched), "" while still typing. */
export type AddressStatus = "picked" | "manual" | "";

type Props = {
  id: string;
  label: string;
  value: string;
  status: AddressStatus;
  onChange: (value: string, status: AddressStatus) => void;
  error?: string;
  errorId?: string;
  dark?: boolean;
};

/**
 * Address box with suggestions as you type (Queensland addresses, /api/address). The person
 * picks one from the list. If theirs is not there, "I can't find my address" lets them type it,
 * and when the lookup finds nothing or is down the typed text is accepted, so nobody is stuck.
 */
export function AddressField({ id, label, value, status, onChange, error, errorId, dark = false }: Props) {
  const listId = useId();
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [manual, setManual] = useState(false);
  const latest = useRef(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ctrl = useRef<AbortController | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); ctrl.current?.abort(); }, []);

  function search(q: string) {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 3) { setItems([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      ctrl.current?.abort();
      ctrl.current = new AbortController();
      try {
        const res = await fetch(`/api/address?q=${encodeURIComponent(q.trim())}`, { signal: ctrl.current.signal });
        const list = ((await res.json()) as { suggestions?: string[] }).suggestions ?? [];
        setItems(list);
        setOpen(list.length > 0);
        setActive(-1);
        // Nothing matched, or the lookup is down: accept what they typed rather than block them.
        if (!list.length && latest.current.trim().length >= 3) onChange(latest.current, "manual");
      } catch {
        /* aborted or offline: leave the field as typed */
      }
    }, 250);
  }

  function type(v: string) {
    latest.current = v;
    if (manual) return onChange(v, "manual");
    onChange(v, "");
    search(v);
  }

  function pick(item: string) {
    latest.current = item;
    onChange(item, "picked");
    setOpen(false);
    setItems([]);
  }

  function keyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || !items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(items[active]); }
    else if (e.key === "Escape") setOpen(false);
  }

  const note = `mt-1.5 text-[13.5px] ${dark ? "text-white/70" : "text-caption"}`;
  const link = `min-h-9 text-[13.5px] font-semibold underline ${dark ? "text-white" : "text-navy-2"}`;

  return (
    <div className="relative">
      <label htmlFor={id} className={dark ? "field-label !text-white" : "field-label"}>{label}</label>
      <input
        id={id}
        className="field"
        autoComplete={manual ? "street-address" : "off"}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        placeholder={manual ? "Street address and suburb" : "Start typing, for example 12 Smith St Aspley"}
        value={value}
        onChange={(e) => type(e.target.value)}
        onKeyDown={keyDown}
        onFocus={() => { if (items.length) setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open ? (
        <ul id={listId} role="listbox" aria-label="Matching addresses" className="absolute inset-x-0 z-20 mt-1 overflow-hidden rounded-lg border border-line bg-white">
          {items.map((it, i) => (
            <li
              key={it}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); pick(it); }}
              className={`flex min-h-12 cursor-pointer items-center gap-2.5 border-b border-line px-3.5 text-[15px] text-ink last:border-b-0 ${i === active ? "bg-page" : "hover:bg-page"}`}
            >
              <Icon name="home" size={16} className="flex-none text-caption" />
              {it}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p id={errorId} className={dark ? "mt-1.5 text-[13.5px] text-[#ffb4ab]" : "field-error"}>{error}</p> : null}
      {status === "picked" ? (
        <p className={`${note} flex items-center gap-1.5`}><Icon name="check" size={14} />Address found</p>
      ) : manual ? (
        <p className={note}>
          Type the street address and suburb.{" "}
          <button type="button" className={link} onClick={() => { setManual(false); onChange(value, ""); search(value); }}>Search the list again</button>
        </p>
      ) : status === "manual" ? (
        <p className={note}>No match in the address list. That is fine, we will use what you typed.</p>
      ) : (
        <button type="button" className={`mt-1.5 ${link}`} onClick={() => { setManual(true); setOpen(false); onChange(value, "manual"); }}>
          I can&apos;t find my address
        </button>
      )}
    </div>
  );
}

/** The browser-side rule: an address must be picked, or typed after "I can't find my address". */
export function addressPickError(value: string, status: AddressStatus): string | undefined {
  if (value.trim().length >= 3 && status === "") return "Please pick your address from the list, or tap \"I can't find my address\".";
  return undefined;
}
