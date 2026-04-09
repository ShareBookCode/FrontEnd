import { getAuthToken } from '../auth'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestConfig {
  params?: object
  headers?: Record<string, string>
}

const buildUrl = (path: string, params?: object): string => {
  const url = new URL(path, process.env.BACKEND_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]: [string, unknown]) => {
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
    'X-Project-Token': process.env.BACKEND_TOKEN ?? '',
    ...extra,
  })
  const token = await getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let message = 'Request failed'
    try {
      const body = await response.json()
      message = body?.message ?? message
    } catch {
      // ignore parse error, keep default message
    }
    throw new ApiError(response.status, message)
  }
  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

const request = async <T>(
  method: string,
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> => {
  const headers = await buildHeaders(config?.headers)
  const hasBody = data !== null && data !== undefined && data !== ''
  const response = await fetch(buildUrl(url, config?.params), {
    method,
    headers,
    body: hasBody ? JSON.stringify(data) : undefined,
  })
  return handleResponse<T>(response)
}

export const apiClient = {
  get: <T>(url: string, config?: RequestConfig): Promise<T> =>
    request<T>('GET', url, undefined, config),

  post: <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    request<T>('POST', url, data, config),

  patch: <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    request<T>('PATCH', url, data, config),

  put: <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> =>
    request<T>('PUT', url, data, config),

  delete: <T>(url: string, config?: RequestConfig): Promise<T> =>
    request<T>('DELETE', url, undefined, config),
}
