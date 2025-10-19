import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function supabaseClient(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  if (!url || !anonKey) {
    console.warn('[Supabase] VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY ausentes. Preencha o .env.local.')
    throw new Error('Supabase não configurado (.env.local).')
  }

  if (!client) {
    client = createClient(url, anonKey)
  }
  return client
}