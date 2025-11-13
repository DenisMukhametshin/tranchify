👩💻 User Stories  
Frontend Hiring Challenge — React/TypeScript (🌟 = bonuses if you have time)

🎯 Goal  
Build a concise React app that demonstrates type-safety, clean component design, routing, and schema-driven forms without external complexity.

💾 Data Source  
Use DummyJSON products as the remote dataset:  
• List: https://dummyjson.com/products  
• Detail: https://dummyjson.com/products/:id  
Common fields you can rely on (there may be more):  
{  
  id: number,  
  title: string,  
  description: string,  
  category: string,  
  price: number,  
  discountPercentage?: number,  
  rating?: number,  
  stock?: number,  
  tags?: string[],  
  brand?: string,  
  images?: string[],  
  thumbnail?: string  
}  
All edits live in memory (no persistence required).

---

👩💻 User Stories

🧩 1) Listing (/)  
• Fetch and display a grid or table of products from DummyJSON.  
• Show at least: thumbnail, title, category, price, rating (if present).  
• Keep the list concise; reserve rich fields (e.g., reviews) for the details page.

🧩 2) Filtering (left sidebar on listing only)  
• Implement a left sidebar filter panel for the listing page.  
• Use React Hook Form + Zod (schema-driven validation).  
• Include at least:  
◦ Text search (by title)  
◦ Category (multi-select if possible)  
◦ Price range (min/max) with max ≥ min  
◦ Rating filter (radio or select, if ratings exist)  
◦ Toggle for discounted only when discountPercentage exists  
• Dynamic behavior examples:  
◦ If discounted only is ON → show minDiscountPercent numeric input  
◦ Disable maxPrice until minPrice has a value  
• 🌟 Bonus: persist filters to URL query params and restore on reload  
• 🌟 Bonus: on mobile, render the sidebar as a left Drawer

🌟 3) Details (/product/:id)  
• Navigate from a list item to a details page.  
• Display richer information (e.g., images carousel, description, reviews if available).  
• Handle bad IDs gracefully (friendly message or 404).

🌟 4) Edit (protected) — /product/:id/edit  
• Gate the route behind mock authentication (e.g., localStorage flag with login/logout toggle).  
• Allow editing a subset of fields (e.g., title, price, rating, discountPercentage). Changes remain in memory.  
• 🌟 Extra bonus: edit the description with an RTE (TipTap) using only default formatting (bold, italic, list).

---

🔧 Recommendations

TypeScript  
• Strict mode is compulsory; no any.  
• Prefer inference from Zod schemas via z.infer.

Routing  
• Use React Router v6.4+ with createBrowserRouter.  
• Provide a clear 404/fallback and keep route definitions readable.

UI  
• Use of shadcn/ui is advised 🌟 for accessible, consistent components.

Styling  
• Tailwind CSS is advised 🌟. Other approaches (CSS Modules, styled-components, CSS-in-JS) are accepted.

Linting & Formatting  
• ESLint with a modern React/TS setup.  
• Prettier is optional 🌟; suggested config:  
{ "printWidth": 120, "semi": false, "singleQuote": true }

State Management  
• No Redux required. Prefer local/component state and URL-derived state for filters. Keep edits in memory.

Documentation  
• 🌟 Optional JSDoc for reusable helpers or custom hooks where it adds clarity.

✅ Expected Best Practices (on top of working code)  
• Project structure: clear separation of components, hooks, helpers, and types.  
• Code clarity: coherent naming and small, focused files/components.  
• Type safety: strict TS, Zod-backed validation, minimal type assertions.  
• Routing quality: straightforward structure, guarded edit route, robust 404/error states.  
• UI polish: sensible loading/empty/exception states and consistent spacing/typography.  
• Semantic commits: Conventional Commits for meaningful history.  
• 🌟 Accessibility: labels, keyboard navigation, and basic ARIA where appropriate.

📦 Deliverables  
Submit either:  
• A public GitHub repository, or  
• A ZIP file of the project  
Include a README with:  
• How to run the app  
• Time spent and which 🌟/🌟🌟 bonuses you implemented  
• What you’d improve with more time  
🌟 Optional: provide a deployed preview (Vercel/Netlify) and add the link.

Notes  
• AI assistance is allowed; mention briefly where it helped in the README.  
• Keep scope to ~3 hours for the core stories before considering 🌟/🌟🌟 bonuses.  
• We prioritize correctness, readability, and maintainability over breadth.

