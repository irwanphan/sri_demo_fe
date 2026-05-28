import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { formatPublishDate } from "@/lib/format";
import type {
  ArsipRetensiRow,
  NasibAkhir,
  RetensiStatus,
} from "@/lib/mock/jraData";

const STATUS_LABEL: Record<RetensiStatus, string> = {
  aktif: "Aktif",
  inaktif: "Inaktif",
  diusulkan_musnah: "Diusulkan Musnah",
  menunggu_persetujuan: "Menunggu Persetujuan",
  dimusnahkan: "Dimusnahkan",
  permanen: "Permanen",
};

const STATUS_TONE: Record<RetensiStatus, BadgeTone> = {
  aktif: "brand",
  inaktif: "neutral",
  diusulkan_musnah: "warning",
  menunggu_persetujuan: "info",
  dimusnahkan: "danger",
  permanen: "success",
};

const NASIB_LABEL: Record<NasibAkhir, string> = {
  musnah: "Musnah",
  permanen: "Permanen",
  dinilai_kembali: "Dinilai Kembali",
};

function JatuhTempoCell({ hariTersisa, jatuhTempo }: { hariTersisa: number; jatuhTempo: string }) {
  const isOverdue = hariTersisa < 0;
  const isUrgent = hariTersisa >= 0 && hariTersisa <= 7;
  return (
    <div className="space-y-0.5">
      <span className="text-xs text-slate-700">
        {formatPublishDate(jatuhTempo)}
      </span>
      <div>
        {isOverdue ? (
          <Badge tone="danger">
            Terlambat {Math.abs(hariTersisa)} hari
          </Badge>
        ) : isUrgent ? (
          <Badge tone="warning">
            {hariTersisa === 0 ? "Hari ini" : `${hariTersisa} hari lagi`}
          </Badge>
        ) : (
          <span className="text-xs text-slate-500 tabular-nums">
            {hariTersisa} hari lagi
          </span>
        )}
      </div>
    </div>
  );
}

interface ArsipTableProps {
  rows: ArsipRetensiRow[];
}

export function ArsipTable({ rows }: ArsipTableProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Daftar Arsip Perlu Tindakan
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Arsip yang sudah / akan jatuh tempo dalam 30 hari, atau sedang
            dalam proses penyusutan.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 opacity-60 shadow-sm"
          disabled
          title="Prototype — fungsionalitas ekspor akan dihubungkan ke backend"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Ekspor Laporan
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
              <th className="px-5 py-2.5">ID Arsip</th>
              <th className="px-5 py-2.5">Judul</th>
              <th className="px-5 py-2.5">Klasifikasi</th>
              <th className="px-5 py-2.5">Unit Pengolah</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5">Nasib Akhir</th>
              <th className="px-5 py-2.5">Jatuh Tempo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.document_id} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 font-mono text-xs text-slate-600">
                  {row.document_id}
                </td>
                <td className="max-w-[260px] truncate px-5 py-3 text-slate-900">
                  {row.judul}
                </td>
                <td className="px-5 py-3 text-xs">
                  <span className="font-mono font-semibold text-slate-700">
                    {row.klasifikasi_code}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-slate-600">
                  {row.unit_pengolah}
                </td>
                <td className="px-5 py-3">
                  <Badge tone={STATUS_TONE[row.status]}>
                    {STATUS_LABEL[row.status]}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-xs text-slate-600">
                  {NASIB_LABEL[row.nasib_akhir]}
                </td>
                <td className="px-5 py-3">
                  <JatuhTempoCell
                    hariTersisa={row.hari_tersisa}
                    jatuhTempo={row.jatuh_tempo}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
