/// <reference types="vite/client" />

// Vite environment variables used in this project.
// Extend this as you add more `VITE_` variables.
interface ImportMetaEnv {
  readonly VITE_MSAL_CLIENT_ID?: string;
  readonly VITE_MSAL_AUTHORITY?: string;
  readonly VITE_WP_GRAPHQL_ENDPOINT?: string;
  readonly PLAYWRIGHT_BASE_URL?: string;
  // allow other envs without errors
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
