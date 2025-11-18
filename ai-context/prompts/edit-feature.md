## Edit Implementation Prompt

You are an expert React + TypeScript engineer. Before touching any code, re-read `ai-context/rules/tech-stack.md`, `ai-context/rules/code-style.md`, the existing prompts in this folder, and the current application code (routes, hooks, components, helpers, types). Confirm your plan aligns with the established architecture (strict TS, hook-driven data fetching, thin pages, Tailwind/shadcn styling) **before** implementing anything.

Build **only** the **Edit (protected) — `/product/:id/edit`** user story described in `ai-context/tech-test.md` (lines 57‑60). Do not modify unrelated features or make changes beyond what is necessary to implement the edit experience.

- **Authentication & Route Protection**
  - Implement mock authentication using a `localStorage` flag (e.g., `isAuthenticated` or `authToken`).
  - Create a simple authentication context or hook (e.g., `useAuth`) that provides `isAuthenticated`, `login`, and `logout` functions, reading from and writing to `localStorage`.
  - Add a login/logout toggle control (e.g., in the root layout header or navigation) that allows users to toggle authentication state. This should be visible and accessible from any page.
  - Guard the `/product/:id/edit` route so that unauthenticated users are redirected to the product details page (`/product/:id`) or shown a friendly message prompting them to log in. Use React Router's route protection pattern (e.g., a wrapper component or route loader/guard).
  - Ensure the authentication state persists across page reloads by reading from `localStorage` on mount.

- **Routing & Navigation**
  - Extend `src/routes/router.tsx` with a protected `ProductEditPage` route at `/product/:id/edit`. Keep the page component thin and named with the `Page` suffix.
  - Add a navigation link or button on the product details page (`ProductDetailsPage`) that appears only when authenticated, allowing users to navigate to the edit route (e.g., "Edit product" button).
  - Ensure the edit route handles invalid product IDs gracefully (redirect to 404 or show an error message) and validates that the product exists before rendering the edit form.

- **Data Fetching & State Management**
  - Reuse the existing `useProductDetails` hook to fetch the product data for editing. Consider extending it or creating a variant if you need to track edited state separately from the original product.
  - Maintain edited product data in memory (component state or a dedicated hook). Changes should not persist to the API or `localStorage` beyond the current session.
  - When navigating away from the edit page, edited changes should be lost unless explicitly saved (in-memory only, no persistence required per the requirements).

- **Edit Form Implementation**
  - Create an edit form component powered by React Hook Form + Zod for schema-driven validation, following the same patterns established in the filtering feature.
  - Allow editing the following fields:
    - `title` (text input, required)
    - `price` (number input, required, must be positive)
    - `rating` (number input, optional, should be between 0 and 5 if provided)
    - `discountPercentage` (number input, optional, should be between 0 and 100 if provided)
  - Include proper validation rules using Zod schemas (e.g., `z.string().min(1)` for title, `z.number().positive()` for price, `z.number().min(0).max(5).optional()` for rating).
  - **Critical: Decimal Number Input Handling**
    - Number inputs for `price`, `rating`, and `discountPercentage` must accept decimal values without browser validation errors.
    - **Do NOT** use restrictive `step` attributes that limit decimal precision (e.g., `step="0.1"` for rating or `step="1"` for discountPercentage).
    - Instead, use one of these approaches:
      1. **Option A (Recommended)**: Remove the `step` attribute entirely or set `step="any"` to allow any decimal precision:
        ```typescript
        <input
          {...register('rating', { valueAsNumber: true })}
          type="number"
          min="0"
          max="5"
          step="any"  // Allows any decimal precision
          inputMode="decimal"
        />
        ```
      2. **Option B**: Use a very small step value (e.g., `step="0.01"` for rating, `step="0.01"` for discountPercentage) to allow reasonable precision while still providing browser stepper functionality.
    - The Zod schema validation will handle the actual value constraints (min/max), so browser HTML5 validation should not be restrictive.
    - Ensure that values like `2.56`, `10.12`, `2.5`, etc. can be entered and saved without browser validation errors.
    - Handle locale-specific decimal separators (comma vs period) by using `valueAsNumber` in React Hook Form registration, which normalizes the value.
  - Display validation errors clearly and ensure the form is accessible (labels, ARIA attributes, keyboard navigation).
  - **Critical: Form Initialization with Product Data**
    - The form must be properly initialized with product values when the product data becomes available.
    - **Do NOT** create the form with `defaultValues` that depend on async product data at the top level of the component, as the form will be created before the product is loaded.
    - Instead, use one of these approaches:
      1. **Option A (Recommended)**: Create the form with empty/default `defaultValues`, then use `form.reset()` in a `useEffect` when product data becomes available:
        ```typescript
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
          if (product) {
            form.reset({
              title: product.title,
              price: product.price,
              rating: product.rating,
              discountPercentage: product.discountPercentage,
              description: product.description || '',
            })
          }
        }, [product, form])
        ```
      2. **Option B**: Only create the form after product data is loaded (conditionally render the form component).
    - Ensure all form fields (including the TipTap editor) are properly populated with the product's current values when the form initializes or when product data loads.
    - Test that when navigating to the edit page, all fields immediately show the existing product values, not empty fields.
  - Provide clear actions: "Save" (applies changes in memory and optionally navigates back to details), "Cancel" (discards changes and navigates back to details), and ensure changes are reflected when viewing the product details page after editing.

