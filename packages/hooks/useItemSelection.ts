import { useState, useCallback, useMemo } from 'react';

interface UseItemSelectionOptions<T = any> {
  items: T[];
  getItemId: (item: T) => string;
  getSelectableItems?: (item: T) => boolean;
}

export const useItemSelection = <T = any>({
  items,
  getItemId,
  getSelectableItems = () => true,
}: UseItemSelectionOptions<T>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectableItems = useMemo(
    () => items.filter(getSelectableItems),
    [items, getSelectableItems],
  );

  const allSelected = useMemo(
    () =>
      selectableItems.length > 0 &&
      selectableItems.every((item) => selectedItems.includes(getItemId(item))),
    [selectableItems, selectedItems, getItemId],
  );

  const selectedItemIds = useMemo(
    () =>
      selectableItems
        .filter((item) => selectedItems.includes(getItemId(item)))
        .map(getItemId),
    [selectableItems, selectedItems, getItemId],
  );

  const selectedCount = selectedItems.length;

  const handleSelectItem = useCallback(
    (itemId: string) => {
      const isSelected = selectedItemIds.includes(itemId);

      setSelectedItems((prev) => {
        if (isSelected) {
          return prev.filter((id) => id !== itemId);
        } else {
          return prev.includes(itemId) ? prev : [...prev, itemId];
        }
      });
    },
    [selectedItemIds],
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        const allSelectableIds = selectableItems.map(getItemId);
        setSelectedItems(allSelectableIds);
      } else {
        setSelectedItems([]);
      }
    },
    [selectableItems, getItemId],
  );

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const selectItems = useCallback(
    (itemIds: string[]) => {
      const validIds = itemIds.filter((id) =>
        selectableItems.some((item) => getItemId(item) === id),
      );
      setSelectedItems(validIds);
    },
    [selectableItems, getItemId],
  );

  const selectedItemsData = useMemo(
    () =>
      selectableItems.filter((item) => selectedItems.includes(getItemId(item))),
    [selectableItems, selectedItems, getItemId],
  );

  return {
    selectedItems,
    selectedCount,
    allSelected,
    selectableItems,
    selectedItemsData,
    selectedItemIds,
    handleSelectItem,
    handleSelectAll,
    clearSelection,
    selectItems,
  };
};
