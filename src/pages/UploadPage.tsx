import { useMemo } from "react";

import { Dropzone } from "@/components/upload/Dropzone";
import { UploadItemRow } from "@/components/upload/UploadItemRow";
import { useUpload } from "@/lib/hooks/useUpload";

export function UploadPage() {
  const { items, addFiles, removeItem, clear } = useUpload();

  const stats = useMemo(() => {
    const counters = { queued: 0, uploading: 0, success: 0, error: 0 };
    items.forEach((item) => {
      counters[item.status] += 1;
    });
    return counters;
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Unggah dokumen PDF
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            File akan dikirim ke backend lalu diproses (ekstraksi teks via Tika
            dan indexing ke Elastic) di background.
          </p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Bersihkan daftar
          </button>
        )}
      </div>

      <Dropzone onFiles={addFiles} />

      {items.length > 0 && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>
              <span className="font-semibold text-slate-900">{items.length}</span>{" "}
              file
            </span>
            <span className="text-slate-400" aria-hidden>·</span>
            <span className="text-emerald-700">{stats.success} berhasil</span>
            {stats.uploading > 0 && (
              <>
                <span className="text-slate-400" aria-hidden>·</span>
                <span className="text-sky-700">{stats.uploading} mengunggah</span>
              </>
            )}
            {stats.queued > 0 && (
              <>
                <span className="text-slate-400" aria-hidden>·</span>
                <span>{stats.queued} mengantre</span>
              </>
            )}
            {stats.error > 0 && (
              <>
                <span className="text-slate-400" aria-hidden>·</span>
                <span className="text-rose-700">{stats.error} gagal</span>
              </>
            )}
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <UploadItemRow key={item.id} item={item} onRemove={removeItem} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
