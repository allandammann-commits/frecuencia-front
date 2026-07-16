/** Product ID padrão do checkout 3B (Premium). */
export const DEFAULT_CHECKOUT_PRODUCT_ID = "f5e3bcd8-d07a-4068-a5c8-0a4a373d5a37";

export const CHECKOUT_BASE_URL =
  (import.meta.env.VITE_3B_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://idyeyanieitpeysobbgf.supabase.co/functions/v1";

export const CHECKOUT_API_KEY = (import.meta.env.VITE_3B_API_KEY as string | undefined) || "";

export const isCheckoutConfigured = Boolean(CHECKOUT_API_KEY);
