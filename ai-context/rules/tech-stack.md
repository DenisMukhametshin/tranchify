# Tech Stack

## Core Application Foundations
- React with TypeScript in strict mode
- React Router v6.4+ configured via `createBrowserRouter`
- DummyJSON products API (`https://dummyjson.com/products` and `https://dummyjson.com/products/:id`)

## Forms and Validation
- React Hook Form
- Zod with schema-driven form validation and `z.infer`

## UI and Styling
- shadcn/ui component library (advised)
- Tailwind CSS (advised styling approach)

## Optional Enhancements
- Persisting filters to URL query params for reload restoration
- Rendering the filter sidebar as a left Drawer on mobile
- TipTap rich text editor with default formatting for description editing
- Prettier with the suggested configuration `{ "printWidth": 120, "semi": false, "singleQuote": true }`

## Tooling and Best Practices
- ESLint with a modern React/TypeScript setup
- Semantic commit messages following Conventional Commits
- Optional JSDoc for reusable helpers or custom hooks
- Accessibility considerations: labels, keyboard navigation, ARIA roles where appropriate
