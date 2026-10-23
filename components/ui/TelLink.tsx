"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { siteConfig } from "@/site.config";
import { track, trackConversion } from "@/lib/analytics";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  /** Where on the page the link sits, for reporting (header, hero, footer...). */
  location: string;
  children?: ReactNode;
};

/** The one phone link. Every click fires a phone_click event. */
export function TelLink({ location, children, ...rest }: Props) {
  return (
    <a
      href={siteConfig.phoneHref}
      onClick={() => { track("phone_click", { location }); trackConversion(siteConfig.features.adsPhoneConversionId, { location }); }}
      {...rest}
    >
      {children ?? siteConfig.phone}
    </a>
  );
}

export function MailLink({ location, children, ...rest }: Props) {
  return (
    <a href={siteConfig.emailHref} onClick={() => track("email_click", { location })} {...rest}>
      {children ?? siteConfig.email}
    </a>
  );
}
