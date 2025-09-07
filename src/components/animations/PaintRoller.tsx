'use client';

import React from 'react';
import styles from './PaintRoller.module.css';

interface PaintRollerProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function PaintRoller({
  className = '',
  primaryColor = '#fc8f2e',
  secondaryColor = '#e86f1a',
}: PaintRollerProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={styles.roller}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${primaryColor} 0, ${primaryColor} 80%, ${secondaryColor} 80%)`,
        }}
      />
      <div className={styles.handle} />
      <div
        className={styles.paint}
        style={{
          backgroundColor: primaryColor,
        }}
      />
    </div>
  );
}
