const PII_QUERY_KEYS =
  /^(email|e_mail|mail|phone|tel|telefone|nome|name|cpf|cnpj|document|doc|user|username|password|senha|token|jwt)$/i;

const TRACKING_QUERY_KEYS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
  "msclkid",
  "wbraid",
  "gbraid",
  "twclid",
  "li_fat_id",
]);

const MAX_METADATA_JSON = 4096;
const MAX_ANSWER_LABEL = 32;
const MAX_SESSION_ID = 64;

export const FUNNEL_EVENT_TYPES = [
  "funnel_enter",
  "quiz_step_view",
  "quiz_answer",
  "quiz_analyzing",
  "quiz_complete",
  "result_view",
  "vsl_view",
  "offer_view",
  "checkout_click",
] as const;

export type AllowedFunnelEventType = (typeof FUNNEL_EVENT_TYPES)[number];

export const isAllowedEventType = (value: string): value is AllowedFunnelEventType =>
  (FUNNEL_EVENT_TYPES as readonly string[]).includes(value);

export const sanitizeLandingUrl = (url: string): string => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const clean = new URL(`${parsed.origin}${parsed.pathname}`);
    parsed.searchParams.forEach((value, key) => {
      if (PII_QUERY_KEYS.test(key)) return;
      if (TRACKING_QUERY_KEYS.has(key)) clean.searchParams.set(key, value.slice(0, 256));
    });
    return clean.toString().slice(0, 512);
  } catch {
    return "";
  }
};

export const sanitizeReferrer = (referrer: string): string => {
  if (!referrer) return "";
  try {
    const { hostname } = new URL(referrer);
    return hostname.slice(0, 128);
  } catch {
    return "";
  }
};

export const fingerprintValue = (value: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

export const anonymizePlatformIds = (
  ids: Record<string, string>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(ids).map(([key, value]) => [
      `${key}_fp`,
      fingerprintValue(value),
    ]),
  );

export const maskClickIdForDisplay = (key: string, fingerprint: string): string =>
  `${key}: anon-${fingerprint}`;

export const maskSessionId = (sessionId: string): string => {
  if (sessionId.length <= 12) return "••••••••";
  return `${sessionId.slice(0, 8)}-••••-••••-••••-${sessionId.slice(-4)}`;
};

export const sanitizeTrackingMetadata = (
  metadata: Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (!metadata) return {};

  const platform_ids = (metadata.platform_ids as Record<string, string> | undefined) ?? {};
  const landing_url = String(metadata.landing_url ?? metadata.landing_path ?? "");

  const sanitized: Record<string, unknown> = {
    channel: metadata.channel ?? "directo",
    utm_source: String(metadata.utm_source ?? "").slice(0, 128),
    utm_medium: String(metadata.utm_medium ?? "").slice(0, 64),
    utm_campaign: String(metadata.utm_campaign ?? "").slice(0, 128),
    utm_content: String(metadata.utm_content ?? "").slice(0, 128),
    utm_term: String(metadata.utm_term ?? "").slice(0, 128),
    referrer_host: sanitizeReferrer(String(metadata.referrer ?? "")),
    landing_url: sanitizeLandingUrl(landing_url),
    ...anonymizePlatformIds(platform_ids),
  };

  if (metadata.entry_mode) sanitized.entry_mode = String(metadata.entry_mode).slice(0, 32);
  if (metadata.landing_variant) sanitized.landing_variant = String(metadata.landing_variant).slice(0, 8);

  const json = JSON.stringify(sanitized);
  if (json.length > MAX_METADATA_JSON) {
    return { channel: sanitized.channel };
  }

  return sanitized;
};

export const sanitizeAnswerLabel = (label: string | undefined): string | null => {
  if (!label) return null;
  const trimmed = label.trim().slice(0, MAX_ANSWER_LABEL);
  return trimmed || null;
};

export const sanitizeSessionId = (sessionId: string): string =>
  sessionId.slice(0, MAX_SESSION_ID);

export const isTestSession = (sessionId: string, metadata: Record<string, unknown> | null) =>
  sessionId.startsWith("ping-") || metadata?.source === "admin_ping";
