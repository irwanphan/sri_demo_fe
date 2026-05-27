import { Badge } from "@/components/ui/Badge";
import type { SearchResponse } from "@/lib/types";

import { LatencyBadge } from "./LatencyBadge";

interface SearchSummaryProps {
  data: SearchResponse;
  latencyMs: number | null;
}

export function SearchSummary({ data, latencyMs }: SearchSummaryProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-100/70 px-4 py-2.5 text-sm">
      <div className="flex items-center gap-2 text-slate-700">
        <span className="font-semibold text-slate-900">{data.total_documents}</span>
        <span>dokumen</span>
        <span className="text-slate-400" aria-hidden>·</span>
        <span>{data.total_pages_matched} halaman cocok</span>
        <span className="text-slate-400" aria-hidden>·</span>
        <Badge tone={data.search_mode === "phrase" ? "info" : "neutral"}>
          mode {data.search_mode}
        </Badge>
      </div>
      <LatencyBadge ms={latencyMs} />
    </div>
  );
}
