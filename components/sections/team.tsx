import { Reveal } from "@/components/motion/reveal";
import { partners, teamMembers } from "@/content/team";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export function TeamSection() {
  return (
    <section id="team" className="section-pad scroll-mt-20">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal className="mb-8">
            <p className="heading-eyebrow">开发团队</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              我们的团队
            </h2>
            <p className="mt-3 text-muted-foreground">
              一群热爱 Minecraft 的在校生，致力于为同学们打造一个有趣的游戏社区。
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {teamMembers.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <article className="pixel-border h-full rounded-md border border-border bg-card p-5 text-center">
                  <div className="relative mx-auto mb-4 size-28 overflow-hidden rounded-md border border-border">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="112px"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {member.link ? (
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-secondary"
                      >
                        {member.name}
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      member.name
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-accent px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="lg:pt-16">
          <p className="heading-eyebrow">我们的职责</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            为玩家提供最好的游戏体验
          </h2>
          <p className="mt-4 text-muted-foreground">
            团队成员各司其职，共同努力打造有趣、安全、稳定的游戏环境。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="section-pad scroll-mt-20">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="heading-eyebrow">合作伙伴</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            我们的伙伴
          </h2>
          <p className="mt-4 text-muted-foreground">
            感谢这些伙伴为服务器提供的支持与帮助，让我们能够为玩家提供更好的服务。
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 0.08}>
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="pixel-border flex h-full flex-col items-center rounded-md border border-border bg-card p-5 text-center transition hover:border-secondary/50"
              >
                <div className="relative mb-4 size-20">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <h3 className="font-semibold text-foreground hover:text-secondary">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {partner.description}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {partner.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-accent px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
