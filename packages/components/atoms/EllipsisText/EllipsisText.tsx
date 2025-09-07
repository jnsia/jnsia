import { Text } from '@shared/ui';
import React from 'react';

export interface EllipsisTextProps {
  children: React.ReactNode;
  width?: number | string;
  maxWidth?: number | string;
  size?: number;
  weight?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export default function EllipsisText({
  children,
  width,
  maxWidth,
  size,
  weight,
  color,
  align,
  className,
  style,
}: EllipsisTextProps) {
  const ellipsisStyle: React.CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...(width && { width }),
    ...(maxWidth && { maxWidth }),
    ...style,
  };

  return (
    <Text
      size={size}
      weight={weight}
      color={color}
      align={align}
      className={className}
      style={ellipsisStyle}
    >
      {children}
    </Text>
  );
}
