import React from 'react';
import styles from './AuthModal.module.css';

type Props = {
  onClose: () => void;
};

const AuthModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Sign in">
      <div className={styles.dialog}>
        <header className={styles.header}>
          <h3 className={styles.title}>Sign in</h3>
          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        </header>

        <div className={styles.body}>
          <p className={styles.lead}>This modal is a UI placeholder only. Authentication is not implemented.</p>

          <div className={styles.optionRow}>
            <button className={styles.providerBtn} disabled>Sign in with Microsoft</button>
          </div>

          <div className={styles.divider}>or</div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" placeholder="you@company.com" />

            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" placeholder="Password" />

            <div className={styles.formActions}>
              <button className={styles.primary} type="button" disabled>Sign in</button>
              <button className={styles.ghost} type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
