export type ApplicationStatus =
  | 'pending'
  | 'reviewing'
  | 'approved'
  | 'rejected'
  | 'cancelled'

export type Application = {
  id: string
  userId?: string | null
  userName?: string | null
  userEmail?: string | null
  jobId?: string | null
  jobTitle?: string | null
  companyId?: string | null
  companyName?: string | null
  status?: ApplicationStatus | null
  createdAt?: string
  updatedAt?: string
}
