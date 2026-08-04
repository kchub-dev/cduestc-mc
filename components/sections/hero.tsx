"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src="/images/bc.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1630] via-[#0e1630]/85 to-[#0e1630]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1630] via-transparent to-[#0e1630]/50" />
      </div>

      <div className="container-site relative z-10 flex min-h-[calc(92vh-4rem)] flex-col justify-center py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] leading-relaxed tracking-widest text-mc-grass uppercase sm:text-xs">
            {siteConfig.brand} · {siteConfig.name}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            在奇妙的世界
            <br />
            展开冒险
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            生存 · 建筑 · 养老 · 校园服务器
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
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
              render={<Link href="/#servers" />}
            >
              查看服务器
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
