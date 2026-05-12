export function formatCurrency(value?: number | null, currency = 'BRL') {
  if (value === null || value === undefined) {
    return '-'
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value)
}
