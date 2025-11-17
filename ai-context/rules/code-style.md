# Code Style and Project Guidelines

## Goal
- Build a concise React application that highlights type-safety, clean component architecture, routing, and schema-driven forms while avoiding unnecessary complexity.

## Data Source
- Use DummyJSON products as the remote dataset.
- Endpoints: `https://dummyjson.com/products` for the list and `https://dummyjson.com/products/:id` for details.
- Expected fields: `id`, `title`, `description`, `category`, `price`, optional `discountPercentage`, optional `rating`, optional `stock`, optional `tags`, optional `brand`, optional `images`, optional `thumbnail`.
- All edits live in memory; no persistence layer is required.

## User Stories
- **Listing (`/`)**
  - Fetch and render a grid or table of products.
  - Display at minimum: thumbnail, title, category, price, and rating (when available).
  - Keep rich fields reserved for detail views.
- **Filtering (left sidebar on listing)**
  - Implement the filter panel with React Hook Form and Zod.
  - Support text search by title, category selection (multi-select if possible), price range (min/max with `max ≥ min`), rating filter, and a toggle for discounted-only products when discounts are present.
  - Dynamic behavior: showing minimum discount input when discounted-only is enabled and disabling `maxPrice` until `minPrice` is set.
  - Bonus: persist filters in URL query parameters and restore on reload.
  - Bonus: show the filter sidebar as a left drawer on mobile.
- **Details (`/product/:id`)**
  - Navigate from the listing into a product detail page with richer information (e.g., image carousel, description, reviews).
  - Handle invalid IDs gracefully with a friendly message or 404.
- **Edit (protected) — `/product/:id/edit`**
  - Guard the route with mock authentication (such as a `localStorage` flag that can be toggled).
  - Allow editing selected fields (e.g., title, price, rating, discountPercentage) with changes remaining in memory.
  - Bonus: provide rich-text editing for the description using TipTap with default formatting only (bold, italic, list).

## Component Decomposition Rules
- Place each component in its own file; avoid multiple component exports per file.
- Keep pages (route-level components) thin: they should only assemble layout and invoke high-level hooks.
- Move business logic, complex state, and data fetching into dedicated `useXxx` hooks or services.
- Break UI into small, reusable building blocks with a single responsibility each.
- When a component starts handling multiple concerns, split it into focused subcomponents.
- Never keep fetch logic or heavy state directly inside page components—delegate to hooks/services instead.

## Naming and Structure
- Name route-level components as `SomethingPage` (e.g., `ProductsPage`, `NotFoundPage`) to reinforce their responsibility as pages.
- Refer to top-level route files as “pages” in code comments, documentation, and exports.

## Technical Recommendations
- **TypeScript**
  - Enable strict mode and avoid `any`.
  - Prefer types inferred from Zod schemas via `z.infer`.
- **Routing**
  - Use React Router v6.4+ with `createBrowserRouter`.
  - Supply a clear 404 or fallback route and maintain readable route definitions.
- **UI**
  - Use the shadcn/ui CLI to scaffold accessible, consistent components into the codebase (bonus). Do not add `@shadcn/ui` to `package.json`.
- **Styling**
  - Tailwind CSS is advised (bonus). Alternatives such as CSS Modules, styled-components, or other CSS-in-JS approaches are acceptable.
- **Linting and Formatting**
  - Configure ESLint for modern React + TypeScript.
  - Prettier is optional (bonus); suggested settings: `printWidth: 120`, `semi: false`, `singleQuote: true`.
- **State Management**
  - Avoid Redux; favor local/component state and URL-derived state for filters.
  - Maintain edits in memory.
- **Documentation**
  - Optional (bonus): add JSDoc to reusable helpers or custom hooks when it clarifies intent.

## Expected Best Practices
- Maintain a clear project structure that separates components, hooks, helpers, and types.
- Optimize for code clarity with coherent naming and focused files/components.
- Ensure strong type-safety with strict TypeScript, Zod-backed validation, and minimal type assertions.
- Keep routing straightforward, guard the edit route, and handle 404/error states robustly.
- Provide polished UI states, including loading, empty, and exception handling, with consistent spacing and typography.
- Use semantic commits following the Conventional Commits convention for meaningful history.
- Bonus: implement accessibility-friendly patterns such as labels, keyboard navigation, and appropriate ARIA attributes.

## Deliverables
- Provide either a public GitHub repository or a ZIP archive of the project.
- Include a README detailing how to run the app, the time spent, which bonuses were implemented, and what you would improve with more time.
- Bonus: supply a deployed preview (e.g., Vercel or Netlify) and include the link.

## Notes
- AI assistance is allowed; mention briefly in the README where it contributed.
- Target roughly three hours for core stories before attempting bonuses.
- Prioritize correctness, readability, and maintainability over breadth.

