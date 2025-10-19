import { supabaseClient } from './supabase'

export async function signUp(email: string, password: string) {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = supabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
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