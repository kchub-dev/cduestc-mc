import { Reveal } from "@/components/motion/reveal";
import { RecruitFaq } from "@/components/sections/recruit-faq";
import { RecruitHero } from "@/components/sections/recruit-hero";
import { Button } from "@/components/ui/button";
import { recruitConfig } from "@/content/recruit";
import {
  Code2,
  Crosshair,
  Gamepad2,
  Heart,
  Megaphone,
  Package,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const roleIcons: Record<(typeof recruitConfig.roles)[number]["icon"], LucideIcon> =
  {
    code: Code2,
    palette: Palette,
    megaphone: Megaphone,
    gamepad: Gamepad2,
  };

const workIcons: LucideIcon[] = [Crosshair, Package, Heart];

export function RecruitLanding() {
  return (
    <>
      <RecruitHero />
      <RecruitRoles />
      <RecruitWork />
      <RecruitPosters />
      <RecruitJoin />
      <RecruitFaq />
    </>
  );
}

function RecruitRoles() {
  return (
    <section className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mb-10 max-w-3xl">
          <p className="heading-eyebrow">{recruitConfig.rolesEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {recruitConfig.rolesTitle}
          </h2>
          <p className="mt-4 text-muted-foreground">{recruitConfig.rolesLead}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {recruitConfig.roles.map((role, i) => {
            const Icon = roleIcons[role.icon];
            return (
              <Reveal key={role.id} delay={i * 0.06}>
                <div className="pixel-border group h-full rounded-md border border-border bg-card p-5 ring-border transition duration-300 hover:ring-secondary/45 [@media(hover:hover)]:hover:-translate-y-0.5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-sm bg-mc-grass/15 text-mc-grass">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{role.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {role.description}
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

function RecruitWork() {
  return (
    <section className="section-pad scroll-mt-20 border-y border-border bg-card/40">
      <div className="container-site">
        <Reveal className="mb-10 max-w-3xl">
          <p className="heading-eyebrow">{recruitConfig.workEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {recruitConfig.workTitle}
          </h2>
          <p className="mt-4 text-muted-foreground">{recruitConfig.workLead}</p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {recruitConfig.workItems.map((item, i) => {
            const Icon = workIcons[i] ?? Heart;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="pixel-border h-full rounded-md border border-border bg-background/60 p-5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-sm bg-secondary/15 text-secondary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
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

function RecruitPosters() {
  const posters = recruitConfig.posters;
  if (posters.length === 0) return null;

  return (
    <section className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mb-10 max-w-3xl">
          <p className="heading-eyebrow">海报</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            这一季的画面
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {posters.map((poster, i) => (
            <Reveal key={poster.src} delay={i * 0.06}>
              <div className="pixel-border relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-card">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 560px"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruitJoin() {
  const qrSrc = recruitConfig.qrSrc;
  const schedule = recruitConfig.schedule;

  return (
    <section id="join" className="section-pad scroll-mt-20">
      <div className="container-site">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="heading-eyebrow">{recruitConfig.joinEyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {recruitConfig.joinTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">{recruitConfig.joinLead}</p>
            {schedule ? (
              <p className="mt-4 rounded-md border-l-4 border-l-secondary bg-secondary/10 px-4 py-3 text-sm text-foreground">
                {schedule}
              </p>
            ) : null}
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">群名</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {recruitConfig.groupName}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">群号</dt>
                <dd className="mt-1 font-mono text-foreground">
                  {recruitConfig.groupNumber}
                </dd>
              </div>
            </dl>
            <Button
              className="mt-6 h-11 min-h-11 px-4"
              render={
                <a
                  href={recruitConfig.groupUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              {recruitConfig.joinCta}
            </Button>
          </Reveal>

          {qrSrc ? (
            <Reveal delay={0.08}>
              <div className="pixel-border mx-auto w-full max-w-[260px] rounded-md border border-border bg-card p-5 lg:mx-0">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-background">
                  <Image
                    src={qrSrc}
                    alt={`${recruitConfig.groupName} 二维码`}
                    fill
                    className="object-contain p-2"
                    sizes="220px"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  扫码加入招新群
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
