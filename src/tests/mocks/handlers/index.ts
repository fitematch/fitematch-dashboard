import { http, HttpResponse } from 'msw'

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export const handlers = [
  http.get(`${apiUrl}/health-check`, () => {
    return HttpResponse.json({
      healthy: true,
      name: 'API',
      version: '0.0.1',
    })
  }),
]
