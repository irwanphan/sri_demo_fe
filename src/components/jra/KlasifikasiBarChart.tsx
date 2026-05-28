import type { KlasifikasiCount } from "@/lib/mock/jraData";

interface KlasifikasiBarChartProps {
  data: KlasifikasiCount[];
}

export function KlasifikasiBarChart({ data }: KlasifikasiBarChartProps) {
  const max = Math.max(...data.map((d) => d.total));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Distribusi per Klasifikasi
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Komposisi arsip aktif (biru) dan inaktif (abu) per kode klasifikasi
          (mengacu Perka ANRI).
        </p>
      </header>
      <ul className="space-y-3">
        {data.map((row) => {
          const aktifPct = (row.aktif / max) * 100;
          const inaktifPct = (row.inaktif / max) * 100;
          return (
            <li key={row.code}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                <span className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-slate-700">
                    {row.code}
                  </span>
                  <span className="truncate text-slate-500">{row.name}</span>
                </span>
                <span className="tabular-nums text-slate-700">
                  {row.total.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-brand-500"
                  style={{ width: `${aktifPct}%` }}
                  title={`Aktif: ${row.aktif.toLocaleString("id-ID")}`}
                />
                <div
                  className="h-full bg-slate-400"
                  style={{ width: `${inaktifPct}%` }}
                  title={`Inaktif: ${row.inaktif.toLocaleString("id-ID")}`}
                />
              </div>
              {row.perlu_tindakan > 0 && (
                <p className="mt-1 text-[11px] text-amber-700">
                  {row.perlu_tindakan} perlu tindakan
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <footer className="mt-4 flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-brand-500" />
          Aktif
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-slate-400" />
          Inaktif
        </span>
      </footer>
    </section>
  );
}
