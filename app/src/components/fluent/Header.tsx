


import React, { useState } from 'react';
import styles from './Header.module.css';

// Example nav links with API endpoint for demonstration
const navLinks = [
  { label: 'Topics', href: '/topics', api: '/api/topics' },
  { label: 'Courses', href: '/courses', api: '/api/courses' },
  { label: 'Pathways', href: '/pathways', api: '/api/pathways' },
  { label: 'Community', href: '/community', api: '/api/community' },
  { label: 'Resources', href: '/resources', api: '/api/resources' },
];


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Responsive: close menu on nav click (mobile)
  const handleNavClick = async (e: React.MouseEvent<HTMLAnchorElement>, api?: string) => {
    setMenuOpen(false);
    if (api) {
      // Example API call on link click
      try {
        await fetch(api);
      } catch (err) {
        // Handle error (optional)
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/" aria-label="Accessible Learning Hub Home">
          <span className={styles.logoText}>Accessible Learning Hub</span>
        </a>
      </div>
      <button
        className={styles.hamburger}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>
      <nav
        id="main-nav"
        className={menuOpen ? styles.navOpen : styles.nav}
        aria-label="Main navigation"
      >
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navLink}
                tabIndex={menuOpen || typeof window === 'undefined' || window.innerWidth > 900 ? 0 : -1}
                onClick={e => handleNavClick(e, link.api)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}