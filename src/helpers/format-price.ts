const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) {
    return '—'
  }

  return usdFormatter.format(value)
}

