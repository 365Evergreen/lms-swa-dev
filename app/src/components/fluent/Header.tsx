
import { useEffect, useState } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
const hiredLogo = 'https://storagehiredau.blob.core.windows.net/learning/HiRED-logo-red-D5xTJQF0.png';
import styles from './Header.module.css';

// Hardcoded parent items
const PARENTS = [
	{ label: 'Topics', route: '/topics' },
	{ label: 'Courses', route: '/courses' },
	{ label: 'Pathways', route: '/pathways' },
	{ label: 'Community', route: '/community' },
	{ label: 'Resources', route: '/resources' },
];



const Header: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
					<ul className={styles['header-nav-list']}>
						{PARENTS.map((item) => (
							<li key={item.label} className={styles['header-link']}>
								<NavLink
									to={item.route}
									className={({ isActive }) => isActive ? styles['active-link'] : ''}
									tabIndex={0}
									onClick={() => setMobileNavOpen(false)}
								>
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;