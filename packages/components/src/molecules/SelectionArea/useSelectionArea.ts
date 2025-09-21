import React, { useMemo, useState } from 'react';

export interface Selection {
  start: { x: number; y: number };
  end: { x: number; y: number };
  isSelecting: boolean;
}

export const useSelectionArea = () => {
  const [selection, setSelection] = useState<Selection>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    isSelecting: false,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) return;
    e.preventDefault();

    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setSelection({
      start: { x: startX, y: startY },
      end: { x: startX, y: startY },
      isSelecting: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selection.isSelecting) {
      e.preventDefault();
      const container = e.currentTarget as HTMLElement;
      const rect = container.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      setSelection((prev) => ({
        ...prev,
        end: { x: endX, y: endY },
      }));
    }
  };

  const handleMouseUp = () => {
    if (selection.isSelecting) {
      setSelection((prev) => ({ ...prev, isSelecting: false }));
    }
  };

  const isPointInSelection = (x: number, y: number) => {
    const { x: left, y: top, width, height } = getSelectionRect();
    return x >= left && x <= left + width && y >= top && y <= top + height;
  };

  const clearSelection = () => {
    setSelection({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      isSelecting: false,
    });
  };

  const getSelectionRect = () => {
    return {
      x: Math.min(selection.start.x, selection.end.x),
      y: Math.min(selection.start.y, selection.end.y),
      width: Math.abs(selection.end.x - selection.start.x),
      height: Math.abs(selection.end.y - selection.start.y),
    };
  };

  const hasSelection = useMemo(() => {
    const { width, height } = getSelectionRect();
    return width > 0 && height > 0;
  }, [selection]);

  return {
    selection,
    setSelection,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getSelectionRect,
    hasSelection,
    isPointInSelection,
    clearSelection,
  };
};
