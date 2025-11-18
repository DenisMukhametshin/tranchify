import type { ReactNode } from 'react'

import type { Product } from '@/types'

import { ProductDetailsMetadata } from './product-details-metadata'
import { ProductImagesGallery } from './product-images-gallery'
import { StatePlaceholder } from './state-placeholder'

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

type ProductDetailsLayoutProps = {
  product: Product | null
  status: FetchStatus
  error: string | null
  onBack: () => void
  onRetry: () => void
}

export function ProductDetailsLayout({
  product,
  status,
  error,
  onBack,
  onRetry,
}: ProductDetailsLayoutProps): JSX.Element {
  const showContent = status === 'success' && product
  const showError = status === 'error'
  const showLoading = status === 'loading' || (status === 'idle' && !product)

  const headerAction: ReactNode = (
    <button
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[10px] font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 sm:py-2 sm:text-xs"
      onClick={onBack}
      type="button"
    >
      <span aria-hidden="true">←</span>
      <span>Back to products</span>
    </button>
  )

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8 md:py-12">
      <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70 sm:text-xs">Product details</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Overview</h1>
        </div>
        {headerAction}
      </header>

      {showLoading ? (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-6 w-3/4 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-muted" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-3 w-11/12 animate-pulse rounded-lg bg-muted" />
              <div className="h-3 w-10/12 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      ) : null}

      {showContent ? (
        <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <ProductImagesGallery product={product} />
          <ProductDetailsMetadata product={product} />
        </div>
      ) : null}

      {showError ? (
        <div className="mt-8">
          <StatePlaceholder
            description={error ?? 'We could not load this product. Please try again or return to the catalog.'}
            tone="error"
            title="We ran into an issue loading this product."
            action={
              <button
                className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
                onClick={onRetry}
                type="button"
              >
                Try again
              </button>
            }
          />
        </div>
      ) : null}

      {!showLoading && !showContent && !showError ? (
        <div className="mt-8">
          <StatePlaceholder
            description="We could not find this product. It may have been removed or the link is invalid."
            title="Product not found"
            action={headerAction}
          />
        </div>
      ) : null}
    </section>
  )
}


