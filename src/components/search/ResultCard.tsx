import { Badge } from "@/components/ui/Badge";
import { formatPublishDate, formatScore } from "@/lib/format";
import type { SearchResultDocument } from "@/lib/types";

interface ResultCardProps {
  doc: SearchResultDocument;
  rank: number;
}

export function ResultCard({ doc, rank }: ResultCardProps) {
  const filename = doc.filename || `Dokumen ${doc.document_id.slice(0, 8)}`;

  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono">#{rank}</span>
            <span aria-hidden>·</span>
            <span>{formatPublishDate(doc.publish_date)}</span>
            {doc.page_number != null && (
              <>
                <span aria-hidden>·</span>
                <span>halaman {doc.page_number}</span>
              </>
            )}
          </div>
          <h3 className="mt-1 truncate text-base font-semibold text-slate-900 group-hover:text-brand-700">
            {filename}
          </h3>
          <p className="mt-0.5 truncate font-mono text-xs text-slate-400">
            {doc.document_id}
          </p>
        </div>
        <Badge tone="brand">
          <span className="text-[10px] uppercase tracking-wide">skor</span>
          <span className="font-mono font-semibold">{formatScore(doc.score)}</span>
        </Badge>
      </header>

      <p
        className="es-highlight mt-3 line-clamp-3 text-sm leading-relaxed text-slate-700"
        dangerouslySetInnerHTML={{ __html: doc.content_snippet || "" }}
      />
    </article>
  );
}
