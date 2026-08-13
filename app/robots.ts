import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const host = fromEnv
    ? fromEnv
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
