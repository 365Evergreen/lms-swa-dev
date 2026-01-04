# Managed Identity setup for Accordion Azure Function

This document describes a complete, ordered checklist to configure and use a Managed Identity for the `api/accordion` Azure Function so it can read content from Dataverse or SharePoint/Graph and serve it to anonymous visitors.

Summary
- Use a Managed Identity for the Function (recommended) so no client secrets are stored.
- Grant the identity the minimum required permissions (Dataverse: Application user + security role; Graph: Sites.Read.All or per-site access).
- Update the Function to use `DefaultAzureCredential` (or `ManagedIdentityCredential`) to request a token for the appropriate scope (`{resource}/.default`).
- Cache responses server-side and optionally use a CDN for public traffic.

Pre-requisites
- Azure subscription with rights to create/modify Function Apps and assign identities.
- Dataverse environment or SharePoint site with content available (create list/table first if needed).
- Optional: Power Platform admin access to create Application User for Dataverse.

High-level checklist
1. Enable Managed Identity on the Function App (system-assigned or user-assigned).
2. Note the identity's `clientId` (AppId) and `principalId` (objectId).
3. For Dataverse: create an Application User that maps to the service principal (AppId) and assign security role(s) that allow reading the source table.
4. For Graph/SharePoint: grant the identity the appropriate Graph application permissions (e.g. `Sites.Read.All`) and grant admin consent (Enterprise applications → select the service principal).
5. Update your Function code to use `DefaultAzureCredential` or `ManagedIdentityCredential` to acquire tokens.
6. Deploy and test the Function; validate upstream calls succeed and returned data shape maps to `{ id, title, content }`.
7. Add caching (in-memory/Redis) and optionally front the Function with Azure CDN for performance.

Detailed steps

1) Choose identity type and enable it on the Function

- System-assigned identity (recommended for a single function):
  - Portal: Function App → Identity → System assigned → On → Save
  - CLI:

```bash
az functionapp identity assign --name <function-name> --resource-group <resource-group>
```

- User-assigned identity (shared across resources):

```bash
az identity create -g <resource-group> -n <identity-name>
az functionapp identity assign --identities <id-resource-id> --name <function-name> --resource-group <resource-group>
```

Record the returned `clientId` and `principalId`.

2) Grant access to Dataverse (if using Dataverse as source)

- In Power Platform Admin or the Dataverse environment:
  - Create an Application User that maps to the service principal using the identity's `clientId` (AppId).
  - Assign one or more Dataverse security roles that grant read access to the table (table-level privileges) you will use for accordion content.

- Notes:
  - Application Users are used for app-only access; you cannot log in interactively with them.
  - Ensure the role scope includes the required table(s). Test by calling the Dataverse OData endpoint using the Function.

3) Grant access for SharePoint/Graph (if using SharePoint as source)

- Option A — Tenant-level Graph app permissions (useful when you need site-wide access):
  - Azure Portal → Enterprise applications → search for the managed identity service principal → API permissions → Add a permission → Microsoft Graph → Application permissions → `Sites.Read.All` (or narrower) → Add → Grant admin consent.

- Option B — Site-level permissions (more granular, if applicable):
  - Add the service principal to a site collection's permissions (when supported) or use tenant app catalog patterns.

4) Update the Function to use Managed Identity for token acquisition

- Preferred Node/TypeScript code snippet (adds Managed Identity support via `@azure/identity`):

```ts
import { DefaultAzureCredential } from '@azure/identity';
import fetch from 'node-fetch';

const credential = new DefaultAzureCredential();

async function fetchWithManagedIdentity(url: string, scope: string) {
  const token = await credential.getToken(scope);
  if (!token) throw new Error('Failed to acquire token');
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token.token}`, Accept: 'application/json' } });
  return res;
}

// In your Function handler:
const scope = process.env.SOURCE_SCOPE || 'https://graph.microsoft.com/.default';
const apiUrl = process.env.SOURCE_API_URL!;
const r = await fetchWithManagedIdentity(apiUrl, scope);
```

- If using a user-assigned managed identity, pass the client id via `DefaultAzureCredential({ managedIdentityClientId: process.env.MANAGED_IDENTITY_CLIENT_ID })`.

Local development
- `DefaultAzureCredential` will try developer credentials when running locally (Azure CLI, VS Code). Use `az login` to authenticate locally, or set up a service principal in `local.settings.json` only for development.

5) Secure configuration and secrets
- If you must use client credentials (not Managed Identity), store `AZURE_CLIENT_SECRET` in Azure Key Vault and reference it in Function App settings — do not check secrets into source control.
- Use Function App settings (in Portal) to configure `SOURCE_API_URL` and `SOURCE_SCOPE`.

6) Test and verify
- Deploy the function and call `/api/accordion` (or test locally using `func start` after installing the Azure Functions Core Tools).
- Confirm a 200 response and that the returned array items contain `id`, `title`, `content`.

7) Caching and performance
- Cache upstream responses to reduce the number of token and API calls:
  - Quick: in-memory cache with TTL inside the function (ok for low-traffic or single-instance workloads).
  - Better: Azure Redis Cache + expiry and invalidation.
  - Best: Put a CDN in front of your endpoint and set reasonable cache headers for public content.

8) Monitoring and troubleshooting
- Use Application Insights to monitor Function runtime, auth failures, and upstream errors.
- If token acquisition fails:
  - Confirm identity enabled and the Function has identity assigned.
  - Confirm `scope` is correct (resource + `/.default`).
  - For Dataverse, ensure you created an Application User and assigned security roles.

9) Security checklist before production
- Use Managed Identity where possible.
- Restrict the Function's outbound network to only the required endpoints.
- Sanitize content fetched from upstream to prevent XSS (strip or safely render HTML if needed).
- Add rate limiting and logging.

Appendix: CLI commands reference

- Enable system-assigned identity:
  ```bash
  az functionapp identity assign --name <function-name> --resource-group <rg>
  ```

- Create and assign user-assigned identity:
  ```bash
  az identity create -g <rg> -n <id-name>
  az functionapp identity assign --identities <id-resource-id> --name <function-name> --resource-group <rg>
  ```

- Show identity details:
  ```bash
  az functionapp identity show -g <rg> -n <function-name> --query "{principalId:principalId, clientId:clientId}"
  ```

- Grant Graph app permission (tenant admin action required):
  - In Portal: Enterprise Applications → select service principal → API Permissions → Add → Microsoft Graph → Application permissions → choose and grant admin consent.

References
- Azure Managed Identity: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview
- Dataverse: Create an application user and assign roles: https://learn.microsoft.com/power-platform/admin/manage-service-principal
- @azure/identity DefaultAzureCredential: https://www.npmjs.com/package/@azure/identity

---
Follow this checklist when you are ready to configure the Function in your subscription. When you're done, tell me and I will wire the front-end `Accordion` to call the Function endpoint and render live content.
