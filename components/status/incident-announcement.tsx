"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { siteConfig } from "@/content/site";
import type { UptimeIncident } from "@/lib/uptime-kuma";
import { ChevronRight, ExternalLink, Megaphone } from "lucide-react";
import type { ReactNode } from "react";

function stripMarkdownLite(md: string): string {
  return md
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}

function incidentPreview(md: string, max = 120): string {
  const plain = stripMarkdownLite(md);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trimEnd()}…`;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s]+))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[2]) {
      nodes.push(
        <strong
          key={`${keyPrefix}-b-${i}`}
          className="font-semibold text-foreground"
        >
          {match[2]}
        </strong>,
      );
    } else if (match[3] && match[4]) {
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i}`}
          href={match[4]}
          target="_blank"
          rel="noreferrer"
          className="text-secondary underline-offset-2 hover:underline"
        >
          {match[3]}
        </a>,
      );
    } else if (match[5]) {
      nodes.push(
        <a
          key={`${keyPrefix}-u-${i}`}
          href={match[5]}
          target="_blank"
          rel="noreferrer"
          className="break-all text-secondary underline-offset-2 hover:underline"
        >
          {match[5]}
        </a>,
      );
    }
    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}

function IncidentMarkdown({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-3 text-sm leading-7 text-muted-foreground">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        return (
          <p key={`p-${index}`}>
            {lines.map((line, lineIndex) => (
              <span key={`l-${index}-${lineIndex}`}>
                {lineIndex > 0 ? <br /> : null}
                {renderInline(line, `${index}-${lineIndex}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export function IncidentAnnouncement({
  incident,
}: {
  incident: UptimeIncident;
}) {
  const title = incident.title || "赛季公告";

  return (
    <Dialog>
      <DialogTrigger
        className="w-full cursor-pointer rounded-xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={`查看公告：${title}`}
      >
        <Alert className="pixel-border border-secondary/30 bg-card transition hover:border-secondary/60 hover:bg-accent/40">
          <Megaphone className="text-secondary" />
          <AlertTitle className="flex items-center justify-between gap-2">
            <span>{title}</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-normal text-secondary">
              查看全文
              <ChevronRight className="size-3.5" />
            </span>
          </AlertTitle>
          <AlertDescription>{incidentPreview(incident.content)}</AlertDescription>
        </Alert>
      </DialogTrigger>

      <DialogContent className="pixel-border max-h-[85vh] overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription>
            来自 Uptime Kuma 状态页公告
            {incident.lastUpdatedDate
              ? ` · 更新于 ${incident.lastUpdatedDate}`
              : null}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[50vh] overflow-y-auto pr-1">
          <IncidentMarkdown content={incident.content} />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            render={
              <a
                href={siteConfig.statusPageUrl}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            打开监控页
            <ExternalLink className="size-3.5" />
          </Button>
          <DialogClose render={<Button size="sm" />}>关闭</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
