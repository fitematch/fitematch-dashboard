import Link from 'next/link'
import { FiMail, FiSettings, FiShield, FiSliders } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

const settingsCards = [
  {
    title: 'Email templates',
    description:
      'Preview transactional emails for activation, approvals and applications.',
    href: ROUTES.dashboard.emailTemplates,
    icon: FiMail,
    status: 'Available',
  },
  {
    title: 'Dashboard preferences',
    description: 'Theme, table density, language and pagination preferences.',
    href: null,
    icon: FiSettings,
    status: 'Coming soon',
  },
  {
    title: 'Administrative permissions',
    description: 'Manage staff, admin and super admin capabilities.',
    href: null,
    icon: FiShield,
    status: 'Coming soon',
  },
  {
    title: 'Approval rules',
    description: 'Configure moderation and approval workflow rules.',
    href: null,
    icon: FiSliders,
    status: 'Coming soon',
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Settings"
        description="Dashboard settings and administrative configuration."
        icon={FiSettings}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {settingsCards.map((item) => {
          const Icon = item.icon

          const content = (
            <Card className="h-full transition hover:border-green-500/40">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-green-500/10 p-3 text-green-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-slate-100">
                        {item.title}
                      </h2>

                      <Badge
                        variant={
                          item.status === 'Available' ? 'success' : 'neutral'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )

          if (!item.href) {
            return <div key={item.title}>{content}</div>
          }

          return (
            <Link key={item.title} href={item.href}>
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