- **Rich Text Editor for Description (Bonus)**
  - **Critical: TipTap Extension Requirements**
    - TipTap requires a **Document extension** to provide the root 'doc' node type. Without it, the editor will throw "Schema is missing its top node type ('doc')" error.
    - **Before implementing**: Check `package.json` and ensure the following TipTap extensions are installed:
      - `@tiptap/extension-document` (may be missing - **REQUIRED**)
      - `@tiptap/extension-paragraph` (usually present)
      - `@tiptap/extension-text` (usually present)
      - `@tiptap/extension-bold` (usually present)
      - `@tiptap/extension-italic` (usually present)
      - `@tiptap/extension-bullet-list` (may be missing - required for unordered lists)
      - `@tiptap/extension-ordered-list` (usually present)
      - `@tiptap/extension-list-item` (usually present)
    - If any are missing, install them: `npm install @tiptap/extension-document @tiptap/extension-bullet-list` (or equivalent for your package manager).
    - The extensions array **must** include, in this order:
      1. `Document` (from `@tiptap/extension-document`) - **REQUIRED** for root node
      2. `Paragraph` (from `@tiptap/extension-paragraph`) - **REQUIRED** for block content
      3. `Text` (from `@tiptap/extension-text`) - **REQUIRED** for inline text
      4. `Bold` (from `@tiptap/extension-bold`) - for bold formatting
      5. `Italic` (from `@tiptap/extension-italic`) - for italic formatting
      6. `BulletList` (from `@tiptap/extension-bullet-list`) - for unordered lists
      7. `OrderedList` (from `@tiptap/extension-ordered-list`) - for ordered lists
      8. `ListItem` (from `@tiptap/extension-list-item`) - **REQUIRED** when using lists
    - Example correct extension array:
      ```typescript
      import { Document } from '@tiptap/extension-document'
      import { Paragraph } from '@tiptap/extension-paragraph'
      import { Text } from '@tiptap/extension-text'
      import { Bold } from '@tiptap/extension-bold'
      import { Italic } from '@tiptap/extension-italic'
      import { BulletList } from '@tiptap/extension-bullet-list'
      import { OrderedList } from '@tiptap/extension-ordered-list'
      import { ListItem } from '@tiptap/extension-list-item'
      
      const editor = useEditor({
        extensions: [
          Document,
          Paragraph,
          Text,
          Bold,
          Italic,
          BulletList,
          OrderedList,
          ListItem,
        ],
        // ... other config
      })
      ```
  - Implement TipTap rich text editor for editing the `description` field with only the formatting options listed above.
  - Do not include other formatting options (headings, links, code blocks, etc.) beyond the specified defaults.
  - Ensure the editor is accessible (keyboard shortcuts, ARIA labels) and integrates seamlessly with React Hook Form:
    - Use `useEditor` hook from `@tiptap/react` to create the editor instance.
    - Use `EditorContent` component to render the editor.
    - Sync editor content with React Hook Form using `setValue` in the `onUpdate` callback.
    - **Critical: Editor Initialization with Form Values**
      - Initialize the editor with the product description from the form's default values or current values.
      - Use `useEffect` to update the editor content when the form is reset with new product data:
        ```typescript
        useEffect(() => {
          if (editor && product.description) {
            // Only update if content is different to avoid unnecessary updates
            const currentContent = editor.getHTML()
            if (currentContent !== product.description) {
              editor.commands.setContent(product.description || '')
            }
          }
        }, [editor, product.description])
        ```
      - Ensure the editor content is synchronized with the form's `description` field value when the form initializes.
    - Ensure the editor instance is checked for null before rendering (TipTap may return `null` during initialization).
  - **Critical: TipTap Editor Styling - Remove Unwanted Borders**
    - The TipTap editor may show unwanted white borders or default browser focus styles when focused.
    - Remove default browser outlines and borders by:
      1. Adding `editorProps.attributes` with a class that removes focus outlines:
        ```typescript
        const editor = useEditor({
          extensions: [/* ... */],
          editorProps: {
            attributes: {
              class: 'prose prose-sm max-w-none focus:outline-none [&_*]:focus:outline-none',
            },
          },
          // ... other config
        })
        ```
      2. Ensuring the `EditorContent` wrapper and container have proper Tailwind classes to remove default focus styles:
        ```typescript
        <div className="rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary">
          <EditorContent
            className="focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:border-none"
            editor={editor}
          />
        </div>
        ```
      3. Adding CSS to remove any default browser styles on the ProseMirror editor element:
        - Use Tailwind's `focus:outline-none` on the editor container.
        - Ensure no white borders appear inside the editor content area when focused.
        - The editor should only show the container's border, not internal borders.
  - Pre-populate the editor with the current product description (handle both plain text and HTML content).
  - The editor should output HTML that can be stored in the product's `description` field in memory (use `editor.getHTML()` to get the HTML string).
  - Handle edge cases:
    - Show a loading placeholder while `editor` is `null` (TipTap initialization is async).
    - Handle empty or undefined initial content gracefully.
    - Ensure the editor properly updates when the form is reset or when navigating between products.

