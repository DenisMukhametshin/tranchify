import { filtersSchema } from '@/schemas/filters-schema'
import type { ProductFilterFormValues , Product } from '@/types'


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

export const DEFAULT_FILTERS: ProductFilterFormValues = {
  search: '',
  categories: [],
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  discountedOnly: false,
  minDiscountPercent: undefined,
}

export function createDefaultFilters(): ProductFilterFormValues {
  return {
    ...DEFAULT_FILTERS,
    categories: [],
  }
}

export function parseFiltersFromParams(params: URLSearchParams): ProductFilterFormValues {
  const raw = {
    search: params.get('search') ?? undefined,
    categories: parseCategoryParam(params.get('categories')),
    minPrice: parseNumberParam(params.get('minPrice')),
    maxPrice: parseNumberParam(params.get('maxPrice')),
    rating: parseNumberParam(params.get('rating')),
    discountedOnly: parseBooleanParam(params.get('discountedOnly')),
    minDiscountPercent: parseNumberParam(params.get('minDiscountPercent')),
  }

  const parsed = filtersSchema.safeParse(raw)

  if (parsed.success) {
    return {
      ...parsed.data,
      categories: Array.from(new Set(parsed.data.categories)),
    }
  }

  return createDefaultFilters()
}

export function filterProducts(products: Product[], filters: ProductFilterFormValues): Product[] {
  return products.filter((product) => {
    if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false
    }

    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false
    }

    if (filters.rating !== undefined) {
      if (typeof product.rating !== 'number') {
        return false
      }

      if (product.rating < filters.rating) {
        return false
      }
    }

    if (filters.discountedOnly) {
      if (typeof product.discountPercentage !== 'number') {
        return false
      }

      if (
        typeof filters.minDiscountPercent === 'number' &&
        product.discountPercentage < filters.minDiscountPercent
      ) {
        return false
      }
    }

    return true
  })
}

