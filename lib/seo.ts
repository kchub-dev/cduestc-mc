import { faqs } from "@/content/faq";
import { recruitConfig } from "@/content/recruit";
import { servers } from "@/content/servers";
import { siteConfig } from "@/content/site";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

const OG_IMAGE = {
  url: siteConfig.ogImage,
  width: 1400,
  height: 800,
  alt: `${siteConfig.brand}｜${siteConfig.club}`,
} as const;

export function pageOpenGraph(input: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): NonNullable<Metadata["openGraph"]> {
  return {
    title: input.title,
    description: input.description,
    url: toAbsoluteUrl(input.path ?? "/"),
    siteName: `${siteConfig.brand} | ${siteConfig.name}`,
    locale: "zh_CN",
    type: input.type ?? "website",
    images: [OG_IMAGE],
  };
}

export function pageTwitter(input: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: input.title,
    description: input.description,
    images: [siteConfig.ogImage],
  };
}

export function getOrganizationGraph() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: siteConfig.brand,
        alternateName: [siteConfig.name, siteConfig.club],
        url,
        logo: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/logo.png"),
        },
        image: toAbsoluteUrl(siteConfig.ogImage),
        description: siteConfig.description,
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "电子科技大学成都学院",
          url: siteConfig.links.school,
        },
        sameAs: [
          siteConfig.links.skin,
          siteConfig.links.reg,
          siteConfig.statusPageUrl,
          siteConfig.links.planet,
          siteConfig.mclistsUrl,
          "https://github.com/kchub-dev/cduestc-mc",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: `${siteConfig.brand} | ${siteConfig.name}`,
        alternateName: siteConfig.club,
        inLanguage: "zh-CN",
        description: siteConfig.description,
        publisher: { "@id": `${url}/#organization` },
      },
    ],
  };
}

export function getHomeJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": `${url}/#organization` },
        primaryImageOfPage: toAbsoluteUrl(siteConfig.ogImage),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        isPartOf: { "@id": `${url}/#webpage` },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer.join(" "),
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${url}/#servers`,
        name: "科成MC 游戏服务器",
        numberOfItems: servers.length,
        itemListElement: servers.map((server, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: server.name,
          description: server.description,
        })),
      },
    ],
  };
}

export function getDocsJsonLd() {
  const url = toAbsoluteUrl("/docs");
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: "服务器帮助文档",
    description:
      "电子科技大学成都学院 Minecraft 公益服帮助文档：准备工作、规则、指令与进阶说明。",
    inLanguage: "zh-CN",
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
  };
}

export function getRecruitJsonLd() {
  const url = toAbsoluteUrl("/recruit");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: recruitConfig.seo.title,
        description: recruitConfig.seo.description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${getSiteUrl()}/#website` },
        about: { "@id": `${getSiteUrl()}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: recruitConfig.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer.join(" "),
          },
        })),
      },
    ],
  };
}
