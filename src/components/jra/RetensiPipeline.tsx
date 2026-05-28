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
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex min-w-[120px] flex-col items-start rounded-lg px-4 py-3 ring-1 ring-inset",
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
            {index < stages.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5 shrink-0 text-slate-400"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
