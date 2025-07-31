//Initialize Supabase
import { createClient } from '@supabase/supabase-js'

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
}

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
)
