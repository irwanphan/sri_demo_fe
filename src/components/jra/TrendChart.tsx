import { useMemo } from "react";

import type { TrendPoint } from "@/lib/mock/jraData";

type SeriesKey = "ditambahkan" | "ke_inaktif" | "dimusnahkan";

interface SeriesConfig {
  key: SeriesKey;
  label: string;
  color: string;
}

const SERIES: SeriesConfig[] = [
  { key: "ditambahkan", label: "Ditambahkan", color: "#2563eb" },
  { key: "ke_inaktif", label: "Dipindah ke Inaktif", color: "#d97706" },
  { key: "dimusnahkan", label: "Dimusnahkan", color: "#dc2626" },
];

interface TrendChartProps {
  data: TrendPoint[];
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 220;
const PADDING = { top: 16, right: 24, bottom: 32, left: 44 };

export function TrendChart({ data }: TrendChartProps) {
  const { paths, dots, gridLines, xLabels, yLabels } = useMemo(() => {
    const maxValue = Math.max(
      ...data.flatMap((d) => [d.ditambahkan, d.ke_inaktif, d.dimusnahkan]),
    );
    const yMax = Math.ceil(maxValue / 100) * 100;

    const innerW = CHART_WIDTH - PADDING.left - PADDING.right;
    const innerH = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    const xStep = data.length > 1 ? innerW / (data.length - 1) : 0;

    const xCoord = (i: number) => PADDING.left + xStep * i;
    const yCoord = (value: number) =>
      PADDING.top + innerH - (value / yMax) * innerH;

    const paths = SERIES.map((series) => {
      const d = data
        .map(
          (point, i) =>
            `${i === 0 ? "M" : "L"} ${xCoord(i)} ${yCoord(point[series.key])}`,
        )
        .join(" ");
      return { ...series, d };
    });

    const dots = SERIES.flatMap((series) =>
      data.map((point, i) => ({
        cx: xCoord(i),
        cy: yCoord(point[series.key]),
        color: series.color,
        seriesLabel: series.label,
        bulan: point.bulan,
        value: point[series.key],
        id: `${series.key}-${i}`,
      })),
    );

    const yTickCount = 4;
    const yLabels = Array.from({ length: yTickCount + 1 }, (_, i) => {
      const value = (yMax / yTickCount) * (yTickCount - i);
      return {
        y: PADDING.top + (innerH / yTickCount) * i,
        label: value.toLocaleString("id-ID"),
      };
    });

    const gridLines = yLabels.map((tick) => ({
      y: tick.y,
      x1: PADDING.left,
      x2: PADDING.left + innerW,
    }));

    const xLabels = data.map((point, i) => ({
      x: xCoord(i),
      label: point.bulan,
    }));

    return { paths, dots, gridLines, xLabels, yLabels };
  }, [data]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Tren 12 Bulan
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Pergerakan arsip per bulan (ditambahkan vs dipindah ke inaktif vs
            dimusnahkan).
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-4 text-xs">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="text-slate-600">{s.label}</span>
            </li>
          ))}
        </ul>
      </header>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label="Grafik tren 12 bulan retensi arsip"
        >
          {gridLines.map((line, i) => (
            <line
              key={`grid-${i}`}
              x1={line.x1}
              x2={line.x2}
              y1={line.y}
              y2={line.y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          ))}

          {yLabels.map((tick, i) => (
            <text
              key={`y-${i}`}
              x={PADDING.left - 8}
              y={tick.y + 4}
              textAnchor="end"
              className="fill-slate-500 text-[10px] tabular-nums"
            >
              {tick.label}
            </text>
          ))}

          {xLabels.map((tick, i) => (
            <text
              key={`x-${i}`}
              x={tick.x}
              y={CHART_HEIGHT - PADDING.bottom + 18}
              textAnchor="middle"
              className="fill-slate-500 text-[10px]"
            >
              {tick.label}
            </text>
          ))}

          {paths.map((p) => (
            <path
              key={p.key}
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {dots.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.cx}
              cy={dot.cy}
              r={3}
              fill="white"
              stroke={dot.color}
              strokeWidth={1.5}
            >
              <title>{`${dot.bulan} · ${dot.seriesLabel}: ${dot.value.toLocaleString("id-ID")}`}</title>
            </circle>
          ))}
        </svg>
      </div>
    </section>
  );
}
