

# Copilot Instructions for AI Agents

## Project Overview
Accessible Learning Hub is an Azure Static Web Apps (SWA) based LMS focused on accessibility, modular content, and analytics. See docs/Accessible Learning Hub.md for personas, user stories, and process flows.

## Architecture & Key Patterns
- **Frontend**: React 19 + Vite, TypeScript, Fluent UI, Radix UI, MSAL for Azure AD SSO
- **Routing**: React Router v7, with dynamic routes for content types and slugs
- **Menu/Navigation**: Authenticated users get menu from Dataverse (via Graph API, see src/utils/dataverseMenu.ts); anonymous users get menu from WordPress (via WPGraphQL, see src/utils/wordpressMenu.ts)
- **Content**: Dynamic content loading via ContentRouter and WPPage components
- **Styling**: CSS Modules for components, global styles in index.css, strict use of Fluent UI fonts
- **Accessibility**: All UI must be accessible (keyboard, screen reader, high contrast)

## Developer Workflows
- **Install**: Use pnpm (preferred) or yarn. Run `pnpm install` in /app
- **Dev server**: `pnpm dev` (runs Vite)
- **Build**: `pnpm run build` (cleans, typechecks, builds to /build)
- **Lint**: `pnpm run lint` (ESLint, config in app/eslint.config.js)
- **Preview**: `pnpm run preview` (serves built app)
- **TypeScript**: Config in app/tsconfig*.json; strict mode enabled

## Directory Structure
- **/app/src/**: All source code
  - **components/**: UI components (Fluent UI, Radix, Carousel, ContentRouter, WPPage)
  - **utils/**: API clients (Dataverse, WordPress, MSAL config)
  - **types/**: TypeScript type declarations for CSS modules, images
  - **assets/**: Static assets (if any)
- **/app/public/**: Static files, index.html, routes.json
- **/build/**: Build output (ignored in source)

## Integration Points
- **Azure AD SSO**: MSAL config in src/utils/msalConfig.ts, used via @azure/msal-react
- **Dataverse**: Menu items fetched for authenticated users (see fetchMenuItems)
- **WordPress**: Menu and content fetched for anonymous users (see fetchWordPressMenu, WPPage)

## UI/UX Conventions
- Use Fluent UI and Radix UI components for all navigation and menus
- No placeholder text ("Lorem ipsum") or fallback fonts
- Always support dark/light mode and accessibility
- Collapsible sidebar and responsive design are required

## Contribution Guidance
- Document any new workflows or patterns here as the project evolves
- If adding new modules or directories, describe their purpose and relationships
- If introducing new dependencies, document install/build/test commands

---
_Update this file as the project evolves to ensure AI agents have the context needed for productive contributions._

If I ask you make changes to files or fix errors, just do it without asking for confirmation.