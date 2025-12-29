import React, { useState } from 'react';
import styles from './Carousel.module.css';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  itemsToShow?: number; // For responsive breakpoints
}

const Carousel: React.FC<CarouselProps> = ({ items, itemsToShow = 1 }) => {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Responsive: show itemsToShow at once
  const visibleItems = items.slice(current, current + itemsToShow);
  // If at end, wrap around
  if (visibleItems.length < itemsToShow) {
    visibleItems.push(...items.slice(0, itemsToShow - visibleItems.length));
  }

  return (
    <div className={styles.carousel}>
      <button className={styles.arrow} onClick={prev} aria-label="Previous">
        &#8592;
      </button>
      <div
        className={styles.track + ' ' + styles.trackDynamic}
        data-items={itemsToShow}
      >
        {visibleItems.map((item) => (
          <div key={item.id} className={styles.item}>
            {item.content}
          </div>
        ))}
      </div>
      <button className={styles.arrow} onClick={next} aria-label="Next">
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
