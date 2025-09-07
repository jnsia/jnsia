import { createPortal } from 'react-dom';

import Toast, { ToastProps } from './Toast';
import styles from './ToastContainer.module.css';

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  );
}