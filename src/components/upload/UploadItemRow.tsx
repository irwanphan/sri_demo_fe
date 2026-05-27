import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { formatBytes } from "@/lib/format";
import type { UploadItem, UploadItemStatus } from "@/lib/hooks/useUpload";

interface UploadItemRowProps {
  item: UploadItem;
  onRemove: (id: string) => void;
}

const STATUS_LABEL: Record<UploadItemStatus, string> = {
  queued: "Mengantre",
  uploading: "Mengunggah",
  success: "Terkirim ke backend",
  error: "Gagal",
};

const STATUS_TONE: Record<UploadItemStatus, BadgeTone> = {
  queued: "neutral",
  uploading: "info",
  success: "success",
  error: "danger",
};

export function UploadItemRow({ item, onRemove }: UploadItemRowProps) {
  const isBusy = item.status === "queued" || item.status === "uploading";

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">
          {item.file.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatBytes(item.file.size)}
          {item.documentId && (
            <>
              <span className="text-slate-400"> · id </span>
              <span className="font-mono">{item.documentId.slice(0, 8)}…</span>
            </>
          )}
          {item.error && (
            <span className="text-rose-600"> · {item.error}</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isBusy && <Spinner size="sm" />}
        <Badge tone={STATUS_TONE[item.status]}>
          {STATUS_LABEL[item.status]}
        </Badge>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Hapus dari daftar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95L3.636 14.95 8.586 10 3.636 5.05 5.05 3.636 10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
