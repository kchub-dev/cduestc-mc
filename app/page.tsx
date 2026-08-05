import { SectionProgress } from "@/components/layout/section-progress";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { LiveStatusBlock } from "@/components/sections/live-status-block";
import {
  PartnersSection,
  TeamSection,
} from "@/components/sections/team";
import { getMergedStatus } from "@/lib/uptime-kuma";

export default async function HomePage() {
  let status = null;
  try {
    status = await getMergedStatus("fresh");
  } catch {
    status = null;
  }

  return (
    <>
      <SectionProgress />
      <HeroSection />
      <LiveStatusBlock initialStatus={status} />
      <FeaturesSection />
      <AboutSection />
      <FaqSection />
      <TeamSection />
      <PartnersSection />
    </>
  );
}
