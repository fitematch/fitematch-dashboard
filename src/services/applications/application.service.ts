import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type { ListApplicationsResponse } from './application.types'

export const applicationService = {
  list() {
    return apiClient.get<ListApplicationsResponse>(
      API_ENDPOINTS.applications.list,
    )
  },
}
