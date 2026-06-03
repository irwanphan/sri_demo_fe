export interface RuntimeConfig {
  __docker?: boolean;
  apiBaseUrl?: string;
  apiKey?: string;
}

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig;
  }
}

export {};
