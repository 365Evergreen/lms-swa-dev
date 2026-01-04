



import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import AuthModal from './AuthModal';

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
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // determine desktop breakpoint in a safe way and keep it updated
    const m = window.matchMedia('(min-width: 901px)');
    const update = () => setIsDesktop(m.matches);
    update();
    m.addEventListener?.('change', update);
    return () => m.removeEventListener?.('change', update);
  }, []);

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
      <div className={styles['header-content']}>
        <div className={styles['header-left']}>
          <div className={styles.logo}>
            <NavLink to="/" className={styles['header-logo-link']} aria-label="Home">
              <img
                src="https://storagehiredau.blob.core.windows.net/learning/HiRED-logo-red-D5xTJQF0.png"
                alt="Accessible Learning Hub Logo"
                className={styles['header-logo']}
              />
            </NavLink>
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
        </div>
        <div className={styles['header-right']}>
          <nav
            id="main-nav"
            className={menuOpen ? styles.navOpen : styles.nav}
            aria-label="Main navigation"
          >
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={styles.navLink}
                    tabIndex={menuOpen || isDesktop ? 0 : -1}
                    onClick={e => handleNavClick(e, link.api)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.loginWrap}>
            <button
              className={styles.loginButton}
              onClick={() => setShowAuthModal(true)}
              type="button"
              aria-haspopup="dialog"
            >
              Sign in
            </button>
          </div>
          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
      </div>
    </header>
  );
}