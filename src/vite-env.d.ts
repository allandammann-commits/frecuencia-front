/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_3B_API_KEY?: string;
  readonly VITE_3B_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
