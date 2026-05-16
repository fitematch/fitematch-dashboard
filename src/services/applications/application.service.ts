import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'
import type { Application } from '@/types/entities/application.entity'

import type {
  CreateApplicationRequest,
  DeleteApplicationResponse,
  UpdateApplicationRequest,
} from './application.types'

type ApplicationApiResponse = Partial<Application> & {
  _id?: string
  applicationId?: string
  job?: {
    id?: string
    _id?: string
    title?: string | null
  } | null
}

function normalizeApplication(
  application: ApplicationApiResponse,
): Application {
  return {
    ...application,
    id:
      application.id ?? application._id ?? application.applicationId ?? '',
    jobId:
      application.jobId ??
      application.job?.id ??
      application.job?._id ??
      null,
    jobTitle: application.jobTitle ?? application.job?.title ?? null,
  }
}

export const applicationService = {
  async list() {
    const applications = await apiClient.get<ApplicationApiResponse[]>(
      API_ENDPOINTS.applications.list,
    )

    return applications.map(normalizeApplication)
  },

  async read(applicationId: string) {
    try {
      const application = await apiClient.get<ApplicationApiResponse>(
        API_ENDPOINTS.applications.read(applicationId),
      )

      return normalizeApplication(application)
    } catch {
      const applications = await applicationService.list()
      const application = applications.find((item) => item.id === applicationId)

      if (!application) {
        throw new Error('Application not found')
      }

      return application
    }
  },

  async create(payload: CreateApplicationRequest) {
    const application = await apiClient.post<
      ApplicationApiResponse,
      CreateApplicationRequest
    >(
      API_ENDPOINTS.applications.list,
      payload,
    )

    return normalizeApplication(application)
  },

  async update(applicationId: string, payload: UpdateApplicationRequest) {
    const application = await apiClient.patch<
      ApplicationApiResponse,
      UpdateApplicationRequest
    >(
      API_ENDPOINTS.applications.update(applicationId),
      payload,
    )

    return normalizeApplication(application)
  },

  delete(applicationId: string) {
    return apiClient.delete<DeleteApplicationResponse>(
      API_ENDPOINTS.applications.delete(applicationId),
    )
  },
}
