# SRI Demo · Frontend

PoC frontend untuk pencarian naskah dinas berkecepatan tinggi.

## Stack

- **Vite** — bundler & dev server (HMR < 100 ms)
- **React 19** + **TypeScript** (strict)
- **React Router 7** (SPA mode, library API)
- **Tailwind CSS 4** (zero-config via `@tailwindcss/vite`)

Memori dev server: ~150–250 MB RAM (vs Next.js 600 MB–1 GB).

## Arsitektur

```
Browser (FE SPA)  →  FastAPI (BE)  →  Elasticsearch Cloud
   :5173               :8000           asia-southeast2.gcp
```

FE murni SPA: tidak ada SSR, tidak ada server FE. Setelah `npm run build`,
output total < 200 KB (gzipped).

## Quick start

Prasyarat: BE jalan di `http://127.0.0.1:8000` (lihat repo `sri_demo_be`).

```bash
npm install
npm run dev
# buka http://localhost:5173
```

Build production:

```bash
npm run build
npm run preview
```

## Variabel environment

`.env` di root:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Struktur

```
src/
  main.tsx              # bootstrap React + RouterProvider
  router.tsx            # definisi route (/, /upload)
  App.tsx               # shell layout + <Outlet />
  index.css             # Tailwind + theme + highlight ES
  pages/
    SearchPage.tsx      # halaman pencarian
    UploadPage.tsx      # halaman upload
  components/
    layout/             # AppHeader (status API/ES), TabNav
    ui/                 # Spinner, Badge, Card (reusable)
    search/             # SearchBar, ResultList, ResultCard, …
    upload/             # Dropzone, UploadItemRow
  lib/
    config.ts           # konstanta (debounce, threshold)
    types.ts            # TypeScript types untuk respon BE
    api.ts              # fetch client (ApiError, searchDocuments, …)
    format.ts           # helper format (tanggal, byte, latensi)
    hooks/
      useDebounce.ts
      useSearch.ts      # state pencarian + AbortController
      useUpload.ts      # antrian upload paralel
```

## Komponen — prinsip SOLID

- **Single Responsibility**: tiap komponen punya 1 tugas (SearchBar hanya
  input, ResultCard hanya render 1 hasil, dst.)
- **Open/Closed**: `Badge` & `Card` di-extend lewat props (tone, className),
  bukan di-fork.
- **Dependency Inversion**: pages tidak tahu HTTP — mereka pakai hooks
  (`useSearch`, `useUpload`) yang membungkus `lib/api.ts`.

## Fitur

### Pencarian (`/`)
- Debounce 250 ms
- Abort request lama saat kueri berubah (`AbortController`)
- Highlight Elasticsearch `<em>` di-render via `dangerouslySetInnerHTML`
- Latency badge: cepat (<200 ms) · sedang (<500 ms) · lambat (≥500 ms)
- Mode otomatis: kueri dalam `"…"` → phrase, selain itu → flexible

### Upload (`/upload`)
- Drag & drop atau klik
- Multi-file paralel
- Status per file: queued → uploading → success/error
- Counter ringkas di header daftar

### Header
- Polling health `/health` dan `/healthElasticsearch` setiap 30 detik
- Indikator dot hijau/merah
# sri_demo_fe
# sri_demo_fe
