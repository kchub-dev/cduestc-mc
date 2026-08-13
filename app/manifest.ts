import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brand} | ${siteConfig.name}`,
    short_name: siteConfig.brand,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0e1630",
    theme_color: "#0e1630",
    lang: "zh-CN",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