- **UI Requirements**
  - Follow the existing Tailwind conventions, component decomposition, and styling patterns. Break the edit form into focused components (e.g., `ProductEditForm`, form field components) in their own files under `src/components/`.
  - Provide explicit loading states while fetching product data for editing (reuse skeleton patterns or create edit-specific loading UI).
  - Handle error states gracefully (product not found, fetch errors) with user-friendly messages and retry options.
  - Ensure the edit page layout is consistent with the details page (similar spacing, typography, responsive design).
  - Add a clear visual indication that the user is in "edit mode" (e.g., page title, breadcrumb, or header).

- **Behavior & State**
  - Keep all edited data client-side/in-memory; no persistence to the API or `localStorage` is required.
  - When a user edits a product and then views the product details page, the edited values should be visible (you may need to maintain edited products in a context, hook, or in-memory store that both the edit and details pages can access).
  - If the user navigates away and returns to edit the same product, the edited changes should be preserved within the session (in-memory) but lost on page refresh.
  - Ensure that editing does not affect the original fetched product data until explicitly saved (consider using a copy or separate state for edited values).
  - **Critical: HTML Description Rendering on Details Page**
    - The TipTap editor saves the description as HTML (using `editor.getHTML()`), which includes HTML tags like `<p>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, etc.
    - When displaying the description on the product details page, **DO NOT** render it as plain text (e.g., `<p>{product.description}</p>`), as this will display the HTML tags as text instead of rendering the formatted content.
    - Instead, render the HTML content properly using one of these approaches:
      1. **Option A (Recommended)**: Use React's `dangerouslySetInnerHTML` to render the HTML:
        ```typescript
        {product.description ? (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <div
              className="text-base leading-relaxed text-muted-foreground prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        ) : null}
        ```
      2. **Option B**: Use a sanitization library (e.g., DOMPurify) if you need to sanitize the HTML for security:
        ```typescript
        import DOMPurify from 'dompurify'
        
        {product.description ? (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <div
              className="text-base leading-relaxed text-muted-foreground prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
            />
          </div>
        ) : null}
        ```
    - Apply appropriate Tailwind prose classes (e.g., `prose prose-sm`) to ensure the rendered HTML content is properly styled (headings, lists, bold, italic, etc.).
    - Ensure that when a user edits and saves a product description, the formatted HTML (with proper paragraph breaks, bold text, lists, etc.) is displayed correctly on the details page, not as raw HTML tags.

- **Quality Bar**
  - Follow the existing component decomposition rules: each major UI block should be its own component under `src/components/`, pages remain thin, and business logic lives in hooks.
  - Add tests when practical (e.g., verify authentication guard, form validation, or hook behavior) and keep types strict with zero `any`.
  - Ensure all new components and hooks follow the established naming conventions and file structure.
  - Update documentation or README snippets only if the new route changes usage instructions. Do not modify unrelated prompts or features.

Stop once the `/product/:id/edit` experience (including authentication, route protection, form editing, and the TipTap bonus) is production-ready per the requirements above and the rest of the app remains unaffected aside from necessary integrations (e.g., authentication toggle in layout, edit link on details page).

