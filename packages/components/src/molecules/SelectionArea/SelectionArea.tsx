import { useContextMenu } from '@shared/hooks';
import { Rect } from '@shared/types/rect';
import { ContextMenu, ContextMenuItem } from '@shared/ui';
import React from 'react';

import {
  RESIZE_HANDLES,
  getSelectionAreaStyles,
  getHandleBaseStyles,
  ResizeHandleDefinition,
} from './resizeHandleConfig';
import { Selection } from './useSelectionArea';
import { useSelectionDrag } from './useSelectionDrag';
import { useSelectionResize } from './useSelectionResize';

interface SelectionAreaProps {
  selection: Selection;
  setSelection: React.Dispatch<React.SetStateAction<Selection>>;
  scale?: number;
  panOffset?: { x: number; y: number };
  contextMenuItems?: ContextMenuItem[];
  onCapture?: (rect: Rect) => Promise<void>;
}

export const SelectionArea: React.FC<SelectionAreaProps> = ({
  selection,
  setSelection,
  contextMenuItems,
  onCapture,
}) => {
  const { start, end } = selection;

  const hasSelection =
    Math.abs(end.x - start.x) > 10 && Math.abs(end.y - start.y) > 10;

  if (!selection.isSelecting && !hasSelection) {
    return null;
  }

  const { contextMenu, handleRightClick } = useContextMenu();

  const handleCapture = async () => {
    if (onCapture && hasSelection) {
      const rect: Rect = {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y),
      };
      await onCapture(rect);
    }
  };

  const enhancedContextMenuItems = [
    ...(contextMenuItems || []),
    ...(hasSelection && onCapture
      ? [
          {
            label: '이미지 추출',
            onClick: handleCapture,
          },
        ]
      : []),
  ];

  const { handleResizeStart, isResizing } = useSelectionResize({
    selection,
    setSelection,
  });

  const { isDragging, handleDragStart } = useSelectionDrag({
    selection,
    setSelection,
  });

  const style = getSelectionAreaStyles(
    Math.min(start.x, end.x),
    Math.min(start.y, end.y),
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y),
  );

  return (
    <div
      style={{
        ...style,
        cursor: isDragging
          ? 'grabbing'
          : isResizing.active
            ? 'default'
            : 'grab',
      }}
      onMouseDown={!isResizing.active ? handleDragStart : undefined}
      onContextMenu={(e) => {
        if (enhancedContextMenuItems && enhancedContextMenuItems.length > 0) {
          handleRightClick(e, enhancedContextMenuItems);
        }
      }}
    >
      {!selection.isSelecting && hasSelection && (
        <>
          {RESIZE_HANDLES.map((handle) => (
            <ResizeHandle
              key={handle.id}
              handle={handle}
              onResizeStart={handleResizeStart}
            />
          ))}
        </>
      )}

      {contextMenu.visible &&
        contextMenu.item &&
        Array.isArray(contextMenu.item) && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.item}
            visible
          />
        )}
    </div>
  );
};

const ResizeHandle: React.FC<{
  handle: ResizeHandleDefinition;
  onResizeStart: (e: React.MouseEvent, handle: string) => void;
}> = ({ handle, onResizeStart }) => (
  <div
    style={{
      ...getHandleBaseStyles(),
      ...handle.position,
      cursor: handle.cursor,
    }}
    onMouseDown={(e) => onResizeStart(e, handle.id)}
  />
);
