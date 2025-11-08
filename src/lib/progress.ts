import { supabaseClient } from "./supabase";
import { getUser } from "./auth";
import { frequencies } from "@/data/frequencies";

export type ProgressSummary = {
  percentage: number;
  completedCount: number;
  totalCount: number;
  byDay: Record<number, number>;
};

export type RecordProgressPayload = {
  frequencyId: number;
  day: number;
  completedAt: string;
};

// Constantes para cálculo de progresso
const TOTAL_FREQUENCIES = frequencies.length; // Será 6 baseado no array de frequências

// Registra progresso de uma frequência
export const recordProgress = async (payload: RecordProgressPayload): Promise<boolean> => {
  try {
    // Salva no localStorage primeiro (sempre)
    const localEntries = JSON.parse(localStorage.getItem("progress_entries") || "[]");
    localEntries.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem("progress_entries", JSON.stringify(localEntries));

    // Se usuário autenticado, tenta salvar no Supabase
    const { user } = await getUser();
    if (user) {
      const supabase = supabaseClient();
      
      // Mapeia ID local para ID do Supabase
      const frequency = frequencies.find(f => f.id === payload.frequencyId);
      if (!frequency) {
        console.warn(`[recordProgress] Frequency ${payload.frequencyId} não encontrada`);
        return true; // Sucesso local mesmo sem encontrar
      }

      const { error } = await supabase.from("progress_entries").insert({
        user_id: user.id,
        frequency_id: payload.frequencyId,
        day: payload.day,
        completed_at: payload.completedAt,
      });

      if (error) {
        console.error("[recordProgress] Erro Supabase:", error);
        return true; // Sucesso local mesmo com erro no Supabase
      }
    }

    // Dispara evento para atualizar UI
    window.dispatchEvent(new CustomEvent("progress:update"));
    return true;
  } catch (error) {
    console.error("[recordProgress] Erro:", error);
    return false;
  }
};

// Obtém resumo do progresso
export const getProgressSummary = async (): Promise<ProgressSummary> => {
  try {
    let remoteEntries: any[] = [];
    
    // Busca entradas remotas se usuário autenticado
    const { user } = await getUser();
    if (user) {
      const supabase = supabaseClient();
      const { data, error } = await supabase
        .from("progress_entries")
        .select("*")
        .eq("user_id", user.id);
      
      if (error) {
        console.warn("[getProgressSummary] Erro ao buscar progresso remoto:", error);
      } else {
        remoteEntries = data || [];
      }
    }

    // Busca entradas locais
    const localEntries = JSON.parse(localStorage.getItem("progress_entries") || "[]");
    
    // Combina entradas (prioriza remotas)
    const allEntries = [...remoteEntries, ...localEntries];
    const uniqueEntries = allEntries.filter((entry, index, self) => 
      index === self.findIndex(e => 
        e.frequency_id === entry.frequency_id && e.day === entry.day
      )
    );

    const completedCount = uniqueEntries.length;
    const totalCount = TOTAL_FREQUENCIES;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Agrupa por dia
    const byDay: Record<number, number> = {};
    uniqueEntries.forEach(entry => {
      const day = entry.day;
      byDay[day] = (byDay[day] || 0) + 1;
    });

    return {
      completedCount,
      totalCount,
      percentage,
      byDay,
    };
  } catch (error) {
    console.error("[getProgressSummary] Erro:", error);
    return {
      completedCount: 0,
      totalCount: TOTAL_FREQUENCIES,
      percentage: 0,
      byDay: {},
    };
  }
};

// Atualiza progresso na entrada (usado para desbloqueios)
export const updateProgressOnEntry = async () => {
  try {
    const summary = await getProgressSummary();
    
    // Calcula dia atual baseado no progresso
    const currentDay = Math.min(7, Math.max(1, Object.keys(summary.byDay).length + 1));
    
    return { currentDay, error: null };
  } catch (error) {
    console.error("[updateProgressOnEntry] Erro:", error);
    return { currentDay: 1, error };
  }
};

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
      .order("completed_at", { ascending: false });
    return { data: (data as any[]) || [], error };
  } catch (e: any) {
    return { data: null, error: e };
  }
}

// Limpa progresso local
export function clearLocalProgress() {
  try {
    localStorage.removeItem("progress_entries");
  } catch {}
}