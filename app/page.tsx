import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { ServersSection } from "@/components/sections/servers";
import { StatusStrip } from "@/components/sections/status-strip";
import {
  PartnersSection,
  TeamSection,
} from "@/components/sections/team";
import { getMergedStatus } from "@/lib/uptime-kuma";

export const revalidate = 60;

export default async function HomePage() {
  let status = null;
  try {
    status = await getMergedStatus();
  } catch {
    status = null;
  }

  return (
    <>
      <HeroSection />
      <StatusStrip status={status} />
      <ServersSection status={status} />
      <FeaturesSection />
      <AboutSection />
      <FaqSection />
      <TeamSection />
      <PartnersSection />
    </>
  );
}
