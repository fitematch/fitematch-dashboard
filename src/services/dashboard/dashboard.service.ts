import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type { DashboardSummaryResponse } from './dashboard.types'

export const dashboardService = {
  getSummary() {
    return apiClient.get<DashboardSummaryResponse>(
      API_ENDPOINTS.dashboard.summary,
    )
  },
}
