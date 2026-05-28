import type { ReactNode } from "react";

import { cn } from "@/lib/format";

export type AlertTone = "danger" | "warning" | "info";

const TONE: Record<AlertTone, string> = {
  danger: "border-rose-200 bg-rose-50 text-rose-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
};

interface AlertBannerItemProps {
  count: number;
  label: string;
  description?: string;
  tone: AlertTone;
  icon?: ReactNode;
  action?: ReactNode;
}

export function AlertBannerItem({
  count,
  label,
  description,
  tone,
  icon,
  action,
}: AlertBannerItemProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3",
        TONE[tone],
      )}
    >
      {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          <span className="tabular-nums">{count.toLocaleString("id-ID")}</span>{" "}
          {label}
        </p>
        {description && (
          <p className="mt-0.5 text-xs opacity-80">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </li>
  );
}

interface AlertBannerProps {
  children: ReactNode;
}

export function AlertBanner({ children }: AlertBannerProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.51 13.002c1.155 2-.288 4.5-2.599 4.5H4.49c-2.311 0-3.754-2.5-2.6-4.5L9.401 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <h3 className="text-sm font-semibold text-slate-900">
          Perlu Tindakan
        </h3>
      </header>
      <ul className="space-y-2">{children}</ul>
    </section>
  );
}
