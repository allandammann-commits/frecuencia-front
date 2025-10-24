import { supabaseClient } from './supabase'

export async function signUp(email: string, password: string) {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (!error) {
    await ensureUserEntities()
  }
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (!error) {
    await ensureUserEntities()
  }
  return { data, error }
}

export async function signOut() {
  const supabase = supabaseClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getUser() {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.getUser()
  return { user: data.user, error }
}

export function onAuthStateChange(callback: (event: string) => void) {
  const supabase = supabaseClient()
  const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
    callback(event)
  })
  return () => subscription.subscription?.unsubscribe()
}

import { getOrInitUserProgress } from './userProgress'

async function ensureUserEntities() {
  const supabase = supabaseClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) return

  // Ensure row in public.users (FK target)
  // Note: password_hash é gerido por Supabase Auth; usamos um marcador.
  await supabase
    .from('users')
    .upsert({ id: user.id, email: user.email, password_hash: 'auth-managed' }, { onConflict: 'id' })

  // Ensure profile exists (opcional)
  const displayName = (user.user_metadata as any)?.name || user.email?.split('@')[0] || null
  await supabase
    .from('user_profiles')
    .upsert({ user_id: user.id, display_name: displayName }, { onConflict: 'user_id' })

  // Ensure progress
  await getOrInitUserProgress()
}