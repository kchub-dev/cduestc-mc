import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusDot({
  status,
  className,
}: {
  status: number;
  className?: string;
}) {
  const tone =
    status === 1 ? "status-dot-up" : status === 0 ? "status-dot-down" : "status-dot-other";

  return (
    <span
      className={cn("status-dot", tone, className)}
      aria-hidden
    />
  );
}

export function StatusBadge({
  status,
  label,
}: {
  status: number;
  label: string;
}) {
  const variant =
    status === 1
      ? "default"
      : status === 0
        ? "destructive"
        : "secondary";

  return (
    <Badge variant={variant} className="gap-1.5 font-medium">
      <StatusDot status={status} />
      {label}
    </Badge>
  );
}

export function formatUptime(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

export function formatPing(ping: number | null | undefined): string {
  if (ping == null) return "—";
  return `${ping} ms`;
}
