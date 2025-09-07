import React from 'react';

import styles from './Button.module.css';
import Spinner from '../../atoms/Spinner';

type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';
type ButtonColor = 'blue' | 'green' | 'red' | 'gray';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  variant = 'primary',
  color,
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const buttonClass = [
    styles.button,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    color ? styles[`color-${color}`] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      style={{
        ...style,
      }}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
