var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { msalInstance } from './msalConfig';
export function fetchMenuItems() {
    return __awaiter(this, void 0, void 0, function* () {
        // Replace with your Dataverse API endpoint and authentication
        const url = 'https://org05385a1b.crm6.dynamics.com/api/data/v9.2/hired_lmsmenuitems?$select=hired_name,hired_parent,hired_route,hired_icon,hired_graphendpoint';
        const dataverseScope = 'https://org05385a1b.crm6.dynamics.com/.default';
        // Acquire token using MSAL
        const account = msalInstance.getAllAccounts()[0];
        if (!account)
            throw new Error('No signed-in user');
        const result = yield msalInstance.acquireTokenSilent({
            account,
            scopes: [dataverseScope],
        });
        const token = result.accessToken;
        const response = yield fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
        if (!response.ok)
            throw new Error('Failed to fetch menu items');
        const data = yield response.json();
        // Dataverse returns items in value[]
        return data.value;
    });
}
