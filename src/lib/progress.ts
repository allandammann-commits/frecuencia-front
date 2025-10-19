import { supabaseClient } from './supabase'

export type ProgressStatus = 'STARTED' | 'COMPLETED'

interface RecordProgressParams {
  frequencyId: number
  status: ProgressStatus
  durationSeconds?: number | null
  volume?: number | null
}

export async function recordProgress(params: RecordProgressParams) {
  try {
    const supabase = supabaseClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) return { data: null, error: userError }
    const user = userData.user
    if (!user) return { data: null, error: new Error('Usuário não autenticado') }

    const payload = {
      user_id: user.id,
      frequency_id: params.frequencyId,
      status: params.status,
      duration_seconds: params.durationSeconds ?? null,
      volume: params.volume ?? null,
    }

    const { data, error } = await supabase.from('progress_entries').insert(payload).select().single()
    return { data, error }
  } catch (e) {
    console.warn('[Supabase] Progresso não registrado: configuração ausente ou erro.', e)
    return { data: null, error: e as any }
  }
}

export async function getMyProgress() {
  try {
    const supabase = supabaseClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) return { data: null, error: userError }
    const user = userData.user
    if (!user) return { data: [], error: null }

    const { data, error } = await supabase
      .from('progress_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('listened_at', { ascending: false })

    return { data, error }
  } catch (e) {
    return { data: [], error: e as any }
  }
}