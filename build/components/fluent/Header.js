"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
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
    return (<header className={scrolled ? "".concat(Header_module_css_1.default.header, " ").concat(Header_module_css_1.default.headerScrolled) : Header_module_css_1.default.header}>
			<div className={Header_module_css_1.default['header-content']}>
				<div className={Header_module_css_1.default['header-left']}>
					<img src={HiRED_logo_red_png_1.default} alt="HiRED logo" className={Header_module_css_1.default['header-logo']}/>
					<span className={Header_module_css_1.default['header-title']}>
						Learn
					</span>
				</div>
				<div className={Header_module_css_1.default['header-right']}>
					<NavigationMenu.Root orientation="horizontal">
						<NavigationMenu.List className={Header_module_css_1.default['header-nav']}>
							{PARENTS.map(function (parent) {
            var children = menuItems.filter(function (item) { return item.Parent === parent; });
            return (<NavigationMenu.Item key={parent} className={Header_module_css_1.default['header-link']}>
										<NavigationMenu.Trigger className={Header_module_css_1.default['header-trigger']} aria-label={"Show submenu for ".concat(parent)}> 
											<span className={Header_module_css_1.default['header-trigger-label']}>{parent}</span>
											<span className={Header_module_css_1.default['header-trigger-chevron']}><ChevronDown24Regular_1.default /></span>
										</NavigationMenu.Trigger>
										<NavigationMenu.Content className={Header_module_css_1.default['megamenu']}>
											<div className={Header_module_css_1.default['megamenu-content']} role="menu">
												{loading && <div>Loading...</div>}
												{error && <div style={{ color: 'red' }}>{error}</div>}
												<ul>
													{children.map(function (child) { return (<li key={child.Name} role="menuitem" tabIndex={0}>
															{child.Icon && <img src={child.Icon} alt="" style={{ width: 20, height: 20, marginRight: 8 }}/>}
															{child.Name}
														</li>); })}
												</ul>
											</div>
										</NavigationMenu.Content>
									</NavigationMenu.Item>);
        })}
						</NavigationMenu.List>
					</NavigationMenu.Root>
				</div>
			</div>
		</header>);
};
exports.default = Header;
