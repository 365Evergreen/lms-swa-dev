import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import hiredLogo from '../../assets/HiRED-logo-red.png';
import styles from './Header.module.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ChevronDown24Regular from './ChevronDown24Regular';
import './NavigationMenuRadix.css';
import { fetchMenuItems } from '../../utils/dataverseMenu';
// Hardcoded parent items
const PARENTS = ['Topics', 'Courses', 'Pathways', 'Community', 'Resources'];
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
        fetchMenuItems()
            .then(items => {
            setMenuItems(items);
            setLoading(false);
        })
            .catch(_err => {
            setError('Failed to load menu items');
            setLoading(false);
        });
    }, []);
    // If authenticated, redirect to landing page
    useEffect(() => {
        if (accounts && accounts.length > 0) {
            navigate('/landing', { replace: true });
        }
    }, [accounts, navigate]);
    return (_jsx("header", { className: scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header, children: _jsxs("div", { className: styles['header-content'], children: [_jsxs("div", { className: styles['header-left'], children: [_jsx("img", { src: hiredLogo, alt: "HiRED logo", className: styles['header-logo'] }), _jsx("span", { className: styles['header-title'], children: "Learn" })] }), _jsxs("div", { className: styles['header-right'], children: [_jsx(NavigationMenu.Root, { orientation: "horizontal", children: _jsx(NavigationMenu.List, { className: styles['header-nav'], children: PARENTS.map((parent) => {
                                    const children = menuItems.filter(item => item.Parent === parent);
                                    return (_jsxs(NavigationMenu.Item, { className: styles['header-link'], children: [_jsxs(NavigationMenu.Trigger, { className: styles['header-trigger'], "aria-label": `Show submenu for ${parent}`, children: [_jsx("span", { className: styles['header-trigger-label'], children: parent }), _jsx("span", { className: styles['header-trigger-chevron'], children: _jsx(ChevronDown24Regular, {}) })] }), _jsx(NavigationMenu.Content, { className: styles['megamenu'], children: _jsxs("div", { className: styles['megamenu-content'], role: "menu", children: [loading && _jsx("div", { children: "Loading..." }), error && _jsx("div", { style: { color: 'red' }, children: error }), _jsx("ul", { children: children.map(child => (_jsxs("li", { role: "menuitem", tabIndex: 0, children: [child.Icon && _jsx("img", { src: child.Icon, alt: "", style: { width: 20, height: 20, marginRight: 8 } }), child.Name] }, child.Name))) })] }) })] }, parent));
                                }) }) }), (!accounts || accounts.length === 0) && (_jsx("button", { className: styles['header-login-btn'], onClick: () => instance.loginRedirect(), style: { marginLeft: 16 }, children: "Log in" }))] })] }) }));
};
export default Header;
