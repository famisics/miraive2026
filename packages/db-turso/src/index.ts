import { drizzle } from 'drizzle-orm/libsql'

import { libsqlClient } from './client'
import * as schema from './schema'

export const db = drizzle(libsqlClient, { schema })

export * from './schema'
export * from './repositories'
export { libsqlClient }
