import * as React from 'react';
import styles from './FeaturesSection.module.css';

type Feature = {
  id: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description:
      'Built with Microsoft security standards, ensuring your data is protected with industry-leading encryption and compliance.',
  },
  {
    id: 'cloud-native',
    title: 'Cloud-Native Architecture',
    description:
      'Seamlessly integrate with your Microsoft 365 environment and Azure infrastructure for optimal performance.',
  },
  {
    id: 'customisable',
    title: 'Fully Customisable',
    description:
      "Tailor the platform to your organisation's needs with extensive customization options and branding capabilities.",
  },
  {
    id: 'scalable',
    title: 'Scalable Platform',
    description: 'Grow from 10 to 10,000 users without compromising performance or user experience.',
  },
  {
    id: 'collaborative',
    title: 'Collaborative Learning',
    description:
      'Enable team-based learning with built-in collaboration tools and social learning features.',
  },
  {
    id: 'rich-content',
    title: 'Rich Content Support',
    description:
      'Support for SCORM, xAPI, videos, documents, and interactive content formats.',
  },
];

const Icon = ({ name }: { name: string }) => {
  // simple inline SVGs keyed by name
  switch (name) {
    case 'shield':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V5l7-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'cloud':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 17.5A4.5 4.5 0 0015.5 13H15a4 4 0 00-7.9.6A3.5 3.5 0 005.5 20H19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'puzzle':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 9v-2a2 2 0 012-2h2v2a2 2 0 002 2h2v2h-2a2 2 0 00-2 2v2H11v-2a2 2 0 00-2-2H7V9h2a2 2 0 002-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'chart':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 13v6M12 9v10M17 5v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'people':
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
  }
};

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Choose HiRed Learning?</h2>
        <p className={styles.subtitle}>Experience a learning management system designed for the modern workplace</p>
        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div className={styles.card} key={f.id}>
              <div className={styles.iconWrap} aria-hidden>
                <Icon name={['shield', 'cloud', 'puzzle', 'chart', 'people', 'book'][i] || 'circle'} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardText}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
