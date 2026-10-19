"use client";

import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/QuoteForm";

/** Quote form pre-filled from ?service= and ?suburb= (kept client-side so the page stays static). */
export function QuoteFormFromParams({ source, dark = false }: { source: string; dark?: boolean }) {
  const sp = useSearchParams();
  return <QuoteForm source={source} service={sp.get("service") ?? undefined} suburb={sp.get("suburb") ?? undefined} dark={dark} />;
}
