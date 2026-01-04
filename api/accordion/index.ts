//import { AzureFunction, Context, HttpRequest } from "@azure/functions";

// Temporary: return static dummy accordion items so the UI can continue
// development without upstream integration. Replace with managed identity or
// client-credentials fetching when ready.

const DEFAULT_ITEMS = [
  { id: 'getting-started', title: 'Getting started', content: 'Learn how to sign in, navigate the hub, and find courses.' },
  { id: 'support', title: 'Support & help', content: 'Find support channels, documentation, and contact information.' },
  { id: 'security', title: 'Security & privacy', content: 'Information about data handling, privacy, and account requests.' },
];

/*const httpTrigger: AzureFunction = async function (context: Context, _req: HttpRequest) {
  context.log('Accordion function (dummy) invoked');
  try {
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: DEFAULT_ITEMS,
    };
  } catch (err) {
    context.log.error(err instanceof Error ? err.message : String(err));
    context.res = { status: 500, body: { error: (err as Error).message || String(err) } };
  }
};

export default httpTrigger;*/
