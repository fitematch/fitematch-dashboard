export type ApiMessageResponse = {
  message: string
}

export type ApiListResponse<TData> = {
  data: TData[]
}

export type ApiItemResponse<TData> = {
  data: TData
}
