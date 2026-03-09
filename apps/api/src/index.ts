import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { healthRoutes, usersRoutes } from './routes'

const app = new Hono().use('*', cors()).route('/health', healthRoutes).route('/users', usersRoutes)

export type AppType = typeof app
export default app
