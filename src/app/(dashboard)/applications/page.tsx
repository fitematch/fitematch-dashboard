'use client'

import { ApplicationMobileCard } from '@/components/applications/application-mobile-card'
import { ApplicationTable } from '@/components/applications/application-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { useApplications } from '@/hooks/use-applications'

export default function ApplicationsPage() {
  const { applications, isLoading, error } = useApplications()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Applications"
        description="Track candidates applying to job opportunities."
      />

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : applications.length === 0 ? (
        <EmptyState
          title="No applications found"
          description="Applications will appear here when candidates apply to jobs."
        />
      ) : (
        <>
          <ApplicationTable applications={applications} />

          <div className="space-y-4 md:hidden">
            {applications.map((application, index) => (
              <ApplicationMobileCard
                key={`${application.id}-${application.jobId ?? application.jobTitle ?? 'job'}-${application.userId ?? application.userEmail ?? 'user'}-${index}`}
                application={application}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
