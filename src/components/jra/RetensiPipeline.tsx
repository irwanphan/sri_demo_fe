import { cn } from "@/lib/format";

interface PipelineStage {
  label: string;
  value: number;
  tone: "brand" | "warning" | "danger" | "success" | "neutral";
}

const TONE: Record<PipelineStage["tone"], string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-rose-50 text-rose-700 ring-rose-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
};

interface RetensiPipelineProps {
  stages: PipelineStage[];
}

export function RetensiPipeline({ stages }: RetensiPipelineProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Pipeline Penyusutan
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Alur dokumen sesuai Jadwal Retensi Arsip (JRA): aktif → inaktif →
          usulan musnah → persetujuan → eksekusi musnah / permanen.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {stages.map(stage => (
          <div key={stage.label} className="flex items-center gap-2 w-full">
            <div
              className={cn(
                "flex w-full h-22 flex-col items-start rounded-lg px-4 py-3 ring-1 ring-inset",
                TONE[stage.tone],
              )}
            >
              <span className="text-xs font-medium tracking-wide uppercase opacity-80">
                {stage.label}
              </span>
              <span className="mt-1 text-xl font-semibold tabular-nums">
                {stage.value.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
