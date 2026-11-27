"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { quoteHref } from "./landing";

/** A "Get a free quote" link that stays on a referral page's own form (see quoteHref). */
export function QuoteLink({ className, children }: { className?: string; children: ReactNode }) {
  return <Link href={quoteHref(usePathname())} className={className}>{children}</Link>;
}
