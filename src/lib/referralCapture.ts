import { maskClickIdForDisplay } from "@/lib/dataPrivacy";

export type ReferralPayload = {
  channel: "directo" | "anuncio" | "organico" | "referral";
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  platform_ids: Record<string, string>;
  referrer: string;
  landing_url: string;
};

const REFERRAL_STORAGE_KEY = "funnel_referral_payload";

const PAID_MEDIUM = /^(cpc|cpm|cpa|paid|ads|ppc|social_paid|display|social)$/i;
const PAID_SOURCE = /facebook|fb|meta|instagram|ig|google|tiktok|youtube|ads|anuncio|ad/i;

const PLATFORM_KEYS = [
  "fbclid",
  "gclid",
  "ttclid",
  "msclkid",
  "wbraid",
  "gbraid",
  "twclid",
  "li_fat_id",
] as const;

const truncateId = (value: string, max = 28) =>
  value.length <= max ? value : `${value.slice(0, max)}…`;

export const parseReferralFromSearch = (search: string, landingUrl: string): ReferralPayload => {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const platform_ids: Record<string, string> = {};

  for (const key of PLATFORM_KEYS) {
    const value = params.get(key);
    if (value) platform_ids[key] = value;
  }

  const utm_source = params.get("utm_source") ?? "";
  const utm_medium = params.get("utm_medium") ?? "";
  const utm_campaign = params.get("utm_campaign") ?? "";
  const utm_content = params.get("utm_content") ?? "";
  const utm_term = params.get("utm_term") ?? "";
  const referrer = typeof document !== "undefined" ? document.referrer ?? "" : "";

  const hasPaidId = Object.keys(platform_ids).length > 0;
  const hasUtm = Boolean(utm_source || utm_medium || utm_campaign);
  const isPaidMedium = PAID_MEDIUM.test(utm_medium);
  const isPaidSource = PAID_SOURCE.test(utm_source);
  const sameHostReferrer =
    referrer && typeof window !== "undefined" && !referrer.includes(window.location.hostname);

  let channel: ReferralPayload["channel"] = "directo";
  if (hasPaidId || isPaidMedium || isPaidSource) {
    channel = "anuncio";
  } else if (utm_medium === "organic" || utm_source === "organic") {
    channel = "organico";
  } else if (sameHostReferrer) {
    channel = "referral";
  } else if (hasUtm) {
    channel = "anuncio";
  }

  return {
    channel,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    platform_ids,
    referrer,
    landing_url: landingUrl,
  };
};

/** Grava na sessão na primeira URL (preserva fbclid/gclid antes de navegação SPA). */
export const ensureReferralCaptured = (): ReferralPayload => {
  try {
    const stored = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ReferralPayload;
  } catch {
    /* ignore */
  }

  const payload = parseReferralFromSearch(
    window.location.search,
    `${window.location.origin}${window.location.pathname}${window.location.search}`,
  );

  try {
    sessionStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }

  return payload;
};

export const getStoredReferral = (): ReferralPayload => ensureReferralCaptured();

export type ReferralSummary = {
  platform: string;
  clickId: string;
  displayLabel: string;
  channel: string;
  source: string;
  medium: string;
  campaign: string;
};

