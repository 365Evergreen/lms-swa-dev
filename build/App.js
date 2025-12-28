import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
const App = () => (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/landing", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/*", element: _jsx("div", { children: "Hello LMS SWA App" }) })] }) }));
export default App;
