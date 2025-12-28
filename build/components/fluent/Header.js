"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var msal_react_1 = require("@azure/msal-react");
var react_router_dom_1 = require("react-router-dom");
var HiRED_logo_red_png_1 = require("../../assets/HiRED-logo-red.png");
var Header_module_css_1 = require("./Header.module.css");
var NavigationMenu = require("@radix-ui/react-navigation-menu");
var ChevronDown24Regular_1 = require("./ChevronDown24Regular");
require("./NavigationMenuRadix.css");
var dataverseMenu_1 = require("../../utils/dataverseMenu");
// Hardcoded parent items
var PARENTS = ['Topics', 'Courses', 'Pathways', 'Community', 'Resources'];
var Header = function () {
    var _a = (0, react_1.useState)(false), scrolled = _a[0], setScrolled = _a[1];
    var _b = (0, react_1.useState)([]), menuItems = _b[0], setMenuItems = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, msal_react_1.useMsal)(), instance = _e.instance, accounts = _e.accounts;
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        var onScroll = function () {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return function () { return window.removeEventListener('scroll', onScroll); };
    }, []);
    (0, react_1.useEffect)(function () {
        (0, dataverseMenu_1.fetchMenuItems)()
            .then(function (items) {
            setMenuItems(items);
            setLoading(false);
        })
            .catch(function (_err) {
            setError('Failed to load menu items');
            setLoading(false);
        });
    }, []);
    // If authenticated, redirect to landing page
    (0, react_1.useEffect)(function () {
        if (accounts && accounts.length > 0) {
            navigate('/landing', { replace: true });
        }
    }, [accounts, navigate]);
    return ((0, jsx_runtime_1.jsx)("header", { className: scrolled ? "".concat(Header_module_css_1.default.header, " ").concat(Header_module_css_1.default.headerScrolled) : Header_module_css_1.default.header, children: (0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default['header-content'], children: [(0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default['header-left'], children: [(0, jsx_runtime_1.jsx)("img", { src: HiRED_logo_red_png_1.default, alt: "HiRED logo", className: Header_module_css_1.default['header-logo'] }), (0, jsx_runtime_1.jsx)("span", { className: Header_module_css_1.default['header-title'], children: "Learn" })] }), (0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default['header-right'], children: [(0, jsx_runtime_1.jsx)(NavigationMenu.Root, { orientation: "horizontal", children: (0, jsx_runtime_1.jsx)(NavigationMenu.List, { className: Header_module_css_1.default['header-nav'], children: PARENTS.map(function (parent) {
                                    var children = menuItems.filter(function (item) { return item.Parent === parent; });
                                    return ((0, jsx_runtime_1.jsxs)(NavigationMenu.Item, { className: Header_module_css_1.default['header-link'], children: [(0, jsx_runtime_1.jsxs)(NavigationMenu.Trigger, { className: Header_module_css_1.default['header-trigger'], "aria-label": "Show submenu for ".concat(parent), children: [(0, jsx_runtime_1.jsx)("span", { className: Header_module_css_1.default['header-trigger-label'], children: parent }), (0, jsx_runtime_1.jsx)("span", { className: Header_module_css_1.default['header-trigger-chevron'], children: (0, jsx_runtime_1.jsx)(ChevronDown24Regular_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(NavigationMenu.Content, { className: Header_module_css_1.default['megamenu'], children: (0, jsx_runtime_1.jsxs)("div", { className: Header_module_css_1.default['megamenu-content'], role: "menu", children: [loading && (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), error && (0, jsx_runtime_1.jsx)("div", { style: { color: 'red' }, children: error }), (0, jsx_runtime_1.jsx)("ul", { children: children.map(function (child) { return ((0, jsx_runtime_1.jsxs)("li", { role: "menuitem", tabIndex: 0, children: [child.Icon && (0, jsx_runtime_1.jsx)("img", { src: child.Icon, alt: "", style: { width: 20, height: 20, marginRight: 8 } }), child.Name] }, child.Name)); }) })] }) })] }, parent));
                                }) }) }), (!accounts || accounts.length === 0) && ((0, jsx_runtime_1.jsx)("button", { className: Header_module_css_1.default['header-login-btn'], onClick: function () { return instance.loginRedirect(); }, style: { marginLeft: 16 }, children: "Log in" }))] })] }) }));
};
exports.default = Header;
