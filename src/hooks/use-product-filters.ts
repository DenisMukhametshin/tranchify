import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import {
  createDefaultFilters,
  filterProducts,
  FILTER_QUERY_KEYS,
  mergeFiltersIntoParams,
  parseFiltersFromParams,
  serializeFilters,
} from '@/helpers/product-filters'
import { filtersSchema } from '@/schemas/filters-schema'
import type { Product, ProductFilterFormValues, UseProductFiltersResult } from '@/types'

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

  const filteredProducts = useMemo(() => filterProducts(products, filters), [filters, products])

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
