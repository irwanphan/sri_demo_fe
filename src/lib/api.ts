import { API_BASE_URL, API_KEY } from "./config";
import type {
  DocumentRecord,
  HealthResponse,
  SearchResponse,
  UploadResponse,
} from "./types";

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: BodyInit;
  signal?: AbortSignal;
}

// Bangun header default. Disengaja tidak men-set Content-Type otomatis supaya
// browser bisa menentukan sendiri (penting untuk FormData yang butuh boundary).
function buildHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  if (API_KEY && !headers.has("X-API-Key")) {
    headers.set("X-API-Key", API_KEY);
  }
  return headers;
}

// Backend Public API v1 membungkus response dalam envelope seragam:
//   sukses → { status: "success", data: <T>, meta: {...} }
//   gagal  → { status: "error",   error: { code, message, details }, meta: {...} }
// Helper di bawah ini menangani unwrap/extract di satu tempat supaya call-site
// (searchDocuments, uploadDocument, dst.) tetap bersih dan tidak mengulangi
// logika parsing envelope.

interface SuccessEnvelope<T> {
  status: "success";
  data: T;
  meta: unknown;
}

interface ErrorEnvelope {
  status: "error";
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown> | null;
  };
  meta: unknown;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object";
}

function isSuccessEnvelope<T>(payload: unknown): payload is SuccessEnvelope<T> {
  return isObject(payload) && payload.status === "success" && "data" in payload;
}

function isErrorEnvelope(payload: unknown): payload is ErrorEnvelope {
  return isObject(payload) && payload.status === "error" && isObject(payload.error);
}

function unwrapEnvelope<T>(payload: unknown): T {
  return isSuccessEnvelope<T>(payload) ? payload.data : (payload as T);
}

function extractErrorMessage(payload: unknown, httpStatus: number): string {
  if (isErrorEnvelope(payload)) {
    return payload.error.message || payload.error.code;
  }
  // Fallback ke format FastAPI default ({ detail: "..." } atau { detail: { message } }).
  if (isObject(payload) && "detail" in payload) {
    const detail = payload.detail;
    if (typeof detail === "string") return detail;
    if (isObject(detail) && typeof detail.message === "string") return detail.message;
  }
  return `HTTP ${httpStatus}`;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const { headers, ...rest } = options;
  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: buildHeaders(headers),
    });
  } catch (err) {
    throw new ApiError(
      err instanceof Error ? err.message : "Network error",
      0,
      null,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload: unknown = isJson
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(payload, response.status),
      response.status,
      payload,
    );
  }

  return unwrapEnvelope<T>(payload);
}

export function searchDocuments(
  query: string,
  options: { size?: number; from?: number; signal?: AbortSignal } = {},
): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query });
  if (options.size != null) params.set("size", String(options.size));
  if (options.from != null) params.set("from", String(options.from));
  return request<SearchResponse>(`/documents/search?${params.toString()}`, {
    signal: options.signal,
  });
}

export function getDocument(documentId: string): Promise<DocumentRecord> {
  return request<DocumentRecord>(
    `/documents/${encodeURIComponent(documentId)}`,
  );
}

export function uploadDocument(
  file: File,
  signal?: AbortSignal,
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  return request<UploadResponse>(`/upload`, {
    method: "POST",
    body: formData,
    signal,
  });
}

export function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>(`/health`);
}

export function getElasticsearchHealth(): Promise<HealthResponse> {
  return request<HealthResponse>(`/healthElasticsearch`);
}
