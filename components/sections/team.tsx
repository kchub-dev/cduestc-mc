import { Reveal } from "@/components/motion/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { partners, teamMembers } from "@/content/team";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export function TeamSection() {
  return (
    <section id="team" className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <p className="heading-eyebrow">开发团队</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            我们的团队
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            一群热爱 Minecraft 的在校生，各司其职，一起为同学打造有趣、安全、稳定的游戏社区。
          </p>
        </Reveal>

        {/* 手机：紧凑横排（固定头像宽）；md：2×2 加宽头像 */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
          {teamMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <Card
                size="sm"
                className="pixel-border group h-full gap-0 overflow-hidden rounded-md py-0 ring-border transition duration-300 hover:ring-secondary/45 [@media(hover:hover)]:hover:-translate-y-0.5"
              >
                <div className="flex min-h-[6.75rem] flex-1 flex-row sm:min-h-[8.5rem]">
                  <div className="relative w-24 shrink-0 self-stretch overflow-hidden bg-muted sm:w-32 md:w-36">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      unoptimized={member.avatar.startsWith("http")}
                      sizes="(max-width: 640px) 96px, 144px"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <CardHeader className="gap-0.5 px-3 pt-3 sm:gap-1 sm:px-(--card-spacing) sm:pt-4">
                      <CardTitle className="text-[15px] leading-snug sm:text-base">
                        {member.link ? (
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-secondary"
                          >
                            {member.name}
                            <ExternalLink className="size-3.5 opacity-70" />
                          </a>
                        ) : (
                          member.name
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-secondary sm:text-sm">
                        {member.role}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-3 pb-2 sm:px-(--card-spacing) sm:pb-3">
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {member.bio}
                      </p>
                    </CardContent>

                    <CardFooter className="mt-auto flex-wrap gap-1.5 border-border bg-transparent px-3 py-2.5 sm:px-(--card-spacing) sm:py-3">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground sm:px-2 sm:py-1 sm:text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="section-pad scroll-mt-20">
      <div className="container-site grid items-start gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="heading-eyebrow">合作伙伴</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            我们的伙伴
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            感谢这些伙伴为服务器提供的支持与帮助，让我们能够为玩家提供更好的服务。
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 0.08}>
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="pixel-border flex h-full flex-row items-center gap-4 rounded-md border border-border bg-card p-4 text-left transition hover:border-secondary/50 sm:flex-col sm:items-center sm:gap-0 sm:p-5 sm:text-center"
              >
                <div className="relative size-14 shrink-0 sm:mb-4 sm:size-20">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <h3 className="font-semibold text-foreground hover:text-secondary">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground sm:mt-2">
                    {partner.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:justify-center">
                    {partner.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-accent px-2 py-1 text-[11px] leading-none text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
