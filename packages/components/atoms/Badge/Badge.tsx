import React from 'react';

import styles from './Badge.module.css';

export default function Badge({
  children,
  color = 'gray',
  size = 'medium',
  style,
}: {
  children: React.ReactNode;
  color?: 'green' | 'red' | 'blue' | 'gray' | string;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`${styles.badge} ${styles[color]} ${styles[size]}`}
      style={{ textAlign: 'center', ...style }}
    >
      {children}
    </div>
  );
}
