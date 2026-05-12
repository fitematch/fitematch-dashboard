import { onlyNumbers } from './mask.utils'

export function formatCnpj(value?: string | null) {
  if (!value) {
    return '-'
  }

  const numbers = onlyNumbers(value)

  return numbers.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  )
}