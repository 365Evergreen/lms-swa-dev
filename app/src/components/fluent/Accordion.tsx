import React, { useState } from 'react';
import styles from './Accordion.module.css';

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  items?: AccordionItem[];
};

const defaultItems: AccordionItem[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    content:
      'Learn how to sign in, navigate the hub, and find courses. This section links to quick-start resources and onboarding.',
  },
  {
    id: 'support',
    title: 'Support & help',
    content:
      'Find support channels, documentation, and contact information for technical or learning support.',
  },
  {
    id: 'security',
    title: 'Security & privacy',
    content:
      'Information about data handling, privacy, and how to request account changes in the HiRed platform.',
  },
];

const Accordion: React.FC<Props> = ({ items: initialItems }) => {
  const starting = initialItems ?? defaultItems;
  const [items] = useState<AccordionItem[]>(starting);
  const [openId, setOpenId] = useState<string | null>(starting[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <div className={styles.accordion} role="region" aria-label="Home quick help">
      {items.map((it) => (
        <div className={styles.item} key={it.id}>
          <button
            className={styles.header}
            aria-expanded={openId === it.id}
            aria-controls={`acc-panel-${it.id}`}
            id={`acc-btn-${it.id}`}
            onClick={() => toggle(it.id)}
          >
            <span className={styles.title}>{it.title}</span>
            <span className={styles.chev} aria-hidden>
              {openId === it.id ? '▾' : '▸'}
            </span>
          </button>
          <div
            id={`acc-panel-${it.id}`}
            role="region"
            aria-labelledby={`acc-btn-${it.id}`}
            className={
              openId === it.id ? `${styles.panel} ${styles.open}` : styles.panel
            }
          >
            <div className={styles.panelInner}>
              <div dangerouslySetInnerHTML={{ __html: it.content }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
