import {
  FiBriefcase,
  FiCheckSquare,
  FiFileText,
  FiHome,
  FiSettings,
  FiUser,
  FiUsers,
  FiMail
} from 'react-icons/fi'
import {
  FaBuilding,
} from 'react-icons/fa'

import { ROUTES } from './routes'

export const DASHBOARD_MENU = [
  {
    label: 'Dashboard',
    href: ROUTES.dashboard.home,
    icon: FiHome,
  },
  {
    label: 'Users',
    href: ROUTES.dashboard.users,
    icon: FiUsers,
  },
  {
    label: 'Companies',
    href: ROUTES.dashboard.companies,
    icon: FaBuilding,
  },
  {
    label: 'Jobs',
    href: ROUTES.dashboard.jobs,
    icon: FiBriefcase,
  },
  {
    label: 'Applications',
    href: ROUTES.dashboard.applications,
    icon: FiFileText,
  },
  {
    label: 'Company approvals',
    href: ROUTES.dashboard.approvals.companies,
    icon: FiCheckSquare,
  },
  {
    label: 'Job approvals',
    href: ROUTES.dashboard.approvals.jobs,
    icon: FiCheckSquare,
  },
  {
    label: 'Email templates',
    href: ROUTES.dashboard.emailTemplates,
    icon: FiMail,
  },
  {
    label: 'Profile',
    href: ROUTES.dashboard.profile,
    icon: FiUser,
  },
  {
    label: 'Settings',
    href: ROUTES.dashboard.settings,
    icon: FiSettings,
  },
] as const