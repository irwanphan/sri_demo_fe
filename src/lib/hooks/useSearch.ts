import { useEffect, useRef, useState } from "react";

import { ApiError, searchDocuments } from "@/lib/api";
import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/lib/config";
import type { SearchResponse } from "@/lib/types";

import { useDebounce } from "./useDebounce";

export interface UseSearchState {
  query: string;
  debouncedQuery: string;
  setQuery: (next: string) => void;
  data: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
  latencyMs: number | null;
  refetch: () => void;
}

export function useSearch(): UseSearchState {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);

  const [data, setData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [requestNonce, setRequestNonce] = useState(0);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const text = debouncedQuery.trim();

    abortRef.current?.abort();

    if (!text) {
      setData(null);
      setError(null);
      setIsLoading(false);
      setLatencyMs(null);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    const started = performance.now();

    searchDocuments(text, { size: SEARCH_PAGE_SIZE, signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return;
        setData(response);
        setLatencyMs(performance.now() - started);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Gagal melakukan pencarian";
        setError(message);
        setData(null);
        setLatencyMs(null);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, requestNonce]);

  return {
    query,
    debouncedQuery,
    setQuery,
    data,
    isLoading,
    error,
    latencyMs,
    refetch: () => setRequestNonce((n) => n + 1),
  };
}
