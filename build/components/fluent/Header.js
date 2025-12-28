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
    // If authenticated, redirect to landing page
    useEffect(() => {
        if (accounts && accounts.length > 0) {
            navigate('/landing', { replace: true });
        }
    }, [accounts, navigate]);
    return (_jsx("header", { className: scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header, children: _jsxs("div", { className: styles['header-content'], children: [_jsxs("div", { className: styles['header-left'], children: [_jsx("img", { src: hiredLogo, alt: "HiRED logo", className: styles['header-logo'] }), _jsx("span", { className: styles['header-title'], children: "Learn" })] }), _jsxs("div", { className: styles['header-right'], children: [_jsx(NavigationMenu.Root, { orientation: "horizontal", children: _jsx(NavigationMenu.List, { className: styles['header-nav'], children: PARENTS.map((parent) => {
                                    // Show loading or error for child items
                                    if (childrenLoading) {
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("div", { children: "Loading..." }) }) })] }, parent));
                                    }
                                    if (childrenError) {
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("div", { style: { color: 'red' }, children: childrenError }) }) })] }, parent));
                                    }
                                    // Authenticated: Dataverse menu
                                    if (accounts && accounts.length > 0) {
                                        const children = childMenuItems.filter(item => item.hired_parent === parent);
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("ul", { children: children.map(child => (_jsxs(NavLink, { to: `/${child.hired_route}`, className: ({ isActive }) => `${styles['megamenu-item']} ${isActive ? styles['active-link'] : ''}`, style: { display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', position: 'relative', cursor: 'pointer' }, children: [child.hired_icon && (_jsx("img", { src: child.hired_icon, alt: "", style: { width: 20, height: 20, marginRight: 8 } })), _jsx("span", { children: child.hired_name })] }, child.hired_lmsmenuitemid))) }) }) })] }, parent));
                                    }
                                    else {
                                        // Anonymous: WordPress menu
                                        return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsx("div", { className: styles['megamenu-content'], role: "menu", children: _jsx("ul", { children: childMenuItems.filter(item => item.label === parent).flatMap(item => item.childItems || []).map(child => (_jsx("li", { className: styles['megamenu-item'], style: { display: 'flex', alignItems: 'center', cursor: 'pointer' }, children: _jsxs("a", { href: child.url, target: "_blank", rel: "noopener noreferrer", style: { display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }, children: [_jsx("span", { style: { marginRight: 8, fontSize: 18 }, children: "\uD83D\uDC4D" }), _jsx("span", { children: child.label })] }) }, child.id))) }) }) })] }, parent));
                                    }
                                }) }) }), (!accounts || accounts.length === 0) && (_jsx("button", { className: styles['header-login-btn'], onClick: () => instance.loginRedirect(), style: { marginLeft: 16 }, children: "Log in" }))] })] }) }));
};
export default Header;
