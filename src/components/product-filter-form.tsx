import type { ProductFilterFormValues } from '@/hooks/use-product-filters'

import type { UseFormReturn } from 'react-hook-form'

type ProductFilterFormProps = {
  form: UseFormReturn<ProductFilterFormValues>
  categories: string[]
  hasActiveFilters: boolean
  hasDiscountData: boolean
  hasRatingData: boolean
  ratingOptions: number[]
  onReset: () => void
}

export function ProductFilterForm({
  form,
  categories,
  hasActiveFilters,
  hasDiscountData,
  hasRatingData,
  ratingOptions,
  onReset,
}: ProductFilterFormProps): JSX.Element {
  const {
    register,
    setValue,
    formState: { errors },
  } = form

  const selectedCategories = form.watch('categories') ?? []
  const discountedOnly = form.watch('discountedOnly')
  const hasMinPrice = typeof form.watch('minPrice') === 'number'

  const clearCategories = (): void => {
    setValue('categories', [], { shouldDirty: true, shouldValidate: true })
  }

  const parseInputNumber = (value: string | number): number | undefined => {
    if (value === '' || value === null || typeof value === 'undefined') {
      return undefined
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  return (
    <form className="flex flex-col gap-4 sm:gap-6" onSubmit={(event) => event.preventDefault()}>
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-base font-semibold sm:text-lg">Filters</p>
          <p className="text-[10px] text-muted-foreground sm:text-xs">Refine the live catalog in real time.</p>
        </div>
        <button
          className="text-xs font-semibold uppercase tracking-widest text-primary disabled:opacity-40"
          disabled={!hasActiveFilters}
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="filter-search">
          Search
        </label>
        <input
          id="filter-search"
          placeholder="Search by product title"
          type="search"
          {...register('search')}
          className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Categories</span>
          <button
            className="text-xs font-semibold uppercase tracking-widest text-primary disabled:opacity-40"
            disabled={selectedCategories.length === 0}
            onClick={clearCategories}
            type="button"
          >
            All
          </button>
        </div>
        {categories.length > 0 ? (
          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {categories.map((category) => (
              <label className="flex items-center gap-2 text-sm text-foreground" key={category}>
                <input
                  className="h-4 w-4 rounded border-border focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  type="checkbox"
                  value={category}
                  {...register('categories')}
                />
                <span className="capitalize text-muted-foreground">{formatCategoryLabel(category)}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Categories will appear once products finish loading.</p>
        )}
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Price range</span>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="filter-min-price">
              Min
            </label>
            <input
              id="filter-min-price"
              inputMode="numeric"
              min={0}
              placeholder="0"
              step="1"
              type="number"
              {...register('minPrice', {
                setValueAs: parseInputNumber,
              })}
              className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="filter-max-price">
              Max
            </label>
            <input
              id="filter-max-price"
              disabled={!hasMinPrice}
              inputMode="numeric"
              min={0}
              placeholder="0"
              step="1"
              type="number"
              {...register('maxPrice', {
                setValueAs: parseInputNumber,
              })}
              className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.maxPrice ? <p className="text-xs text-destructive">{errors.maxPrice.message}</p> : null}
          </div>
        </div>
      </div>

      {hasRatingData ? (
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="filter-rating">
            Rating
          </label>
          <select
            id="filter-rating"
            {...register('rating', {
              setValueAs: parseInputNumber,
            })}
            className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Any rating</option>
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating}+ stars
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {hasDiscountData ? (
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-foreground">
            <input
              className="h-4 w-4 rounded border-border focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              type="checkbox"
              {...register('discountedOnly')}
            />
            Discounted only
          </label>
          {discountedOnly ? (
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground" htmlFor="filter-discount-percent">
                Minimum discount %
              </label>
              <input
                id="filter-discount-percent"
                inputMode="numeric"
                max={100}
                min={0}
                placeholder="0"
                step="1"
                type="number"
                {...register('minDiscountPercent', {
                  setValueAs: parseInputNumber,
                })}
                className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.minDiscountPercent ? (
                <p className="text-xs text-destructive">{errors.minDiscountPercent.message}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Filters update instantly and persist in the URL, so you can share or refresh without losing state.
      </p>
    </form>
  )
}

function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}


