import { Link } from 'react-router-dom'

import { formatPrice } from '@/helpers'
import type { Product } from '@/types'

type ProductDetailsMetadataProps = {
  product: Product
  isAuthenticated?: boolean
}

export function ProductDetailsMetadata({ product, isAuthenticated = false }: ProductDetailsMetadataProps): JSX.Element {
  const hasRating = typeof product.rating === 'number'
  const hasDiscount = typeof product.discountPercentage === 'number' && product.discountPercentage > 0
  const hasStock = typeof product.stock === 'number'
  const hasBrand = typeof product.brand === 'string' && product.brand.length > 0
  const hasTags = Array.isArray(product.tags) && product.tags.length > 0

  const discountedPrice = hasDiscount && product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {product.category ? (
          <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">{product.category}</p>
        ) : null}

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>

        {hasBrand ? (
          <p className="text-lg text-muted-foreground">
            by <span className="font-semibold text-foreground">{product.brand}</span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
          {hasDiscount ? (
            <>
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
              {product.discountPercentage ? (
                <span
                  aria-label={`${product.discountPercentage}% discount`}
                  className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive"
                >
                  -{product.discountPercentage}%
                </span>
              ) : null}
            </>
          ) : null}
        </div>

        {hasRating ? (
          <div
            aria-label={`Rating ${product.rating?.toFixed(1)} out of 5`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5"
          >
            <span aria-hidden="true" className="text-lg">
              ★
            </span>
            <span className="text-sm font-semibold text-primary">{product.rating?.toFixed(1)}</span>
          </div>
        ) : null}
      </div>

      {hasStock && typeof product.stock === 'number' ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Stock:</span>
          <span
            className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}
          >
            {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </span>
        </div>
      ) : null}

      {product.description ? (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Description</h2>
          <div
            className="prose prose-sm max-w-none text-base leading-relaxed text-muted-foreground [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      ) : null}

      {hasTags ? (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-4 pt-4">
        <Link
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          to="/"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to products
        </Link>
        {isAuthenticated ? (
          <Link
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            to={`/product/${product.id}/edit`}
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit product
          </Link>
        ) : null}
      </div>
    </div>
  )
}
