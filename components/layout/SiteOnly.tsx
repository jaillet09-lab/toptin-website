"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isLandingPath } from "./landing";

/** Renders its children everywhere except on the paid-ads landing pages. */
export function SiteOnly({ children }: { children: ReactNode }) {
  return isLandingPath(usePathname()) ? null : <>{children}</>;
}
