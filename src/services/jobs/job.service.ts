import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type {
  ApproveJobResponse,
  CreateJobRequest,
  DeleteJobResponse,
  ListJobsResponse,
  ReadJobResponse,
  RejectJobRequest,
  RejectJobResponse,
  UpdateJobRequest,
  UpdateJobResponse,
} from './job.types'

type JobApiResponse = {
  id?: string
  _id?: string
  jobId?: string
  slug?: string | null
  title?: string | null
  description?: string | null
  companyId?: string | null
  location?: string | null
  contractType?: string | null
  slots?: number | null
  status?: 'draft' | 'pending' | 'approved' | 'rejected' | 'published' | 'closed' | null
  company?: {
    id?: string
    _id?: string
    companyId?: string
    name?: string | null
    tradeName?: string | null
    contacts?: {
      address?: {
        city?: string | null
        state?: string | null
      } | null
    } | null
  } | null
  companyName?: string | null
  requirements?: {
    educationLevel?: string | null
    minExperienceYears?: number | null
    maxExperienceYears?: number | null
    languages?: Array<{
      language?: string | null
      level?: string | null
    }> | null
  } | null
  benefits?: {
    salary?: number | null
    healthInsurance?: boolean | null
    dentalInsurance?: boolean | null
    alimentationVoucher?: boolean | null
    transportationVoucher?: boolean | null
  } | null
  media?: {
    coverUrl?: string | null
  } | null
  salary?: {
    min?: number | null
    max?: number | null
    amount?: number | null
    currency?: string | null
  } | null
  createdAt?: string
  updatedAt?: string
}

function normalizeJob(job: JobApiResponse) {
  const city = job.company?.contacts?.address?.city?.trim()
  const state = job.company?.contacts?.address?.state?.trim()
  const companyLocation = [city, state].filter(Boolean).join('/')

  return {
    ...job,
    id: job.id ?? job._id ?? job.jobId ?? '',
    slug: job.slug ?? null,
    title: job.title ?? '',
    description: job.description ?? null,
    companyId:
      job.companyId ?? job.company?.id ?? job.company?._id ?? job.company?.companyId ?? null,
    companyName: job.companyName ?? job.company?.name ?? job.company?.tradeName ?? null,
    location: job.location ?? companyLocation ?? null,
    contractType: job.contractType ?? null,
    slots: job.slots ?? null,
    status: job.status ?? null,
    requirements: job.requirements ?? null,
    benefits: job.benefits ?? null,
    salary: job.salary ?? null,
    media: job.media ?? null,
  }
}

export const jobService = {
  async list() {
    const jobs = await apiClient.get<JobApiResponse[]>(API_ENDPOINTS.jobs.list)

    return jobs.map(normalizeJob) as ListJobsResponse
  },

  async read(jobId: string) {
    const job = await apiClient.get<JobApiResponse>(API_ENDPOINTS.jobs.read(jobId))

    return normalizeJob(job) as ReadJobResponse
  },

  async create(payload: CreateJobRequest) {
    const job = await apiClient.post<JobApiResponse, CreateJobRequest>(
      API_ENDPOINTS.jobs.list,
      payload,
    )

    return normalizeJob(job) as ReadJobResponse
  },

  async update(jobId: string, payload: UpdateJobRequest) {
    const job = await apiClient.patch<JobApiResponse, UpdateJobRequest>(
      API_ENDPOINTS.jobs.update(jobId),
      payload,
    )

    return normalizeJob(job) as UpdateJobResponse
  },

  delete(jobId: string) {
    return apiClient.delete<DeleteJobResponse>(API_ENDPOINTS.jobs.delete(jobId))
  },

  async approve(jobId: string) {
    const job = await apiClient.patch<JobApiResponse>(
      API_ENDPOINTS.jobs.approve(jobId),
    )

    return normalizeJob(job) as ApproveJobResponse
  },

  async reject(jobId: string, payload: RejectJobRequest) {
    const job = await apiClient.patch<JobApiResponse, RejectJobRequest>(
      API_ENDPOINTS.jobs.reject(jobId),
      payload,
    )

    return normalizeJob(job) as RejectJobResponse
  },
}
