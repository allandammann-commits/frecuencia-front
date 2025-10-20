import { supabaseClient } from './supabase'

export const PROGRAM_TOTAL_DAYS = 7

export type UserProgressRow = {
  user_id: string
  started_at: string // date or timestamp
  last_unlocked_day: number
  last_seen_at: string
}

function clampDay(day: number): number {
  if (day < 1) return 1
  if (day > PROGRAM_TOTAL_DAYS) return PROGRAM_TOTAL_DAYS
  return day
}

function computeCurrentDay(startedAt: string): number {
  const start = new Date(startedAt)
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1
  return clampDay(diffDays)
}

export async function getOrInitUserProgress(): Promise<{ data: UserProgressRow | null, error: any }>{
  try {
    const supabase = supabaseClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) return { data: null, error: userError }
    const user = userData.user
    if (!user) return { data: null, error: new Error('Usuário não autenticado') }

    // Try to get existing progress
    const { data: existing, error: selError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (selError) return { data: null, error: selError }

    if (existing) {
      return { data: existing as UserProgressRow, error: null }
    }

    // Initialize at day 1 (store full timestamp for better 24h accuracy; DB may cast to date)
    const payload = {
      user_id: user.id,
      started_at: new Date().toISOString(),
      last_unlocked_day: 1,
      last_seen_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('user_progress')
      .insert(payload)
      .select()
      .single()

    return { data: data as UserProgressRow, error }
  } catch (e) {
    return { data: null, error: e as any }
  }
}

export async function updateProgressOnEntry(): Promise<{ currentDay: number, progress: UserProgressRow | null, error: any }>{
  const { data: progress, error } = await getOrInitUserProgress()
  if (error || !progress) return { currentDay: 1, progress, error }

  const currentDay = computeCurrentDay(progress.started_at)
  const supabase = supabaseClient()

  // Update last_seen_at always; bump last_unlocked_day if needed
  const newLastUnlocked = Math.max(progress.last_unlocked_day ?? 1, currentDay)

  const { data: updated, error: updError } = await supabase
    .from('user_progress')
    .update({ last_seen_at: new Date().toISOString(), last_unlocked_day: newLastUnlocked })
    .eq('user_id', progress.user_id)
    .select()
    .single()

  return { currentDay, progress: (updated || progress) as UserProgressRow, error: updError }
}

export async function getUnlockedDays(): Promise<{ days: number[], error: any }>{
  const { data, error } = await getOrInitUserProgress()
  if (error || !data) return { days: [1], error }
  const days = Array.from({ length: clampDay(data.last_unlocked_day) }, (_, i) => i + 1)
  return { days, error: null }
}