import { hc } from 'hono/client'

import type { AppType } from './index'

export const createApiClient = (baseUrl: string) => hc<AppType>(baseUrl)
