"use client";

import { Reveal } from "@/components/motion/reveal";
import {
  formatPing,
  formatUptime,
  StatusDot,
} from "@/components/status/status-badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import type { MergedStatusPayload } from "@/lib/uptime-kuma";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function StatusStrip({
  status,
}: {
  status: MergedStatusPayload | null;
}) {
  const reduce = useReducedMotion();
  const webGroup = status?.groups.find((g) => g.name === "Web");
  const monitors = webGroup?.monitors ?? [];

  return (
    <section className="border-y border-border bg-card/40">
      <div className="container-site py-8">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="heading-eyebrow">服务监控</p>
            <h2 className="text-xl font-semibold tracking-tight">Web 服务状态</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={
              <Link
                href={siteConfig.statusPageUrl}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            查看全部
            <ExternalLink className="size-3.5" />
          </Button>
        </Reveal>

        {monitors.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            暂时无法获取监控数据，请稍后再试或访问完整监控页。
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {monitors.map((m, i) => (
              <motion.div
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="pixel-border flex items-start gap-3 rounded-md border border-border bg-background/60 p-4"
              >
                <motion.span
                  animate={
                    reduce || m.status !== 1
                      ? undefined
                      : { opacity: [1, 0.45, 1] }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-1.5"
                >
                  <StatusDot status={m.status} />
                </motion.span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {m.name.replace(/\s*\|\s*CDUCRAFT$/, "")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.statusLabel} · {formatUptime(m.uptime24h)} ·{" "}
                    {formatPing(m.ping)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
