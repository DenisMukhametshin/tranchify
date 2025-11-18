import type { Product } from '@/types'

type ProductImagesGalleryProps = {
  product: Product
}

export function ProductImagesGallery({ product }: ProductImagesGalleryProps): JSX.Element {
  const images = product.images && product.images.length > 0 ? product.images : product.thumbnail ? [product.thumbnail] : []

  if (images.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted text-xs uppercase tracking-wide text-muted-foreground">
        No images available
      </div>
    )
  }

  return (
    <section aria-label="Product images" className="space-y-4">
      <figure className="overflow-hidden rounded-2xl border border-border/70 bg-muted">
        <img
          alt={product.title}
          className="h-full w-full max-h-[420px] object-cover"
          loading="lazy"
          src={images[0]}
        />
      </figure>

      {images.length > 1 ? (
        <div
          aria-label="Additional product images"
          className="flex gap-3 overflow-x-auto pb-1"
          role="list"
        >
          {images.map((src, index) => (
            <button
              key={src}
              aria-label={`View image ${index + 1}`}
              className="group relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              type="button"
            >
              <img
                alt={product.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
                loading="lazy"
                src={src}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}


