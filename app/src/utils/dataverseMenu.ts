// Dataverse API integration for megamenu
// This utility fetches menu items from the hired_lmsmenuitems table

export type MenuItem = {
  Name: string;
  Parent: string;
  Route: string;
  Icon?: string;
};

export async function fetchMenuItems(): Promise<MenuItem[]> {
  // Replace with your Dataverse API endpoint and authentication
  const url =
    'https://org05385a1b.crm6.dynamics.com/api/data/v9.2/hired_lmsmenuitems?$select=Name,Parent,Route,Icon';

  // For production, use MSAL or Azure AD for authentication and pass the access token
  // Here, we assume a bearer token is available (replace with your auth logic)
  const token = window.localStorage.getItem('dataverse_access_token');

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
