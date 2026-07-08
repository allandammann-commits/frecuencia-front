import {
  isAllowedEventType,
  isTestSession,
  sanitizeAnswerLabel,
  sanitizeSessionId,
  sanitizeTrackingMetadata,
} from "@/lib/dataPrivacy";
import { getLandingVariantId } from "@/lib/landingAbTest";
import { trackMetaPixel } from "@/lib/metaPixel";
import { getStoredReferral } from "@/lib/referralCapture";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const SESSION_KEY = "funnel_session_id";
const ENTER_SENT_KEY = "funnel_enter_sent";

export type FunnelEventType =
  | "funnel_enter"
  | "quiz_step_view"
  | "quiz_answer"
  | "quiz_analyzing"
  | "quiz_complete"
  | "result_view"
  | "vsl_view"
  | "offer_view"
  | "checkout_click";

export type FunnelEventRow = {
  id: string;
  session_id: string;
  event_type: string;
  step_id: string | null;
  step_index: number | null;
  answer_label: string | null;
  profile: number | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export const getSessionId = () => {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return sanitizeSessionId(id);
  } catch {
    return sanitizeSessionId(crypto.randomUUID());
  }
};

/** Grava funnel_enter uma vez por sessão (quiz ou VSL direta). */
export const trackFunnelEnterOnce = (metadata?: Record<string, unknown>) => {
  try {
    if (sessionStorage.getItem(ENTER_SENT_KEY)) return;
    sessionStorage.setItem(ENTER_SENT_KEY, "1");
  } catch {
    /* ignore */
  }

  trackFunnelEvent({
    eventType: "funnel_enter",
    metadata: { ...getStoredReferral(), ...metadata },
  });
};

export const getSupabaseBuildInfo = () => ({
  url: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  hasKey: Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY),
  keyLooksValid:
    typeof import.meta.env.VITE_SUPABASE_ANON_KEY === "string" &&
    import.meta.env.VITE_SUPABASE_ANON_KEY.startsWith("eyJ"),
});

type TrackPayload = {
  eventType: FunnelEventType;
  stepId?: string;
  stepIndex?: number;
  answerLabel?: string;
  profile?: number;
  metadata?: Record<string, unknown>;
};

const withLandingVariant = (metadata?: Record<string, unknown>) => {
  try {
    return { ...metadata, landing_variant: getLandingVariantId() };
  } catch {
    return metadata ?? {};
  }
};

const META_EVENT_MAP: Partial<Record<FunnelEventType, string>> = {
  funnel_enter: "FunnelEnter",
  vsl_view: "VSLView",
  offer_view: "OfferView",
  checkout_click: "CheckoutClick",
};

export const trackFunnelEvent = ({
  eventType,
  stepId,
  stepIndex,
  answerLabel,
  profile,
  metadata,
}: TrackPayload) => {
  if (!isAllowedEventType(eventType)) return;

  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn("[funnel] Supabase não configurado — evento ignorado:", eventType);
    }
    return;
  }

  const supabase = getSupabase();
  if (!supabase) return;

  const mergedMetadata = withLandingVariant(metadata);

  const safeMetadata =
    eventType === "funnel_enter"
      ? sanitizeTrackingMetadata(mergedMetadata)
      : Object.fromEntries(
          Object.entries(mergedMetadata).map(([key, value]) => [
            key.slice(0, 64),
            typeof value === "string" ? value.slice(0, 256) : value,
          ]),
        );

  void supabase
    .from("funnel_events")
    .insert({
      session_id: getSessionId(),
      event_type: eventType,
      step_id: stepId?.slice(0, 32) ?? null,
      step_index: stepIndex ?? null,
      answer_label: sanitizeAnswerLabel(answerLabel),
      profile: profile ?? null,
      metadata: safeMetadata,
    })
    .then(({ error }) => {
      if (error) {
        console.error("[funnel] Falha ao gravar evento:", eventType, error.message);
      }
    });

  const metaEvent = META_EVENT_MAP[eventType];
  if (metaEvent) {
    trackMetaPixel(metaEvent, mergedMetadata);
  }
};

/** Grava evento de teste e retorna erro, se houver (para diagnóstico no /admin). */
export const pingFunnelTracking = async (): Promise<string | null> => {
  if (!isSupabaseConfigured) return "Supabase não configurado neste build.";

  const supabase = getSupabase();
  if (!supabase) return "Cliente Supabase indisponível.";

  const { error } = await supabase.from("funnel_events").insert({
    session_id: `ping-${crypto.randomUUID()}`,
    event_type: "funnel_enter",
    metadata: { source: "admin_ping" },
  });

  return error?.message ?? null;
};

export const fetchFunnelEvents = async (adminKey: string): Promise<FunnelEventRow[]> => {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase.rpc("admin_get_funnel_events", {
    p_admin_key: adminKey,
  });

  if (error) throw error;

  return ((data ?? []) as FunnelEventRow[]).filter(
    (event) => !isTestSession(event.session_id, event.metadata),
  );
};
