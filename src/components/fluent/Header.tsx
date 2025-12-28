

import { useEffect, useState } from 'react';
import type { FC } from 'react';
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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetchMenuItems()
      .then(items => {
        setMenuItems(items);
        setLoading(false);
      })
      .catch(_err => {
        setError('Failed to load menu items');
        setLoading(false);
      });
  }, []);

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
                const children = menuItems.filter(item => item.Parent === parent);
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
                            <li key={child.Name} role="menuitem" tabIndex={0}>
                              {child.Icon && <img src={child.Icon} alt="" style={{ width: 20, height: 20, marginRight: 8 }} />}
                              {child.Name}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
