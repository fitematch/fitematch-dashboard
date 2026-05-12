import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type { ListUsersResponse } from './user.types'

export const userService = {
  list() {
    return apiClient.get<ListUsersResponse>(API_ENDPOINTS.users.list)
  },
}
