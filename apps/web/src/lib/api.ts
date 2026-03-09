import { createApiClient } from '@apps/api/client'

type Api = ReturnType<typeof createApiClient>

let _client: Api | undefined

export const api: Api = new Proxy({} as Api, {
  get(_, prop) {
    if (!_client) {
      const url = process.env.API_BASE_URL
      if (!url) throw new Error('API_BASE_URL is not set')
      _client = createApiClient(url)
    }
    return _client[prop as keyof Api]
  },
})
