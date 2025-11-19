# Tranchify Frontend Scaffold

This repository hosts the foundation for the Tranchify frontend, pre-configured with React, TypeScript (strict), routing, form and validation tooling, Tailwind CSS, and shadcn/ui integration. Feature work has not started—this is the clean slate ready for implementation.

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
- **React Router v6.4+** configured via `createBrowserRouter` with placeholder routes.
- **React Hook Form + Zod** ready for schema-driven forms and validation.
- **Tailwind CSS** with shadcn/ui presets (`components.json` included) and animation/forms plugins.
- **TipTap** dependencies prepared for future rich-text editing needs.
- **ESLint** pinned to `^8.56.0` with aligned `@typescript-eslint` packages to avoid premature ESLint 9 upgrade issues.
- **Prettier** configured with `printWidth 120`, `semi false`, and `singleQuote true`.

## Project Structure

```
src/
├─ components/   # shared UI components (placeholder)
├─ helpers/      # utility modules (placeholder)
├─ hooks/        # reusable hooks (placeholder)
├─ layouts/      # application layouts (root layout implemented)
├─ routes/       # route components wired via createBrowserRouter
├─ styles/       # Tailwind entrypoint and design tokens
└─ types/        # shared TypeScript types (placeholder)
```

## Tailwind & shadcn/ui

- Tailwind is configured in `tailwind.config.ts` and paired with `postcss.config.cjs`.
- Run `npm run shadcn` to initialize the shadcn/ui generator when you're ready to scaffold components. No components have been generated yet.

## Next Steps

1. Implement data fetching and product listing views using the DummyJSON API.
2. Build filters with React Hook Form + Zod, persisting to query params as needed.
3. Flesh out product detail and edit routes, integrating TipTap for rich text.

## Contributing

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Run `npm run lint` and `npm run type-check` before submitting pull requests.

## Acknowledgements

This scaffold was created with AI assistance (Cursor + GPT-5 Codex) to accelerate project setup. Feature implementation remains outstanding.
