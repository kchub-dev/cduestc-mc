import { Button } from "@/components/ui/button";
import { recruitConfig } from "@/content/recruit";
import { siteConfig } from "@/content/site";
import Link from "next/link";

export function RecruitEnded() {
  const { ended } = recruitConfig;

  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-[family-name:var(--font-pixel)] text-xs tracking-widest text-mc-grass uppercase">
        {ended.eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{ended.title}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{ended.subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button className="h-11 min-h-11 px-4" render={<Link href="/" />}>
          {ended.homeCta}
        </Button>
        <Button
          variant="outline"
          className="h-11 min-h-11 px-4"
          render={
            <a
              href={siteConfig.qqGroupUrl}
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          {ended.gameCta}
        </Button>
      </div>
    </div>
  );
}
