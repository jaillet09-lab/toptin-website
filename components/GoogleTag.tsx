import Script from "next/script";
import { siteConfig } from "@/site.config";

/**
 * Google tag (GA4 + Google Ads), loaded only when a tag id is configured. Australian site,
 * no consent banner is required, so consent is granted by default; the Google Ads account
 * is linked to GA4 and configured on the same tag so conversions report to both.
 */
export function GoogleTag() {
  const id = siteConfig.features.gtagId;
  const adsId = siteConfig.features.adsAccountId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="toptin-gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted'});
gtag('js', new Date());
gtag('config', '${id}');${adsId ? `
gtag('config', '${adsId}');` : ''}`}
      </Script>
    </>
  );
}
