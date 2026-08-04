import { docsNav, docsSections, type DocBlock } from "@/content/docs";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "帮助文档",
  description:
    "电子科技大学成都学院（CDUESTC）Minecraft 公益服务器帮助文档，包含服务器规则、指令、玩法等详细说明",
};

function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        switch (block.kind) {
          case "p":
            return (
              <p key={key} className="leading-7 text-muted-foreground">
                {block.text}
              </p>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="pt-2 text-lg font-semibold text-secondary"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="list-disc space-y-2 pl-5 text-muted-foreground"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={key}
                className="list-decimal space-y-2 pl-5 text-muted-foreground"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "command":
            return (
              <pre
                key={key}
                className="overflow-x-auto rounded-md border-l-4 border-l-secondary bg-accent px-4 py-3 font-mono text-sm text-foreground"
              >
                {block.text}
              </pre>
            );
          case "callout": {
            const tone =
              block.callout.type === "warning"
                ? "border-destructive/60 bg-destructive/10"
                : block.callout.type === "tip"
                  ? "border-mc-grass/60 bg-mc-grass/10"
                  : "border-sky-500/60 bg-sky-500/10";
            return (
              <div
                key={key}
                className={cn(
                  "rounded-md border-l-4 px-4 py-3 text-sm text-foreground",
                  tone,
                )}
              >
                {block.callout.text}
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="pt-16">
      <section className="relative overflow-hidden border-b border-border py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-mc-grass/5" />
        <div className="container-site relative">
          <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-mc-grass uppercase">
            {siteConfig.brand} · Docs
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            服务器帮助文档
          </h1>
          <p className="mt-3 text-muted-foreground">新手指南与进阶技巧</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="pixel-border rounded-md border border-border bg-card p-4">
              {docsNav.map((group) => (
                <div key={group.title} className="mb-4 last:mb-0">
                  <p className="mb-2 px-2 text-xs font-semibold tracking-wide text-secondary">
                    {group.title}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`#${item.id}`}
                          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            {docsSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="pixel-border scroll-mt-24 rounded-md border border-border bg-card p-6 md:p-8"
              >
                <h2 className="mb-4 border-b border-border pb-3 text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
                <DocBlocks blocks={section.blocks} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
