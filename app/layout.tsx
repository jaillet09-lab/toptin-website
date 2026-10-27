import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { SiteOnly } from "@/components/layout/SiteOnly";
import { GoogleTag } from "@/components/GoogleTag";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Plain Sight: Inter only, with the optical size axis so headlines sharpen automatically (docs/BRAND.md).
const inter = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `Roof Replacement Brisbane | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: true, email: true },
  openGraph: { type: "website", siteName: siteConfig.name, locale: "en_AU" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { types: { "application/rss+xml": `${siteConfig.url}/feed.xml` } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <SiteOnly>
          <Footer />
          <MobileBar />
        </SiteOnly>
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <GoogleTag />
      </body>
    </html>
  );
}
