"use client";

import { ServersSection } from "@/components/sections/servers";
import { StatusStrip } from "@/components/sections/status-strip";
import { useLiveStatus } from "@/hooks/use-live-status";
import type { MergedStatusPayload } from "@/lib/uptime-kuma";

export function LiveStatusBlock({
  initialStatus,
}: {
  initialStatus: MergedStatusPayload | null;
}) {
  const { status, isRefreshing, error, refresh } = useLiveStatus(initialStatus);

  return (
    <>
      <StatusStrip
        status={status}
        isRefreshing={isRefreshing}
        error={error}
        onRefresh={refresh}
      />
      <ServersSection
        status={status}
        isLive
        isRefreshing={isRefreshing}
        updatedAt={status?.updatedAt}
      />
    </>
  );
}
