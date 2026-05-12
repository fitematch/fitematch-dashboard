import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type { ListCompaniesResponse } from './company.types'

export const companyService = {
  list() {
    return apiClient.get<ListCompaniesResponse>(API_ENDPOINTS.companies.list)
  },
}
