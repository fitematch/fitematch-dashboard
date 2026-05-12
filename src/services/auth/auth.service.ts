import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type { AuthMeResponse, SignInRequest, SignInResponse } from './auth.types'

export const authService = {
  signIn(payload: SignInRequest) {
    return apiClient.post<SignInResponse, SignInRequest>(
      API_ENDPOINTS.auth.signIn,
      payload,
      {
        auth: false,
      },
    )
  },

  me() {
    return apiClient.get<AuthMeResponse>(API_ENDPOINTS.auth.me)
  },
}
