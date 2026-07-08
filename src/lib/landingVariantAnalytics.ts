import { LANDING_VARIANTS, type LandingVariantId } from "@/config/landingVariants";
import type { FunnelEventRow } from "@/lib/funnelTracking";

export type LandingVariantStat = {
  id: LandingVariantId;
  label: string;
  sessions: number;
  vslViews: number;
  offerViews: number;
  checkoutClicks: number;
  premiumClicks: number;
  basicClicks: number;
  vslToOfferRate: number;
  offerToCheckoutRate: number;
  vslToCheckoutRate: number;
  trafficShare: number;
};

export type LandingVariantMetrics = {
  variants: LandingVariantStat[];
  unknownSessions: number;
  winnerId: LandingVariantId | null;
  hasEnoughData: boolean;
};

const VARIANT_IDS = new Set<LandingVariantId>(["A", "B", "C"]);

export const extractLandingVariant = (events: FunnelEventRow[]): LandingVariantId | null => {
  for (const event of events) {
    const raw = (event.metadata as Record<string, unknown> | null)?.landing_variant;
    if (typeof raw === "string" && VARIANT_IDS.has(raw as LandingVariantId)) {
      return raw as LandingVariantId;
    }
  }
  return null;
};

const pct = (num: number, den: number) => (den > 0 ? Math.round((num / den) * 1000) / 10 : 0);

const hasEvent = (events: FunnelEventRow[], type: string) =>
  events.some((e) => e.event_type === type);

export const buildLandingVariantMetrics = (events: FunnelEventRow[]): LandingVariantMetrics => {
  const bySession = new Map<string, FunnelEventRow[]>();

  for (const event of events) {
    const list = bySession.get(event.session_id) ?? [];
    list.push(event);
    bySession.set(event.session_id, list);
  }

  const buckets = new Map<LandingVariantId, FunnelEventRow[][]>(
    LANDING_VARIANTS.map((v) => [v.id, []]),
  );
  let unknownSessions = 0;

  for (const sessionEvents of bySession.values()) {
    const variant = extractLandingVariant(sessionEvents);
    if (!variant) {
      unknownSessions += 1;
      continue;
    }
    buckets.get(variant)?.push(sessionEvents);
  }

  const totalKnown = [...buckets.values()].reduce((sum, list) => sum + list.length, 0);

  const variants: LandingVariantStat[] = LANDING_VARIANTS.map((config) => {
    const sessions = buckets.get(config.id) ?? [];

    let vslViews = 0;
    let offerViews = 0;
    let checkoutClicks = 0;
    let premiumClicks = 0;
    let basicClicks = 0;

    for (const sessionEvents of sessions) {
      if (hasEvent(sessionEvents, "vsl_view")) vslViews += 1;
      if (hasEvent(sessionEvents, "offer_view")) offerViews += 1;
      if (hasEvent(sessionEvents, "checkout_click")) {
        checkoutClicks += 1;
        const plan = sessionEvents.find((e) => e.event_type === "checkout_click")?.metadata as
          | { plan?: string }
          | null;
        if (plan?.plan === "premium") premiumClicks += 1;
        else if (plan?.plan === "basic") basicClicks += 1;
      }
    }

    const sessionCount = sessions.length;

    return {
      id: config.id,
      label: config.label,
      sessions: sessionCount,
      vslViews,
      offerViews,
      checkoutClicks,
      premiumClicks,
      basicClicks,
      vslToOfferRate: pct(offerViews, vslViews),
      offerToCheckoutRate: pct(checkoutClicks, offerViews),
      vslToCheckoutRate: pct(checkoutClicks, vslViews),
      trafficShare: pct(sessionCount, totalKnown || 1),
    };
  });

  const MIN_SESSIONS = 3;
  const eligible = variants.filter((v) => v.sessions >= MIN_SESSIONS && v.vslViews > 0);
  const winner =
    eligible.length > 0
      ? [...eligible].sort((a, b) => {
          if (b.vslToCheckoutRate !== a.vslToCheckoutRate) {
            return b.vslToCheckoutRate - a.vslToCheckoutRate;
          }
          return b.checkoutClicks - a.checkoutClicks;
        })[0]
      : null;

  return {
    variants,
    unknownSessions,
    winnerId: winner?.id ?? null,
    hasEnoughData: eligible.length > 0,
  };
};
