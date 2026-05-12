export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type PaginatedResponse<TData> = {
  data: TData[]
  meta: PaginationMeta
}

export type PaginationParams = {
  page?: number
  limit?: number
}
