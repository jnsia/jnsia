import React, { useState, useCallback, useRef } from 'react';

import { Selection } from './useSelectionArea';

interface UseSelectionDragProps {
  selection: Selection;
  setSelection: React.Dispatch<React.SetStateAction<Selection>>;
}

export const useSelectionDrag = ({
  selection,
  setSelection,
}: UseSelectionDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragDataRef = useRef({
    startMouseX: 0,
    startMouseY: 0,
    initialSelection: {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      isSelecting: false,
    },
  });

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      dragDataRef.current = {
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        initialSelection: { ...selection },
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const { startMouseX, startMouseY, initialSelection } =
          dragDataRef.current;
        const deltaX = moveEvent.clientX - startMouseX;
        const deltaY = moveEvent.clientY - startMouseY;

        setSelection({
          start: {
            x: initialSelection.start.x + deltaX,
            y: initialSelection.start.y + deltaY,
          },
          end: {
            x: initialSelection.end.x + deltaX,
            y: initialSelection.end.y + deltaY,
          },
          isSelecting: false,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [selection, setSelection],
  );

  return {
    isDragging,
    handleDragStart,
  };
};
