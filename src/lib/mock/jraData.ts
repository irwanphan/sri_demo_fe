export type RetensiStatus =
  | "aktif"
  | "inaktif"
  | "diusulkan_musnah"
  | "menunggu_persetujuan"
  | "dimusnahkan"
  | "permanen";

export type NasibAkhir = "musnah" | "permanen" | "dinilai_kembali";

export interface KlasifikasiInfo {
  code: string;
  name: string;
}

export interface JraSummary {
  per_tanggal: string;
  total_dokumen: number;
  aktif: number;
  inaktif: number;
  diusulkan_musnah: number;
  menunggu_persetujuan: number;
  dimusnahkan_tahun_ini: number;
  permanen: number;
  jatuh_tempo_30_hari: number;
  overdue: number;
}

export interface TrendPoint {
  bulan: string;
  ditambahkan: number;
  ke_inaktif: number;
  dimusnahkan: number;
}

export interface KlasifikasiCount {
  code: string;
  name: string;
  total: number;
  aktif: number;
  inaktif: number;
  perlu_tindakan: number;
}

export interface ArsipRetensiRow {
  document_id: string;
  judul: string;
  klasifikasi_code: string;
  unit_pengolah: string;
  tanggal_dibuat: string;
  status: RetensiStatus;
  jatuh_tempo: string;
  hari_tersisa: number;
  nasib_akhir: NasibAkhir;
}

/**
 * Klasifikasi standar berdasarkan Perka ANRI tentang Klasifikasi Arsip
 * (kode mengikuti pola umum K.AB.CD yang dipakai instansi pemerintah).
 */
export const KLASIFIKASI: KlasifikasiInfo[] = [
  { code: "KU.00", name: "Keuangan" },
  { code: "KP.00", name: "Kepegawaian" },
  { code: "HK.00", name: "Hukum" },
  { code: "OT.00", name: "Organisasi & Tatalaksana" },
  { code: "PR.00", name: "Perencanaan" },
  { code: "HM.00", name: "Hubungan Masyarakat" },
  { code: "TI.00", name: "Teknologi Informasi" },
  { code: "UM.00", name: "Umum / Ketatausahaan" },
  { code: "PL.00", name: "Pendidikan & Pelatihan" },
  { code: "PW.00", name: "Pengawasan" },
];

export const UNIT_PENGOLAH = [
  "Biro Umum",
  "Biro Kepegawaian",
  "Biro Keuangan",
  "Biro Perencanaan",
  "Direktorat TI Kearsipan",
  "Pusdiklat Kearsipan",
  "Inspektorat",
  "Sekretariat Utama",
];

export const SUMMARY: JraSummary = {
  per_tanggal: "2026-05-28",
  total_dokumen: 12847,
  aktif: 8234,
  inaktif: 3180,
  diusulkan_musnah: 28,
  menunggu_persetujuan: 8,
  dimusnahkan_tahun_ini: 855,
  permanen: 542,
  jatuh_tempo_30_hari: 47,
  overdue: 12,
};

export const TREND_12_BULAN: TrendPoint[] = [
  { bulan: "Jun '25", ditambahkan: 412, ke_inaktif: 198, dimusnahkan: 56 },
  { bulan: "Jul '25", ditambahkan: 387, ke_inaktif: 215, dimusnahkan: 71 },
  { bulan: "Agu '25", ditambahkan: 445, ke_inaktif: 188, dimusnahkan: 64 },
  { bulan: "Sep '25", ditambahkan: 521, ke_inaktif: 234, dimusnahkan: 89 },
  { bulan: "Okt '25", ditambahkan: 478, ke_inaktif: 256, dimusnahkan: 92 },
  { bulan: "Nov '25", ditambahkan: 502, ke_inaktif: 241, dimusnahkan: 78 },
  { bulan: "Des '25", ditambahkan: 389, ke_inaktif: 198, dimusnahkan: 105 },
  { bulan: "Jan '26", ditambahkan: 612, ke_inaktif: 312, dimusnahkan: 142 },
  { bulan: "Feb '26", ditambahkan: 548, ke_inaktif: 287, dimusnahkan: 118 },
  { bulan: "Mar '26", ditambahkan: 591, ke_inaktif: 301, dimusnahkan: 134 },
  { bulan: "Apr '26", ditambahkan: 467, ke_inaktif: 268, dimusnahkan: 121 },
  { bulan: "Mei '26", ditambahkan: 423, ke_inaktif: 245, dimusnahkan: 98 },
];

