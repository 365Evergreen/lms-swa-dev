import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './components/fluent/Header';
import ContentRouter from './components/ContentRouter';
const Hero = () => (_jsxs("section", { style: {
        width: '100vw',
        height: '60vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://storagehiredau.blob.core.windows.net/learning/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }, children: [_jsx("h1", { style: { fontSize: '2.5rem', fontWeight: 700, marginBottom: 16, background: 'rgba(255,255,255,0.85)', padding: '0.5em 1em', borderRadius: 8 }, children: "Welcome to the Accessible Learning Hub" }), _jsx("p", { style: { fontSize: '1.25rem', color: '#444', maxWidth: 600, textAlign: 'center', background: 'rgba(255,255,255,0.7)', padding: '0.5em 1em', borderRadius: 8 }, children: "Discover accessible, modular learning with analytics and a beautiful, inclusive design." })] }));
const App = () => (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { style: { paddingTop: 80 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/landing", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: ":type/:slug", element: _jsx(ContentRouter, {}) }), _jsx(Route, { path: "/*", element: _jsx(Hero, {}) })] }) })] }));
export default App;
