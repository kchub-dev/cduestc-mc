"use client";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { recruitConfig } from "@/content/recruit";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function RecruitStrip() {
  const reduce = useReducedMotion();
  const { strip } = recruitConfig;

  return (
    <section className="border-y border-mc-grass/35 bg-mc-grass/12">
      <div className="container-site py-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-medium text-mc-grass">
              <motion.span
                animate={reduce ? undefined : { opacity: [1, 0.45, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="status-dot status-dot-up size-1.5"
              />
              {strip.liveLabel}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-mc-grass sm:text-3xl">
              {strip.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {strip.description}
            </p>
          </div>
          <Button
            className="h-11 min-h-11 shrink-0 px-4"
            render={<Link href={recruitConfig.navHref} />}
          >
            {strip.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
