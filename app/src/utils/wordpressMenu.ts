// Utility to fetch WordPress menu items via WPGraphQL
// Configure the GraphQL endpoint via Vite env var `VITE_WP_GRAPHQL_ENDPOINT`.
const WP_GRAPHQL_ENDPOINT = import.meta.env.VITE_WP_GRAPHQL_ENDPOINT || 'https://thn.chh.mybluehost.me/website_8a441532/graphql';

export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
}

export async function fetchWordPressMenu(): Promise<WPMenuItem[]> {
  const query = `
    query {
      menus {
        nodes {
          id
          name
          menuItems {
            edges {
              node {
                id
                label
                url
                parentId
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(WP_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch WordPress menu');
  }

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(errors.map((e: any) => e.message).join(', '));
  }

  // Get the first menu's items
  const menu = data.menus.nodes[0];
  if (!menu) return [];
  return menu.menuItems.edges.map((edge: any) => edge.node);
}
