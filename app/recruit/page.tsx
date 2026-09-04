import { RecruitEnded } from "@/components/sections/recruit-ended";
import { RecruitLanding } from "@/components/sections/recruit-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { recruitConfig } from "@/content/recruit";
import { siteConfig } from "@/content/site";
import { getRecruitJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: recruitConfig.seo.title,
  description: recruitConfig.seo.description,
  keywords: [...siteConfig.keywords, "招新", "秋季招新", "金苹果社团"],
  alternates: { canonical: "/recruit" },
  openGraph: pageOpenGraph({
    title: `${recruitConfig.seo.title} | ${siteConfig.brand}`,
    description: recruitConfig.seo.description,
    path: "/recruit",
  }),
  twitter: pageTwitter({
    title: `${recruitConfig.seo.title} | ${siteConfig.brand}`,
    description: recruitConfig.seo.description,
  }),
};

export default function RecruitPage() {
  return (
    <>
      <JsonLd data={getRecruitJsonLd()} />
      {recruitConfig.enabled ? <RecruitLanding /> : <RecruitEnded />}
    </>
  );
}
