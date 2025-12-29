import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
const hiredLogo = 'https://storagehiredau.blob.core.windows.net/learning/HiRED-logo-red-D5xTJQF0.png';
import styles from './Header.module.css';
// Hardcoded parent items
const PARENTS = [
    { label: 'Topics', route: '/topics' },
    { label: 'Courses', route: '/courses' },
    { label: 'Pathways', route: '/pathways' },
    { label: 'Community', route: '/community' },
    { label: 'Resources', route: '/resources' },
];
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    return (_jsx("header", { className: scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header, children: _jsxs("div", { className: styles['header-content'], children: [_jsx(NavLink, { to: "/landing", className: styles['header-logo-link'], tabIndex: 0, "aria-label": "Home", children: _jsx("img", { src: hiredLogo, alt: "HiRED logo", className: styles['header-logo'] }) }), _jsxs("button", { className: styles.hamburger, "aria-label": mobileNavOpen ? 'Close menu' : 'Open menu', "aria-expanded": mobileNavOpen, "aria-controls": "main-nav", onClick: () => setMobileNavOpen((open) => !open), type: "button", children: [_jsx("span", { className: styles['hamburger-bar'] }), _jsx("span", { className: styles['hamburger-bar'] }), _jsx("span", { className: styles['hamburger-bar'] })] }), _jsx("nav", { className: mobileNavOpen ? `${styles['header-nav']} open` : styles['header-nav'], "aria-label": "Main navigation", id: "main-nav", children: _jsx("ul", { className: styles['header-nav-list'], children: PARENTS.map((item) => (_jsx("li", { className: styles['header-link'], children: _jsx(NavLink, { to: item.route, className: ({ isActive }) => isActive ? styles['active-link'] : '', tabIndex: 0, onClick: () => setMobileNavOpen(false), children: item.label }) }, item.label))) }) })] }) }));
};
export default Header;
