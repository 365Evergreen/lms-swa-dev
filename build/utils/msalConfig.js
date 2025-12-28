// MSAL configuration for Azure AD SSO in React
// Place this in src/utils/msalConfig.ts
import { PublicClientApplication } from '@azure/msal-browser';
const msalConfig = {
    auth: {
        clientId: '6a089216-a848-4a5a-b57d-ffebb623da00',
        authority: 'https://login.microsoftonline.com/7a5bf294-6ae8-47c4-b0c4-b2f9166d7a3f',
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
};
export const msalInstance = new PublicClientApplication(msalConfig);
