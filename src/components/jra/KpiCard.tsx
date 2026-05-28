import type { ReactNode } from "react";

import { cn } from "@/lib/format";

export type KpiTone = "neutral" | "brand" | "warning" | "danger" | "success";

const TONE: Record<KpiTone, { ring: string; iconBg: string; iconColor: string }> = {
  neutral: {
    ring: "ring-slate-200",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  brand: {
    ring: "ring-brand-200",
    iconBg: "bg-brand-50",
    iconColor: "text-brand-600",
  },
  warning: {
    ring: "ring-amber-200",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  danger: {
    ring: "ring-rose-200",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  success: {
    ring: "ring-emerald-200",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
};

interface KpiCardProps {
  label: string;
  value: string | number;
  caption?: string;
  tone?: KpiTone;
  icon?: ReactNode;
  className?: string;
}

function formatNumber(value: string | number): string {
  if (typeof value === "string") return value;
  return value.toLocaleString("id-ID");
}

export function KpiCard({
  label,
  value,
  caption,
  tone = "neutral",
  icon,
  className,
}: KpiCardProps) {
  const palette = TONE[tone];

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-inset",
        palette.ring,
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
            palette.iconBg,
            palette.iconColor,
          )}
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-slate-900 tabular-nums">
          {formatNumber(value)}
        </p>
        {caption && (
          <p className="mt-0.5 text-xs text-slate-500">{caption}</p>
        )}
      </div>
    </div>
  );
}
