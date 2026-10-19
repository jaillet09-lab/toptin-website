import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Top Tin Roofing",
    short_name: "Top Tin",
    start_url: "/",
    display: "browser",
    background_color: "#f5f6f8",
    theme_color: "#0f162e",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
