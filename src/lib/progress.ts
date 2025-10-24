import { supabaseClient } from "./supabase";
import { getUser } from "./auth";
import { frequencies } from "@/data/frequencies";

export type ProgressSummary = {
  percentage: number;
  completedCount: number; // Frequências únicas concluídas
  sessionsCount: number;  // Número total de sessões concluídas
  totalCount: number;
  byDay: Array<{ day: number; completed: number; total: number }>;
  error?: string;
};

export type RecordProgressPayload = {
  frequencyId: number;
  status: "STARTED" | "COMPLETED";
  durationSeconds?: number;
  volume?: number;
};

// Fallback local para usuários não autenticados ou erros ao salvar no Supabase
const LOCAL_PROGRESS_KEY = "local-progress-entries";

function saveLocalProgressEntry(payload: RecordProgressPayload) {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    const list: any[] = raw ? JSON.parse(raw) : [];
    list.push({
      frequency_id: payload.frequencyId,
      status: payload.status,
      duration_seconds: payload.durationSeconds ?? null,
      volume: payload.volume ?? null,
      listened_at: new Date().toISOString(),
    });
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("[progress] falha ao salvar fallback local:", e);
  }
}

function getLocalProgressEntries(): any[] {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("[progress] falha ao ler fallback local:", e);
    return [];
  }
}

// Constantes para cálculo de progresso
const TOTAL_FREQUENCIES = 14; // 2 por dia x 7 dias
const PERCENT_PER_FREQUENCY = 7; // cada frequência concluída vale 7%

// Mapeia o ID local (do catálogo em src/data/frequencies.ts) para o id do Supabase
async function mapLocalToSupabaseFrequencyId(localId: number): Promise<number | null> {
  try {
    const local = frequencies.find((f) => f.id === localId);
    if (!local) return null;

    // Determina ordem dentro do dia com base na posição no array local
    const sameDay = frequencies.filter((f) => f.unlockDay === local.unlockDay);
    const orderIndex = sameDay.findIndex((f) => f.id === local.id);
    const orderInDay = orderIndex >= 0 ? orderIndex + 1 : 1;

    const supabase = supabaseClient();
    const { data, error } = await supabase
      .from("frequencies")
      .select("id")
      .eq("unlock_day", local.unlockDay)
      .eq("order_in_day", orderInDay)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn("[progress] mapLocalToSupabaseFrequencyId error:", error.message);
      return null;
    }
    return (data as any)?.id ?? null;
  } catch (e: any) {
    console.warn("[progress] mapLocalToSupabaseFrequencyId unexpected error:", e?.message || e);
    return null;
  }
}

// Garante que o catálogo de frequências no Supabase tenha as combinações (unlock_day, order_in_day)
async function ensureSupabaseFrequencies() {
  try {
    const supabase = supabaseClient();
    // Busca pares existentes no servidor
    const { data: existing, error } = await supabase
      .from("frequencies")
      .select("unlock_day, order_in_day, id");
    if (error) {
      console.warn("[progress] ensureSupabaseFrequencies query error:", error.message);
      return;
    }
    const existingPairs = new Set<string>(
      ((existing as any[]) || []).map((r) => `${r.unlock_day}:${r.order_in_day}`)
    );

    // Calcula pares necessários com base no catálogo local
    const inserts: any[] = [];
    const byDay: Record<number, number> = {};
    for (const f of frequencies) {
      const day = f.unlockDay;
      byDay[day] = (byDay[day] || 0) + 1;
      const order = byDay[day];
      const key = `${day}:${order}`;
      if (!existingPairs.has(key)) {
        const slug = `dia${day}-freq${order}`;
        const title = f.title || `Día ${day} - Frecuencia ${order}`;
        const audioUrl = f.audioSrc || "https://example.com/audio/placeholder.mp3";
        // Tenta extrair segundos da string duration (ex: "5 min")
        const seconds = (() => {
          try {
            const m = /([0-9]+)\s*min/i.exec(f.duration || "");
            return m ? parseInt(m[1], 10) * 60 : 300;
          } catch {
            return 300;
          }
        })();
        inserts.push({
          slug,
          title,
          description: f.shortDescription || null,
          audio_url: audioUrl,
          duration_seconds: seconds,
          unlock_day: day,
          order_in_day: order,
          is_active: true,
        });
      }
    }

    if (inserts.length > 0) {
      const { error: insError } = await supabase.from("frequencies").insert(inserts);
      if (insError) {
        console.warn("[progress] ensureSupabaseFrequencies insert error:", insError.message);
      } else {
        console.info(`[progress] ensureSupabaseFrequencies: inseridos ${inserts.length} itens faltantes.`);
      }
    }
  } catch (e: any) {
    console.warn("[progress] ensureSupabaseFrequencies unexpected error:", e?.message || e);
  }
}

