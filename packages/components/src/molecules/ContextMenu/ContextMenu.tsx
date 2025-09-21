import React from 'react';
import { createPortal } from 'react-dom';

import styles from './ContextMenu.module.css';

export interface ContextMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'default' | 'danger' | 'success' | 'warning';
  disabled?: boolean;
}

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  x,
  y,
  items,
}) => {
  if (!visible || items.length === 0) return null;

  const getItemClassName = (item: ContextMenuItem) => {
    const baseClasses = [styles.contextMenuItem];

    if (item.variant && item.variant !== 'default') {
      baseClasses.push(styles[item.variant]);
    }

    if (item.disabled) {
      baseClasses.push(styles.disabled);
    }

    return baseClasses.join(' ');
  };

  const contextMenuElement = (
    <div
      className={styles.contextMenu}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9999,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={getItemClassName(item)}
          onMouseDown={(e) => {
            e.stopPropagation();

            if (!item.disabled) {
              item.onClick();
            }
          }}
        >
          {item.icon && <span>{item.icon}</span>}
          {item.label}
        </div>
      ))}
    </div>
  );

  return createPortal(contextMenuElement, document.body);
};
