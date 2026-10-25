"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type CompareItem = {
  title: string;
  caption: string;
  /** Real photos only. When missing, a labelled placeholder renders (listed in docs/content-todo.md). */
  before?: { src: string; alt: string };
  after?: { src: string; alt: string };
};

/** Drag-to-compare before and after. Keyboard accessible through the range input. */
export function BeforeAfter({ item }: { item: CompareItem }) {
  const [x, setX] = useState(50);
  const id = useId();
  const real = Boolean(item.before && item.after);

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-lg bg-navy" style={{ ["--x" as string]: `${x}%` }}>
        {real && item.before ? (
          <Image src={item.before.src} alt={item.before.alt} fill sizes="(max-width: 768px) 92vw, 45vw" className="object-cover" />
        ) : (
          <div className="placeholder absolute inset-0 rounded-none">[PHOTO: {item.title}, before]</div>
        )}
        <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 var(--x))" }}>
          {real && item.after ? (
            <Image src={item.after.src} alt={item.after.alt} fill sizes="(max-width: 768px) 92vw, 45vw" className="object-cover" />
          ) : (
            <div className="placeholder absolute inset-0 rounded-none bg-[#dfe3ea]">[PHOTO: {item.title}, after]</div>
          )}
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-lg bg-navy/80 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-lg bg-tin px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-navy">After</span>
        <div className="pointer-events-none absolute bottom-0 top-0 w-0.5 -translate-x-px bg-white ring-1 ring-black/25" style={{ left: "var(--x)" }} aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-line bg-white text-navy" style={{ left: "var(--x)" }} aria-hidden="true">
          <span className="flex"><Icon name="chevronLeft" size={14} className="-mr-1" /><Icon name="chevronRight" size={14} className="-ml-1" /></span>
        </div>
        <label htmlFor={id} className="sr-only">Drag to compare before and after: {item.title}</label>
        <input id={id} type="range" min={0} max={100} value={x} onChange={(e) => setX(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" style={{ touchAction: "pan-y" }} />
      </div>
      <figcaption>
        <b className="block font-display text-[18px] font-semibold text-navy">{item.title}</b>
        <span className="text-[14px] text-mute">{item.caption}</span>
      </figcaption>
    </figure>
  );
}
