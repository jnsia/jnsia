import React from 'react';

import styles from './ProgressBar.module.css';

export default function ProgressBar({
  value,
  color = 'blue',
  width,
  height,
  style,
}: {
  value: number;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={styles.progressBar}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '12px',
        ...style,
      }}
    >
      <div
        className={`${styles.progressFill} ${styles[`fill-${color}`]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
