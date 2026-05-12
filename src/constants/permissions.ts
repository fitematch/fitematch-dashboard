export const ADMIN_ROLES = {
  staff: 'staff',
  admin: 'admin',
  superAdmin: 'super_admin',
} as const

export type AdminRole = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES]

export const ADMIN_ALLOWED_ROLES: AdminRole[] = [
  ADMIN_ROLES.staff,
  ADMIN_ROLES.admin,
  ADMIN_ROLES.superAdmin,
]

export const PERMISSIONS = {
  users: {
    read: [ADMIN_ROLES.staff, ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    write: [ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    delete: [ADMIN_ROLES.superAdmin],
  },
  companies: {
    read: [ADMIN_ROLES.staff, ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    write: [ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    delete: [ADMIN_ROLES.superAdmin],
    approve: [ADMIN_ROLES.staff, ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
  },
  jobs: {
    read: [ADMIN_ROLES.staff, ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    write: [ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    delete: [ADMIN_ROLES.superAdmin],
    approve: [ADMIN_ROLES.staff, ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
  },
  applications: {
    read: [ADMIN_ROLES.staff, ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    write: [ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    delete: [ADMIN_ROLES.superAdmin],
  },
  settings: {
    read: [ADMIN_ROLES.admin, ADMIN_ROLES.superAdmin],
    write: [ADMIN_ROLES.superAdmin],
  },
} as const

export function hasAdminRole(role?: string | null): role is AdminRole {
  return ADMIN_ALLOWED_ROLES.includes(role as AdminRole)
}

export function hasPermission(
  userRole: string | null | undefined,
  allowedRoles: readonly AdminRole[],
) {
  if (!userRole) {
    return false
  }

  return allowedRoles.includes(userRole as AdminRole)
}
