import { drizzle } from 'drizzle-orm/postgres-js'

import { postgresClient } from './client'
import * as schema from './schema'

export const db = drizzle(postgresClient, { schema })

export * from './schema'
export * from './repositories'
export { postgresClient }
