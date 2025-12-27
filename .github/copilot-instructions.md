
# Copilot Instructions for AI Agents

## Project Vision
This project is an **Accessible Learning Hub**: an Azure Static Web Apps (SWA) based learning management system (LMS) focused on accessibility, modular content, and analytics. See Accessible Learning Hub.md for the full blueprint.

## Current State
- No implementation code or build system yet; this is a planning/requirements phase.
- Key files:
	- `Accessible Learning Hub.md`: Vision, personas, user stories, and process flows
	- `README.md`: Project name only

## Architecture & Design (Planned)
- **Architecture**: Azure SWA frontend with serverless backend functions; Dataverse and SharePoint for data storage; Power BI for analytics
- **Data Model**: Entities for Users, Courses, Modules, Assessments, Progress, and Achievements
- **Personas**: Learner, Course Administrator, Business Owner, Course Teacher, Content Editor
- **Core Processes**:
	- Learner Course Engagement (browse, enroll, track, complete, profile, achievements)
	- Course & Content Management (create, organize, maintain courses/modules/assessments)
	- Assessment & Feedback (deliver content, assess, feedback, progress tracking)
	- Platform Accessibility & Theming (accessibility compliance, dark/light mode, sidebar)
	- Business Oversight & Analytics (monitor, report, set goals)
  
## UI/UX

- Fluent UI components, dark/light modes, collapsible sidebar, accessibility standards
- Mobile-responsive design
- Accessibility features (screen reader support, keyboard navigation, high contrast)
- Intuitive navigation and user-friendly interfaces

Stick to UI principals like simplicity, consistency, feedback, and accessibility.
Do not use placeholder text like "Lorem ipsum" in the UI.
Do not use fallback fonts; always use Fluent UI typography.

## technology Stack (Planned)

- **Frontend**: React with Fluent UI  
- **Backend**: Azure Static Web Apps (SWA) with serverless functions
- **Data Storage**: Dataverse tables and sharepoint lists and libraries
- **Analytics**: Power BI integration for dashboards and reports
- **Copilot**: custom agentss for learning assistance and content generation
- **Graph API**: for user and content management
- **MSAL**: for authentication and authorisation
  **SSO**: integrate with Azure AD for single sign-on is a must

## Guidance for AI Agents
- **No codebase exists yet**: When generating code, follow standard conventions for Azure SWA, React, or chosen stack until project-specific patterns emerge.
- **Document all new workflows** (build, test, deploy) in this file as you add them.
- **Reference and update this file** as the architecture, data model, or workflows evolve.
- **If you add a src/ directory or modules**, describe their purpose and relationships here.
- **If you introduce dependencies** (npm, pip, etc.), document install/build/test commands here.
- **Prioritize accessibility and modularity** in all code and UI.

## Example (to update as project evolves)
- If you add a `src/` directory, describe its structure and main modules here.
- If you use a tool like `npm`, `pip`, or `dotnet`, document install/build/test commands.
- Run commands freely if required to set up or test the project, but document them here.
**Use PNPM or Yarn** for package management. Example commands:**
```bash 
pnpm install
pnpm run build  
pnpm run test
```

---
_Update this file as the project develops to ensure AI agents have the context needed for productive contributions._
