import { useCallback, useEffect, useRef, useState } from 'react'

import type { Product, ProductListResponse } from '@/types'

const PRODUCTS_ENDPOINT = 'https://dummyjson.com/products'
const DEFAULT_ERROR_MESSAGE = 'Unable to load products. Please try again.'

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export function useProducts(): {
  products: Product[]
  status: FetchStatus
  error: string | null
  refetch: () => void
} {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<FetchStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const requestProducts = useCallback(async (signal?: AbortSignal) => {
    setStatus('loading')
    setError(null)

    try {
      const response = await fetch(PRODUCTS_ENDPOINT, { signal })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = (await response.json()) as ProductListResponse
      setProducts(data.products ?? [])
      setStatus('success')
    } catch (caughtError) {
      if ((caughtError as Error).name === 'AbortError') {
        return
      }

      setStatus('error')
      setError((caughtError as Error).message || DEFAULT_ERROR_MESSAGE)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    abortControllerRef.current = controller

    void requestProducts(controller.signal)

    return () => {
      controller.abort()
      abortControllerRef.current = null
    }
  }, [requestProducts])

  const refetch = useCallback(() => {
    abortControllerRef.current?.abort()

    const controller = new AbortController()
    abortControllerRef.current = controller

    void requestProducts(controller.signal)
  }, [requestProducts])

  return {
    products,
    status,
    error,
    refetch,
  }
}

