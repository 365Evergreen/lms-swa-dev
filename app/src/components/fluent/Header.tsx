
import { useEffect, useState } from 'react';
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate, NavLink } from 'react-router-dom';
const hiredLogo = 'https://storagehiredau.blob.core.windows.net/learning/HiRED-logo-red-D5xTJQF0.png';
import styles from './Header.module.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ChevronDown24Regular from './ChevronDown24Regular';
import './NavigationMenuRadix.css';
import { fetchMenuItems } from '../../utils/dataverseMenu';
import type { MenuItem } from '../../utils/dataverseMenu';
import { fetchWordPressMenu, WPMenuItem } from '../../utils/wordpressMenu';

// Hardcoded parent items
const PARENTS = ['Topics', 'Courses', 'Pathways', 'Community', 'Resources'];



const Header: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [childMenuItems, setChildMenuItems] = useState<MenuItem[] | WPMenuItem[]>([]);
	const [childrenLoading, setChildrenLoading] = useState(false);
	const [childrenError, setChildrenError] = useState<string | null>(null);
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
		if (!Array.isArray(accounts)) return; // Wait for MSAL to resolve
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
		} else {
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

		return (
			<header className={scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header}>
				<div className={styles['header-content']}>
					<NavLink to="/landing" className={styles['header-logo-link']} tabIndex={0} aria-label="Home">
						<img
							src={hiredLogo}
							alt="HiRED logo"
							className={styles['header-logo']}
						/>
					</NavLink>
					{/* Hamburger menu icon for mobile */}
					<button
						className={styles.hamburger}
						aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileNavOpen}
						aria-controls="main-nav"
						onClick={() => setMobileNavOpen((open) => !open)}
						type="button"
					>
						<span className={styles['hamburger-bar']} />
						<span className={styles['hamburger-bar']} />
						<span className={styles['hamburger-bar']} />
					</button>
					<nav
						className={mobileNavOpen ? `${styles['header-nav']} open` : styles['header-nav']}
						aria-label="Main navigation"
						id="main-nav"
					>
						<NavigationMenu.Root orientation="horizontal">
							<NavigationMenu.List className={styles['header-nav-list']}>
								{PARENTS.map((parent) => {
									if (childrenLoading) {
										return (
											<NavigationMenu.Item key={parent} className={styles['header-link']}>
												<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}>
													<span className={styles['header-trigger-label']}>{parent}</span>
													<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
												</NavigationMenu.Trigger>
												<NavigationMenu.Content className={styles['megamenu']}>
													<div className={styles['megamenu-content']} role="menu">
														<div className={styles['megamenu-loading']}>Loading...</div>
													</div>
												</NavigationMenu.Content>
											</NavigationMenu.Item>
										);
									}
									if (childrenError) {
										return (
											<NavigationMenu.Item key={parent} className={styles['header-link']}>
												<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}>
													<span className={styles['header-trigger-label']}>{parent}</span>
													<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
												</NavigationMenu.Trigger>
												<NavigationMenu.Content className={styles['megamenu']}>
													<div className={styles['megamenu-content']} role="menu">
														<div className={styles['megamenu-error']}>{childrenError}</div>
													</div>
												</NavigationMenu.Content>
											</NavigationMenu.Item>
										);
									}
									if (accounts && accounts.length > 0) {
										const children = (childMenuItems as MenuItem[]).filter(item => item.hired_parent === parent);
										return (
											<NavigationMenu.Item key={parent} className={styles['header-link']}>
												<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}>
													<span className={styles['header-trigger-label']}>{parent}</span>
													<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
												</NavigationMenu.Trigger>
												<NavigationMenu.Content className={styles['megamenu']}>
													<div className={styles['megamenu-content']} role="menu">
														<ul>
															{children.map(child => (
																<li key={child.hired_lmsmenuitemid} className={styles['megamenu-item']}>
																	<NavLink
																		to={`/${child.hired_route}`}
																		className={({ isActive }) => `${styles['megamenu-link']} ${isActive ? styles['active-link'] : ''}`}
																		tabIndex={0}
																	>
																		{child.hired_icon && (
																			<img
																				src={child.hired_icon}
																				alt=""
																				className={styles['megamenu-icon']}
																			/>
																		)}
																		<span>{child.hired_name}</span>
																	</NavLink>
																</li>
															))}
														</ul>
													</div>
												</NavigationMenu.Content>
											</NavigationMenu.Item>
										);
									} else {
										return (
											<NavigationMenu.Item key={parent} className={styles['header-link']}>
												<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}>
													<span className={styles['header-trigger-label']}>{parent}</span>
													<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
												</NavigationMenu.Trigger>
												<NavigationMenu.Content className={styles['megamenu']}>
													<div className={styles['megamenu-content']} role="menu">
														<ul>
															{(childMenuItems as WPMenuItem[])
																.filter(item => item.label === parent)
																.map(item => {
																	let slug = '';
																	try {
																		const url = new URL(item.url);
																		const parts = url.pathname.split('/').filter(Boolean);
																		slug = parts[parts.length - 1];
																	} catch (e) {
																		slug = item.url;
																	}
																	return (
																		<li key={item.id} className={styles['megamenu-item']}>
																			<NavLink
																				to={`/${slug}`}
																				className={styles['megamenu-link']}
																				tabIndex={0}
																			>
																				<span className={styles['megamenu-icon']}>👍</span>
																				<span>{item.label ? item.label : 'Menu Item'}</span>
																			</NavLink>
																		</li>
																	);
																})}
														</ul>
													</div>
												</NavigationMenu.Content>
											</NavigationMenu.Item>
										);
									}
								})}
							</NavigationMenu.List>
						</NavigationMenu.Root>
						{(!accounts || accounts.length === 0) && (
							<label
								className={styles['header-login-label']}
								tabIndex={0}
								role="link"
								onClick={() => { setMobileNavOpen(false); instance.loginRedirect(); }}
								onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setMobileNavOpen(false); instance.loginRedirect(); } }}
								aria-label="Log in"
								style={{ cursor: 'pointer', marginLeft: 16 }}
							>
								Log in
							</label>
						)}
					</nav>
				</div>
			</header>
		);
	}

	export default Header;