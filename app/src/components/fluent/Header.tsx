
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import hiredLogo from '../../assets/HiRED-logo-red.png';
import styles from './Header.module.css';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ChevronDown24Regular from './ChevronDown24Regular';
import './NavigationMenuRadix.css';
import { fetchMenuItems } from '../../utils/dataverseMenu';
import type { MenuItem } from '../../utils/dataverseMenu';

// Hardcoded parent items
const PARENTS = ['Topics', 'Courses', 'Pathways', 'Community', 'Resources'];



const Header: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
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
		if (!accounts || accounts.length === 0) return;
		setLoading(true);
		fetchMenuItems()
			.then(items => {
				setMenuItems(items);
				setLoading(false);
			})
			.catch(err => {
				console.error('Failed to load menu items:', err);
				setError('Failed to load menu items');
				setLoading(false);
			});
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
								const children = menuItems.filter(item => item.hired_parent === parent);
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
														<li key={child.hired_lmsmenuitemid} role="menuitem" tabIndex={0}>
															{child.hired_icon && <img src={child.hired_icon} alt="" style={{ width: 20, height: 20, marginRight: 8 }} />}
															{child.hired_name}
														</li>
													))}
												</ul>
											</div>
										</NavigationMenu.Content>
									</NavigationMenu.Item>
								);
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