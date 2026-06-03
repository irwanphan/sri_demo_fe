import type { RuntimeConfig } from "./runtime-config";
import "./runtime-config";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function runtimeConfig(): RuntimeConfig | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__RUNTIME_CONFIG__;
}

function fromDockerRuntime(): RuntimeConfig | null {
  const rc = runtimeConfig();
  return rc?.__docker === true ? rc : null;
}

export const API_BASE_URL = (() => {
  const docker = fromDockerRuntime();
  if (docker) {
    return docker.apiBaseUrl?.trim() || DEFAULT_API_BASE_URL;
  }
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
})();

export const API_KEY: string = (() => {
  const docker = fromDockerRuntime();
  if (docker) {
    return docker.apiKey ?? "";
  }
  return import.meta.env.VITE_API_KEY ?? "";
})();

export const SEARCH_DEBOUNCE_MS = 250;
export const SEARCH_PAGE_SIZE = 20;

export const LATENCY_THRESHOLDS = {
  fast: 100,
  ok: 500,
} as const;
