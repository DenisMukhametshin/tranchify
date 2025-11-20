import { useParams } from 'react-router-dom'

import { ProductImageCarousel, ProductDetailsMetadata, StatePlaceholder } from '@/components'
import { useAuth, useEditedProducts, useProductDetails } from '@/hooks'
import type { Product } from '@/types'

export function ProductDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const { getEditedProduct } = useEditedProducts()
  const { product: fetchedProduct, status, error, refetch } = useProductDetails(id || '')
  
  const editedProduct: Product | null = fetchedProduct ? getEditedProduct(fetchedProduct.id) : null
  const product: Product | null = editedProduct ?? fetchedProduct

  if (!id) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <StatePlaceholder
          description="The product ID is missing from the URL."
          title="Invalid product URL"
          tone="error"
        />
      </section>
    )
  }

  if (status === 'loading') {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>
    )
  }

  if (status === 'error' || !product) {
    const isNotFound = error?.toLowerCase().includes('not found')

    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <StatePlaceholder
          description={
            isNotFound
              ? 'The product you are looking for does not exist or has been removed.'
              : error || 'Unable to load product details.'
          }
          title={isNotFound ? 'Product not found' : 'Error loading product'}
          tone="error"
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
      </section>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : []

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <div>
          {images.length > 0 ? (
            <ProductImageCarousel images={images} />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border/60 bg-muted">
              <p className="text-sm text-muted-foreground">No images available</p>
            </div>
          )}
        </div>

        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <ProductDetailsMetadata isAuthenticated={isAuthenticated} product={product} />
        </div>
      </div>
    </section>
  )
}
