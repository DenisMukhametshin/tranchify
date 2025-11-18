import { useCallback, useEffect, useState } from 'react'

type ProductImageCarouselProps = {
  images: string[]
  title: string
}

export function ProductImageCarousel({ images, title }: ProductImageCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)
  const hasMultipleImages = images.length > 1

  // Reset to first image when images change
  useEffect(() => {
    setCurrentIndex(0)
  }, [images])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!hasMultipleImages) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [hasMultipleImages, goToPrevious, goToNext])

  if (images.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-border/60 bg-muted">
        <p className="text-sm text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full" role="region" aria-label="Product image carousel">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative min-w-full">
              <img
                alt=""
                className="h-full w-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                src={image}
              />
            </div>
          ))}
        </div>
      </div>

      {hasMultipleImages ? (
        <>
          <button
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={goToPrevious}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={goToNext}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Image thumbnails">
            {images.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to image ${index + 1}`}
                aria-selected={index === currentIndex}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                }`}
                onClick={() => goToImage(index)}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

