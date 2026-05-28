import { NavLink } from "react-router";

import { cn } from "@/lib/format";

const TABS = [
  { to: "/", label: "Cari Dokumen", end: true },
  { to: "/upload", label: "Unggah Dokumen", end: false },
  { to: "/retensi", label: "Retensi (JRA)", end: false },
];

export function TabNav() {
  return (
    <nav className="flex gap-1" aria-label="Navigasi utama">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            cn(
              "inline-flex items-center border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900",
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