export const PER_KLASIFIKASI: KlasifikasiCount[] = [
  { code: "KU.00", name: "Keuangan", total: 2487, aktif: 1654, inaktif: 720, perlu_tindakan: 14 },
  { code: "KP.00", name: "Kepegawaian", total: 2104, aktif: 1389, inaktif: 612, perlu_tindakan: 9 },
  { code: "UM.00", name: "Umum / Ketatausahaan", total: 1923, aktif: 1198, inaktif: 587, perlu_tindakan: 11 },
  { code: "PR.00", name: "Perencanaan", total: 1456, aktif: 956, inaktif: 412, perlu_tindakan: 6 },
  { code: "HK.00", name: "Hukum", total: 1287, aktif: 834, inaktif: 359, perlu_tindakan: 5 },
  { code: "OT.00", name: "Organisasi & Tatalaksana", total: 1102, aktif: 712, inaktif: 318, perlu_tindakan: 7 },
  { code: "TI.00", name: "Teknologi Informasi", total: 845, aktif: 567, inaktif: 234, perlu_tindakan: 3 },
  { code: "PL.00", name: "Pendidikan & Pelatihan", total: 712, aktif: 478, inaktif: 198, perlu_tindakan: 2 },
  { code: "HM.00", name: "Hubungan Masyarakat", total: 568, aktif: 312, inaktif: 198, perlu_tindakan: 4 },
  { code: "PW.00", name: "Pengawasan", total: 363, aktif: 234, inaktif: 112, perlu_tindakan: 1 },
];

export const ARSIP_PERLU_TINDAKAN: ArsipRetensiRow[] = [
  {
    document_id: "ARS-2018-KU-0234",
    judul: "Laporan Realisasi Anggaran TA 2018",
    klasifikasi_code: "KU.00",
    unit_pengolah: "Biro Keuangan",
    tanggal_dibuat: "2018-12-31",
    status: "inaktif",
    jatuh_tempo: "2026-05-15",
    hari_tersisa: -13,
    nasib_akhir: "musnah",
  },
  {
    document_id: "ARS-2019-KP-0512",
    judul: "Berkas Mutasi Pegawai Periode II 2019",
    klasifikasi_code: "KP.00",
    unit_pengolah: "Biro Kepegawaian",
    tanggal_dibuat: "2019-06-30",
    status: "inaktif",
    jatuh_tempo: "2026-05-20",
    hari_tersisa: -8,
    nasib_akhir: "musnah",
  },
  {
    document_id: "ARS-2016-UM-1024",
    judul: "Surat Edaran Kepala Pusat Tahun 2016",
    klasifikasi_code: "UM.00",
    unit_pengolah: "Biro Umum",
    tanggal_dibuat: "2016-03-15",
    status: "inaktif",
    jatuh_tempo: "2026-05-25",
    hari_tersisa: -3,
    nasib_akhir: "dinilai_kembali",
  },
  {
    document_id: "ARS-2020-HK-0089",
    judul: "Perjanjian Kerjasama Hibah Aset 2020",
    klasifikasi_code: "HK.00",
    unit_pengolah: "Biro Umum",
    tanggal_dibuat: "2020-09-12",
    status: "aktif",
    jatuh_tempo: "2026-06-12",
    hari_tersisa: 15,
    nasib_akhir: "permanen",
  },
  {
    document_id: "ARS-2017-TI-0145",
    judul: "Dokumen Lelang Sistem Informasi 2017",
    klasifikasi_code: "TI.00",
    unit_pengolah: "Direktorat TI Kearsipan",
    tanggal_dibuat: "2017-08-22",
    status: "inaktif",
    jatuh_tempo: "2026-06-18",
    hari_tersisa: 21,
    nasib_akhir: "musnah",
  },
  {
    document_id: "ARS-2021-PR-0567",
    judul: "Renstra Direktorat 2021-2025",
    klasifikasi_code: "PR.00",
    unit_pengolah: "Biro Perencanaan",
    tanggal_dibuat: "2021-01-10",
    status: "aktif",
    jatuh_tempo: "2026-06-24",
    hari_tersisa: 27,
    nasib_akhir: "permanen",
  },
  {
    document_id: "ARS-2019-OT-0312",
    judul: "Pedoman Tatakelola Organisasi Revisi 2019",
    klasifikasi_code: "OT.00",
    unit_pengolah: "Sekretariat Utama",
    tanggal_dibuat: "2019-04-18",
    status: "diusulkan_musnah",
    jatuh_tempo: "2026-05-30",
    hari_tersisa: 2,
    nasib_akhir: "musnah",
  },
  {
    document_id: "ARS-2018-PL-0078",
    judul: "Materi Diklat Kearsipan Angkatan 12",
    klasifikasi_code: "PL.00",
    unit_pengolah: "Pusdiklat Kearsipan",
    tanggal_dibuat: "2018-10-05",
    status: "menunggu_persetujuan",
    jatuh_tempo: "2026-06-02",
    hari_tersisa: 5,
    nasib_akhir: "musnah",
  },
  {
    document_id: "ARS-2020-PW-0034",
    judul: "Laporan Hasil Pengawasan Internal Q4 2020",
    klasifikasi_code: "PW.00",
    unit_pengolah: "Inspektorat",
    tanggal_dibuat: "2020-12-20",
    status: "aktif",
    jatuh_tempo: "2026-06-15",
    hari_tersisa: 18,
    nasib_akhir: "dinilai_kembali",
  },
  {
    document_id: "ARS-2017-HM-0211",
    judul: "Kliping Berita Kelembagaan 2017",
    klasifikasi_code: "HM.00",
    unit_pengolah: "Biro Umum",
    tanggal_dibuat: "2017-12-31",
    status: "inaktif",
    jatuh_tempo: "2026-05-29",
    hari_tersisa: 1,
    nasib_akhir: "musnah",
  },
];
