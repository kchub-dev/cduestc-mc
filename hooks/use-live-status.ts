"use client";

import { siteConfig } from "@/content/site";
import type { MergedStatusPayload } from "@/lib/uptime-kuma";
import { useCallback, useEffect, useRef, useState } from "react";

type LiveStatusState = {
  status: MergedStatusPayload | null;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useLiveStatus(
  initialStatus: MergedStatusPayload | null,
): LiveStatusState {
  const [status, setStatus] = useState(initialStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      return;
    }

    inFlight.current = true;
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const data = (await res.json()) as MergedStatusPayload & {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "刷新失败");
    } finally {
      inFlight.current = false;
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      void refresh();
    };

    const id = window.setInterval(tick, siteConfig.statusPollIntervalMs);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    // First live refresh shortly after mount (SSR snapshot may be briefly stale).
    const warm = window.setTimeout(tick, 1_500);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(warm);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  return { status, isRefreshing, error, refresh };
}