const resolvePlatform = (
  metadata: Record<string, unknown>,
  utm_source: string,
  channel: string,
): { platform: string; clickId: string } => {
  const fpMap: [string, string, string][] = [
    ["fbclid_fp", "Meta (Facebook/Instagram)", "fbclid"],
    ["gclid_fp", "Google Ads", "gclid"],
    ["gbraid_fp", "Google Ads", "gbraid"],
    ["wbraid_fp", "Google Ads", "wbraid"],
    ["ttclid_fp", "TikTok Ads", "ttclid"],
    ["msclkid_fp", "Microsoft Ads", "msclkid"],
    ["twclid_fp", "Twitter/X Ads", "twclid"],
    ["li_fat_id_fp", "LinkedIn Ads", "li_fat_id"],
  ];

  for (const [fpKey, platform, label] of fpMap) {
    const fp = metadata[fpKey];
    if (typeof fp === "string" && fp) {
      return { platform, clickId: maskClickIdForDisplay(label, fp) };
    }
  }

  const ids = (metadata.platform_ids as Record<string, string> | undefined) ?? {};
  if (ids.fbclid) return { platform: "Meta (Facebook/Instagram)", clickId: maskClickIdForDisplay("fbclid", ids.fbclid) };
  if (ids.gclid) return { platform: "Google Ads", clickId: maskClickIdForDisplay("gclid", ids.gclid) };
  if (ids.gbraid || ids.wbraid) {
    return {
      platform: "Google Ads",
      clickId: maskClickIdForDisplay("gbraid", ids.gbraid ?? ids.wbraid ?? ""),
    };
  }
  if (ids.ttclid) return { platform: "TikTok Ads", clickId: maskClickIdForDisplay("ttclid", ids.ttclid) };
  if (ids.msclkid) return { platform: "Microsoft Ads", clickId: maskClickIdForDisplay("msclkid", ids.msclkid) };
  if (ids.twclid) return { platform: "Twitter/X Ads", clickId: maskClickIdForDisplay("twclid", ids.twclid) };
  if (ids.li_fat_id) return { platform: "LinkedIn Ads", clickId: maskClickIdForDisplay("li_fat_id", ids.li_fat_id) };

  if (/facebook|fb|meta|instagram|ig/i.test(utm_source)) {
    return { platform: "Meta (utm)", clickId: utm_source || "—" };
  }
  if (/google|gads|adwords/i.test(utm_source)) {
    return { platform: "Google (utm)", clickId: utm_source || "—" };
  }
  if (/tiktok|tt/i.test(utm_source)) {
    return { platform: "TikTok (utm)", clickId: utm_source || "—" };
  }

  if (channel === "anuncio" && utm_source) {
    return { platform: "Campanha paga", clickId: utm_source };
  }
  if (channel === "organico") return { platform: "Orgânico", clickId: "—" };
  if (channel === "referral") return { platform: "Referência externa", clickId: "—" };

  return { platform: "Acesso direto", clickId: "—" };
};

const mergePayloadFromMetadata = (metadata: Record<string, unknown>): ReferralPayload => {
  let platform_ids = (metadata.platform_ids as Record<string, string> | undefined) ?? {};
  const landing =
    String(metadata.landing_url ?? metadata.landing_path ?? "");

  if (Object.keys(platform_ids).length === 0 && landing.includes("?")) {
    const query = landing.includes("?") ? landing.slice(landing.indexOf("?")) : "";
    const reparsed = parseReferralFromSearch(query, landing);
    platform_ids = reparsed.platform_ids;
  }

  return {
    channel: (metadata.channel as ReferralPayload["channel"]) ?? "directo",
    utm_source: String(metadata.utm_source ?? ""),
    utm_medium: String(metadata.utm_medium ?? ""),
    utm_campaign: String(metadata.utm_campaign ?? ""),
    utm_content: String(metadata.utm_content ?? ""),
    utm_term: String(metadata.utm_term ?? ""),
    platform_ids,
    referrer: String(metadata.referrer ?? ""),
    landing_url: landing,
  };
};

export const parseReferralFromMetadata = (
  metadata: Record<string, unknown> | null | undefined,
): ReferralSummary => {
  if (!metadata) {
    return {
      platform: "Sem dados",
      clickId: "—",
      displayLabel: "Sem dados",
      channel: "—",
      source: "—",
      medium: "—",
      campaign: "—",
    };
  }

  const payload = mergePayloadFromMetadata(metadata);
  const { platform, clickId } = resolvePlatform(
    metadata,
    payload.utm_source,
    payload.channel,
  );

  const displayLabel =
    clickId !== "—" ? `${platform} · ${truncateId(clickId)}` : platform;

  return {
    platform,
    clickId,
    displayLabel,
    channel: payload.channel,
    source: payload.utm_source || "—",
    medium: payload.utm_medium || "—",
    campaign: payload.utm_campaign || "—",
  };
};
