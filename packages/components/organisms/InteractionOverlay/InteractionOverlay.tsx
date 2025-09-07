import { Rect } from '@shared/types/rect';
import { ContextMenuItem } from '@shared/ui';
import { Selection } from '@shared/ui/molecules/SelectionArea/useSelectionArea';
import React, { useRef, useEffect } from 'react';

import { SelectionArea } from '../../molecules/SelectionArea/SelectionArea';
import { useSelectionCapture } from '../../molecules/SelectionArea/useSelectionCapture';

export type InteractionMode = 'drag' | 'select';

interface InteractionOverlayProps {
  children: React.ReactNode;
  interactionMode: InteractionMode;
  scale: number;
  isDragging: boolean;
  selection: Selection;
  setSelection: React.Dispatch<React.SetStateAction<Selection>>;
  position: { x: number; y: number };
  onClick?: () => void;
  onWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCapture?: (rect: Rect) => Promise<void>;
  contextMenuItems?: ContextMenuItem[];
  containerWidth?: number;
  containerStyle?: React.CSSProperties;
}

export function InteractionOverlay({
  children,
  interactionMode,
  scale,
  isDragging,
  selection,
  setSelection,
  position,
  onClick,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onDoubleClick,
  onContextMenu,
  onCapture,
  contextMenuItems,
  containerWidth = 1200,
  containerStyle = {},
}: InteractionOverlayProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { captureSelection } = useSelectionCapture({
    overlayRef,
    contentRef,
    scale,
    position,
  });

  const handleClick = () => {
    onClick?.();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
  };

  const handleCapture = async (rect: Rect) => {
    if (onCapture) {
      await onCapture(rect);
    } else {
      await captureSelection(rect);
    }
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !onWheel) return;

    const handleNativeWheel = (e: WheelEvent) => {
      const syntheticEvent = {
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaZ: e.deltaZ,
        deltaMode: e.deltaMode,
        preventDefault: () => e.preventDefault(),
        stopPropagation: () => e.stopPropagation(),
        isDefaultPrevented: () => e.defaultPrevented,
        isPropagationStopped: () => false,
      } as React.WheelEvent<HTMLDivElement>;

      onWheel(syntheticEvent);
    };

    overlay.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => overlay.removeEventListener('wheel', handleNativeWheel);
  }, [onWheel]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'relative',
        cursor:
          interactionMode === 'drag'
            ? scale > 1
              ? isDragging
                ? 'grabbing'
                : 'grab'
              : 'default'
            : 'crosshair',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <div
        ref={contentRef}
        style={{
          width: containerWidth,
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease',
          transformOrigin: 'center',
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5000,
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
      >
        {scale > 1 && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold',
              zIndex: 6000,
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          >
            {Math.round(scale * 100)}%
          </div>
        )}

        {interactionMode === 'select' && (
          <SelectionArea
            selection={selection}
            setSelection={setSelection}
            contextMenuItems={contextMenuItems}
            onCapture={handleCapture}
          />
        )}
      </div>
    </div>
  );
}
