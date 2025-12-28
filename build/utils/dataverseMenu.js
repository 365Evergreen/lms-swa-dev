// Dataverse API integration for megamenu
// This utility fetches menu items from the hired_lmsmenuitems table
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchMenuItems() {
    return __awaiter(this, void 0, void 0, function* () {
        // Replace with your Dataverse API endpoint and authentication
        const url = 'https://org05385a1b.crm6.dynamics.com/api/data/v9.2/hired_lmsmenuitems?$select=Name,Parent,Route,Icon';
        // For production, use MSAL or Azure AD for authentication and pass the access token
        // Here, we assume a bearer token is available (replace with your auth logic)
        const token = window.localStorage.getItem('dataverse_access_token');
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
