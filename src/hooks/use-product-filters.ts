import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import type { Product } from '@/types'

const FILTER_QUERY_KEYS = [
  'search',
  'categories',
  'minPrice',
  'maxPrice',
  'rating',
  'discountedOnly',
  'minDiscountPercent',
] as const

const filtersSchema = z
  .object({
    search: z
      .string()
      .trim()
      .max(100, { message: 'Keep search terms under 100 characters.' })
      .optional(),
    categories: z.array(z.string()).default([]),
    minPrice: z.number().nonnegative().optional(),
    maxPrice: z.number().nonnegative().optional(),
    rating: z.number().min(0).max(5).optional(),
    discountedOnly: z.boolean().optional(),
    minDiscountPercent: z.number().min(0).max(100).optional(),
  })
  .refine(
    (data) => {
      if (data.maxPrice !== undefined && data.minPrice === undefined) {
        return false
      }

      return true
    },
    {
      message: 'Add a minimum price before setting a maximum.',
      path: ['maxPrice'],
    },
  )
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.maxPrice >= data.minPrice
      }

      return true
    },
    {
      message: 'Max price must be greater than or equal to min price.',
      path: ['maxPrice'],
    },
  )
  .transform((data) => ({
    search: data.search ?? '',
    categories: data.categories,
    minPrice: data.minPrice,
    maxPrice: data.maxPrice,
    rating: data.rating,
    discountedOnly: Boolean(data.discountedOnly),
    minDiscountPercent: data.discountedOnly ? data.minDiscountPercent : undefined,
  }))

export type ProductFilterFormValues = z.infer<typeof filtersSchema>

const DEFAULT_FILTERS: ProductFilterFormValues = {
  search: '',
  categories: [],
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  discountedOnly: false,
  minDiscountPercent: undefined,
}

function createDefaultFilters(): ProductFilterFormValues {
  return {
    ...DEFAULT_FILTERS,
    categories: [],
  }
}

type UseProductFiltersResult = {
  form: UseFormReturn<ProductFilterFormValues>
  filteredProducts: Product[]
  categories: string[]
  ratingOptions: number[]
  hasDiscountData: boolean
  hasRatingData: boolean
  hasActiveFilters: boolean
  resetFilters: () => void
}

export function useProductFilters(products: Product[]): UseProductFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilters = useMemo(() => parseFiltersFromParams(searchParams), [searchParams])
  const form = useForm<ProductFilterFormValues>({
    defaultValues: initialFilters,
    resolver: zodResolver(filtersSchema),
    mode: 'onChange',
  })
  const filters = form.watch()

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category))).sort((a, b) => a.localeCompare(b))
  }, [products])

  const ratingOptions = useMemo(() => {
    const ratingValues = products.map((product) => product.rating).filter((value): value is number => typeof value === 'number')

    if (ratingValues.length === 0) {
      return []
    }

    const maxRating = Math.floor(Math.max(...ratingValues))
    const minRating = Math.max(1, Math.floor(Math.min(...ratingValues)))
    const options: number[] = []

    for (let rating = maxRating; rating >= minRating; rating -= 1) {
      options.push(rating)
    }

    return options
  }, [products])

  const hasRatingData = ratingOptions.length > 0
  const hasDiscountData = useMemo(
    () => products.some((product) => typeof product.discountPercentage === 'number'),
    [products],
  )

  const filtersSerializedRef = useRef(serializeFilters(initialFilters))

  useEffect(() => {
    const subscription = form.watch((value) => {
      const parsed = filtersSchema.safeParse(value)

      if (!parsed.success) {
        return
      }

      const serialized = serializeFilters(parsed.data)

      if (serialized === filtersSerializedRef.current) {
        return
      }

      filtersSerializedRef.current = serialized
      setSearchParams(
        (currentParams) => mergeFiltersIntoParams(currentParams, parsed.data),
        { replace: true },
      )
    })

    return () => subscription.unsubscribe()
  }, [form, setSearchParams])

  useEffect(() => {
    const parsed = parseFiltersFromParams(searchParams)
    const nextSerialized = serializeFilters(parsed)
    const currentSerialized = serializeFilters(form.getValues())

    if (nextSerialized !== currentSerialized) {
      filtersSerializedRef.current = nextSerialized
      form.reset(parsed)
    }
  }, [form, searchParams])

  const minPriceValue = form.watch('minPrice')
  useEffect(() => {
    if (minPriceValue === undefined && form.getValues('maxPrice') !== undefined) {
      form.setValue('maxPrice', undefined, { shouldValidate: true, shouldDirty: true })
    }
  }, [form, minPriceValue])

  const discountedOnlyValue = form.watch('discountedOnly')
  useEffect(() => {
    if (!discountedOnlyValue && form.getValues('minDiscountPercent') !== undefined) {
      form.setValue('minDiscountPercent', undefined, { shouldValidate: true, shouldDirty: true })
    }
  }, [discountedOnlyValue, form])

  const filteredProducts = useMemo(() => {
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
  }, [filters, products])

  const hasActiveFilters = serializeFilters(filters) !== serializeFilters(createDefaultFilters())

  const resetFilters = (): void => {
    const defaults = createDefaultFilters()
    filtersSerializedRef.current = serializeFilters(defaults)
    form.reset(defaults)
    setSearchParams(
      (currentParams) => {
        const next = new URLSearchParams(currentParams)
        FILTER_QUERY_KEYS.forEach((key) => next.delete(key))
        return next
      },
      { replace: true },
    )
  }

  return {
    form,
    filteredProducts,
    categories,
    ratingOptions,
    hasDiscountData,
    hasRatingData,
    hasActiveFilters,
    resetFilters,
  }
}

function parseFiltersFromParams(params: URLSearchParams): ProductFilterFormValues {
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

function mergeFiltersIntoParams(
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

function serializeFilters(filters: ProductFilterFormValues): string {
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

function parseNumberParam(value: string | null): number | undefined {
  if (value === null || value === '') {
    return undefined
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function parseCategoryParam(value: string | null): string[] {
  if (!value) {
    return []
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseBooleanParam(value: string | null): boolean | undefined {
  if (value === null) {
    return undefined
  }

  return value === '1' || value === 'true'
}


