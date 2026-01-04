var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Utility to fetch WordPress menu items via WPGraphQL
// Configure the GraphQL endpoint via Vite env var `VITE_WP_GRAPHQL_ENDPOINT`.
const WP_GRAPHQL_ENDPOINT = import.meta.env.VITE_WP_GRAPHQL_ENDPOINT || 'https://thn.chh.mybluehost.me/website_8a441532/graphql';
export function fetchWordPressMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
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
        const response = yield fetch(WP_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch WordPress menu');
        }
        const parsed = yield response.json();
        const data = parsed === null || parsed === void 0 ? void 0 : parsed.data;
        const errors = parsed === null || parsed === void 0 ? void 0 : parsed.errors;
        if (errors) {
            throw new Error(errors.map((e) => e.message).join(', '));
        }
        // Get the first menu's items
        const menu = (_b = (_a = data === null || data === void 0 ? void 0 : data.menus) === null || _a === void 0 ? void 0 : _a.nodes) === null || _b === void 0 ? void 0 : _b[0];
        if (!menu || !((_c = menu.menuItems) === null || _c === void 0 ? void 0 : _c.edges))
            return [];
        return menu.menuItems.edges.map((edge) => edge.node || null).filter(Boolean);
    });
}
