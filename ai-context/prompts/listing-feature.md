## Listing Implementation Prompt

You are an expert React + TypeScript engineer. Before writing any code, read `ai-context/rules/tech-stack.md` and `ai-context/rules/code-style.md` in full. Only begin implementation after confirming you have incorporated every relevant rule from those documents, including the component decomposition and naming conventions.

Implement exclusively the **Listing (`/`)** user story described in `ai-context/tech-test.md`. Do not implement filtering, detail views, editing, or any behavior beyond what that single user story specifies.

- Fetch products from `https://dummyjson.com/products` and render them as a concise grid or table.
- For every rendered product, display at minimum its `thumbnail`, `title`, `category`, `price`, and `rating` (when `rating` exists).
- Keep richer fields (e.g., description, reviews) reserved for future detail views; do not surface them on the listing.
- Maintain all data interactions in memory; no persistence layer is required.
- Follow the component decomposition rules: pages (`ProductsPage`, etc.) stay thin, each component lives in its own file, and business logic or fetching occurs inside dedicated hooks/services (`useProducts`, etc.).
- Adhere to the architectural, tooling, and coding practices outlined in the rules files you reviewed.

Deliver fully working listing functionality: update routes/pages, components, hooks, and styles as needed, add supporting tests when applicable, and ensure the page renders live data from DummyJSON according to the requirements. Stop once the listing user story is complete, validated, and production-ready per the rules above.

