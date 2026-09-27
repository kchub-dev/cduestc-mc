import type { MetadataRoute } from "next";
import { recruitConfig } from "@/content/recruit";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...(recruitConfig.enabled
      ? [{
          url: `${base}/recruit`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        }]
      : []),
  ];
}
