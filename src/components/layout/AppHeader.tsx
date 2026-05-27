import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { getElasticsearchHealth, getHealth } from "@/lib/api";

type HealthState = "checking" | "ok" | "down";

interface HealthIndicator {
  label: string;
  state: HealthState;
}

function StatusDot({ state }: { state: HealthState }) {
  const color =
    state === "ok"
      ? "bg-emerald-500"
      : state === "down"
        ? "bg-rose-500"
        : "bg-slate-300 animate-pulse";
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${color}`}
      aria-hidden
    />
  );
}

function HealthPill({ label, state }: HealthIndicator) {
  return (
    <Badge tone={state === "ok" ? "success" : state === "down" ? "danger" : "neutral"}>
      <StatusDot state={state} />
      <span className="font-medium">{label}</span>
    </Badge>
  );
}

export function AppHeader() {
  const [api, setApi] = useState<HealthState>("checking");
  const [es, setEs] = useState<HealthState>("checking");

  useEffect(() => {
    let active = true;

    async function check() {
      try {
        await getHealth();
        if (active) setApi("ok");
      } catch {
        if (active) setApi("down");
      }
      try {
        await getElasticsearchHealth();
        if (active) setEs("ok");
      } catch {
        if (active) setEs("down");
      }
    }

    void check();
    const interval = window.setInterval(check, 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 font-bold text-white shadow-sm">
            SRI
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900">
              Pencarian Naskah Dinas
            </h1>
            <p className="text-xs text-slate-500">
              Mesin pencari berkecepatan tinggi · PoC ANRI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HealthPill label="API" state={api} />
          <HealthPill label="ES" state={es} />
        </div>
      </div>
    </header>
  );
}
