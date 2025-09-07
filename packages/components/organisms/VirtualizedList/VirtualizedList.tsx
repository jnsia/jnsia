import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactElement, useRef } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactElement;
  estimateSize?: () => number;
  overscan?: number;
  height?: number;
  className?: string;
  itemGap?: number;
}

export default function VirtualizedList<T>({
  items,
  renderItem,
  estimateSize = () => 120,
  overscan = 5,
  height = 400,
  className,
  itemGap = 8,
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize() + itemGap,
    overscan,
  });

  return (
    <div
      ref={parentRef}
      className={className}
      style={{
        height: `${height}px`,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <div style={{ marginBottom: `${itemGap}px` }}>
              {renderItem(items[virtualItem.index], virtualItem.index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
