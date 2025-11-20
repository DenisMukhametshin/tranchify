import { useCallback, useState } from 'react'

import type { Product } from '@/types'

type EditedProducts = Record<number, Product>

const editedProductsStore: EditedProducts = {}

export function useProductEdits(): {
  getEditedProduct: (productId: number) => Product | null
  setEditedProduct: (product: Product) => void
  clearEditedProduct: (productId: number) => void
} {
  const [, setUpdateTrigger] = useState(0)

  const getEditedProduct = useCallback((productId: number): Product | null => {
    return editedProductsStore[productId] ?? null
  }, [])

  const setEditedProduct = useCallback((product: Product) => {
    editedProductsStore[product.id] = product
    setUpdateTrigger((prev) => prev + 1)
  }, [])

  const clearEditedProduct = useCallback((productId: number) => {
    delete editedProductsStore[productId]
    setUpdateTrigger((prev) => prev + 1)
  }, [])

  return {
    getEditedProduct,
    setEditedProduct,
    clearEditedProduct,
  }
}

