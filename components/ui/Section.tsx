import type { ReactNode } from "react";

export type Tone = "page" | "white" | "paper" | "navy";

const toneClass: Record<Tone, string> = {
  page: "bg-page",
  white: "bg-white",
  paper: "bg-paper",
  navy: "bg-navy text-white on-dark",
};

export function Section({ children, tone = "page", id, className = "", label }: { children: ReactNode; tone?: Tone; id?: string; className?: string; label?: string }) {
  return (
    <section id={id} aria-label={label} className={`${toneClass[tone]} section ${className}`.trim()}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const H = as;
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center mx-auto" : ""} ${className}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <H className={`${as === "h1" ? "display-xl" : "display-lg"} max-w-[20ch]`}>{title}</H>
      {lead ? <p className={`lead ${center ? "mx-auto" : ""}`}>{lead}</p> : null}
    </div>
  );
}
