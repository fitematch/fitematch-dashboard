import { ApiError, type ApiErrorResponse } from './api-error'
import { tokenStorage } from './token-storage'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ApiClientRequestOptions = {
  method?: RequestMethod
  body?: unknown
  headers?: HeadersInit
  auth?: boolean
}

const DEFAULT_API_URL = 'http://localhost:3000'

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL
}

function buildUrl(path: string) {
  const baseUrl = getBaseUrl().replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${baseUrl}${normalizedPath}`
}

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== 'undefined' && body instanceof FormData
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    return null
  }

  return response.json()
}

function getErrorMessage(data: ApiErrorResponse | null, fallback: string) {
  if (!data?.message) {
    return fallback
  }

  if (Array.isArray(data.message)) {
    return data.message.join(', ')
  }

  return data.message
}

async function request<TResponse>(
  path: string,
  options: ApiClientRequestOptions = {},
): Promise<TResponse> {
  const method = options.method ?? 'GET'
  const headers = new Headers(options.headers)
  const body = options.body

  if (!isFormData(body)) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.auth !== false) {
    const token = tokenStorage.getAccessToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    body: isFormData(body) ? body : body ? JSON.stringify(body) : undefined,
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(data, 'Request failed'),
      response.status,
      data ?? undefined,
    )
  }

  return data as TResponse
}

export const apiClient = {
  get<TResponse>(path: string, options?: Omit<ApiClientRequestOptions, 'method' | 'body'>) {
    return request<TResponse>(path, {
      ...options,
      method: 'GET',
    })
  },

  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiClientRequestOptions, 'method' | 'body'>,
  ) {
    return request<TResponse>(path, {
      ...options,
      method: 'POST',
      body,
    })
  },

  put<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiClientRequestOptions, 'method' | 'body'>,
  ) {
    return request<TResponse>(path, {
      ...options,
      method: 'PUT',
      body,
    })
  },

  patch<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiClientRequestOptions, 'method' | 'body'>,
  ) {
    return request<TResponse>(path, {
      ...options,
      method: 'PATCH',
      body,
    })
  },

  delete<TResponse>(path: string, options?: Omit<ApiClientRequestOptions, 'method' | 'body'>) {
    return request<TResponse>(path, {
      ...options,
      method: 'DELETE',
    })
  },
}
