import { useCallback, useEffect, useRef, useState } from 'react'

import type { Product } from '@/types'

const DEFAULT_ERROR_MESSAGE = 'Unable to load product details. Please try again.'

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export function useProductDetails(
  productId: string,
  initialProduct?: Product,
): {
  product: Product | null
  status: FetchStatus
  error: string | null
  refetch: () => void
} {
  const [product, setProduct] = useState<Product | null>(initialProduct ?? null)
  const [status, setStatus] = useState<FetchStatus>(initialProduct ? 'success' : 'idle')
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const requestProduct = useCallback(
    async (signal?: AbortSignal) => {
      setStatus('loading')
      setError(null)

      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, { signal })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found')
          }
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as Product
        setProduct(data)
        setStatus('success')
      } catch (caughtError) {
        if ((caughtError as Error).name === 'AbortError') {
          return
        }

        setStatus('error')
        setError((caughtError as Error).message || DEFAULT_ERROR_MESSAGE)
        setProduct(null)
      }
    },
    [productId],
  )

  useEffect(() => {
    // If we have initial product, still fetch to get fresh data
    // but show initial product immediately for better UX
    const controller = new AbortController()
    abortControllerRef.current = controller

    void requestProduct(controller.signal)

    return () => {
      controller.abort()
      abortControllerRef.current = null
    }
  }, [requestProduct])

  const refetch = useCallback(() => {
    abortControllerRef.current?.abort()

    const controller = new AbortController()
    abortControllerRef.current = controller

    void requestProduct(controller.signal)
  }, [requestProduct])

  return {
    product,
    status,
    error,
    refetch,
  }
}
