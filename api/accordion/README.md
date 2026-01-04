# Accordion Azure Function

This Azure Function returns accordion items for the site homepage. It is intended to run server-side and use app-only credentials (client credentials) or Managed Identity to call Dataverse or SharePoint/Graph.

Configuration (set in Function App settings or `local.settings.json` for local testing):

- `AZURE_CLIENT_ID` - App registration (client) id
- `AZURE_CLIENT_SECRET` - App secret (or use Managed Identity instead)
- `AZURE_TENANT_ID` - Tenant id
- `SOURCE_API_URL` - The upstream API URL to fetch items from (Dataverse OData or Graph/SharePoint endpoint). The function expects a `value[]` in the response.
- `SOURCE_SCOPE` - Token scope e.g. `https://orgXXXX.crmX.dynamics.com/.default` or `https://graph.microsoft.com/.default`

Mapping notes:
- The function maps upstream rows into `{ id, title, content }`. Modify `index.ts` mapping if your list uses different field names.

SharePoint list guidance:
- If you plan to use SharePoint, create a list with at least `Title` (single line) and `Content` (multi-line) columns. Provide the REST/Graph URL as `SOURCE_API_URL`.

Security:
- Never store `AZURE_CLIENT_SECRET` in source control. Use Azure Key Vault and reference from Function App settings, or prefer Managed Identity for production.
