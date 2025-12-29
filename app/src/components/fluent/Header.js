import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate, NavLink } from 'react-router-dom';
const hiredLogo = 'https://storagehiredau.blob.core.windows.net/learning/HiRED-logo-red-D5xTJQF0.png';
import styles from './Header.module.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ChevronDown24Regular from './ChevronDown24Regular';
import './NavigationMenuRadix.css';
import { fetchMenuItems } from '../../utils/dataverseMenu';
import { fetchWordPressMenu } from '../../utils/wordpressMenu';
// Hardcoded parent items
const PARENTS = ['Topics', 'Courses', 'Pathways', 'Community', 'Resources'];
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [childMenuItems, setChildMenuItems] = useState([]);
    const [childrenLoading, setChildrenLoading] = useState(false);
    const [childrenError, setChildrenError] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    // Only fetch child menu items after MSAL auth state is known
    useEffect(() => {
        if (!Array.isArray(accounts))
            return; // Wait for MSAL to resolve
        setChildMenuItems([]);
        setChildrenError(null);
        setChildrenLoading(true);
        if (accounts.length > 0) {
            // Authenticated: fetch Dataverse menu
            fetchMenuItems()
                .then(items => {
                setChildMenuItems(items);
                setChildrenLoading(false);
            })
                .catch(err => {
                setChildrenError('Failed to load menu items');
                setChildrenLoading(false);
            });
        }
        else {
            // Anonymous: fetch WordPress menu
            fetchWordPressMenu()
                .then(items => {
                setChildMenuItems(items);
                setChildrenLoading(false);
            })
                .catch(err => {
                setChildrenError(`Failed to load menu items: ${err.message}`);
                setChildrenLoading(false);
                if (typeof window !== 'undefined') {
                    // eslint-disable-next-line no-console
                    console.error('WPGraphQL menu fetch error:', err);
                }
            });
        }
    }, [accounts]);
    useEffect(() => {
        if (accounts && accounts.length > 0) {
            navigate('/landing', { replace: true });
        }
    }, [accounts, navigate]);
    return (_jsx("header", { className: scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header, children: _jsxs("div", { className: styles['header-content'], children: [_jsx(NavLink, { to: "/landing", className: styles['header-logo-link'], tabIndex: 0, "aria-label": "Home", children: _jsx("img", { src: hiredLogo, alt: "HiRED logo", className: styles['header-logo'] }) }), _jsxs("button", { className: styles.hamburger, "aria-label": mobileNavOpen ? 'Close menu' : 'Open menu', "aria-expanded": mobileNavOpen, "aria-controls": "main-nav", onClick: () => setMobileNavOpen((open) => !open), type: "button", children: [_jsx("span", { className: styles['hamburger-bar'] }), _jsx("span", { className: styles['hamburger-bar'] }), _jsx("span", { className: styles['hamburger-bar'] })] }), _jsxs("nav", { className: mobileNavOpen ? `${styles['header-nav']} open` : styles['header-nav'], "aria-label": "Main navigation", id: "main-nav", children: [_jsx(NavigationMenu.Root, { orientation: "horizontal", position: "popper", children: _jsx(NavigationMenu.List, { className: styles['header-nav-list'], children: PARENTS.map((parent) => {
                                    if (childrenLoading) {
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("div", { className: styles['megamenu-loading'], children: "Loading..." }) }) })] }, parent));
                                    }
                                    if (childrenError) {
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("div", { className: styles['megamenu-error'], children: childrenError }) }) })] }, parent));
                                    }
                                    if (accounts && accounts.length > 0) {
                                        const children = childMenuItems.filter(item => item.hired_parent === parent);
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("ul", { children: children.map(child => (_jsx("li", { className: styles['megamenu-item'], children: _jsxs(NavLink, { to: `/${child.hired_route}`, className: ({ isActive }) => `${styles['megamenu-link']} ${isActive ? styles['active-link'] : ''}`, tabIndex: 0, children: [child.hired_icon && (_jsx("img", { src: child.hired_icon, alt: "", className: styles['megamenu-icon'] })), _jsx("span", { children: child.hired_name })] }) }, child.hired_lmsmenuitemid))) }) }) })] }, parent));
                                    }
                                    else {
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("ul", { children: childMenuItems
                                                                .filter(item => item.label === parent)
                                                                .map(item => {
                                                                let slug = '';
                                                                try {
                                                                    const url = new URL(item.url);
                                                                    const parts = url.pathname.split('/').filter(Boolean);
                                                                    slug = parts[parts.length - 1];
                                                                }
                                                                catch (e) {
                                                                    slug = item.url;
                                                                }
                                                                return (_jsx("li", { className: styles['megamenu-item'], children: _jsxs(NavLink, { to: `/${slug}`, className: styles['megamenu-link'], tabIndex: 0, children: [_jsx("span", { className: styles['megamenu-icon'], children: "\uD83D\uDC4D" }), _jsx("span", { children: item.label ? item.label : 'Menu Item' })] }) }, item.id));
                                                            }) }) }) })] }, parent));
                                    }
                                }) }) }), (!accounts || accounts.length === 0) && (_jsx("label", { className: styles['header-login-label'], tabIndex: 0, role: "link", onClick: () => { setMobileNavOpen(false); instance.loginRedirect(); }, onKeyDown: e => { if (e.key === 'Enter' || e.key === ' ') {
                                setMobileNavOpen(false);
                                instance.loginRedirect();
                            } }, "aria-label": "Log in", style: { cursor: 'pointer', marginLeft: 16 }, children: "Log in" }))] })] }) }));
};
export default Header;
