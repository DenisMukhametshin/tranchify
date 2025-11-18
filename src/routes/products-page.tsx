import { ProductFilterSidebar, ProductGrid, ProductGridSkeleton, StatePlaceholder } from '@/components'
import { useProductFilters, useProducts } from '@/hooks'

export function ProductsPage(): JSX.Element {
  const { products, status, error, refetch } = useProducts()
  const filtersApi = useProductFilters(products)
  const filteredProducts = filtersApi.filteredProducts
  const hasProducts = products.length > 0
  const hasFilteredProducts = filteredProducts.length > 0

  const showGrid = status === 'success' && hasFilteredProducts
  const showEmpty = status === 'success' && !hasProducts
  const showFilteredEmpty = status === 'success' && hasProducts && !hasFilteredProducts
  const showError = status === 'error'

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
      <header className="mb-6 space-y-3 text-center sm:mb-8 sm:space-y-4 md:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70 sm:text-xs">Live catalog</p>
        <div className="space-y-1.5 sm:space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl sm:text-4xl">Products</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Fetched in real time from DummyJSON, filterable with schema-driven controls that persist in the URL.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 md:flex-row md:gap-10 md:items-start">
        <ProductFilterSidebar
          categories={filtersApi.categories}
          form={filtersApi.form}
          hasActiveFilters={filtersApi.hasActiveFilters}
          hasDiscountData={filtersApi.hasDiscountData}
          hasRatingData={filtersApi.hasRatingData}
          onReset={filtersApi.resetFilters}
          ratingOptions={filtersApi.ratingOptions}
        />

        <div className="flex-1 space-y-8">
          {status === 'loading' ? <ProductGridSkeleton /> : null}

          {showGrid ? <ProductGrid products={filteredProducts} /> : null}

          {showFilteredEmpty ? (
            <StatePlaceholder
              description="No products match the current filters. Try broadening your query or resetting the panel."
              title="Filters returned zero results"
              action={
                <button
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                  onClick={filtersApi.resetFilters}
                  type="button"
                >
                  Reset filters
                </button>
              }
            />
          ) : null}

          {showEmpty ? (
            <StatePlaceholder
              description="We could not find any products to display. Please try refreshing the catalog."
              title="No products available"
              action={
                <button
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                  onClick={refetch}
                  type="button"
                >
                  Refresh catalog
                </button>
              }
            />
          ) : null}
        </div>
      </div>

      {showError && error ? (
        <StatePlaceholder
          description={error}
          tone="error"
          title="We ran into an issue fetching products."
          action={
            <button
              className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
              onClick={refetch}
              type="button"
            >
              Try again
            </button>
          }
        />
      ) : null}
    </section>
  )
}
