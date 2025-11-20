import { createContext, useCallback, useContext, useState } from 'react'

import type { Product } from '@/types'

type EditedProductsMap = Map<number, Product>

type EditedProductsContextValue = {
  getEditedProduct: (productId: number) => Product | null
  setEditedProduct: (product: Product) => void
  clearEditedProduct: (productId: number) => void
  clearAllEditedProducts: () => void
}

const EditedProductsContext = createContext<EditedProductsContextValue | null>(null)

export function EditedProductsProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [editedProducts, setEditedProducts] = useState<EditedProductsMap>(() => new Map())

  const getEditedProduct = useCallback(
    (productId: number): Product | null => {
      return editedProducts.get(productId) ?? null
    },
    [editedProducts],
  )

  const setEditedProduct = useCallback((product: Product): void => {
    setEditedProducts((prev) => {
      const newMap = new Map(prev)
      newMap.set(product.id, product)
      return newMap
    })
  }, [])

  const clearEditedProduct = useCallback((productId: number): void => {
    setEditedProducts((prev) => {
      const newMap = new Map(prev)
      newMap.delete(productId)
      return newMap
    })
  }, [])

  const clearAllEditedProducts = useCallback((): void => {
    setEditedProducts(new Map())
  }, [])

  return (
    <EditedProductsContext.Provider
      value={{
        getEditedProduct,
        setEditedProduct,
        clearEditedProduct,
        clearAllEditedProducts,
      }}
    >
      {children}
    </EditedProductsContext.Provider>
  )
}

export function useEditedProducts(): EditedProductsContextValue {
  const context = useContext(EditedProductsContext)
  if (!context) {
    throw new Error('useEditedProducts must be used within EditedProductsProvider')
  }
  return context
}

