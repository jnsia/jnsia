import React from 'react';

// 핸들 설정 상수
const HANDLE_CONFIG = {
  size: 8,
  offset: -4,
  color: '#1890ff',
  backgroundColor: 'rgba(24, 144, 255, 0.1)',
  borderColor: '#1890ff',
  borderWidth: 2,
} as const;

export interface ResizeHandleDefinition {
  id: string;
  cursor: string;
  position: React.CSSProperties;
  type: 'corner' | 'edge';
}

export const getHandlePosition = (
  handleId: string,
  offset: number = HANDLE_CONFIG.offset,
): React.CSSProperties => {
  const positions: Record<string, React.CSSProperties> = {
    nw: { top: offset, left: offset },
    ne: { top: offset, right: offset },
    sw: { bottom: offset, left: offset },
    se: { bottom: offset, right: offset },
    n: { top: offset, left: '50%', transform: 'translateX(-50%)' },
    s: { bottom: offset, left: '50%', transform: 'translateX(-50%)' },
    w: { left: offset, top: '50%', transform: 'translateY(-50%)' },
    e: { right: offset, top: '50%', transform: 'translateY(-50%)' },
  };

  return positions[handleId] || {};
};

export const getHandleCursor = (handleId: string): string => {
  const cursors: Record<string, string> = {
    nw: 'nw-resize',
    ne: 'ne-resize',
    sw: 'sw-resize',
    se: 'se-resize',
    n: 'n-resize',
    s: 's-resize',
    w: 'w-resize',
    e: 'e-resize',
  };

  return cursors[handleId] || 'default';
};

export const getHandleType = (handleId: string): 'corner' | 'edge' => {
  const cornerHandles = ['nw', 'ne', 'sw', 'se'];
  return cornerHandles.includes(handleId) ? 'corner' : 'edge';
};

// 모든 resize 핸들 정의
export const RESIZE_HANDLES: ResizeHandleDefinition[] = [
  'nw',
  'ne',
  'sw',
  'se',
  'n',
  's',
  'w',
  'e',
].map((id) => ({
  id,
  cursor: getHandleCursor(id),
  position: getHandlePosition(id),
  type: getHandleType(id),
}));

export const getSelectionAreaStyles = (
  x: number,
  y: number,
  width: number,
  height: number,
): React.CSSProperties => ({
  position: 'absolute',
  left: x,
  top: y,
  width,
  height,
  border: `${HANDLE_CONFIG.borderWidth}px dashed ${HANDLE_CONFIG.borderColor}`,
  backgroundColor: HANDLE_CONFIG.backgroundColor,
  pointerEvents: 'auto',
  zIndex: 15000,
});

export const getHandleBaseStyles = (): React.CSSProperties => ({
  position: 'absolute',
  width: HANDLE_CONFIG.size,
  height: HANDLE_CONFIG.size,
  backgroundColor: HANDLE_CONFIG.color,
  pointerEvents: 'auto',
});
