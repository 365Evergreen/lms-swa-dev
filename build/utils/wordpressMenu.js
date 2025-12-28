// Utility to fetch WordPress menu items via WPGraphQL
// Adjust the MENU_LOCATION as needed (e.g., 'PRIMARY', 'MAIN', etc.)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const WP_GRAPHQL_ENDPOINT = 'https://thn.chh.mybluehost.me/website_8a441532/graphql';
const MENU_LOCATION = 'PRIMARY'; // Change to your menu location slug
export function fetchWordPressMenu() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const response = yield fetch(WP_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch WordPress menu');
        }
        const { data, errors } = yield response.json();
        if (errors) {
            throw new Error(errors.map((e) => e.message).join(', '));
        }
        // Flat list to tree
        const items = data.menuItems.nodes;
        const itemMap = {};
        items.forEach(item => { item.childItems = []; itemMap[item.id] = item; });
        const tree = [];
        items.forEach(item => {
            if (item.parentId && itemMap[item.parentId]) {
                itemMap[item.parentId].childItems.push(item);
            }
            else {
                tree.push(item);
            }
        });
        return tree;
    });
}
