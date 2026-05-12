import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type { ListJobsResponse } from './job.types'

export const jobService = {
  list() {
    return apiClient.get<ListJobsResponse>(API_ENDPOINTS.jobs.list)
  },
}
