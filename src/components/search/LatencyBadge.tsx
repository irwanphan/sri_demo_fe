import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { LATENCY_THRESHOLDS } from "@/lib/config";
import { formatLatencyMs } from "@/lib/format";

interface LatencyBadgeProps {
  ms: number | null;
}

export function LatencyBadge({ ms }: LatencyBadgeProps) {
  if (ms == null) return null;

  let tone: BadgeTone = "success";
  let label = "cepat";
  if (ms >= LATENCY_THRESHOLDS.ok) {
    tone = "danger";
    label = "lambat";
  } else if (ms >= LATENCY_THRESHOLDS.fast) {
    tone = "warning";
    label = "sedang";
  }

  return (
    <Badge tone={tone}>
      <span className="font-mono">{formatLatencyMs(ms)}</span>
      <span aria-hidden>·</span>
      <span>{label}</span>
    </Badge>
  );
}
