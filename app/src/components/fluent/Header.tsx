
import { useEffect, useState } from 'react';
import type { FC } from 'react';
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



const Header: FC = () => {
  const [scrolled, setScrolled] = useState(false);
	const [childMenuItems, setChildMenuItems] = useState<MenuItem[] | WPMenuItem[]>([]);
	const [childrenLoading, setChildrenLoading] = useState(false);
	const [childrenError, setChildrenError] = useState<string | null>(null);
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

	// If authenticated, redirect to landing page
	useEffect(() => {
		if (accounts && accounts.length > 0) {
			navigate('/landing', { replace: true });
		}
	}, [accounts, navigate]);

	return (
		<header className={scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header}>
			<div className={styles['header-content']}>
				   <div className={styles['header-left']}>
					   <NavLink to="/landing" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
						   <img
							   src={hiredLogo}
							   alt="HiRED logo"
							   className={styles['header-logo']}
						   />
						   <span className={styles['header-title']}>
							   Learn
						   </span>
					   </NavLink>
				   </div>
				<div className={styles['header-right']}>
					<NavigationMenu.Root orientation="horizontal">
						<NavigationMenu.List className={styles['header-nav']}>
							{PARENTS.map((parent) => {
								// Show loading or error for child items
								if (childrenLoading) {
									return (
										<NavigationMenu.Item key={parent} className={styles['header-link']}>
											<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}> 
												<span className={styles['header-trigger-label']}>{parent}</span>
												<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
											</NavigationMenu.Trigger>
											<NavigationMenu.Content className={styles['megamenu']}>
												<div className={styles['megamenu-content']} role="menu">
													<div>Loading...</div>
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
													<div style={{ color: 'red' }}>{childrenError}</div>
												</div>
											</NavigationMenu.Content>
										</NavigationMenu.Item>
									);
								}
								// Authenticated: Dataverse menu
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
															<NavLink
																key={child.hired_lmsmenuitemid}
																to={`/${child.hired_route}`}
																className={({ isActive }) => `${styles['megamenu-item']} ${isActive ? styles['active-link'] : ''}`}
																style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', position: 'relative', cursor: 'pointer' }}
															>
																{child.hired_icon && (
																	<img
																		src={child.hired_icon}
																		alt=""
																		style={{ width: 20, height: 20, marginRight: 8 }}
																	/>
																)}
																<span>{child.hired_name}</span>
															</NavLink>
														))}
													</ul>
												</div>
											</NavigationMenu.Content>
										</NavigationMenu.Item>
									);
								} else {
									// Anonymous: WordPress menu (flat structure)
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
																// Extract slug from the WordPress URL
																let slug = '';
																try {
																	const url = new URL(item.url);
																	const parts = url.pathname.split('/').filter(Boolean);
																	slug = parts[parts.length - 1];
																} catch (e) {
																	slug = item.url;
																}
																return (
																	<li key={item.id} className={styles['megamenu-item']} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
																		<NavLink
																			to={`/${parent.toLowerCase()}/${slug}`}
																			style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
																		>
																			<span style={{ marginRight: 8, fontSize: 18 }}>👍</span>
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
					{/* Login button for unauthenticated users */}
					{(!accounts || accounts.length === 0) && (
						<button
							className={styles['header-login-btn']}
							onClick={() => instance.loginRedirect()}
							style={{ marginLeft: 16 }}
						>
							Log in
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;