import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './components/fluent/Header';
import ContentRouter from './components/ContentRouter';
import WPPage from './components/WPPage';
const Hero = () => (_jsxs("section", { className: "heroSection", children: [_jsx("h1", { className: "heroTitle", children: "Welcome to the Accessible Learning Hub" }), _jsx("p", { className: "heroSubtitle", children: "Discover accessible, modular learning with analytics and a beautiful, inclusive design." })] }));
const App = () => (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: "mainContentWithHeader", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/landing", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: ":type/:slug", element: _jsx(ContentRouter, {}) }), _jsx(Route, { path: ":parent/:slug", element: _jsx(WPPage, {}) }), _jsx(Route, { path: "/*", element: _jsx(Hero, {}) })] }) })] }));
export default App;
