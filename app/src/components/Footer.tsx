import * as React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.left}>
          <img src="https://storagehiredau.blob.core.windows.net/learning/HiRED-logo-red-D5xTJQF0.png" alt="HiRed" className={styles.logo} />
        </div>
        <div className={styles.center}>
          <nav className={styles.nav} aria-label="Footer navigation">
            <a href="/privacy" className={styles.link}>Privacy</a>
            <a href="/terms" className={styles.link}>Terms</a>
            <a href="/contact" className={styles.link}>Contact</a>
          </nav>
          <div className={styles.copy}>© {year} HiRed. All rights reserved.</div>
        </div>
        <div className={styles.right}>
          <small className={styles.small}>Built for Microsoft environments</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
