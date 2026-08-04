import { Reveal } from "@/components/motion/reveal";
import { aboutFeatures } from "@/content/servers";
import { BookOpen, Network, Plug, Shield, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  plug: Plug,
  network: Network,
  shield: Shield,
};

export function AboutSection() {
  return (
    <section id="about" className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mb-10 max-w-3xl">
          <p className="heading-eyebrow">关于我们</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            电子科技大学成都学院
            <br />
            MC 公益服务器
          </h2>
          <p className="mt-4 text-muted-foreground">
            电子科技大学成都学院（CDUESTC）Minecraft
            公益服务器由科成 MC 同好会成员联合创办，旨在打造一个简单稳定的多人联机平台，让即便是入门玩家也能体验到合作的乐趣。
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {aboutFeatures.map((item, i) => {
            const Icon = iconMap[item.icon] ?? BookOpen;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="pixel-border h-full rounded-md border border-border bg-card p-5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-sm bg-mc-grass/15 text-mc-grass">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
