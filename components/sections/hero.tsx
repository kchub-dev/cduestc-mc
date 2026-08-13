"use client";

import StrokeText, {
  getStrokeTextDuration,
} from "@/components/bits/StrokeText";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

const STROKE = {
  strokeColor: "#a399fa",
  fillColor: "#f3f5fb",
  strokeWidth: 1.5,
  drawDuration: 1.15,
  fillDelay: 0.12,
  stagger: 0.04,
  ease: "power2.out",
  fillMode: "wipe" as const,
  fontSize: 96,
  fontWeight: 700,
  letterSpacing: 0,
};

const LINE_2_DELAY = 0.18;

export function HeroSection() {
  const reduce = useReducedMotion();
  const [titleLine, secondLine] = siteConfig.hero.titleLines;
  const [revealed, setRevealed] = useState(() => Boolean(reduce));
  const linesDone = useRef(0);

  const markLineDone = () => {
    linesDone.current += 1;
    if (linesDone.current >= 2) setRevealed(true);
  };

  const revealAfterMs = useMemo(() => {
    const first = getStrokeTextDuration({ text: titleLine, ...STROKE, delay: 0 });
    const second = getStrokeTextDuration({
      text: secondLine,
      ...STROKE,
      delay: LINE_2_DELAY,
    });
    return Math.ceil((Math.max(first, second) + 0.6) * 1000);
  }, [titleLine, secondLine]);

  useEffect(() => {
    if (reduce) {
      setRevealed(true);
      return;
    }
    const id = window.setTimeout(() => setRevealed(true), revealAfterMs);
    return () => window.clearTimeout(id);
  }, [reduce, revealAfterMs]);

  const showRest = revealed || Boolean(reduce);

  return (
    <section id="hero" className="relative h-dvh min-h-dvh overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/bc.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 1400px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1630] via-[#0e1630]/85 to-[#0e1630]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1630] via-transparent to-[#0e1630]/50" />
      </div>

      <div className="container-site relative z-10 flex h-full flex-col justify-center pt-16 pb-10">
        <div className="max-w-3xl">
          <motion.p
            initial={false}
            animate={{ opacity: showRest ? 1 : 0, y: showRest ? 0 : 8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mb-4 font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed tracking-widest text-mc-grass uppercase sm:text-xs",
              !showRest && "invisible",
            )}
          >
            {siteConfig.hero.eyebrow}
          </motion.p>

          <h1 className="flex flex-col items-start gap-1 text-3xl font-bold tracking-tight text-white sm:gap-1.5 sm:text-5xl md:text-6xl">
            <StrokeText
              text={titleLine}
              className="stroke-text--fit"
              onComplete={markLineDone}
              style={
                {
                  "--stroke-text-height": "clamp(2.35rem, 7vw, 4.15rem)",
                } as CSSProperties
              }
              {...STROKE}
            />
            <StrokeText
              text={secondLine}
              delay={LINE_2_DELAY}
              className="stroke-text--fit"
              onComplete={markLineDone}
              style={
                {
                  "--stroke-text-height": "clamp(2.35rem, 7vw, 4.15rem)",
                } as CSSProperties
              }
              {...STROKE}
              reverse
            />
          </h1>

          <motion.p
            initial={false}
            animate={{ opacity: showRest ? 1 : 0, y: showRest ? 0 : 10 }}
            transition={{ duration: 0.55, delay: showRest ? 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-5 max-w-xl text-lg text-muted-foreground",
              !showRest && "invisible",
            )}
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: showRest ? 1 : 0, y: showRest ? 0 : 10 }}
            transition={{ duration: 0.55, delay: showRest ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-8 flex flex-wrap items-center gap-3",
              showRest ? "pointer-events-auto" : "pointer-events-none invisible",
            )}
          >
            <Button
              size="lg"
              className="h-11 min-h-11 px-4 text-base"
              render={
                <a
                  href={siteConfig.qqGroupUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              加入群聊
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 min-h-11 px-4 text-base"
              render={<Link href="/#servers" />}
            >
              查看服务器
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
