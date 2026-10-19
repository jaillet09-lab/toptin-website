import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { GoogleTag } from "@/components/GoogleTag";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-archivo", display: "swap" });

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
  themeColor: "#0f162e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${archivo.variable}`} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <GoogleTag />
      </body>
    </html>
  );
}
