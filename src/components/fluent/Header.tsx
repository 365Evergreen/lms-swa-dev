
import type { FC } from 'react';
import hiredLogo from '../../assets/HiRED-logo-red.png';

const Header: FC = () => {
  return (
    <header
      style={{
        width: '100vw',
        marginTop: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 3vw',
        background: 'var(--themePrimary, #001729)',
        color: 'var(--white, #ffffff)',
        minHeight: 56,
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Logo */}
        <img
          src={hiredLogo}
          alt="HiRED logo"
          style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 4, marginRight: 12, background: 'var(--white, #fff)' }}
        />
        <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>
          {/* App name placeholder */}
          Learn
        </span>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Menu items placeholder */}
        <span style={{ fontWeight: 500, cursor: 'pointer', opacity: 0.7 }}>Documentation</span>
        <span style={{ fontWeight: 500, cursor: 'pointer', opacity: 0.7 }}>Training</span>
        <span style={{ fontWeight: 500, cursor: 'pointer', opacity: 0.7 }}>Topics</span>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Profile/avatar placeholder */}
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2d2d23', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
          PM
        </div>
      </div>
    </header>
  );
};

export default Header;
