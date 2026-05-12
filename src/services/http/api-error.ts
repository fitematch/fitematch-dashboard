export type ApiErrorResponse = {
  statusCode?: number
  message?: string | string[]
  error?: string
}

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly details?: ApiErrorResponse

  constructor(message: string, statusCode: number, details?: ApiErrorResponse) {
    super(message)

    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
  }
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected error'
}
