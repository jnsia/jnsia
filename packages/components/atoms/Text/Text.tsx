import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  bold?: boolean;
  color?: string | 'secondary' | 'primary';
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  className?: string;
}

export default function Text({
  children,
  size = 16,
  weight,
  bold,
  color = 'inherit',
  align = 'left',
  style,
  className,
}: TextProps) {
  const getTextColor = (color: string | undefined) => {
    switch (color) {
      case 'secondary':
        return 'var(--color-secondary-text)';
      case 'primary':
        return 'var(--color-primary)';
      default:
        return color || 'var(--color-text)';
    }
  };

  const textColor = getTextColor(color);

  return (
    <div
      className={className}
      style={{
        fontSize: `${size}px`,
        fontWeight: bold ? 'bold' : weight,
        color: textColor,
        textAlign: align,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
