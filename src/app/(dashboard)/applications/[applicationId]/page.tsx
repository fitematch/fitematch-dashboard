'use client'

import { useParams } from 'next/navigation'
import { FiFileText } from 'react-icons/fi'

import { ApplicationForm } from '@/components/applications/application-form'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { useApplication } from '@/hooks/use-application'

export default function ApplicationEditPage() {
  const params = useParams<{ applicationId: string }>()
  const { application, isLoading, error } = useApplication(params.applicationId)

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Edit application"
        description="Update application status and review candidate progress."
        icon={FiFileText}
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={!application}
        emptyTitle="Application not found"
        emptyDescription="The requested application could not be found."
      >
        {application ? <ApplicationForm application={application} /> : null}
      </PageState>
    </div>
  )
}
