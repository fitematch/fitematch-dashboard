'use client'

import { useState } from 'react'
import { FiFileText, FiPlus } from 'react-icons/fi'

import { ApplicationMobileCard } from '@/components/applications/application-mobile-card'
import { ApplicationTable } from '@/components/applications/application-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { PageState } from '@/components/ui/page-state'
import { ROUTES } from '@/constants/routes'
import { useApplications } from '@/hooks/use-applications'
import { applicationService } from '@/services/applications/application.service'
import type { Application } from '@/types/entities/application.entity'

export default function ApplicationsPage() {
  const { applications, isLoading, error } = useApplications()
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteApplication() {
    if (!selectedApplication) {
      return
    }

    try {
      setIsDeleting(true)

      await applicationService.delete(selectedApplication.id)

      window.location.reload()
    } finally {
      setIsDeleting(false)
      setSelectedApplication(null)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Applications"
        description="Track candidates applying to job opportunities."
        icon={FiFileText}
      />

      <div className="flex justify-end">
        <Button asChild href={`${ROUTES.dashboard.applications}/new`}>
          <FiPlus className="h-4 w-4" />
          Add application
        </Button>
      </div>

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={applications.length === 0}
        emptyTitle="No applications found"
        emptyDescription="Applications will appear here when candidates apply to jobs."
      >
        <ApplicationTable
          applications={applications}
          onDelete={setSelectedApplication}
        />

        <div className="space-y-4 md:hidden">
          {applications.map((application) => (
            <ApplicationMobileCard
              key={application.id}
              application={application}
              onDelete={setSelectedApplication}
            />
          ))}
        </div>
      </PageState>

      <ConfirmModal
        isOpen={Boolean(selectedApplication)}
        title="Delete application"
        description={`Are you sure you want to delete application ${
          selectedApplication?.id ?? ''
        }? This action cannot be undone.`}
        confirmLabel="Delete application"
        isLoading={isDeleting}
        onClose={() => setSelectedApplication(null)}
        onConfirm={handleDeleteApplication}
      />
    </div>
  )
}
