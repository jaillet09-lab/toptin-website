"use client";

import { flushSync } from "react-dom";

/**
 * Motion helpers (docs/BRAND.md, "Motion and interaction", 27 November 2026). CSS lives in
 * app/globals.css. Everything here does nothing under prefers-reduced-motion.
 */

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * 1. Pulse to confirm: one short outline ring on the element that was pressed. Uses the Web
 * Animations API, so a re-render that changes the element's classes (it turns navy when picked)
 * cannot cut it short. The ring colour is --pulse-ring if the element sets it, else Tin Yellow.
 */
export function pulse(el: Element | null | undefined) {
  if (!el || reduced() || typeof (el as HTMLElement).animate !== "function") return;
  const ring = getComputedStyle(el).getPropertyValue("--pulse-ring").trim() || "#F8BC26";
  (el as HTMLElement).animate(
    [
      { outline: `1.5px solid ${ring}`, outlineOffset: "0px", transform: "scale(1)" },
      { transform: "scale(1.03)", offset: 0.35 },
      { outline: "1.5px solid transparent", outlineOffset: "10px", transform: "scale(1)" },
    ],
    { duration: 450, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
  );
}

/**
 * 2. Expand the same element: runs a state change inside a View Transition, so an element with a
 * view-transition-name before the change grows into the element with that name after it. Falls back
 * to a plain change where the browser has no View Transitions.
 */
export function expand(update: () => void) {
  const d = typeof document !== "undefined" ? (document as Document & { startViewTransition?: (cb: () => void) => unknown }) : null;
  if (!d?.startViewTransition || reduced()) return update();
  d.startViewTransition(() => flushSync(update));
}
