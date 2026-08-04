import { Reveal } from "@/components/motion/reveal";
import {
  formatPing,
  formatUptime,
  StatusBadge,
} from "@/components/status/status-badge";
import { IncidentAnnouncement } from "@/components/status/incident-announcement";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { servers } from "@/content/servers";
import { siteConfig } from "@/content/site";
import {
  findMonitor,
  type MergedStatusPayload,
} from "@/lib/uptime-kuma";
import { ExternalLink, Globe, Puzzle, Server } from "lucide-react";
import Link from "next/link";

export function ServersSection({
  status,
  isLive = false,
  isRefreshing = false,
  updatedAt,
}: {
  status: MergedStatusPayload | null;
  isLive?: boolean;
  isRefreshing?: boolean;
  updatedAt?: string;
}) {
  const incident = status?.incident;

  return (
    <section id="servers" className="section-pad scroll-mt-20">
      <div className="container-site">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="heading-eyebrow inline-block text-left">我们的服务器</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            多样化的游戏体验
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isLive
              ? "游戏服状态与上方监控同源，实时同步 Uptime Kuma；地址请加群后在公告获取。"
              : "运行状态来自 Uptime Kuma 监控；地址请加群后在公告获取。"}
          </p>
          {isLive ? (
            <p className="mt-2 text-xs text-muted-foreground">
              {isRefreshing ? "正在同步…" : "已同步"}
              {updatedAt
                ? ` · ${new Intl.DateTimeFormat("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  }).format(new Date(updatedAt))}`
                : null}
            </p>
          ) : null}
        </Reveal>

        {incident ? (
          <Reveal className="mb-8">
            <IncidentAnnouncement incident={incident} />
          </Reveal>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {servers.map((server, index) => {
            const live = status
              ? findMonitor(status, server.monitorId)
              : undefined;

            return (
              <Reveal key={server.id} delay={index * 0.08}>
                <Card className="pixel-border h-full border-border bg-card transition hover:border-secondary/50">
                  <CardHeader>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={
                          server.type === "vanilla"
                            ? "rounded-sm bg-mc-grass/20 px-2 py-0.5 text-xs font-medium text-mc-grass"
                            : "rounded-sm bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400"
                        }
                      >
                        {server.typeLabel}
                      </span>
                      {live ? (
                        <StatusBadge
                          status={live.status}
                          label={live.statusLabel}
                        />
                      ) : (
                        <StatusBadge status={2} label="状态未知" />
                      )}
                    </div>
                    <CardTitle className="text-2xl">{server.name}</CardTitle>
                    <CardDescription>{server.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Server className="size-4 text-secondary" />
                      {server.version}
                    </p>
                    <p className="flex items-center gap-2">
                      <Globe className="size-4 text-secondary" />
                      地址
                    </p>
                    <div className="rounded-md border-l-4 border-l-secondary bg-secondary/10 px-3 py-2 font-mono text-foreground">
                      {server.addressHint}
                    </div>
                    <p className="flex items-center gap-2">
                      <Puzzle className="size-4 text-secondary" />
                      {server.extra}
                    </p>
                    {live ? (
                      <div className="flex flex-wrap gap-4 border-t border-border pt-3 text-xs">
                        <span>
                          24h 可用性{" "}
                          <strong className="text-foreground">
                            {formatUptime(live.uptime24h)}
                          </strong>
                        </span>
                        <span>
                          延迟{" "}
                          <strong className="text-foreground">
                            {formatPing(live.ping)}
                          </strong>
                        </span>
                      </div>
                    ) : null}
                  </CardContent>
                  <CardFooter>
                    <Button
                      render={
                        <a
                          href={siteConfig.qqGroupUrl}
                          target="_blank"
                          rel="noreferrer"
                        />
                      }
                    >
                      加入游戏
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 flex justify-center">
          <Button
            variant="outline"
            render={
              <Link
                href={siteConfig.statusPageUrl}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            完整监控页面
            <ExternalLink className="size-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
