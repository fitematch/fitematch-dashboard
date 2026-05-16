export type JobStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'published' | 'closed'

export type JobContractType =
  | 'clt'
  | 'pj'
  | 'freelance'
  | 'internship'
  | 'temporary'
  | 'part_time'
  | 'full_time'
  | 'autonomous'

export type EducationLevel =
  | 'high_school'
  | 'technical'
  | 'bachelor'
  | 'associate'
  | 'postgraduate'
  | 'mba'
  | 'master'
  | 'doctorate'
  | 'extension'
  | 'other'

export type JobMedia = {
  coverUrl?: string | null
}

export type JobSalary = {
  min?: number | null
  max?: number | null
  amount?: number | null
  currency?: string | null
}

export type JobBenefits = {
  salary?: number | null
  healthInsurance?: boolean | null
  dentalInsurance?: boolean | null
  alimentationVoucher?: boolean | null
  transportationVoucher?: boolean | null
}

export type JobRequirementLanguage = {
  language: string
  level: string
}

export type JobRequirements = {
  educationLevel?: EducationLevel | null
  minExperienceYears?: number | null
  maxExperienceYears?: number | null
  languages?: JobRequirementLanguage[] | null
}

export type Job = {
  id: string
  title: string
  slug?: string | null
  description?: string | null
  companyId?: string | null
  companyName?: string | null
  location?: string | null
  contractType?: JobContractType | null
  slots?: number | null
  status?: JobStatus | null
  salary?: JobSalary | null
  benefits?: JobBenefits | null
  requirements?: JobRequirements | null
  media?: JobMedia | null
  createdAt?: string
  updatedAt?: string
}
