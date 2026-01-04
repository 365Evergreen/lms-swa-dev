

# Copilot Instructions for AI Agents

# Copilot Instructions for AI Agents

Purpose: enable an AI coding assistant to be productive immediately in this repo.

High-level architecture
- Frontend-only Azure Static Web App (SWA) in `/app` using React 19 + Vite + TypeScript.
- Routing: React Router v7 with dynamic content; content resolved by `ContentRouter` and `WPPage` under `/app/src/components`.
- Auth: Azure AD SSO via MSAL. Config and instance: `/app/src/utils/msalConfig.ts` (clientId and authority live here).
- Menu sources: authenticated users → Dataverse (`/app/src/utils/dataverseMenu.ts`), anonymous users → WordPress GraphQL (`/app/src/utils/wordpressMenu.ts`).

Developer workflows (explicit)
- Preferred package manager: `pnpm` (root `package.json` scripts operate for the app). Key scripts:
  - `pnpm dev` — starts Vite dev server (used by Playwright tests).
  - `pnpm run build` — cleans, TypeScript build (`tsc -b`) then `vite build`.
  - `pnpm run lint` — runs ESLint (config: `/app/eslint.config.js`).
  - `pnpm run preview` — serves the built app.
- Tests: Playwright tests live in `/app/*.spec.ts`. They expect a local dev server and use two BASE_URLs (see `nav.spec.ts` and `header.responsive.spec.ts` on ports 5174/5175). Adjust `BASE_URL` or start the dev server on the expected port before running `npx playwright test`.

Project-specific conventions & patterns
- TypeScript: strict mode enabled via `/app/tsconfig*.json`. Prefer typed exports and explicit prop types in `*.tsx`.
- Styling: CSS Modules for components (examples: `/app/src/components/Carousel.module.css`, `/app/src/components/fluent/Header.module.css`). Use the existing module pattern.
- Menu shape: Dataverse returns OData `value[]` with fields like `hired_name`, `hired_route`. WordPress menu is fetched via WPGraphQL and normalized in `/app/src/utils/wordpressMenu.ts`.
- Sensitive values: `msalConfig.ts` contains a `clientId` and authority. Treat these as configuration — do not commit secrets; if replacing with env-based config, update `msalConfig.ts` accordingly.

Integration notes & examples
- Dataverse fetch (example): `/app/src/utils/dataverseMenu.ts` — acquires token via `msalInstance.acquireTokenSilent()` then calls Dynamics CRM OData endpoint.
- WPGraphQL endpoint: configured in `/app/src/utils/wordpressMenu.ts` as `WP_GRAPHQL_ENDPOINT` — tests and local dev assume this is reachable.
- Content routing: `ContentRouter` decides which component to load for a route — start here for feature work that affects page composition.

Quick pointers for common tasks
- To run tests locally:
  - Start dev server: `pnpm dev` (or set port to match Playwright tests and run `npx playwright test`).
- To update menu behavior:
  - Dataverse logic: edit `/app/src/utils/dataverseMenu.ts` and ensure MSAL flows work for the signed-in account.
  - WP menu: edit `/app/src/utils/wordpressMenu.ts` and the GraphQL query.
- To change auth config (careful): `/app/src/utils/msalConfig.ts` — prefer environment overrides in CI.

Where to look first
- Component entry: `/app/src/App.tsx` and `/app/src/main.tsx`.
- Routing + content loader: `/app/src/components/ContentRouter.tsx`, `/app/src/components/WPPage.tsx`.
- Auth and menu integrations: `/app/src/utils/msalConfig.ts`, `/app/src/utils/dataverseMenu.ts`, `/app/src/utils/wordpressMenu.ts`.
- Tests: `/app/nav.spec.ts`, `/app/header.responsive.spec.ts` (Playwright tests; check BASE_URL values before running).

Notes and caveats
- Playwright test ports vary between specs (5174 vs 5175); update tests or run dev server on the expected port.
- The repo uses `pnpm` and an overridden `vite` via `rolldown-vite` — avoid changing Vite version without CI verification.
- Accessibility is a first-class requirement: follow existing patterns in `Header` and navigation components.

If any integration endpoints, client IDs, or ports are unclear or should be env-driven, tell me which to parameterize and I will update the code and tests accordingly.

---
_This file was updated to keep guidance short, actionable, and tailored to the current codebase. Ask for additions or missing areas to iterate._

Preferences:
- Use UK English spelling
- Be concise and avoid unnecessary verbosity
- Date format: DD/MM/YYYY
- Sentence case for titles and headings