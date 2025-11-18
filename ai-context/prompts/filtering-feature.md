## Filtering Implementation Prompt

You are an expert React + TypeScript engineer. Before touching any code, read `ai-context/rules/tech-stack.md` and `ai-context/rules/code-style.md` in full, then review the current code base so you understand the existing listing page, routing, components, hooks, and styling decisions. Only begin implementation after you have incorporated every relevant rule and aligned with the current architecture.

Implement **only** the **Filtering (left sidebar on listing only)** user story described in `ai-context/tech-test.md`. Do not introduce behaviors beyond what that Filtering point specifies, except for essential wiring required to integrate the filters into the existing listing experience.

- Add a left sidebar filter panel to the listing route and power it with React Hook Form + Zod for schema-driven validation.
- Support exactly the required controls:
  - Text search by product title.
  - Category selection (multi-select if feasible within the current UI toolkit), including an **“All”** option that clears any category-based filtering when selected.
  - Price range inputs (`minPrice`, `maxPrice`) enforcing `max ≥ min`.
  - Rating filter (radio or select) when ratings exist, including an **“Any rating”** option that disables rating-based filtering.
  - Toggle for “discounted only” whenever `discountPercentage` data is available.
- Honor the dynamic behaviors:
  - When “discounted only” is enabled, reveal a `minDiscountPercent` numeric input.
  - Keep `maxPrice` disabled until `minPrice` has a value.
- Provide a clear **Reset filters** action that:
  - Clears the category selection back to “All” (no category filter applied).
  - Clears `minPrice` and `maxPrice` and returns price filtering to an “off” state.
  - Resets the rating filter to “Any rating” (no rating constraint applied).
- Keep all filtering logic in memory, derived from the DummyJSON list that already powers the listing. Filters should narrow the displayed products without fetching new endpoints unless required for correctness.
- Maintain component decomposition rules: the listing page remains thin, each component lives in its own file, and substantial state/logic resides in focused hooks or services (e.g., `useProductFilters`).
- Follow the established stack choices (React Router `createBrowserRouter`, Tailwind, shadcn/ui components, etc.) exactly as already configured in the repository.
- Implement both bonus behaviors that are part of the Filtering user story:
  - Persist filter state to URL query parameters and restore it on reload.
  - Render the sidebar as a left Drawer on mobile.
- Stop once the filtering sidebar (including the required bonuses) is complete, validated, and integrated with the listing view. Do not start work on details, editing, or other user stories.

Deliver production-ready filtering functionality that satisfies every point from the Filtering user story, adds tests when practical, and leaves the rest of the application unchanged beyond what is necessary to hook up the filters.


