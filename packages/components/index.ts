// Atomic Design Pattern
// Re-export all components from their atomic categories

// Atoms - 기본 UI 요소들
export * from './atoms';

// Molecules - 기본 요소들의 조합
export * from './molecules';

// Organisms - 복잡한 UI 구성 요소들
export * from './organisms';

// Legacy exports for backward compatibility
// TODO: 점진적으로 제거하고 atomic import 사용 권장
export { default as Flex } from './atoms/Flex';
export { default as ProgressBar } from './atoms/ProgressBar';
export { default as Button } from './atoms/Button';
export { default as Badge } from './atoms/Badge';
export { default as Text } from './atoms/Text';
export { default as Spinner } from './atoms/Spinner';

export { default as Card } from './molecules/Card';
export { default as SearchBar } from './molecules/SearchBar';
export { default as Select } from './molecules/Select';
export { default as DragDropArea } from './molecules/DragDropArea';
export { ContextMenu, type ContextMenuItem } from './molecules/ContextMenu';
export { EmptyState } from './molecules/EmptyState';
export { LoadingSpinner } from './molecules/LoadingSpinner';
export { Modal, type ModalProps } from './molecules/Modal';

export { PageLayout } from './organisms/PageLayout';
export { VirtualizedList } from './organisms/VirtualizedList';
export {
  Toast,
  ToastContainer,
  ToastProvider,
  useToast,
  type ToastType,
  type ToastProps,
} from './organisms/Toast';
export {
  ConfirmModal,
  ConfirmProvider,
  useConfirm,
  type ConfirmModalProps,
} from './organisms/ConfirmModal';
