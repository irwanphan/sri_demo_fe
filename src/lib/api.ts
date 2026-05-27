import { API_BASE_URL } from "./config";
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

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  let response: Response;
  try {
    response = await fetch(url, options);
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
    let message = `HTTP ${response.status}`;
    if (payload && typeof payload === "object" && "detail" in payload) {
      const detail = (payload as { detail: unknown }).detail;
      if (typeof detail === "string") message = detail;
      else if (detail && typeof detail === "object" && "message" in detail) {
        message = String((detail as { message: unknown }).message);
      }
    }
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
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
