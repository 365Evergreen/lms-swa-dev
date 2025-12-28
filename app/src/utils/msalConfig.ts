// MSAL configuration for Azure AD SSO in React
// Place this in src/utils/msalConfig.ts

import { PublicClientApplication, Configuration } from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: 'a4d253f0-3c0f-49eb-ab39-f5aecc9f0702',
    authority: 'https://login.microsoftonline.com/7a5bf294-6ae8-47c4-b0c4-b2f9166d7a3f',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
