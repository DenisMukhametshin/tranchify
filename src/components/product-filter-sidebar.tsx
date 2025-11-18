import { useState } from 'react'

import type { ProductFilterFormValues } from '@/hooks/use-product-filters'

import { ProductFilterForm } from './product-filter-form'

import type { UseFormReturn } from 'react-hook-form'

type ProductFilterSidebarProps = {
  form: UseFormReturn<ProductFilterFormValues>
  categories: string[]
  hasActiveFilters: boolean
  hasDiscountData: boolean
  hasRatingData: boolean
  ratingOptions: number[]
  onReset: () => void
}

export function ProductFilterSidebar({
  form,
  categories,
  hasActiveFilters,
  hasDiscountData,
  hasRatingData,
  ratingOptions,
  onReset,
}: ProductFilterSidebarProps): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = (): void => setIsDrawerOpen(false)
  const openDrawer = (): void => setIsDrawerOpen(true)

  const handleReset = (): void => {
    onReset()
    closeDrawer()
  }

  return (
    <>
      <div className="mb-6 md:hidden">
        <button
          aria-expanded={isDrawerOpen}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-sm"
          onClick={openDrawer}
          type="button"
        >
          Filters
          {hasActiveFilters ? <span className="inline-flex h-2 w-2 rounded-full bg-primary" /> : null}
        </button>
      </div>

      {isDrawerOpen ? (
        <button
          aria-label="Close filters"
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={closeDrawer}
          type="button"
        />
      ) : null}

      <div
        aria-modal={isDrawerOpen ? true : undefined}
        className={[
          'fixed inset-y-0 left-0 z-50 h-full w-80 overflow-y-auto bg-background p-6 shadow-2xl transition-transform duration-300 md:static md:z-auto md:h-auto md:w-72 md:translate-x-0 md:rounded-3xl md:border md:border-border/60 md:bg-card/40 md:p-6 md:shadow-none',
          'hidden md:block',
          isDrawerOpen ? 'translate-x-0 block' : '-translate-x-full',
        ].join(' ')}
        role={isDrawerOpen ? 'dialog' : 'complementary'}
      >
        {isDrawerOpen ? (
          <div className="mb-4 flex justify-end md:hidden">
            <button className="text-sm font-semibold text-primary" onClick={closeDrawer} type="button">
              Close
            </button>
          </div>
        ) : null}
        <ProductFilterForm
          categories={categories}
          form={form}
          hasActiveFilters={hasActiveFilters}
          hasDiscountData={hasDiscountData}
          hasRatingData={hasRatingData}
          onReset={handleReset}
          ratingOptions={ratingOptions}
        />
      </div>
    </>
  )
}


