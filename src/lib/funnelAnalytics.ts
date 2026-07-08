import { ADMIN_PROFILE_SUMMARIES_PT } from "@/config/adminProfileSummaries";
import { QUIZ_STEPS } from "@/data/quizSteps";
import type { QuizProfile } from "@/lib/quizScoring";
import type { FunnelEventRow } from "@/lib/funnelTracking";
import { parseReferralFromMetadata, type ReferralSummary } from "@/lib/referralCapture";
import { extractLandingVariant } from "@/lib/landingVariantAnalytics";
import type { LandingVariantId } from "@/config/landingVariants";

export type FunnelStage = {
  id: string;
  label: string;
  group: string;
  index: number;
  question?: string;
  hint?: string;
};

export const FUNNEL_STAGES: FunnelStage[] = [
  { id: "enter", label: "Entrada", group: "Início", index: 0, hint: "Abriu a página do quiz" },
  ...QUIZ_STEPS.map((step, index) => ({
    id: step.id,
    label: `P${index + 1}`,
    group: "Quiz",
    index: index + 1,
    question: step.question,
  })),
  {
    id: "analyzing",
    label: "Analisando",
    group: "Quiz",
    index: QUIZ_STEPS.length + 1,
    hint: "Tela de carregamento antes do resultado",
  },
  {
    id: "result",
    label: "Resultado",
    group: "Resultado",
    index: QUIZ_STEPS.length + 2,
    hint: "Viu o perfil personalizado do quiz",
  },
  { id: "vsl", label: "VSL", group: "VSL", index: QUIZ_STEPS.length + 3, hint: "Chegou na página do vídeo (VSL)" },
  { id: "offer", label: "Oferta", group: "Oferta", index: QUIZ_STEPS.length + 4, hint: "Viu a página de oferta" },
  {
    id: "checkout",
    label: "Checkout",
    group: "Oferta",
    index: QUIZ_STEPS.length + 5,
    hint: "Clicou para ir ao checkout",
  },
];

export const getStageTooltip = (stage: FunnelStage): string | null =>
  stage.question ?? stage.hint ?? null;

export type LeadJourney = {
  sessionId: string;
  shortId: string;
  enteredAt: string;
  lastAt: string;
  maxStageIndex: number;
  progressPercent: number;
  profile: number | null;
  landingVariant: LandingVariantId | null;
  referral: ReferralSummary;
  stages: Record<string, string>;
  reached: Record<string, boolean>;
};

export type ProfileStat = {
  profile: QuizProfile;
  tag: string;
  summary: string;
  count: number;
  percent: number;
};

export type ReferralChannelStat = {
  channel: string;
  label: string;
  count: number;
  percent: number;
};

export type FunnelMetrics = {
  visitors: number;
  leadsAcquired: number;
  interactionRate: number;
  qualifiedLeads: number;
  completedFlows: number;
  stageCounts: number[];
  stageRates: number[];
  stageDropOffs: number[];
  stageDropOffRates: number[];
  profileStats: ProfileStat[];
  referralChannels: ReferralChannelStat[];
  leads: LeadJourney[];
};

const vslStageIndex = FUNNEL_STAGES.findIndex((s) => s.id === "vsl");

const hasEvent = (events: FunnelEventRow[], type: string) =>
  events.some((e) => e.event_type === type);

const hasAnsweredStep = (events: FunnelEventRow[], stepIndex: number) =>
  events.some((e) => e.event_type === "quiz_answer" && e.step_index === stepIndex);

const hasViewedStep = (events: FunnelEventRow[], stepIndex: number) =>
  events.some((e) => e.event_type === "quiz_step_view" && e.step_index === stepIndex);

export const leadReachedStage = (events: FunnelEventRow[], stageId: string): boolean => {
  if (stageId === "enter") return hasEvent(events, "funnel_enter");
  if (stageId === "analyzing") return hasEvent(events, "quiz_analyzing") || hasEvent(events, "quiz_complete");
  if (stageId === "result") return hasEvent(events, "result_view") || hasEvent(events, "quiz_complete");
  if (stageId === "vsl") return hasEvent(events, "vsl_view");
  if (stageId === "offer") return hasEvent(events, "offer_view");
  if (stageId === "checkout") return hasEvent(events, "checkout_click");

  const quizIndex = QUIZ_STEPS.findIndex((s) => s.id === stageId);
  if (quizIndex >= 0) return hasAnsweredStep(events, quizIndex);

  return false;
};

