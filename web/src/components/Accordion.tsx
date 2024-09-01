import React, { useState } from 'react';
import styles from './components.module.css';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className={`${styles.accordion} ${isOpen ? styles.active : ''}`}
                onClick={toggleAccordion}
            >
                {title}
            </button>
            <div
                className={styles.panel}
                style={{ maxHeight: isOpen ? '100px' : '0', overflow: 'hidden' }} // Ensure overflow is hidden for smooth animation
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;
