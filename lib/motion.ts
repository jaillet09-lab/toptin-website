"use client";

import { flushSync } from "react-dom";

/**
 * Motion helpers (docs/BRAND.md, "Motion and interaction", 27 November 2026). CSS lives in
 * app/globals.css. Everything here does nothing under prefers-reduced-motion.
 */

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** 1. Pulse to confirm: one short outline ring on the element that was pressed. */
export function pulse(el: Element | null | undefined) {
  if (!el || reduced()) return;
  el.classList.remove("tt-pulse");
  void (el as HTMLElement).offsetWidth; // restart the animation
  el.classList.add("tt-pulse");
  el.addEventListener("animationend", () => el.classList.remove("tt-pulse"), { once: true });
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
