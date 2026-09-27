import { RecruitEnded } from "@/components/sections/recruit-ended";
import { RecruitLanding } from "@/components/sections/recruit-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { recruitConfig } from "@/content/recruit";
import { siteConfig } from "@/content/site";
import { getRecruitJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: recruitConfig.enabled ? recruitConfig.seo.title : recruitConfig.ended.title,
  description: recruitConfig.enabled
    ? recruitConfig.seo.description
    : recruitConfig.ended.subtitle,
  robots: recruitConfig.enabled ? undefined : { index: false, follow: true },
  keywords: [...siteConfig.keywords, "招新", "秋季招新", "金苹果社团"],
  alternates: { canonical: "/recruit" },
  openGraph: pageOpenGraph({
    title: `${recruitConfig.enabled ? recruitConfig.seo.title : recruitConfig.ended.title} | ${siteConfig.brand}`,
    description: recruitConfig.enabled
      ? recruitConfig.seo.description
      : recruitConfig.ended.subtitle,
    path: "/recruit",
  }),
  twitter: pageTwitter({
    title: `${recruitConfig.enabled ? recruitConfig.seo.title : recruitConfig.ended.title} | ${siteConfig.brand}`,
    description: recruitConfig.enabled
      ? recruitConfig.seo.description
      : recruitConfig.ended.subtitle,
  }),
};

export default function RecruitPage() {
  return (
    <>
      {recruitConfig.enabled ? <JsonLd data={getRecruitJsonLd()} /> : null}
      {recruitConfig.enabled ? <RecruitLanding /> : <RecruitEnded />}
    </>
  );
}
