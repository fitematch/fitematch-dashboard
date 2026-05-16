'use client'

import { useState } from 'react'
import { FiMail } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { EmailTemplateCard } from '@/components/settings/email-template-card'
import { EmailTemplatePreview } from '@/components/settings/email-template-preview'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { EMAIL_TEMPLATES } from '@/constants/email-templates'
import type { EmailTemplate } from '@/services/settings/email-template.types'

export default function EmailTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(
    EMAIL_TEMPLATES[0],
  )

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Email templates"
        description="Review transactional email templates and preview how users will see them."
        icon={FiMail}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(380px,460px)]">
        <div className="space-y-4">
          {EMAIL_TEMPLATES.map((template) => (
            <EmailTemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate.id === template.id}
              onSelect={setSelectedTemplate}
            />
          ))}
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-100">
                Preview
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Example render using placeholder values.
              </p>
            </CardHeader>

            <CardContent>
              <EmailTemplatePreview template={selectedTemplate} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
