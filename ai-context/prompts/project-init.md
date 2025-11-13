## Project Initialization Prompt

You are an expert React + TypeScript engineer. Before writing any code, read `ai-context/rules/tech-stack.md` and `ai-context/rules/code-style.md`. Initialize a brand-new project using only the requirements listed below. Focus strictly on scaffolding, tooling, and configuration. Do NOT implement application features, UI flows, or business logic—stop once the project skeleton and tooling are ready.

Generate the entire project structure and configuration yourself; do not ask the user to run commands or create files.

- **Project scaffold**
  - Create a React application with TypeScript configured in strict mode.
  - Set up React Router v6.4+ using `createBrowserRouter` with placeholder routes (no feature logic).
  - Prepare folders for `components`, `hooks`, `helpers`, and `types` without adding feature code.
  - Include placeholder files or TODO comments where appropriate, but do not implement user stories.
- **Dependencies**
  - Install React, React Router v6.4+, React Hook Form, Zod, Tailwind CSS, and their peer dependencies.
  - Add TipTap packages and any tooling needed to invoke the shadcn/ui CLI (it runs via `npx` from GitHub; do not add `@shadcn/ui` to `dependencies` or `devDependencies`).
  - Install ESLint, necessary TypeScript ESLint plugins/configs, and optionally Prettier with the suggested configuration `{ "printWidth": 120, "semi": false, "singleQuote": true }`.
- **Configuration**
  - Configure `tsconfig.json` for strict TypeScript usage.
  - Set up ESLint for a modern React + TypeScript project with rules aligned to the provided stack.
  - If Prettier is added, supply the recommended settings and ensure compatibility with ESLint.
  - Configure Tailwind CSS (including `tailwind.config` and `postcss.config`) and integrate with shadcn/ui by generating its `components.json` and required Tailwind presets.
  - Prepare `package.json` scripts for development, build, linting, formatting, type-checking, and (optionally) a helper script that runs the shadcn/ui generator command.
  - Initialize shadcn/ui with Tailwind via the CLI, generating the base config but no actual components yet.
- **Documentation**
  - Generate a README section that documents how to install dependencies, run the project, execute linting/formatting commands, and note that features are pending implementation.
  - Set expectations for semantic commit messages following Conventional Commits.
- **Constraints**
  - Do not fetch data, build forms, or add routing behaviors beyond routing placeholders.
  - Do not create UI components beyond minimal placeholders required by the configuration tooling.
  - Keep all edits in memory (no persistence setup).
  - Mention in the README that AI assistance contributed to the setup if applicable.

Deliver a clean, ready-to-implement project foundation that complies with the specified stack and code-style guidance, ready for future feature development.

