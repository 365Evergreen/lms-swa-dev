
import type { FC } from 'react';
import { useState } from 'react';
import heroImg from '../../assets/hero.png';

export const Hero: FC = () => {
  const [search, setSearch] = useState('');

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: 420,
        background: 'var(--neutralLighterAlt, #faf9f8)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 0,
        margin: '-56px 0 0 0',
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 1,
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        zIndex: 2,
        width: '100%',
        maxWidth: 900,
        margin: 0,
        padding: '64px 0 0 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 700,
          margin: 0,
          color: 'var(--themePrimary, #001729)',
          background: 'linear-gradient(90deg, #a259c6 0%, #3b66d7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Learning for everyone, everywhere
        </h1>
        <p style={{ fontSize: 22, color: 'var(--neutralPrimary, #323130)', margin: '18px 0 32px 0', fontWeight: 400 }}>
          Explore product documentation, training, credentials, Q&A, code references, and shows.
        </p>
        <form
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          onSubmit={e => { e.preventDefault(); /* handle search */ }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Learning Hub"
            style={{
              fontSize: 20,
              padding: '0.7em 1em',
              borderRadius: 6,
              border: '1px solid var(--neutralQuaternary, #d0d0d0)',
              width: 380,
              maxWidth: '60vw',
              outline: 'none',
              marginRight: 8,
            }}
          />
          <button
            type="submit"
            style={{
              fontSize: 20,
              padding: '0.7em 2em',
              borderRadius: 6,
              background: 'var(--themePrimary, #001729)',
              color: 'var(--white, #fff)',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>
      </div>
      <img
        src={heroImg}
        alt="Hero background"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          minWidth: 600,
          maxWidth: '60vw',
          objectFit: 'cover',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </section>
  );
};
