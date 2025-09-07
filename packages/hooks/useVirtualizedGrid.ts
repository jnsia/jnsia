import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef } from 'react';

interface UseVirtualizedGridProps<T> {
  totalItems: number;
  itemsPerRow: number;
  data: T[];
  onRequestData: (startIndex: number, endIndex: number) => void;
  estimateRowSize: (rowIndex: number) => number;
  overscan?: number;
}

export function useVirtualizedGrid<T>({
  totalItems,
  itemsPerRow,
  data,
  onRequestData,
  estimateRowSize,
  overscan = 5,
}: UseVirtualizedGridProps<T>) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const totalRows = Math.ceil(totalItems / itemsPerRow);

  const getItemIndices = useCallback(
    (rowIndex: number) => {
      const startIndex = rowIndex * itemsPerRow;
      const endIndex = Math.min(startIndex + itemsPerRow, totalItems);
      return { startIndex, endIndex };
    },
    [itemsPerRow, totalItems],
  );

  const getRowItems = useCallback(
    (startIndex: number, endIndex: number): T[] => {
      return data.slice(startIndex, endIndex);
    },
    [data],
  );

  const rowVirtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: estimateRowSize,
    overscan,
  });

  useEffect(() => {
    const container = parentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const virtualRows = rowVirtualizer.getVirtualItems();
      if (virtualRows.length === 0) return;

      let minIndex = totalItems;
      let maxIndex = 0;

      virtualRows.forEach((virtualRow) => {
        const { startIndex, endIndex } = getItemIndices(virtualRow.index);
        minIndex = Math.min(minIndex, startIndex);
        maxIndex = Math.max(maxIndex, endIndex);
      });

      if (minIndex < totalItems) {
        onRequestData(minIndex, maxIndex);
      }
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalItems, rowVirtualizer, getItemIndices, onRequestData]);

  return {
    parentRef,
    rowVirtualizer,
    totalRows,
    getItemIndices,
    getRowItems,
  };
}
