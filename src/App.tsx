import { Outlet } from "react-router";

import { AppHeader } from "@/components/layout/AppHeader";
import { TabNav } from "@/components/layout/TabNav";

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <AppHeader />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <TabNav />
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-xs text-slate-500">
          <span>SRI Demo · PoC pencarian dokumen berkecepatan tinggi</span>
          <span>FE Vite + React Router 7 · BE FastAPI · Elastic Cloud</span>
        </div>
      </footer>
    </div>
  );
}
