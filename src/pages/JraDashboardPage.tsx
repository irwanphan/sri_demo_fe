import { AlertBanner, AlertBannerItem } from "@/components/jra/AlertBanner";
import { ArsipTable } from "@/components/jra/ArsipTable";
import { KlasifikasiBarChart } from "@/components/jra/KlasifikasiBarChart";
import { KpiCard } from "@/components/jra/KpiCard";
import { RetensiPipeline } from "@/components/jra/RetensiPipeline";
import { TrendChart } from "@/components/jra/TrendChart";
import { Badge } from "@/components/ui/Badge";
import { formatPublishDate } from "@/lib/format";
import {
  ARSIP_PERLU_TINDAKAN,
  PER_KLASIFIKASI,
  SUMMARY,
  TREND_12_BULAN,
} from "@/lib/mock/jraData";

function ArsipIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function InaktifIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
}

function MusnahIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

function PermanenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export function JraDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Dashboard Retensi Arsip (JRA)
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Monitoring Jadwal Retensi Arsip mengacu UU 43/2009, PP 28/2012, dan
            Perka ANRI. Per {formatPublishDate(SUMMARY.per_tanggal)} ·{" "}
            <span className="font-semibold text-slate-700">
              {SUMMARY.total_dokumen.toLocaleString("id-ID")}
            </span>{" "}
            arsip terkelola.
          </p>
        </div>
        <Badge tone="warning">
          <span>Prototype · data simulasi</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          tone="brand"
          icon={<ArsipIcon />}
          label="Arsip Aktif"
          value={SUMMARY.aktif}
          caption={`${((SUMMARY.aktif / SUMMARY.total_dokumen) * 100).toFixed(1)}% dari total`}
        />
        <KpiCard
          tone="neutral"
          icon={<InaktifIcon />}
          label="Arsip Inaktif"
          value={SUMMARY.inaktif}
          caption="Tersimpan di records center"
        />
        <KpiCard
          tone="danger"
          icon={<MusnahIcon />}
          label="Dimusnahkan Th. Ini"
          value={SUMMARY.dimusnahkan_tahun_ini}
          caption="Sudah dieksekusi & dilaporkan"
        />
        <KpiCard
          tone="success"
          icon={<PermanenIcon />}
          label="Permanen / Statis"
          value={SUMMARY.permanen}
          caption="Arsip vital, retensi tak terbatas"
        />
      </div>

      <AlertBanner>
        <AlertBannerItem
          tone="danger"
          count={SUMMARY.overdue}
          label="arsip overdue"
          description="Sudah melewati masa retensi tetapi belum dipindah / dimusnahkan."
        />
        <AlertBannerItem
          tone="warning"
          count={SUMMARY.jatuh_tempo_30_hari}
          label="arsip mendekati jatuh tempo (30 hari)"
          description="Perlu disusun usulan pemindahan atau pemusnahan."
        />
        <AlertBannerItem
          tone="info"
          count={SUMMARY.menunggu_persetujuan}
          label="usulan musnah menunggu persetujuan Kepala ANRI"
          description="Sesuai PP 28/2012 Pasal 65, pemusnahan arsip wajib memperoleh persetujuan."
        />
      </AlertBanner>

      <RetensiPipeline
        stages={[
          { label: "Aktif", value: SUMMARY.aktif, tone: "brand" },
          { label: "Inaktif", value: SUMMARY.inaktif, tone: "neutral" },
          {
            label: "Diusulkan Musnah",
            value: SUMMARY.diusulkan_musnah,
            tone: "warning",
          },
          {
            label: "Menunggu Persetujuan",
            value: SUMMARY.menunggu_persetujuan,
            tone: "warning",
          },
          {
            label: "Dimusnahkan (YTD)",
            value: SUMMARY.dimusnahkan_tahun_ini,
            tone: "danger",
          },
          { label: "Permanen", value: SUMMARY.permanen, tone: "success" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TrendChart data={TREND_12_BULAN} />
        </div>
        <div className="lg:col-span-2">
          <KlasifikasiBarChart data={PER_KLASIFIKASI} />
        </div>
      </div>

      <ArsipTable rows={ARSIP_PERLU_TINDAKAN} />
    </div>
  );
}
