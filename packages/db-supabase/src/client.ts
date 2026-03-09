import postgres from 'postgres'

if (!process.env.SUPABASE_DATABASE_URL) {
  throw new Error('SUPABASE_DATABASE_URL is required')
}

export const postgresClient = postgres(process.env.SUPABASE_DATABASE_URL)
