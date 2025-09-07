import React, { RefObject, useEffect } from 'react';

import useZoom from './useZoom';
import { useSelectionArea } from '../../molecules/SelectionArea/useSelectionArea';

type InteractionMode = 'drag' | 'select';

export default function useInteractionOverlay({
  ref,
  interactionMode,
}: {
  ref: RefObject<HTMLDivElement | HTMLVideoElement | HTMLImageElement>;
  interactionMode: InteractionMode;
}) {
  const {
    scale,
    panOffset,
    updateScale,
    setPanOffset,
    isDragging,
    handleMouseDown: handleZoomMouseDown,
    handleMouseMove: handleZoomMouseMove,
    handleMouseUp: handleZoomMouseUp,
    handleWheel: handleZoomWheel,
  } = useZoom({ ref });

  const {
    selection,
    setSelection,
    hasSelection,
    clearSelection,
    getSelectionRect,
    handleMouseDown: handleSelectionMouseDown,
    handleMouseMove: handleSelectionMouseMove,
    handleMouseUp: handleSelectionMouseUp,
  } = useSelectionArea();

  const handleWheel = (e: React.WheelEvent) => {
    if (interactionMode === 'drag') {
      handleZoomWheel(e);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (interactionMode === 'drag') {
      handleZoomMouseDown(e);
    } else if (interactionMode === 'select') {
      handleSelectionMouseDown(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (interactionMode === 'drag') {
      handleZoomMouseMove(e);
    } else if (interactionMode === 'select') {
      handleSelectionMouseMove(e);
    }
  };

  const handleMouseUp = () => {
    if (interactionMode === 'drag') {
      handleZoomMouseUp();
    } else {
      handleSelectionMouseUp();
    }
  };

  useEffect(() => {
    clearSelection();
  }, [interactionMode]);

  return {
    interactionMode,
    scale,
    isDragging,
    position: panOffset,
    selection,
    setSelection,
    hasSelection,
    getSelectionRect,
    updateScale,
    resetPosition: () => setPanOffset({ x: 0, y: 0 }),
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
