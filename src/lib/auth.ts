import { supabaseClient } from './supabase'
import { clearLocalProgress } from './progress'

export async function signUp(email: string, password: string, name?: string) {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || '',
      },
    },
  })

  if (error) {
    return { user: null, error }
  }

  if (data.user) {
    await ensureUserEntities()
  }

  return { user: data.user, error: null }
}

export async function signIn(email: string, password: string) {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (!error && data.user) {
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

async function ensureUserEntities() {
  try {
    const supabase = supabaseClient()
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) return

    await supabase
      .from('users')
      .upsert({ id: user.id, email: user.email, password_hash: 'auth-managed' }, { onConflict: 'id' })

    const displayName = (user.user_metadata as any)?.name || user.email?.split('@')[0] || null
    await supabase
      .from('user_profiles')
      .upsert({ user_id: user.id, display_name: displayName }, { onConflict: 'user_id' })

    // Após autenticar e garantir entidades, zera progresso local para não contaminar contas novas
    clearLocalProgress()
  } catch (error) {
    console.warn('[auth] Erro ao garantir entidades do usuário:', error)
  }
}