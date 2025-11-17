import { ProductGrid, ProductGridSkeleton, StatePlaceholder } from '@/components'
import { useProducts } from '@/hooks'

export function ProductsPage(): JSX.Element {
  const { products, status, error, refetch } = useProducts()
  const hasProducts = products.length > 0

  const showGrid = status === 'success' && hasProducts
  const showEmpty = status === 'success' && !hasProducts
  const showError = status === 'error'

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-10 space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">Live catalog</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Products</h1>
          <p className="text-base text-muted-foreground">
            Fetched in real time from DummyJSON and rendered as a concise, responsive grid.
          </p>
        </div>
      </header>

      {status === 'loading' ? <ProductGridSkeleton /> : null}

      {showGrid ? <ProductGrid products={products} /> : null}

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
