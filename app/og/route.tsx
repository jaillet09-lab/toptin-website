import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/site.config";

/** Generated Open Graph image: /og?t=Title&s=Subtitle (navy, real reversed logo, yellow rule). */
const logo = readFile(join(process.cwd(), "public/brand/toptin-logo-reversed.png")).then((b) => `data:image/png;base64,${b.toString("base64")}`);

function clean(value: string | null, max: number): string {
  return (value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const title = clean(p.get("t"), 90) || siteConfig.tagline;
  const subtitle = clean(p.get("s"), 120);
  const size = title.length > 60 ? 54 : title.length > 40 ? 62 : 70;
  const src = await logo;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", backgroundColor: "#0f162e", color: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={360} height={72} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 90, height: 8, backgroundColor: "#f8bc26", borderRadius: 4, marginBottom: 28 }} />
          <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", marginTop: 20, maxWidth: 1000 }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.8)" }}>
          <span>{siteConfig.phone}</span>
          <span>QBCC {siteConfig.qbcc}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
  );
}
