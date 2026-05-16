'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { EmailTemplate } from '@/services/settings/email-template.types'

type EmailTemplateCardProps = {
  template: EmailTemplate
  isSelected: boolean
  onSelect: (template: EmailTemplate) => void
}

export function EmailTemplateCard({
  template,
  isSelected,
  onSelect,
}: EmailTemplateCardProps) {
  return (
    <Card className={isSelected ? 'border-green-500/60' : undefined}>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-100">{template.name}</h2>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              {template.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {template.variables.map((variable) => (
                <Badge key={variable.key} variant="neutral">
                  {variable.key}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant={isSelected ? 'primary' : 'secondary'}
            onClick={() => onSelect(template)}
          >
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}