import { getLandingVariantId } from "@/lib/landingAbTest";

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

const withVariant = (params?: Record<string, unknown>) => ({
  ...params,
  landing_variant: getLandingVariantId(),
});

/** Eventos customizados do Meta Pixel com variante A/B/C. */
export const trackMetaPixel = (eventName: string, params?: Record<string, unknown>) => {
  const w = window as FbqWindow;
  if (!w.fbq) return;
  w.fbq("trackCustom", eventName, withVariant(params));
};

export const trackMetaPageViewWithVariant = () => {
  const w = window as FbqWindow;
  if (!w.fbq) return;
  w.fbq("track", "PageView", withVariant());
};

export const notifyLandingVariantAssigned = () => {
  trackMetaPixel("LandingVariantAssigned", {
    variant_label: getLandingVariantId(),
  });
};
