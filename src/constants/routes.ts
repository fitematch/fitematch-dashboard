export const ROUTES = {
  auth: {
    signIn: '/sign-in',
  },
  dashboard: {
    home: '/dashboard',
    users: '/users',
    companies: '/companies',
    jobs: '/jobs',
    applications: '/applications',
    approvals: {
      companies: '/approvals/companies',
      jobs: '/approvals/jobs',
    },
    profile: '/profile',
    settings: '/settings',
  },
} as const