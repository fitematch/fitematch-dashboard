export type EmailTemplateVariable = {
  key: string
  description: string
}

export type EmailTemplate = {
  id: string
  name: string
  description: string
  subject: string
  preheader: string
  body: string
  variables: EmailTemplateVariable[]
}
