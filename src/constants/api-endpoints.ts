export const API_ENDPOINTS = {
  auth: {
    signIn: '/auth/sign-in',
    me: '/auth/me',
  },
  dashboard: {
    summary: '/dashboard/summary',
  },
  users: {
    list: '/user',
    read: (userId: string) => `/user/${userId}`,
    update: (userId: string) => `/user/${userId}`,
    delete: (userId: string) => `/user/${userId}`,
  },
  companies: {
    list: '/company',
    read: (companyId: string) => `/company/${companyId}`,
    update: (companyId: string) => `/company/${companyId}`,
    delete: (companyId: string) => `/company/${companyId}`,
  },
  jobs: {
    list: '/job',
    read: (jobId: string) => `/job/${jobId}`,
    update: (jobId: string) => `/job/${jobId}`,
    delete: (jobId: string) => `/job/${jobId}`,
  },
  applications: {
    list: '/apply',
    read: (applicationId: string) => `/apply/${applicationId}`,
    update: (applicationId: string) => `/apply/${applicationId}`,
    delete: (applicationId: string) => `/apply/${applicationId}`,
  },
  upload: {
    companyLogo: '/upload/company-logo',
    jobCover: '/upload/job-cover',
    candidateResume: '/upload/candidate-resume',
  },
} as const
