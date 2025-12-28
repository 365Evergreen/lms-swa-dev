import { msalInstance } from './msalConfig';

// Dataverse API integration for megamenu
// This utility fetches menu items from the hired_lmsmenuitems table

export type MenuItem = {
  hired_name: string;
  hired_parent: string;
  hired_route: string;
  hired_icon?: string | null;
  hired_graphendpoint?: string | null;
  hired_lmsmenuitemid: string;
};

export async function fetchMenuItems(): Promise<MenuItem[]> {
  // Replace with your Dataverse API endpoint and authentication
  const url =
    'https://org05385a1b.crm6.dynamics.com/api/data/v9.2/hired_lmsmenuitems?$select=hired_name,hired_parent,hired_route,hired_icon,hired_graphendpoint';

  const dataverseScope = 'https://org05385a1b.crm6.dynamics.com/.default';

  // Acquire token using MSAL
  const account = msalInstance.getAllAccounts()[0];
  if (!account) throw new Error('No signed-in user');
  const result = await msalInstance.acquireTokenSilent({
    account,
    scopes: [dataverseScope],
  });
  const token = result.accessToken;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch menu items');
  const data = await response.json();
  // Dataverse returns items in value[]
  return data.value as MenuItem[];
}
