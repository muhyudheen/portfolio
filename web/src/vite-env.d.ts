/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the portfolio chat API (e.g. https://api.example.com). */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
