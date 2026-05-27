export type SearchMode = "phrase" | "flexible";

export interface SearchResultDocument {
  document_id: string;
  filename: string | null;
  publish_date: string | null;
  page_number: number | null;
  score: number | null;
  content_snippet: string;
}

export interface SearchResponse {
  query: string;
  search_mode: SearchMode;
  total_pages_matched: number;
  total_documents: number;
  documents: SearchResultDocument[];
}

export interface UploadResponse {
  message: string;
  document_id: string;
  filename: string | null;
  status: string;
}

export interface DocumentRecord {
  id: number;
  document_id: string;
  filename: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface HealthResponse {
  status: string;
  [key: string]: unknown;
}
