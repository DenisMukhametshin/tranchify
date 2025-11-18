import { Link } from 'react-router-dom'

import { formatPrice } from '@/helpers'
import type { Product } from '@/types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const hasRating = typeof product.rating === 'number'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        aria-label={`View details for ${product.title}`}
        className="relative block aspect-video w-full bg-muted"
        to={`/product/${product.id}`}
      >
        {product.thumbnail ? (
          <img
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={product.thumbnail}
            width={400}
            height={225}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-wide text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">{product.category}</p>
          <Link
            className="text-lg font-semibold leading-tight transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            to={`/product/${product.id}`}
          >
            {product.title}
          </Link>
        </header>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-base font-semibold">{formatPrice(product.price)}</span>

          {hasRating ? (
            <span
              aria-label={`Rating ${product.rating?.toFixed(1)} out of 5`}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"
            >
              <span aria-hidden="true">★</span>
              <span>{product.rating?.toFixed(1)}</span>
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">No rating yet</span>
          )}
        </div>
      </div>
    </article>
  )
}

