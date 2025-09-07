import React, { useState, useCallback, useRef } from 'react';

import { Selection } from './useSelectionArea';

interface ResizeState {
  active: boolean;
  handle: string;
}

interface UseResizeProps {
  selection: Selection;
  setSelection: React.Dispatch<React.SetStateAction<Selection>>;
  minSize?: { width: number; height: number };
}

export const useSelectionResize = ({
  selection,
  setSelection,
}: UseResizeProps) => {
  const [isResizing, setIsResizing] = useState<ResizeState>({
    active: false,
    handle: '',
  });

  const resizeDataRef = useRef({
    startMouseX: 0,
    startMouseY: 0,
    initialSelection: {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      isSelecting: false,
    },
  });

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, handle: string) => {
      e.stopPropagation();
      e.preventDefault();

      setIsResizing({ active: true, handle });

      resizeDataRef.current = {
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        initialSelection: { ...selection },
      };

      const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
        handleResizeMove(moveEvent, handle);
      };

      const handleGlobalMouseUp = () => {
        handleResizeEnd();
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    },
    [selection],
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent, handle: string) => {
      const { startMouseX, startMouseY, initialSelection } =
        resizeDataRef.current;

      const deltaX = e.clientX - startMouseX;
      const deltaY = e.clientY - startMouseY;

      const initialLeft = Math.min(
        initialSelection.start.x,
        initialSelection.end.x,
      );
      const initialTop = Math.min(
        initialSelection.start.y,
        initialSelection.end.y,
      );
      const initialRight = Math.max(
        initialSelection.start.x,
        initialSelection.end.x,
      );
      const initialBottom = Math.max(
        initialSelection.start.y,
        initialSelection.end.y,
      );

      let newLeft = initialLeft;
      let newTop = initialTop;
      let newRight = initialRight;
      let newBottom = initialBottom;

      switch (handle) {
        case 'nw':
          newLeft = initialLeft + deltaX;
          newTop = initialTop + deltaY;
          break;
        case 'ne':
          newRight = initialRight + deltaX;
          newTop = initialTop + deltaY;
          break;
        case 'sw':
          newLeft = initialLeft + deltaX;
          newBottom = initialBottom + deltaY;
          break;
        case 'se':
          newRight = initialRight + deltaX;
          newBottom = initialBottom + deltaY;
          break;
        case 'n':
          newTop = initialTop + deltaY;
          break;
        case 's':
          newBottom = initialBottom + deltaY;
          break;
        case 'w':
          newLeft = initialLeft + deltaX;
          break;
        case 'e':
          newRight = initialRight + deltaX;
          break;
      }

      setSelection({
        start: { x: newLeft, y: newTop },
        end: { x: newRight, y: newBottom },
        isSelecting: false,
      });
    },
    [setSelection],
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing({ active: false, handle: '' });
  }, []);

  return {
    isResizing,
    handleResizeStart,
    handleResizeEnd,
  };
};
