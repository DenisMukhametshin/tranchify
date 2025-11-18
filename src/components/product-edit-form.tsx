import { Bold } from '@tiptap/extension-bold'
import { BulletList } from '@tiptap/extension-bullet-list'
import { Document } from '@tiptap/extension-document'
import { Italic } from '@tiptap/extension-italic'
import { ListItem } from '@tiptap/extension-list-item'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import {  type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import type { Product } from '@/types'

export const editFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  rating: z
    .number()
    .min(0, { message: 'Rating must be at least 0.' })
    .max(5, { message: 'Rating must be at most 5.' })
    .optional(),
  discountPercentage: z
    .number()
    .min(0, { message: 'Discount must be at least 0.' })
    .max(100, { message: 'Discount must be at most 100.' })
    .optional(),
  description: z.string().optional(),
})

export type ProductEditFormValues = z.infer<typeof editFormSchema>

type ProductEditFormProps = {
  product: Product
  form: UseFormReturn<ProductEditFormValues>
  onSubmit: (values: ProductEditFormValues) => void
  onCancel: () => void
}

export function ProductEditForm({ product, form, onSubmit, onCancel }: ProductEditFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Italic, BulletList, OrderedList, ListItem],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none [&_*]:focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setValue('description', editor.getHTML(), { shouldDirty: true, shouldValidate: false })
    },
  })

  // Initialize editor with product description when both are available
  useEffect(() => {
    if (editor && product.description !== undefined) {
      const currentContent = editor.getHTML()
      const productDescription = product.description || ''
      // Only update if content is different to avoid unnecessary updates
      if (currentContent !== productDescription && currentContent !== `<p>${productDescription}</p>`) {
        editor.commands.setContent(productDescription)
      }
    }
  }, [editor, product.description])

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e)
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="edit-title">
          Title <span className="text-destructive">*</span>
        </label>
        <input
          id="edit-title"
          {...register('title')}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
        />
        {errors.title ? <p className="text-xs text-destructive">{errors.title.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="edit-price">
          Price <span className="text-destructive">*</span>
        </label>
        <input
          id="edit-price"
          {...register('price', {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          inputMode="decimal"
          min="0"
          step="any"
          type="number"
        />
        {errors.price ? <p className="text-xs text-destructive">{errors.price.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="edit-rating">
          Rating (0-5)
        </label>
        <input
          id="edit-rating"
          {...register('rating', {
            valueAsNumber: true,
            setValueAs: (value) => {
              if (value === '' || value === null || value === undefined) {
                return undefined
              }
              const parsed = Number(value)
              return Number.isFinite(parsed) ? parsed : undefined
            },
          })}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          inputMode="decimal"
          max="5"
          min="0"
          step="any"
          type="number"
        />
        {errors.rating ? <p className="text-xs text-destructive">{errors.rating.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="edit-discount">
          Discount Percentage (0-100)
        </label>
        <input
          id="edit-discount"
          {...register('discountPercentage', {
            valueAsNumber: true,
            setValueAs: (value) => {
              if (value === '' || value === null || value === undefined) {
                return undefined
              }
              const parsed = Number(value)
              return Number.isFinite(parsed) ? parsed : undefined
            },
          })}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          inputMode="decimal"
          max="100"
          min="0"
          step="any"
          type="number"
        />
        {errors.discountPercentage ? (
          <p className="text-xs text-destructive">{errors.discountPercentage.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="edit-description">
          Description
        </label>
        <div className="min-h-[200px] rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary">
          {editor ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 border-b border-border p-2">
                <button
                  className={`rounded px-2 py-1 text-sm transition ${
                    editor.isActive('bold') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBold().run()
                  }}
                  type="button"
                >
                  <strong>B</strong>
                </button>
                <button
                  className={`rounded px-2 py-1 text-sm transition ${
                    editor.isActive('italic') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleItalic().run()
                  }}
                  type="button"
                >
                  <em>I</em>
                </button>
                <button
                  className={`rounded px-2 py-1 text-sm transition ${
                    editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBulletList().run()
                  }}
                  type="button"
                >
                  •
                </button>
                <button
                  className={`rounded px-2 py-1 text-sm transition ${
                    editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleOrderedList().run()
                  }}
                  type="button"
                >
                  1.
                </button>
              </div>
              <div className="p-4">
                <EditorContent
                  className="focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:min-h-[150px]"
                  editor={editor}
                  id="edit-description"
                />
              </div>
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center p-4">
              <p className="text-sm text-muted-foreground">Loading editor...</p>
            </div>
          )}
        </div>
        {errors.description ? <p className="text-xs text-destructive">{errors.description.message}</p> : null}
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          Save
        </button>
        <button
          className="rounded-lg border border-border bg-background px-6 py-2 text-sm font-medium text-foreground transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={(e) => {
            e.preventDefault()
            onCancel()
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
