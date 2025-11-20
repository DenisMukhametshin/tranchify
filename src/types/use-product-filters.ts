import type { Product } from './product'
import type { ProductFilterFormValues } from './product-filter-form'
import type { UseFormReturn } from 'react-hook-form'

export type UseProductFiltersResult = {
  form: UseFormReturn<ProductFilterFormValues>
  filteredProducts: Product[]
  categories: string[]
  ratingOptions: number[]
  hasDiscountData: boolean
  hasRatingData: boolean
  hasActiveFilters: boolean
  resetFilters: () => void
}

