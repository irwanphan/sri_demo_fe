export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

// Backend memproteksi sebagian besar endpoint (`/upload`, `/documents/*`,
// `/generate/*`, `/watermark-document*`) dengan header `X-API-Key` saat
// `API_AUTH_ENABLED=true`. Kalau env var ini kosong, FE tidak akan mengirim
// header tersebut — berguna untuk backend dengan `API_AUTH_ENABLED=false`.
export const API_KEY: string = import.meta.env.VITE_API_KEY ?? "";

export const SEARCH_DEBOUNCE_MS = 250;
export const SEARCH_PAGE_SIZE = 20;

export const LATENCY_THRESHOLDS = {
  fast: 100,
  ok: 500,
} as const;
