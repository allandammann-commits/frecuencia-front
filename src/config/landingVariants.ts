export type LandingVariantId = "A" | "B" | "C";

export type LandingVariantConfig = {
  id: LandingVariantId;
  label: string;
  weight: number;
};

/**
 * Usado pelo painel admin para comparar conversão por versão.
 */
export const LANDING_VARIANTS: LandingVariantConfig[] = [
  { id: "A", label: "Controle", weight: 33 },
  { id: "B", label: "Clean", weight: 33 },
  { id: "C", label: "Social", weight: 34 },
];
