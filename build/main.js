import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './utils/msalConfig';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(MsalProvider, { instance: msalInstance, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }));
