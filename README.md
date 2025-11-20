# Tranchify Frontend

A modern React application for browsing and managing products, built with React, TypeScript (strict), React Router, React Hook Form, Zod validation, Tailwind CSS, and shadcn/ui. The application integrates with the DummyJSON API to fetch and display products with filtering, detailed views, and editing capabilities.

## Getting Started

```bash
npm install
npm run dev
```

> The project targets Node.js `>=18.18.0`.

### Available Scripts

- `npm run dev` – start the Vite development server.
- `npm run build` – type-check and create a production build.
- `npm run preview` – preview the production build locally.
- `npm run lint` / `npm run lint:fix` – run ESLint (pinned to `^8.56.0` for compatibility with the current TypeScript + plugin stack; upgrade carefully once ESLint 9 guidance is published).
- `npm run type-check` – run TypeScript in no-emit mode.
- `npm run format` / `npm run format:check` – apply or verify Prettier formatting.
- `npm run shadcn` – helper to invoke the shadcn/ui CLI (`npx shadcn-ui@latest init`).

## Tooling Overview

- **React 18 + TypeScript strict mode** powering the SPA.
- **React Router v6.4+** configured via `createBrowserRouter` with product listing, details, and edit routes.
- **React Hook Form + Zod** for schema-driven forms and validation in product filters and edit forms.
- **Tailwind CSS** with shadcn/ui presets (`components.json` included) and animation/forms plugins.
- **TipTap** integrated for rich-text editing in product descriptions.
- **ESLint** pinned to `^8.56.0` with aligned `@typescript-eslint` packages to avoid premature ESLint 9 upgrade issues.
- **Prettier** configured with `printWidth 120`, `semi false`, and `singleQuote true`.

## Project Structure

```
src/
├─ components/   # UI components
│  ├─ product-card.tsx              # Product card display component
│  ├─ product-grid.tsx              # Grid layout for product listings
│  ├─ product-grid-skeleton.tsx     # Loading skeleton for product grid
│  ├─ product-filter-form.tsx       # Product filtering form
│  ├─ product-filter-sidebar.tsx    # Sidebar filter component
│  ├─ product-details-layout.tsx    # Layout wrapper for product details
│  ├─ product-details-metadata.tsx  # Product metadata display
│  ├─ product-image-carousel.tsx    # Image carousel for product images
│  ├─ product-images-gallery.tsx    # Gallery view for product images
│  ├─ product-edit-form.tsx         # Form for editing products
│  ├─ product-description-editor.tsx # Rich text editor (TipTap) for descriptions
│  ├─ protected-route.tsx           # Route protection component
│  └─ state-placeholder.tsx         # Placeholder for empty/error states
├─ contexts/     # React context providers
│  └─ edited-products-context.tsx   # Context for managing edited products state
├─ helpers/      # Utility functions
│  ├─ format-price.ts               # Price formatting utilities
│  ├─ format-category-label.ts      # Category label formatting
│  └─ product-filters.ts            # Product filtering logic
├─ hooks/        # Custom React hooks
│  ├─ use-auth.ts                   # Authentication hook
│  ├─ use-products.ts               # Products data fetching hook
│  ├─ use-product-details.ts        # Single product details hook
│  ├─ use-product-filters.ts        # Product filtering hook
│  ├─ use-product-edits.ts          # Product editing hook
│  └─ use-edited-products.ts        # Edited products management hook
├─ layouts/      # Application layouts
│  └─ root-layout.tsx               # Root layout with navigation
├─ routes/       # Route components
│  ├─ router.tsx                    # React Router configuration
│  ├─ products-page.tsx             # Product listing page
│  ├─ product-details-page.tsx      # Product details page
│  ├─ product-edit-page.tsx         # Product edit page
│  └─ not-found-page.tsx            # 404 error page
├─ schemas/      # Zod validation schemas
│  ├─ filters-schema.ts             # Product filter form schema
│  └─ edit-form-schema.ts           # Product edit form schema
├─ styles/       # Global styles
│  └─ tailwind.css                  # Tailwind CSS entrypoint
└─ types/        # TypeScript type definitions
   ├─ product.ts                    # Product-related types
   ├─ product-filter-form.ts        # Filter form types
   ├─ product-edit-form.ts          # Edit form types
   ├─ use-product-filters.ts        # Filter hook types
   └─ fetch-status.ts               # Fetch status types
```

## Tailwind & shadcn/ui

- Tailwind is configured in `tailwind.config.ts` and paired with `postcss.config.cjs`.
- shadcn/ui is configured via `components.json` and ready for component generation with `npm run shadcn`.

## Features

- **Product Listing**: Browse products with real-time data from DummyJSON API
- **Advanced Filtering**: Filter products by category, price range, and rating with URL-persisted state
- **Product Details**: View detailed product information with image carousel
- **Product Editing**: Edit product details with rich text description editor (TipTap)
- **State Management**: Context-based state management for edited products
- **Authentication**: Authentication system with protected routes
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript strict mode with comprehensive type definitions
- **Form Validation**: Schema-driven forms with React Hook Form and Zod

## Contributing

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Run `npm run lint` and `npm run type-check` before submitting pull requests.

## Acknowledgements

This project was created with AI assistance (Cursor) to accelerate development and implementation.
