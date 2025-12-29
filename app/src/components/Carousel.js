import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './Carousel.module.css';
const Carousel = ({ items, itemsToShow = 1 }) => {
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
    return (_jsxs("div", { className: styles.carousel, children: [_jsx("button", { className: styles.arrow, onClick: prev, "aria-label": "Previous", children: "\u2190" }), _jsx("div", { className: styles.track + ' ' + styles.trackDynamic, "data-items": itemsToShow, children: visibleItems.map((item) => (_jsx("div", { className: styles.item, children: item.content }, item.id))) }), _jsx("button", { className: styles.arrow, onClick: next, "aria-label": "Next", children: "\u2192" })] }));
};
export default Carousel;
