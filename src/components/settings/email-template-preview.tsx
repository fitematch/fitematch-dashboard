import type { EmailTemplate } from '@/services/settings/email-template.types'

type EmailTemplatePreviewProps = {
  template: EmailTemplate
}

function replacePreviewVariables(value: string) {
  return value
    .replaceAll('{{userName}}', 'Thiago')
    .replaceAll('{{activationCode}}', '482913')
    .replaceAll('{{companyName}}', 'Academia Fit Pro')
    .replaceAll('{{jobTitle}}', 'Personal Trainer')
    .replaceAll('{{candidateName}}', 'Maria Silva')
    .replaceAll('{{applicationStatus}}', 'reviewing')
    .replaceAll('{{reason}}', 'Missing required business information')
}

export function EmailTemplatePreview({ template }: EmailTemplatePreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-white text-slate-950">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          fitematch
        </p>

        <h3 className="mt-2 text-lg font-bold">{template.subject}</h3>

        <p className="mt-1 text-sm text-slate-500">{template.preheader}</p>
      </div>

      <div className="px-6 py-8">
        <p className="text-sm leading-6 text-slate-700">
          {replacePreviewVariables(template.body)}
        </p>

        <div className="mt-8 rounded-2xl bg-slate-950 px-5 py-4 text-white">
          <p className="text-sm font-semibold">fitematch</p>
          <p className="mt-1 text-xs text-slate-400">
            Fit de profissionais. Match de resultados.
          </p>
        </div>
      </div>
    </div>
  )
}
