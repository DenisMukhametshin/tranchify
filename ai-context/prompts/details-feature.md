## Details Implementation Prompt

You are an expert React + TypeScript engineer. Before touching any code, re-read `ai-context/rules/tech-stack.md`, `ai-context/rules/code-style.md`, the existing prompts in this folder, and the current application code (routes, hooks, components, helpers, types). Confirm your plan aligns with the established architecture (strict TS, hook-driven data fetching, thin pages, Tailwind/shadcn styling) **before** implementing anything.

Build **only** the **Details (`/product/:id`)** user story described in `ai-context/tech-test.md` (lines 52‑55). Do not begin the edit flow or make changes unrelated to the detail experience.

- **Routing & Navigation**
  - Extend `src/routes/router.tsx` with a dedicated `ProductDetailsPage` route at `/product/:id`. Keep page components thin and named with the `Page` suffix.
  - Update the listing experience so each `ProductCard` (or an explicit CTA within it) links to the corresponding details route using accessible, focusable elements.
  - Ensure the Not Found route still handles unknown paths while the new detail route handles invalid IDs gracefully.

- **Data Fetching**
  - Create a focused hook (e.g., `useProductDetails`) that fetches from `https://dummyjson.com/products/:id`, aborts on unmount, exposes `status`, `error`, and `refetch`, and reuses the shared `Product` types.
  - Prefer reusing already-fetched listing data when navigating from `/` to reduce perceived latency (e.g., accept `initialProduct` derived from route state or loader) while still fetching authoritative data for freshness.
  - Handle missing or bad IDs with a friendly, user-visible message or by redirecting to the 404 page; never crash the route.

- **UI Requirements**
  - Present richer information than the listing: hero image, **interactive image carousel/gallery** for `images`, title, brand, category, price (via `formatPrice`), discount badge, rating, stock, tags, and full description. Include sensible fallbacks if certain fields are absent.
  - **Image Carousel Implementation (Required)**
    - When a product has multiple images in the `images` array, implement a fully functional image carousel that allows users to switch between images.
    - Build a custom carousel component **without using any third-party libraries** (e.g., no react-slick, swiper, embla-carousel, etc.). Use native React state and event handlers.
    - Include navigation controls: previous/next buttons or arrow indicators, and optionally thumbnail/dot indicators for direct image selection.
    - Ensure the carousel is keyboard accessible (arrow keys for navigation, focus management) and includes proper ARIA labels and roles.
    - Handle edge cases: single image (no carousel needed, just display), empty images array (fallback placeholder), and smooth transitions between images.
    - Keep the carousel component in its own file (e.g., `src/components/product-image-carousel.tsx`) following the single-responsibility principle.
  - Add at least one actionable control (e.g., "Back to products") and ensure keyboard & screen-reader accessibility (ARIA labels for carousels, alt text for images, logical heading structure).
  - Leverage existing utilities/components (`StatePlaceholder`, Tailwind tokens, shadcn primitives if already generated) and keep new UI broken into dedicated components (carousel, metadata panel, etc.) in their own files.
  - Provide explicit loading and error states (skeleton, placeholder, or shimmer) while the detail fetch is pending; include a retry button on error that calls `refetch`.

- **Behavior & State**
  - Keep all data client-side/in-memory; no persistence beyond runtime.
  - When a product lacks full data (e.g., no `images` array), degrade gracefully with placeholder visuals/text.
  - If reviews data becomes available from the API, render it in a dedicated section, but do not fabricate data.

- **Quality Bar**
  - Follow the existing Tailwind conventions, CSS tokens, and component decomposition rules. Each major UI block should be its own component under `src/components/`.
  - Add tests when practical (e.g., verify the hook’s happy/error paths or component rendering) and keep types strict with zero `any`.
  - Update documentation or README snippets only if the new route changes usage instructions. Do not modify unrelated prompts or start on the edit story.

Stop once the `/product/:id` experience is production-ready per the requirements above and the rest of the app remains unaffected aside from necessary integrations.

