export type LandingVariantId = "A" | "B" | "C";

const isVariant = (v: string | null): v is LandingVariantId =>
  v === "A" || v === "B" || v === "C";

/**
 * Nesta base antiga não há layout A/B/C ativo.
 * Ainda assim preservamos o campo para métricas no admin.
 */
export const getLandingVariantId = (): LandingVariantId => {
  if (typeof window === "undefined") return "A";
  const forced = new URLSearchParams(window.location.search).get("ab")?.toUpperCase() ?? null;
  return isVariant(forced) ? forced : "A";
};
