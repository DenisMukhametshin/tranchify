import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { ProductEditForm, StatePlaceholder } from '@/components'
import { useAuth, useEditedProducts, useProductDetails } from '@/hooks'
import { editFormSchema } from '@/schemas/edit-form-schema'
import type { Product , ProductEditFormValues } from '@/types'

export function ProductEditPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { product, status, error } = useProductDetails(id || '')
  const { getEditedProduct, setEditedProduct } = useEditedProducts()

  const editedProduct: Product | null = product ? getEditedProduct(product.id) : null
  const productToEdit: Product | null = editedProduct ?? product

  const form = useForm<ProductEditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: '',
      price: 0,
      rating: undefined,
      discountPercentage: undefined,
      description: '',
    },
  })

  useEffect(() => {
    if (productToEdit) {
      form.reset({
        title: productToEdit.title,
        price: productToEdit.price,
        rating: productToEdit.rating,
        discountPercentage: productToEdit.discountPercentage,
        description: productToEdit.description || '',
      })
    }
  }, [productToEdit, form])

  if (!id) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <StatePlaceholder
          description="The product ID is missing from the URL."
          title="Invalid product URL"
          tone="error"
        />
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <StatePlaceholder
          description="Please log in to edit products."
          title="Authentication required"
          tone="error"
        />
      </section>
    )
  }

  if (status === 'loading') {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <div className="space-y-6">
          <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
          <div className="space-y-4">
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-48 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>
    )
  }

  if (status === 'error' || !product || !productToEdit) {
    const isNotFound = error?.toLowerCase().includes('not found')

    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
        <StatePlaceholder
          description={
            isNotFound
              ? 'The product you are trying to edit does not exist or has been removed.'
              : error || 'Unable to load product details.'
          }
          title={isNotFound ? 'Product not found' : 'Error loading product'}
          tone="error"
        />
      </section>
    )
  }

  const handleSubmit = (values: ProductEditFormValues): void => {
    if (!product) {
      return
    }

    const updatedProduct: Product = {
      ...product,
      title: values.title,
      price: values.price,
      rating: values.rating,
      discountPercentage: values.discountPercentage,
      description: values.description || product.description,
    }

    setEditedProduct(updatedProduct)
    navigate(`/product/${id}`)
  }

  const handleCancel = (): void => {
    navigate(`/product/${id}`)
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 md:py-12">
      <div className="space-y-6">
        <div className="space-y-1.5 sm:space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Edit Product</h1>
          <p className="text-xs text-muted-foreground sm:text-sm">Make changes to the product information below.</p>
        </div>

        <ProductEditForm form={form} onCancel={handleCancel} onSubmit={handleSubmit} product={productToEdit} />
      </div>
    </section>
  )
}
