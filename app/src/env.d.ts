/// <reference types="vite/client" />

// Vite environment variables used in this project.
// Extend this as you add more `VITE_` variables.
interface ImportMetaEnv {
  readonly VITE_MSAL_CLIENT_ID?: string;
  readonly VITE_MSAL_AUTHORITY?: string;
  readonly VITE_WP_GRAPHQL_ENDPOINT?: string;
  readonly PLAYWRIGHT_BASE_URL?: string;
  // allow other envs (strings or booleans from other libs) without errors
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
