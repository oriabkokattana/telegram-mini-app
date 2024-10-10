/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_ICON_URL: string;
  readonly VITE_AMPLITUDE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
