import type { ReactNode } from "react";

/**
 * 3. Crossfade icons with blur (docs/BRAND.md, "Motion and interaction"): both icons sit in the same
 * spot; the one going out fades with a slight blur as the other comes in. Shows `off` until `on` is true.
 */
export function SwapIcon({ on, off, onIcon, className = "" }: { on: boolean; off: ReactNode; onIcon: ReactNode; className?: string }) {
  return (
    <span className={`tt-swap ${className}`.trim()} aria-hidden="true">
      <span data-off={on ? "" : undefined}>{off}</span>
      <span data-off={on ? undefined : ""}>{onIcon}</span>
    </span>
  );
}