const stageDisplayValue = (events: FunnelEventRow[], stageId: string): string | null => {
  if (stageId === "enter") {
    return hasEvent(events, "funnel_enter") ? "visitou" : null;
  }

  const quizIndex = QUIZ_STEPS.findIndex((s) => s.id === stageId);
  if (quizIndex >= 0) {
    const answer = events.find(
      (e) => e.event_type === "quiz_answer" && e.step_index === quizIndex,
    );
    if (answer?.answer_label?.startsWith("opt-")) {
      const optionIndex = Number.parseInt(answer.answer_label.slice(4), 10);
      const optionLabel = QUIZ_STEPS[quizIndex]?.options[optionIndex]?.label;
      if (optionLabel) return optionLabel;
    }
    if (answer?.answer_label) return answer.answer_label;
    if (hasViewedStep(events, quizIndex)) return "saiu sem responder";
    return null;
  }

  switch (stageId) {
    case "analyzing":
      return hasEvent(events, "quiz_analyzing") ? "carregando" : null;
    case "result": {
      const ev = events.find((e) => e.event_type === "result_view" || e.event_type === "quiz_complete");
      return ev ? `perfil ${ev.profile ?? "-"}` : null;
    }
    case "vsl":
      return hasEvent(events, "vsl_view") ? "assistindo" : null;
    case "offer":
      return hasEvent(events, "offer_view") ? "oferta liberada" : null;
    case "checkout": {
      const ev = events.find((e) => e.event_type === "checkout_click");
      if (!ev) return null;
      return String((ev.metadata as { plan?: string } | null)?.plan ?? "clicou");
    }
    default:
      return null;
  }
};

const maxStageIndexFromEvents = (events: FunnelEventRow[]): number => {
  let max = -1;
  FUNNEL_STAGES.forEach((stage, index) => {
    if (leadReachedStage(events, stage.id)) max = index;
  });
  return max;
};

const extractReferral = (events: FunnelEventRow[]): ReferralSummary => {
  const enter = events.find((e) => e.event_type === "funnel_enter");
  return parseReferralFromMetadata(enter?.metadata as Record<string, unknown> | null);
};

export const buildFunnelMetrics = (events: FunnelEventRow[]): FunnelMetrics => {
  const bySession = new Map<string, FunnelEventRow[]>();

  for (const event of events) {
    const list = bySession.get(event.session_id) ?? [];
    list.push(event);
    bySession.set(event.session_id, list);
  }

  const leads: LeadJourney[] = [...bySession.entries()].map(([sessionId, sessionEvents]) => {
    const sorted = [...sessionEvents].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    const stages: Record<string, string> = {};
    const reached: Record<string, boolean> = {};
    let profile: number | null = null;

    for (const stage of FUNNEL_STAGES) {
      reached[stage.id] = leadReachedStage(sorted, stage.id);
      const display = stageDisplayValue(sorted, stage.id);
      if (display) stages[stage.id] = display;
    }

    for (const event of sorted) {
      if (event.profile != null) profile = event.profile;
    }

    const maxStageIndex = maxStageIndexFromEvents(sorted);
    const progressPercent =
      maxStageIndex < 0 ? 0 : Math.round(((maxStageIndex + 1) / FUNNEL_STAGES.length) * 100);

    return {
      sessionId,
      shortId: sessionId.slice(0, 8),
      enteredAt: sorted[0]?.created_at ?? "",
      lastAt: sorted[sorted.length - 1]?.created_at ?? "",
      maxStageIndex,
      progressPercent,
      profile,
      landingVariant: extractLandingVariant(sorted),
      referral: extractReferral(sorted),
      stages,
      reached,
    };
  });

  leads.sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime());

  const visitors = leads.filter((l) => l.reached.enter).length;
  const leadsAcquired = leads.filter((l) => leadReachedStage(bySession.get(l.sessionId) ?? [], "q1")).length;
  const qualifiedLeads = leads.filter((l) => l.reached.vsl).length;
  const completedFlows = leads.filter((l) => l.reached.checkout).length;

  const stageCounts = FUNNEL_STAGES.map((stage) =>
    leads.filter((l) => l.reached[stage.id]).length,
  );

  const base = stageCounts[0] || 1;
  const stageRates = stageCounts.map((count) => Math.round((count / base) * 1000) / 10);

  const stageDropOffs = stageCounts.map((count, index) => {
    if (index === 0) return 0;
    return Math.max(0, stageCounts[index - 1] - count);
  });

  const stageDropOffRates = stageCounts.map((count, index) => {
    if (index === 0) return 0;
    const prev = stageCounts[index - 1] || 1;
    return Math.round((stageDropOffs[index] / prev) * 1000) / 10;
  });

  const profiledLeads = leads.filter((l) => l.profile != null);
  const profileBase = profiledLeads.length || 1;
  const profileStats: ProfileStat[] = ([1, 2, 3, 4] as QuizProfile[]).map((profile) => {
    const count = profiledLeads.filter((l) => l.profile === profile).length;
    return {
      profile,
      tag: ADMIN_PROFILE_SUMMARIES_PT[profile].tag,
      summary: ADMIN_PROFILE_SUMMARIES_PT[profile].summary,
      count,
      percent: Math.round((count / profileBase) * 1000) / 10,
    };
  });

  const platformCounts = new Map<string, number>();
  for (const lead of leads) {
    const key = lead.referral.platform;
    platformCounts.set(key, (platformCounts.get(key) ?? 0) + 1);
  }

  const referralChannels: ReferralChannelStat[] = [...platformCounts.entries()]
    .map(([channel, count]) => ({
      channel,
      label: channel,
      count,
      percent: Math.round((count / (visitors || 1)) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    visitors,
    leadsAcquired,
    interactionRate: visitors ? Math.round((leadsAcquired / visitors) * 1000) / 10 : 0,
    qualifiedLeads,
    completedFlows,
    stageCounts,
    stageRates,
    stageDropOffs,
    stageDropOffRates,
    profileStats,
    referralChannels,
    leads,
  };
};

export { vslStageIndex };
