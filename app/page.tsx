import { getMergedStatus } from "@/lib/uptime-kuma";
import { SectionProgress } from "@/components/layout/section-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { LiveStatusBlock } from "@/components/sections/live-status-block";
import { RecruitNoticeDialog } from "@/components/sections/recruit-notice-dialog";
import { RecruitStrip } from "@/components/sections/recruit-strip";
import { recruitConfig } from "@/content/recruit";
import {
  PartnersSection,
  TeamSection,
} from "@/components/sections/team";
import { getHomeJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  let status = null;
  try {
    status = await getMergedStatus("cached");
  } catch {
    status = null;
  }

  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <SectionProgress />
      {recruitConfig.enabled ? <RecruitNoticeDialog /> : null}
      <HeroSection />
      {recruitConfig.enabled ? <RecruitStrip /> : null}
      <LiveStatusBlock initialStatus={status} />
      <FeaturesSection />
      <AboutSection />
      <FaqSection />
      <TeamSection />
      <PartnersSection />
    </>
  );
}
