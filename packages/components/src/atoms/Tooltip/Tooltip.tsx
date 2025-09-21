import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Tooltip.module.css';
import Text from '../Text';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  position?: TooltipPosition;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  disabled?: boolean;
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  className,
  style,
  delay = 100,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  if (disabled || !content) {
    return children as React.ReactElement;
  }

  const calculatePosition = (triggerElement: HTMLElement) => {
    const rect = triggerElement.getBoundingClientRect();
    const tooltipOffset = 8;
    
    switch (position) {
      case 'top':
        return { x: rect.left + rect.width / 2, y: rect.top - tooltipOffset };
      case 'bottom':
        return { x: rect.left + rect.width / 2, y: rect.bottom + tooltipOffset };
      case 'left':
        return { x: rect.left - tooltipOffset, y: rect.top + rect.height / 2 };
      case 'right':
        return { x: rect.right + tooltipOffset, y: rect.top + rect.height / 2 };
      default:
        return { x: rect.left + rect.width / 2, y: rect.top - tooltipOffset };
    }
  };

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const pos = calculatePosition(triggerRef.current);
      setCoords(pos);
      
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible ? (
    <div
      className={`${styles.tooltipPortal} ${styles[position]}`}
      style={{
        position: 'fixed',
        left: coords.x,
        top: coords.y,
        zIndex: 9998,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Text size={14} className={styles.tooltipContent}>
        {content}
      </Text>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
}
