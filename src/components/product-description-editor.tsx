import { useEditor, EditorContent } from '@tiptap/react'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { useEffect } from 'react'
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form'

type ProductDescriptionEditorProps = {
  initialContent: string
  setValue: UseFormSetValue<{
    title: string
    price: number
    rating?: number
    discountPercentage?: number
    description: string
  }>
  watch: UseFormWatch<{
    title: string
    price: number
    rating?: number
    discountPercentage?: number
    description: string
  }>
  error?: string
}

export function ProductDescriptionEditor({
  initialContent,
  setValue,
  watch,
  error,
}: ProductDescriptionEditorProps): JSX.Element {
  const description = watch('description')

  const editor = useEditor({
    extensions: [Bold, Italic, BulletList, OrderedList, ListItem, Paragraph, Text],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setValue('description', html, { shouldValidate: true, shouldDirty: true })
    },
    editorProps: {
      attributes: {
        class:
          'focus:outline-none min-h-[200px] px-4 py-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:my-1 [&_strong]:font-bold [&_em]:italic',
      },
    },
  })

  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description || initialContent)
    }
  }, [editor, description, initialContent])

  if (!editor) {
    return (
      <div className="min-h-[200px] animate-pulse rounded-2xl border border-border bg-muted" />
    )
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="description-editor">
        Description
      </label>
      <div
        className={`rounded-2xl border ${
          error ? 'border-destructive' : 'border-border'
        } bg-background focus-within:ring-2 focus-within:ring-primary`}
      >
        <div className="flex items-center gap-1 border-b border-border px-4 py-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`rounded px-2 py-1 text-sm font-semibold transition ${
              editor.isActive('bold')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            aria-label="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`rounded px-2 py-1 text-sm font-semibold transition ${
              editor.isActive('italic')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            aria-label="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded px-2 py-1 text-sm font-semibold transition ${
              editor.isActive('bulletList')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            aria-label="Bullet list"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded px-2 py-1 text-sm font-semibold transition ${
              editor.isActive('orderedList')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            aria-label="Ordered list"
          >
            1.
          </button>
        </div>
        <EditorContent editor={editor} id="description-editor" />
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}

