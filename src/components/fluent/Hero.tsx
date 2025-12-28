

import type { FC } from 'react';
import { useState } from 'react';
import heroImg from '../../assets/hero.png';
import styles from './Hero.module.css';

export const Hero: FC = () => {
  const [search, setSearch] = useState('');

  return (
    <section className={styles['hero-section']}>
      <div className={styles['hero-inner']}>
        <h1 className={styles['hero-title']}>
          Learning for everyone, everywhere
        </h1>
        <p className={styles['hero-desc']}>
          Explore product documentation, training, credentials, Q&A, code references, and shows.
        </p>
        <form
          className={styles['hero-form']}
          onSubmit={e => { e.preventDefault(); /* handle search */ }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Learning Hub"
            className={styles['hero-input']}
          />
          <button
            type="submit"
            className={styles['hero-search-btn']}
          >
            Search
          </button>
        </form>
      </div>
      <img
        src={heroImg}
        alt="Hero background"
        className={styles['hero-img']}
      />
    </section>
  );
};
