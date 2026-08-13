import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/site";
import { getOrganizationGraph, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit, Press_Start_2P } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0e1630",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: `${siteConfig.brand} | ${siteConfig.name}`,
  authors: [{ name: siteConfig.club, url: getSiteUrl() }],
  creator: siteConfig.brand,
  publisher: siteConfig.club,
  category: "games",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.brand,
    statusBarStyle: "black-translucent",
  },
  verification: {
    other: {
      "baidu-site-verification": siteConfig.baiduVerification,
    },
  },
  openGraph: pageOpenGraph({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }),
  twitter: pageTwitter({
    title: siteConfig.title,
    description: siteConfig.description,
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${outfit.variable} ${geistMono.variable} ${pressStart.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={getOrganizationGraph()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
