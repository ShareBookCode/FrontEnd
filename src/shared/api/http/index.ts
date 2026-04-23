import { getAuthToken } from '../auth/get-auth-token'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type ParamsType = object

interface RequestConfig {
  params?: ParamsType
  headers?: Record<string, string>
}

const REQUEST_TIMEOUT_MS = 10_000
const TOTAL_TIMEOUT_MS = 30_000
const MAX_RETRIES = 3

const buildUrl = (path: string, params?: ParamsType): string => {
  const base = (
    process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost'
  ).replace(/\/$/, '')
  const url = new URL(`${base}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }
  return url.toString()
}

const buildHeaders = async (
  extra?: Record<string, string>,
): Promise<Headers> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Project-Token': process.env.NEXT_PUBLIC_BACKEND_TOKEN ?? '',
    ...extra,
  })
  const token = await getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const text = await response.text()
  if (!response.ok) {
    const message =
      (text ? JSON.parse(text)?.message : null) ?? 'Request failed'
    throw new ApiError(response.status, message)
  }
  return (text ? JSON.parse(text) : undefined) as T
}

const isRetryable = (error: unknown): boolean => {
  if (error instanceof ApiError) return error.status >= 500
  if (error instanceof DOMException && error.name === 'AbortError') return true
  return error instanceof TypeError
}

const request = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> => {
  const deadline = Date.now() + TOTAL_TIMEOUT_MS
  let attempt = 0

  while (true) {
    const remaining = deadline - Date.now()
    if (remaining <= 0) throw new ApiError(408, 'Request timeout')

    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      Math.min(REQUEST_TIMEOUT_MS, remaining),
    )

    try {
      const headers = await buildHeaders(config?.headers)
      const hasBody = data !== null && data !== undefined
      const fetchUrl = buildUrl(url, config?.params)
      const response = await fetch(fetchUrl, {
        method,
        headers,
        body: hasBody ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return handleResponse<T>(response)
    } catch (error) {
      clearTimeout(timeoutId)
      if (
        attempt < MAX_RETRIES &&
        isRetryable(error) &&
        Date.now() < deadline
      ) {
        attempt += 1
        continue
      }
      throw error
    }
  }
}

export const apiClient = {
  get: <T>(url: string, config?: RequestConfig): Promise<T> =>
    request<T>(HttpMethod.GET, url, undefined, config),

  post: <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    request<T>(HttpMethod.POST, url, data, config),

  patch: <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    request<T>(HttpMethod.PATCH, url, data, config),

  put: <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    request<T>(HttpMethod.PUT, url, data, config),

  delete: <T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> => request<T>(HttpMethod.DELETE, url, data, config),
}
