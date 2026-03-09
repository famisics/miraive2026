import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
