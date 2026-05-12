export type JobStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'published' | 'closed'

export type JobMedia = {
  coverUrl?: string | null
}

export type JobSalary = {
  min?: number | null
  max?: number | null
  currency?: string | null
}

export type Job = {
  id: string
  title: string
  description?: string | null
  companyId?: string | null
  companyName?: string | null
  location?: string | null
  status?: JobStatus | null
  salary?: JobSalary | null
  media?: JobMedia | null
  createdAt?: string
  updatedAt?: string
}
