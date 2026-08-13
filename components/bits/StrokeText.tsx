"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import "./StrokeText.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TEXT = "Draw Attention";

export type StrokeTextTrigger = "mount" | "hover" | "scroll" | "loop";
export type StrokeTextFillMode = "fade" | "wipe" | "none";

export type StrokeTextProps = {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: StrokeTextTrigger;
  fillMode?: StrokeTextFillMode;
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  onComplete?: () => void;
};

export function getStrokeTextDuration({
  text = DEFAULT_TEXT,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  fillMode = "wipe",
  delay = 0,
}: Pick<
  StrokeTextProps,
  "text" | "drawDuration" | "fillDelay" | "stagger" | "fillMode" | "delay"
> = {}) {
  const n = Math.max(Array.from(String(text ?? "")).length, 1);
  const fillDuration =
    fillMode === "none" ? 0 : Math.max(0.4, Number(drawDuration) * 0.5);
  const fillPart = fillMode === "none" ? 0 : Number(fillDelay) + fillDuration;
  return Number(delay) + (n - 1) * Number(stagger) + Number(drawDuration) + fillPart;
}

export default function StrokeText({
  text = DEFAULT_TEXT,
  strokeColor = "#A78BFA",
  fillColor = "#F8FAFC",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  className = "",
  style = {},
  delay = 0,
  onComplete,
}: StrokeTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [box, setBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const characters = useMemo(() => Array.from(String(text ?? "")), [text]);

  const numericFontSize =
    typeof fontSize === "number" ? fontSize : Number.parseFloat(String(fontSize)) || 128;
  const dash = Math.max(numericFontSize * 7, 200);

  const fontStyle = useMemo(
    () =>
      ({
        fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
        fontWeight,
        letterSpacing:
          typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing,
      }) satisfies CSSProperties,
    [fontSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox: DOMRect;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      const strokePad = Math.max(Number(strokeWidth) || 1, 1);
      const next = {
        x: bbox.x,
        y: bbox.y - strokePad,
        width: bbox.width + strokePad,
        height: bbox.height + strokePad * 2,
      };

      setBox((prev) =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next,
      );
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      void document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [characters, numericFontSize, fontWeight, letterSpacing, strokeWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === "undefined" || !root || !box) return undefined;

    let removeHover: (() => void) | null = null;
    let delayCall: gsap.core.Tween | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      const strokes = gsap.utils.toArray<SVGElement>(
        root.querySelectorAll("[data-stroke-char]"),
      );
      const fills = gsap.utils.toArray<SVGElement>(
        root.querySelectorAll("[data-fill-char]"),
      );
      const wipe = wipeRectRef.current;
      if (!strokes.length) return;

      const fillEnabled = fillMode !== "none";
      const useWipe = fillEnabled && fillMode === "wipe";
      const fillDuration = Math.max(0.4, drawDuration * 0.5);
      const staggerConfig = reverse
        ? { each: stagger, from: "end" as const }
        : stagger;
      const targets = [...strokes, ...fills, wipe].filter(Boolean);

      const setStart = () => {
        gsap.killTweensOf(targets);
        gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
        gsap.set(fills, { opacity: useWipe ? 1 : 0 });
        if (wipe) {
          if (reverse) {
            gsap.set(wipe, { attr: { x: box.x + box.width, width: 0 } });
          } else {
            gsap.set(wipe, { attr: { x: box.x, width: 0 } });
          }
        }
      };

      const setEnd = () => {
        gsap.killTweensOf(targets);
        gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
        gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
        if (wipe) {
          gsap.set(wipe, {
            attr: { x: box.x, width: fillEnabled ? box.width : 0 },
          });
        }
      };

      const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) {
        setEnd();
        onCompleteRef.current?.();
        return;
      }

      const build = () => {
        setStart();
        const tl = gsap.timeline({
          paused: true,
          repeat: trigger === "loop" ? -1 : 0,
          repeatDelay: trigger === "loop" ? 0.9 : 0,
          defaults: { overwrite: "auto" },
          onComplete: () => {
            if (trigger !== "loop") onCompleteRef.current?.();
          },
        });

        tl.to(
          strokes,
          { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig },
          0,
        );

        if (useWipe && wipe) {
          tl.to(
            wipe,
            reverse
              ? {
                  attr: { x: box.x, width: box.width },
                  duration: fillDuration,
                  ease: "power2.inOut",
                }
              : {
                  attr: { width: box.width },
                  duration: fillDuration,
                  ease: "power2.inOut",
                },
            drawDuration + fillDelay,
          );
        } else if (fillEnabled) {
          tl.to(
            fills,
            {
              opacity: 1,
              duration: fillDuration,
              ease: "power2.out",
              stagger: staggerConfig,
            },
            drawDuration + fillDelay,
          );
        }

        return tl;
      };

      if (trigger === "hover") {
        setEnd();
        const play = () => {
          build().play(0);
        };
        root.addEventListener("pointerenter", play);
        removeHover = () => root.removeEventListener("pointerenter", play);
      } else {
        const timeline = build();
        if (trigger === "scroll") {
          scrollTrigger = ScrollTrigger.create({
            trigger: root,
            start: "top 82%",
            once: true,
            onEnter: () => timeline.play(0),
          });
        } else if (delay > 0) {
          delayCall = gsap.delayedCall(delay, () => timeline.play(0));
        } else {
          timeline.play(0);
        }
      }
    }, root);

    return () => {
      removeHover?.();
      delayCall?.kill();
      scrollTrigger?.kill();
      ctx.revert();
    };
  }, [
    box,
    dash,
    delay,
    drawDuration,
    fillDelay,
    stagger,
    ease,
    trigger,
    fillMode,
    reverse,
  ]);

  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : `0 ${-numericFontSize} 600 ${numericFontSize * 1.3}`;

  const heightVar =
    (style as CSSProperties & { ["--stroke-text-height"]?: string })[
      "--stroke-text-height"
    ] ?? `${Math.round(numericFontSize * 1.3)}px`;

  return (
    <span
      ref={rootRef}
      className={`stroke-text ${trigger === "hover" ? "stroke-text--hover" : ""} ${className}`.trim()}
      style={{ ...style, "--stroke-text-height": heightVar } as CSSProperties}
      role="img"
      aria-label={String(text ?? "")}
    >
      <svg
        className="stroke-text__svg"
        viewBox={viewBox}
        width={box?.width ?? 600}
        height={box?.height ?? numericFontSize * 1.3}
        preserveAspectRatio="xMinYMid meet"
        overflow="visible"
        aria-hidden="true"
      >
        {fillMode === "wipe" && box ? (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect
                ref={wipeRectRef}
                x={box.x}
                y={box.y}
                width="0"
                height={box.height}
              />
            </clipPath>
          </defs>
        ) : null}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={fillMode === "wipe" && box ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}
