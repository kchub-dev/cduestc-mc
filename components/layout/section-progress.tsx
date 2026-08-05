"use client";

import { LineSidebar } from "@/components/bits/LineSidebar";
import {
  sectionProgressItems,
  type SectionProgressItem,
} from "@/content/section-progress";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

/** Near page top → always treat as hero. */
const HERO_TOP_THRESHOLD = 96;

function resolveActiveSection(items: SectionProgressItem[]) {
  if (typeof window === "undefined") return items[0]?.id ?? "";

  if (window.scrollY <= HERO_TOP_THRESHOLD) {
    return "hero";
  }

  const marker = 64 + 40; // sticky header + breathing room
  let current = items[0]?.id ?? "";

  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= marker) {
      current = item.id;
    }
  }

  return current;
}

function scrollToSection(item: SectionProgressItem) {
  if (item.id === "hero") {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(item.id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SectionProgress({
  items = sectionProgressItems,
}: {
  items?: SectionProgressItem[];
}) {
  const reduce = useReducedMotion();
  const labels = useMemo(() => items.map((item) => item.label), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("home-section-progress");
    return () => {
      document.documentElement.classList.remove("home-section-progress");
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const id = resolveActiveSection(items);
      const next = Math.max(
        0,
        items.findIndex((item) => item.id === id),
      );
      setActiveIndex(next);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [items]);

  const handleItemClick = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item) return;
      setActiveIndex(index);
      scrollToSection(item);
    },
    [items],
  );

  return (
    <div
      aria-label="页面章节"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-5"
    >
      <motion.div
        className="pointer-events-auto"
        initial={reduce ? false : { opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <LineSidebar
          items={labels}
          side="right"
          labelsOnHover
          activeIndex={activeIndex}
          onItemClick={handleItemClick}
          showIndex={false}
          showMarker
          scaleTick
          accentColor="var(--link)"
          textColor="var(--foreground-faint)"
          markerColor="var(--border-strong, var(--foreground-faint))"
          proximityRadius={90}
          maxShift={14}
          falloff="smooth"
          markerLength={36}
          markerGap={10}
          tickScale={0.45}
          itemGap={14}
          fontSize={0.8125}
          smoothing={90}
          className="section-line-sidebar"
        />
      </motion.div>
    </div>
  );
}
