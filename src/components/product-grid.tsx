import type { Product } from '@/types'

import { ProductCard } from './product-card'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps): JSX.Element {
  return (
    <div
      aria-live="polite"
      className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

