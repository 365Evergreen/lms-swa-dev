// MSAL configuration for Azure AD SSO in React
// Place this in src/utils/msalConfig.ts
import { PublicClientApplication } from '@azure/msal-browser';
// Read MSAL settings from Vite env vars when available. Set these in `.env` or your CI:
// VITE_MSAL_CLIENT_ID, VITE_MSAL_AUTHORITY
const clientId = import.meta.env.VITE_MSAL_CLIENT_ID || 'a4d253f0-3c0f-49eb-ab39-f5aecc9f0702';
const authority = import.meta.env.VITE_MSAL_AUTHORITY || 'https://login.microsoftonline.com/7a5bf294-6ae8-47c4-b0c4-b2f9166d7a3f';
const msalConfig = {
    auth: {
        clientId,
        authority,
        redirectUri: typeof window !== 'undefined' ? window.location.origin : '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
};
export const msalInstance = new PublicClientApplication(msalConfig);
