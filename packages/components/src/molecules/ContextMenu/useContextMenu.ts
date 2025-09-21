import React, { useEffect, useState } from 'react';

interface ContextMenuState<T = any> {
  visible: boolean;
  x: number;
  y: number;
  item: T | null;
}

interface UseContextMenuOptions {
  menuWidth?: number;
  menuHeight?: number;
  shouldPreventRightClick?: (item: any) => boolean;
}

export const useContextMenu = <T = any>(
  options: UseContextMenuOptions = {},
) => {
  const { menuWidth = 150, menuHeight = 40, shouldPreventRightClick } = options;

  const [contextMenu, setContextMenu] = useState<ContextMenuState<T>>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const handleRightClick = (e: React.MouseEvent | undefined, item: T) => {
    if (!e || (shouldPreventRightClick && shouldPreventRightClick(item)))
      return;

    e.preventDefault();
    e.stopPropagation();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Use mouse position instead of element bounds
    let x = e.clientX;
    let y = e.clientY;

    // Adjust if menu would go off-screen
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 10;
    }
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight - 10;
    }

    // Ensure menu doesn't go off left/top edges
    if (x < 0) x = 10;
    if (y < 0) y = 10;

    setContextMenu({
      visible: true,
      x,
      y,
      item,
    });
  };

  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  const executeAction = (action: (item: T) => void) => {
    if (contextMenu.item) {
      action(contextMenu.item);
    }
    hideContextMenu();
  };

  useEffect(() => {
    if (contextMenu.visible) {
      document.addEventListener('click', hideContextMenu);
      document.addEventListener('contextmenu', hideContextMenu);
    }
    return () => {
      document.removeEventListener('click', hideContextMenu);
      document.removeEventListener('contextmenu', hideContextMenu);
    };
  }, [contextMenu.visible]);

  return {
    contextMenu,
    handleRightClick,
    hideContextMenu,
    executeAction,
  };
};
