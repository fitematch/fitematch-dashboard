import type { Application } from '@/types/entities/application.entity'

export type ListApplicationsResponse = Application[]

export type ReadApplicationResponse = Application

export type CreateApplicationRequest = Partial<{
  userId: string | null
  userName: string | null
  userEmail: string | null
  jobId: string | null
  jobTitle: string | null
  companyId: string | null
  companyName: string | null
  status: Application['status']
}>

export type CreateApplicationResponse = Application

export type UpdateApplicationRequest = Partial<{
  status: Application['status']
}>

export type UpdateApplicationResponse = Application

export type DeleteApplicationResponse = {
  message: string
}
