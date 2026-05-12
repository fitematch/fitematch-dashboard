'use client'

import { ApplicationMobileCard } from '@/components/applications/application-mobile-card'
import { ApplicationTable } from '@/components/applications/application-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { useApplications } from '@/hooks/use-applications'

export default function ApplicationsPage() {
  const { applications, isLoading, error } = useApplications()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Applications"
        description="Track candidates applying to job opportunities."
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={applications.length === 0}
        emptyTitle="No applications found"
        emptyDescription="Applications will appear here when candidates apply to jobs."
      >
        <ApplicationTable applications={applications} />

        <div className="space-y-4 md:hidden">
          {applications.map((application) => (
            <ApplicationMobileCard
              key={application.id}
              application={application}
            />
          ))}
        </div>
      </PageState>
    </div>
  )
}