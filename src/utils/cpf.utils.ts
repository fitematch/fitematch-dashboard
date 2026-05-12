import { onlyNumbers } from './mask.utils'

export function formatCpf(value?: string | null) {
  if (!value) {
    return '-'
  }

  const numbers = onlyNumbers(value)

  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
