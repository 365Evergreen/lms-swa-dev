var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './Header.module.css';
// Example nav links with API endpoint for demonstration
const navLinks = [
    { label: 'Topics', href: '/topics', api: '/api/topics' },
    { label: 'Courses', href: '/courses', api: '/api/courses' },
    { label: 'Pathways', href: '/pathways', api: '/api/pathways' },
    { label: 'Community', href: '/community', api: '/api/community' },
    { label: 'Resources', href: '/resources', api: '/api/resources' },
];
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    // Responsive: close menu on nav click (mobile)
    const handleNavClick = (e, api) => __awaiter(this, void 0, void 0, function* () {
        setMenuOpen(false);
        if (api) {
            // Example API call on link click
            try {
                yield fetch(api);
            }
            catch (err) {
                // Handle error (optional)
            }
        }
    });
    return (_jsxs("header", { className: styles.header, children: [_jsx("div", { className: styles.logo, children: _jsx("a", { href: "/", "aria-label": "Accessible Learning Hub Home", children: _jsx("span", { className: styles.logoText, children: "Accessible Learning Hub" }) }) }), _jsxs("button", { className: styles.hamburger, "aria-label": menuOpen ? 'Close navigation menu' : 'Open navigation menu', "aria-expanded": menuOpen, "aria-controls": "main-nav", onClick: () => setMenuOpen((open) => !open), type: "button", children: [_jsx("span", { className: styles.hamburgerBar }), _jsx("span", { className: styles.hamburgerBar }), _jsx("span", { className: styles.hamburgerBar })] }), _jsx("nav", { id: "main-nav", className: menuOpen ? styles.navOpen : styles.nav, "aria-label": "Main navigation", children: _jsx("ul", { className: styles.navList, children: navLinks.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: styles.navLink, tabIndex: menuOpen || typeof window === 'undefined' || window.innerWidth > 900 ? 0 : -1, onClick: e => handleNavClick(e, link.api), children: link.label }) }, link.href))) }) })] }));
}
