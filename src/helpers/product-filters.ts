import type { ProductFilterFormValues } from '@/hooks/use-product-filters'

export const FILTER_QUERY_KEYS = [
  'search',
  'categories',
  'minPrice',
  'maxPrice',
  'rating',
  'discountedOnly',
  'minDiscountPercent',
] as const

export function parseNumberParam(value: string | null): number | undefined {
  if (value === null || value === '') {
    return undefined
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function parseCategoryParam(value: string | null): string[] {
  if (!value) {
    return []
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function parseBooleanParam(value: string | null): boolean | undefined {
  if (value === null) {
    return undefined
  }

  return value === '1' || value === 'true'
}

export function serializeFilters(filters: ProductFilterFormValues): string {
  return JSON.stringify({
    search: filters.search.trim(),
    categories: [...filters.categories].sort(),
    minPrice: filters.minPrice ?? null,
    maxPrice: filters.maxPrice ?? null,
    rating: filters.rating ?? null,
    discountedOnly: filters.discountedOnly,
    minDiscountPercent: filters.minDiscountPercent ?? null,
  })
}

export function mergeFiltersIntoParams(
  currentParams: URLSearchParams,
  filters: ProductFilterFormValues,
): URLSearchParams {
  const next = new URLSearchParams(currentParams)
  FILTER_QUERY_KEYS.forEach((key) => next.delete(key))

  if (filters.search.trim().length > 0) {
    next.set('search', filters.search.trim())
  }

  if (filters.categories.length > 0) {
    next.set('categories', filters.categories.join(','))
  }

  if (typeof filters.minPrice === 'number') {
    next.set('minPrice', String(filters.minPrice))
  }

  if (typeof filters.maxPrice === 'number') {
    next.set('maxPrice', String(filters.maxPrice))
  }

  if (typeof filters.rating === 'number') {
    next.set('rating', String(filters.rating))
  }

  if (filters.discountedOnly) {
    next.set('discountedOnly', '1')

    if (typeof filters.minDiscountPercent === 'number') {
      next.set('minDiscountPercent', String(filters.minDiscountPercent))
    }
  }

  return next
}

