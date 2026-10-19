import Script from "next/script";
import { siteConfig } from "@/site.config";

/**
 * Google tag, loaded only when NEXT_PUBLIC_GTAG_ID is set. Consent defaults to denied,
 * so no analytics or advertising cookies are written until a consent prompt is added.
 */
export function GoogleTag() {
  const id = siteConfig.features.gtagId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="toptin-gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied'});
gtag('js', new Date());
gtag('config', '${id}', {anonymize_ip: true});`}
      </Script>
    </>
  );
}
