"use strict";
// MSAL configuration for Azure AD SSO in React
// Place this in src/utils/msalConfig.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.msalInstance = void 0;
var msal_browser_1 = require("@azure/msal-browser");
var msalConfig = {
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
exports.msalInstance = new msal_browser_1.PublicClientApplication(msalConfig);
