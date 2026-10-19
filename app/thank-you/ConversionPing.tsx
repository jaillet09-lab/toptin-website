"use client";

import { useEffect } from "react";
import { siteConfig } from "@/site.config";
import { trackConversion } from "@/lib/analytics";

/** Fires the Google Ads conversion once when NEXT_PUBLIC_ADS_CONVERSION_ID is set. */
export function ConversionPing() {
  useEffect(() => {
    trackConversion(siteConfig.features.adsConversionId);
  }, []);
  return null;
}
