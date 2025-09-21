import React from 'react';

import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
  className?: string;
  style?: React.CSSProperties;
  padding?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  borderLeft?: boolean;
}

export default function Card({
  children,
  variant = 'default',
  hoverable = false,
  clickable = false,
  onClick,
  className = '',
  style,
  padding = 'medium',
  bordered = true,
  borderLeft = false,
}: CardProps) {
  const cardClass = [
    styles.card,
    styles[`card-${variant}`],
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    clickable ? styles.clickable : '',
    bordered ? styles.bordered : '',
    borderLeft ? styles.borderLeft : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass} onClick={onClick} style={style}>
      {children}
    </div>
  );
}
