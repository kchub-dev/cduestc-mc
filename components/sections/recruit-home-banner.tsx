import { recruitConfig } from "@/content/recruit";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function RecruitHomeBanner({ className }: { className?: string }) {
  const { home } = recruitConfig;

  return (
    <Link
      href={recruitConfig.navHref}
      className={cn(
        "absolute inset-x-0 top-16 z-20 border-b border-[#0b1408]/25 bg-mc-grass text-primary-foreground",
        className,
      )}
    >
      <span className="container-site flex h-10 min-h-10 items-center justify-between gap-3 text-sm">
        <span className="flex min-w-0 items-center gap-2 font-semibold tracking-wide">
          <span className="status-dot size-1.5 shrink-0 bg-primary-foreground" />
          {home.kicker}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs sm:text-sm">
          <span className="hidden sm:inline">{home.bannerLead}</span>
          <span className="sm:hidden">{home.bannerCta}</span>
          <span className="hidden sm:inline">· {home.bannerCta}</span>
          <ChevronRight className="size-3.5" />
        </span>
      </span>
    </Link>
  );
}