export async function recordProgress(payload: RecordProgressPayload) {
  try {
    const { user } = await getUser();

    // Sem login: registra localmente e atualiza UI
    if (!user) {
      saveLocalProgressEntry(payload);
      window.dispatchEvent(new CustomEvent("progress:update"));
      return { ok: true, local: true } as const;
    }

    // Mapeia para frequency_id do Supabase
    let supaFrequencyId = await mapLocalToSupabaseFrequencyId(payload.frequencyId);
    if (!supaFrequencyId) {
      // Tenta sincronizar catálogo no Supabase e remapear
      await ensureSupabaseFrequencies();
      supaFrequencyId = await mapLocalToSupabaseFrequencyId(payload.frequencyId);
    }

    if (!supaFrequencyId) {
      console.warn("[progress] Não foi possível mapear frequência local para Supabase mesmo após sincronizar.");
      saveLocalProgressEntry(payload);
      window.dispatchEvent(new CustomEvent("progress:update"));
      return { error: "frequency_map_failed", local: true } as const;
    }

    const supabase = supabaseClient();
    const insertPayload = {
      user_id: user.id,
      frequency_id: supaFrequencyId,
      status: payload.status,
      duration_seconds: payload.durationSeconds ?? null,
      volume: payload.volume ?? null,
      listened_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("progress_entries")
      .insert(insertPayload);

    if (error) {
      console.warn("[progress] recordProgress error:", error.message);
      // Fallback local mesmo logada, para manter UI responsiva
      saveLocalProgressEntry(payload);
      window.dispatchEvent(new CustomEvent("progress:update"));
      return { error: error.message, local: true };
    }

    // Atualiza UI em tempo real
    window.dispatchEvent(new CustomEvent("progress:update"));
    return { ok: true };
  } catch (e: any) {
    // Fallback local em erros inesperados
    saveLocalProgressEntry(payload);
    window.dispatchEvent(new CustomEvent("progress:update"));
    return { error: e?.message || String(e), local: true };
  }
}

// Obtém progresso agregado (percentual e contagens)
export async function getProgressSummary(): Promise<ProgressSummary> {
  try {
    const { user } = await getUser();
    const supabase = supabaseClient();

    // Total é fixo: 14 frequências no programa
    const totalCount = TOTAL_FREQUENCIES;

    // Coletas
    let remoteEntries: any[] = [];
    if (user) {
      const { data: entries, error: entriesError } = await supabase
        .from("progress_entries")
        .select("frequency_id,status")
        .eq("user_id", user.id);
      if (entriesError) {
        console.warn("[progress] getProgressSummary entries error:", entriesError.message);
      } else {
        remoteEntries = (entries as any[]) || [];
      }
    }
    const localEntries = getLocalProgressEntries();

    // Combina e filtra apenas concluídas
    const combined = [...remoteEntries, ...localEntries];
    const completedOnly = combined.filter((e) => e?.status === "COMPLETED");

    const sessionsCount = completedOnly.length;
    const completedCount = Math.min(sessionsCount, totalCount);
    const percentage = Math.min(100, sessionsCount * PERCENT_PER_FREQUENCY);

    // Por dia (apenas referência com base no catálogo local)
    const byDay: Array<{ day: number; completed: number; total: number }> = [];
    for (let day = 1; day <= 7; day++) {
      const todays = frequencies.filter((f) => f.unlockDay === day);
      const total = todays.length;
      const completed = todays.filter((f) => completedOnly.some((e) => String(e.frequency_id) === String(f.id))).length;
      byDay.push({ day, completed, total });
    }

    return { percentage, completedCount, sessionsCount, totalCount, byDay };
  } catch (e: any) {
    console.warn("[progress] getProgressSummary error:", e?.message || e);
    return { percentage: 0, completedCount: 0, sessionsCount: 0, totalCount: TOTAL_FREQUENCIES, byDay: [], error: e?.message || String(e) };
  }
}

// Lista entradas de progresso do usuário (para Profile)
export async function getMyProgress(): Promise<{ data: any[] | null; error: any }> {
  try {
    const supabase = supabaseClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) return { data: null, error: userError };
    const user = userData.user;
    if (!user) return { data: [], error: null };

    const { data, error } = await supabase
      .from("progress_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("listened_at", { ascending: false });
    return { data: (data as any[]) || [], error };
  } catch (e: any) {
    return { data: null, error: e };
  }
}