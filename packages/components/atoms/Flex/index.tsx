import React from 'react';

interface FlexProps {
  children: React.ReactNode;
  column?: boolean;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  gap?: number;
  wrap?: boolean;
  flex?: number | string; // 예: 1 또는 "1 1 auto"
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Flex({
  children,
  column = false,
  justify = 'flex-start',
  align = 'stretch',
  gap = 0,
  wrap = false,
  flex,
  style,
  className,
  onClick,
  onContextMenu,
}: FlexProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: column ? 'column' : 'row',
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: gap ? `${gap}px` : undefined,
        flex,
        ...style,
      }}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
}
