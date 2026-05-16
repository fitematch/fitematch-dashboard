export type ProductRole = 'candidate' | 'recruiter'

export type AdminRole = 'staff' | 'admin' | 'super_admin'

export type UserStatus = 'pending' | 'active' | 'inactive' | 'blocked'

export type User = {
  id: string
  name: string
  email: string
  birthday?: string | null
  birthDate?: string | null
  dateOfBirth?: string | null
  productRole?: ProductRole | null
  adminRole?: AdminRole | null
  status?: UserStatus | null
  createdAt?: string
  updatedAt?: string
}
