"use client";

import { Button } from "@/components/ui/button";
import { recruitConfig } from "@/content/recruit";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export function RecruitHero() {
  const reduce = useReducedMotion();
  const { hero } = recruitConfig;

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/bc.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 1400px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1630] via-[#0e1630]/88 to-[#0e1630]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1630] via-transparent to-[#0e1630]/55" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(163, 153, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(163, 153, 250, 0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container-site relative z-10 flex min-h-[70vh] flex-col justify-center pt-20 pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed tracking-widest text-mc-grass uppercase sm:text-xs"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.06, ease }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.12, ease }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.18, ease }}
            className={cn("mt-8 flex flex-wrap items-center gap-3")}
          >
            <Button
              size="lg"
              className="h-11 min-h-11 px-4 text-base"
              render={
                <a
                  href={recruitConfig.groupUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              {hero.primaryCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 min-h-11 px-4 text-base"
              render={<Link href="/" />}
            >
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
