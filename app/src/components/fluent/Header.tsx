
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
	const [menuItems, setMenuItems] = useState<MenuItem[] | WPMenuItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
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
		setLoading(true);
		setError(null);
		if (!accounts || accounts.length === 0) {
			// Anonymous: fetch WordPress menu
			fetchWordPressMenu()
				.then(items => {
					setMenuItems(items);
					setLoading(false);
				})
				.catch(err => {
					setError('Failed to load menu items');
					setLoading(false);
				});
		} else {
			// Authenticated: fetch Dataverse menu
			fetchMenuItems()
				.then(items => {
					setMenuItems(items);
					setLoading(false);
				})
				.catch(err => {
					setError('Failed to load menu items');
					setLoading(false);
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
					<img
						src={hiredLogo}
						alt="HiRED logo"
						className={styles['header-logo']}
					/>
					<span className={styles['header-title']}>
						Learn
					</span>
				</div>
				<div className={styles['header-right']}>
					<NavigationMenu.Root orientation="horizontal">
						<NavigationMenu.List className={styles['header-nav']}>
							{PARENTS.map((parent) => {
								// Authenticated: Dataverse menu
								if (accounts && accounts.length > 0) {
									const children = (menuItems as MenuItem[]).filter(item => item.hired_parent === parent);
									return (
										<NavigationMenu.Item key={parent} className={styles['header-link']}>
											<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}> 
												<span className={styles['header-trigger-label']}>{parent}</span>
												<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
											</NavigationMenu.Trigger>
											<NavigationMenu.Content className={styles['megamenu']}>
												<div className={styles['megamenu-content']} role="menu">
													{loading && <div>Loading...</div>}
													{error && <div style={{ color: 'red' }}>{error}</div>}
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
									// Anonymous: WordPress menu
									return (
										<NavigationMenu.Item key={parent} className={styles['header-link']}>
											<NavigationMenu.Trigger className={styles['header-trigger']} aria-label={`Show submenu for ${parent}`}> 
												<span className={styles['header-trigger-label']}>{parent}</span>
												<span className={styles['header-trigger-chevron']}><ChevronDown24Regular /></span>
											</NavigationMenu.Trigger>
											<NavigationMenu.Content className={styles['megamenu']}>
												<div className={styles['megamenu-content']} role="menu">
													{loading && <div>Loading...</div>}
													{error && <div style={{ color: 'red' }}>{error}</div>}
													<ul>
														{(menuItems as WPMenuItem[]).filter(item => item.label === parent).flatMap(item => item.childItems || []).map(child => (
															<li key={child.id} className={styles['megamenu-item']} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
																<a
																	href={child.url}
																	target="_blank"
																	rel="noopener noreferrer"
																	style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
																>
																	{/* Optionally add a thumb icon here if available */}
																	<span style={{ marginRight: 8, fontSize: 18 }}>👍</span>
																	<span>{child.label}</span>
																</a>
															</li>
														))}
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