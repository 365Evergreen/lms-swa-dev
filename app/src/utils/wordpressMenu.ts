// Utility to fetch WordPress menu items via WPGraphQL
// Adjust the MENU_LOCATION as needed (e.g., 'PRIMARY', 'MAIN', etc.)

const WP_GRAPHQL_ENDPOINT = 'https://thn.chh.mybluehost.me/website_8a441532/graphql';
const MENU_LOCATION = 'PRIMARY'; // Change to your menu location slug

export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  childItems?: WPMenuItem[];
}

export async function fetchWordPressMenu(): Promise<WPMenuItem[]> {
  const query = `
    query GetMenuItems {
      menuItems(where: {location: ${JSON.stringify(MENU_LOCATION)}}) {
        nodes {
          id
          label
          url
          parentId
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

  // Flat list to tree
  const items: WPMenuItem[] = data.menuItems.nodes;
  const itemMap: Record<string, WPMenuItem> = {};
  items.forEach(item => { item.childItems = []; itemMap[item.id] = item; });
  const tree: WPMenuItem[] = [];
  items.forEach(item => {
    if (item.parentId && itemMap[item.parentId]) {
      itemMap[item.parentId].childItems!.push(item);
    } else {
      tree.push(item);
    }
  });
  return tree;
}
