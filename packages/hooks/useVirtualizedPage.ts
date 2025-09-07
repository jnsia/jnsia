import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef } from 'react';

interface UseVirtualizedListProps<T> {
  totalCount: number;
  pageSize: number;
  getItemsForPage: (page: number) => T[] | null;
  estimateItemSize: (index: number, item?: T) => number;
  loadPages: (pages: Set<number>) => void;
  overscan?: number;
}

export function useVirtualizedPage<T>({
  totalCount,
  pageSize,
  getItemsForPage,
  estimateItemSize,
  loadPages,
  overscan = 5,
}: UseVirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const getItemAtIndex = useCallback(
    (index: number): T | null => {
      const page = Math.floor(index / pageSize) + 1;
      const localIndex = index % pageSize;
      const pageData = getItemsForPage(page);

      return pageData && pageData[localIndex] ? pageData[localIndex] : null;
    },
    [pageSize, getItemsForPage],
  );

  const rowVirtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(
      (index: number): number => {
        const item = getItemAtIndex(index);
        return estimateItemSize(index, item || undefined);
      },
      [getItemAtIndex, estimateItemSize],
    ),
    overscan,
  });

  useEffect(() => {
    const container = parentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const virtualItems = rowVirtualizer.getVirtualItems();
      if (virtualItems.length === 0) return;

      const totalPages = Math.ceil(totalCount / pageSize);
      const neededPages = new Set<number>();

      virtualItems.forEach(({ index }) => {
        const page = Math.floor(index / pageSize) + 1;
        if (page <= totalPages) {
          neededPages.add(page);
        }
      });

      if (neededPages.size > 0) {
        loadPages(neededPages);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalCount, rowVirtualizer]);

  return {
    parentRef,
    rowVirtualizer,
    getItemAtIndex,
  };
}
