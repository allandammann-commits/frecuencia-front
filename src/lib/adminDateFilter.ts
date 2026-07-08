import type { FunnelEventRow } from "@/lib/funnelTracking";

export type DatePreset = "today" | "yesterday" | "7d" | "14d" | "30d" | "custom";

export type DateRange = {
  start: Date;
  end: Date;
  label: string;
};

export const DATE_PRESET_OPTIONS: { id: DatePreset; label: string }[] = [
  { id: "today", label: "Hoje" },
  { id: "yesterday", label: "Ontem" },
  { id: "7d", label: "7 dias" },
  { id: "14d", label: "14 dias" },
  { id: "30d", label: "30 dias" },
  { id: "custom", label: "Personalizado" },
];

const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const toInputDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const getDefaultCustomDates = () => {
  const today = new Date();
  return { from: toInputDate(today), to: toInputDate(today) };
};

export const formatRangeLabel = (range: DateRange): string => {
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const sameDay = range.start.toDateString() === range.end.toDateString();
  if (sameDay) return `${range.label} · ${fmt.format(range.start)}`;
  return `${range.label} · ${fmt.format(range.start)} – ${fmt.format(range.end)}`;
};

export const resolveDateRange = (
  preset: DatePreset,
  customFrom: string,
  customTo: string,
): DateRange => {
  const now = new Date();

  switch (preset) {
    case "today":
      return { start: startOfDay(now), end: endOfDay(now), label: "Hoje" };
    case "yesterday": {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: startOfDay(yesterday), end: endOfDay(yesterday), label: "Ontem" };
    }
    case "7d": {
      const start = new Date(now);
      start.setDate(start.getDate() - 6);
      return { start: startOfDay(start), end: endOfDay(now), label: "Últimos 7 dias" };
    }
    case "14d": {
      const start = new Date(now);
      start.setDate(start.getDate() - 13);
      return { start: startOfDay(start), end: endOfDay(now), label: "Últimos 14 dias" };
    }
    case "30d": {
      const start = new Date(now);
      start.setDate(start.getDate() - 29);
      return { start: startOfDay(start), end: endOfDay(now), label: "Últimos 30 dias" };
    }
    case "custom": {
      const from = customFrom ? new Date(`${customFrom}T00:00:00`) : startOfDay(now);
      const to = customTo ? new Date(`${customTo}T00:00:00`) : endOfDay(now);
      const start = startOfDay(from);
      const end = endOfDay(to);
      if (start.getTime() > end.getTime()) {
        return { start: startOfDay(to), end: endOfDay(from), label: "Personalizado" };
      }
      return { start, end, label: "Personalizado" };
    }
    default:
      return { start: startOfDay(now), end: endOfDay(now), label: "Hoje" };
  }
};

const getSessionEntryTime = (events: FunnelEventRow[]): number | null => {
  const enter = events.find((e) => e.event_type === "funnel_enter");
  if (enter) return new Date(enter.created_at).getTime();
  if (events.length === 0) return null;
  return new Date(events[0].created_at).getTime();
};

export const filterEventsByEntryDate = (
  events: FunnelEventRow[],
  range: DateRange,
): FunnelEventRow[] => {
  const startMs = range.start.getTime();
  const endMs = range.end.getTime();

  const bySession = new Map<string, FunnelEventRow[]>();
  for (const event of events) {
    const list = bySession.get(event.session_id) ?? [];
    list.push(event);
    bySession.set(event.session_id, list);
  }

  const allowed = new Set<string>();
  for (const [sessionId, sessionEvents] of bySession) {
    const entryTime = getSessionEntryTime(sessionEvents);
    if (entryTime != null && entryTime >= startMs && entryTime <= endMs) {
      allowed.add(sessionId);
    }
  }

  return events.filter((event) => allowed.has(event.session_id));
};
