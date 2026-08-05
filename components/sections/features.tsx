import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { features } from "@/content/servers";
import { siteConfig } from "@/content/site";
import {
  Crosshair,
  Map,
  Package,
  Puzzle,
  Shield,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  crosshair: Crosshair,
  shield: Shield,
  map: Map,
  users: Users,
  puzzle: Puzzle,
  sparkles: Sparkles,
  package: Package,
};

export function FeaturesSection() {
  return (
    <section id="services" className="section-pad scroll-mt-20">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="heading-eyebrow">我们有什么特色</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            原创《单程票》
            <br />
            硬核射击副本
          </h2>
          <p className="mt-4 text-muted-foreground">
            将 Minecraft 与 FPS
            深度结合：现代化枪械、生还者波次与肉鸽双模式、四人小队救援，配套全自研客户端模组。请使用官方整合包进入。
          </p>
          <Button className="mt-6" render={<Link href="/docs" />}>
            帮助文档
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            也可参考{" "}
            <a
              href={siteConfig.links.helpDocsExternal}
              target="_blank"
              rel="noreferrer"
              className="text-secondary hover:underline"
            >
              外部文档
            </a>
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <Reveal key={feature.title} delay={i * 0.05}>
                <div className="pixel-border flex h-full gap-3 rounded-md border border-border bg-card p-4 transition hover:border-secondary/40">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-secondary/15 text-secondary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
