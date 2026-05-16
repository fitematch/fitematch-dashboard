import type { Job } from '@/types/entities/job.entity'

export type ListJobsResponse = Job[]

export type ReadJobResponse = Job

export type CreateJobRequest = Partial<{
  slug: string | null
  title: string
  description: string | null
  companyId: string | null
  companyName: string | null
  location: string | null
  contractType: Job['contractType']
  slots: number | null
  requirements: Job['requirements'] | null
  benefits: Job['benefits'] | null
  media: Job['media'] | null
  status: Job['status']
}>

export type CreateJobResponse = Job

export type UpdateJobRequest = Partial<{
  slug: string | null
  title: string
  description: string | null
  companyId: string | null
  companyName: string | null
  location: string | null
  contractType: Job['contractType']
  slots: number | null
  requirements: Job['requirements'] | null
  benefits: Job['benefits'] | null
  media: Job['media'] | null
  status: Job['status']
}>

export type UpdateJobResponse = Job

export type DeleteJobResponse = {
  message: string
}

export type RejectJobRequest = {
  reason?: string
}

export type ApproveJobResponse = Job

export type RejectJobResponse = Job
