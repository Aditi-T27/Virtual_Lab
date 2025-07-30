// Supabase configuration (to be implemented with actual Supabase)
// This is a placeholder for the Supabase setup

// export const supabaseConfig = {
//   url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// }

// Initialize Supabase
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
