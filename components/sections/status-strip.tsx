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
import { ExternalLink, RefreshCw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

function formatUpdatedAt(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function shortMonitorName(name: string): string {
  return name
    .replace(/\s*\|\s*CDUCRAFT$/i, "")
    .replace(/\s*\|\s*正式服$/i, "")
    .trim();
}

export function StatusStrip({
  status,
  isRefreshing = false,
  error = null,
  onRefresh,
}: {
  status: MergedStatusPayload | null;
  isRefreshing?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}) {
  const reduce = useReducedMotion();
  const groups = status?.groups ?? [];

  return (
    <section id="status" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="container-site py-8">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="heading-eyebrow">服务监控</p>
            <h2 className="text-xl font-semibold tracking-tight">
              游戏服与 Web 实时状态
            </h2>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="status-dot status-dot-up size-1.5 animate-pulse" />
                实时同步 · 约每 {siteConfig.statusPollIntervalMs / 1000}s（与
                Uptime Kuma 探测周期一致）
              </span>
              <span>更新于 {formatUpdatedAt(status?.updatedAt)}</span>
              {error ? (
                <span className="text-destructive">刷新失败：{error}</span>
              ) : null}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {onRefresh ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                disabled={isRefreshing}
                aria-label="立即刷新状态"
              >
                <RefreshCw
                  className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
                刷新
              </Button>
            ) : null}
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
              完整监控页
              <ExternalLink className="size-3.5" />
            </Button>
          </div>
        </Reveal>

        {groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            暂时无法获取监控数据，请稍后再试或访问完整监控页。
          </p>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.name}>
                <h3 className="mb-3 text-sm font-medium tracking-wide text-secondary">
                  {group.name}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.monitors.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
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
                          {shortMonitorName(m.name)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {m.statusLabel} · {formatUptime(m.uptime24h)} ·{" "}
                          {formatPing(m.ping)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
