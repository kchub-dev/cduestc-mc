import { siteConfig } from "@/content/site";

export type MonitorStatusCode = 0 | 1 | 2 | 3 | number;

export type UptimeMonitor = {
  id: number;
  name: string;
  sendUrl: number;
  type: string;
  url?: string;
  certExpiryDaysRemaining?: string | number;
  validCert?: boolean;
};

export type UptimeGroup = {
  id: number;
  name: string;
  weight: number;
  monitorList: UptimeMonitor[];
};

export type UptimeIncident = {
  id: number;
  style: string;
  title: string;
  content: string;
  pin: boolean;
  active: boolean;
  createdDate: string;
  lastUpdatedDate: string;
};

export type StatusPageResponse = {
  config: {
    slug: string;
    title: string;
    description: string;
    autoRefreshInterval: number;
    published: boolean;
  };
  incidents: UptimeIncident[];
  publicGroupList: UptimeGroup[];
  maintenanceList: unknown[];
};

export type HeartbeatEntry = {
  status: MonitorStatusCode;
  time: string;
  msg: string;
  ping: number | null;
};

export type HeartbeatResponse = {
  heartbeatList: Record<string, HeartbeatEntry[]>;
  uptimeList: Record<string, number>;
};

export type MonitorLiveStatus = {
  id: number;
  name: string;
  group: string;
  status: MonitorStatusCode;
  statusLabel: string;
  ping: number | null;
  uptime24h: number | null;
  url?: string;
};

export type MergedStatusPayload = {
  updatedAt: string;
  incident: UptimeIncident | null;
  monitors: MonitorLiveStatus[];
  groups: { name: string; monitors: MonitorLiveStatus[] }[];
};

const STATUS_LABELS: Record<number, string> = {
  0: "离线",
  1: "在线",
  2: "等待",
  3: "维护",
};

export function statusLabel(code: MonitorStatusCode): string {
  return STATUS_LABELS[Number(code)] ?? "未知";
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${siteConfig.statusApiBase}${path}`, {
    next: { revalidate: 60, tags: ["uptime-kuma"] },
  });
  if (!res.ok) {
    throw new Error(`Uptime Kuma request failed: ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchStatusPage(): Promise<StatusPageResponse> {
  return fetchJson(`/api/status-page/${siteConfig.statusSlug}`);
}

export async function fetchHeartbeat(): Promise<HeartbeatResponse> {
  return fetchJson(`/api/status-page/heartbeat/${siteConfig.statusSlug}`);
}

export async function getMergedStatus(): Promise<MergedStatusPayload> {
  const [page, heartbeat] = await Promise.all([
    fetchStatusPage(),
    fetchHeartbeat(),
  ]);

  const monitors: MonitorLiveStatus[] = [];
  const groups: MergedStatusPayload["groups"] = [];

  for (const group of page.publicGroupList) {
    const groupMonitors: MonitorLiveStatus[] = [];
    for (const monitor of group.monitorList) {
      const beats = heartbeat.heartbeatList[String(monitor.id)] ?? [];
      const latest = beats[beats.length - 1];
      const uptimeKey = `${monitor.id}_24`;
      const live: MonitorLiveStatus = {
        id: monitor.id,
        name: monitor.name,
        group: group.name,
        status: latest?.status ?? 0,
        statusLabel: statusLabel(latest?.status ?? 0),
        ping: latest?.ping ?? null,
        uptime24h:
          typeof heartbeat.uptimeList[uptimeKey] === "number"
            ? heartbeat.uptimeList[uptimeKey]
            : null,
        url: monitor.url,
      };
      groupMonitors.push(live);
      monitors.push(live);
    }
    groups.push({ name: group.name, monitors: groupMonitors });
  }

  const incident =
    page.incidents.find((i) => i.pin && i.active) ??
    page.incidents.find((i) => i.active) ??
    null;

  return {
    updatedAt: new Date().toISOString(),
    incident,
    monitors,
    groups,
  };
}

export function findMonitor(
  payload: MergedStatusPayload,
  monitorId: number,
): MonitorLiveStatus | undefined {
  return payload.monitors.find((m) => m.id === monitorId);
}
