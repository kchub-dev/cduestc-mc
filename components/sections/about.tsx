import { Reveal } from "@/components/motion/reveal";
import { aboutCopy, aboutFeatures } from "@/content/servers";
import {
  Crosshair,
  Heart,
  Package,
  Shield,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  crosshair: Crosshair,
  heart: Heart,
  package: Package,
  shield: Shield,
};

export function AboutSection() {
  return (
    <section id="about" className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mb-10 max-w-3xl">
          <p className="heading-eyebrow">{aboutCopy.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {aboutCopy.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-muted-foreground">{aboutCopy.description}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {aboutFeatures.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Shield;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="pixel-border h-full rounded-md border border-border bg-card p-5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-sm bg-mc-grass/15 text-mc-grass">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
