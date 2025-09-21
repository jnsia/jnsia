import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './ConfirmModal.module.css';
import Button from '../../atoms/Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  type = 'default',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      confirmButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  const getIcon = () => {
    if (type === 'danger') {
      return (
        <div className={`${styles.icon} ${styles.dangerIcon}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 9v4M12 17h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    }

    return (
      <div className={`${styles.icon} ${styles.defaultIcon}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 16v-4M12 8h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby={message ? 'confirm-message' : undefined}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          {getIcon()}
          <div className={styles.content}>
            <h2 id="confirm-title" className={styles.title}>
              {title}
            </h2>
            {message && (
              <p id="confirm-message" className={styles.message}>
                {message}
              </p>
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="medium"
            onClick={onCancel}
            style={{
              border: '1px solid #dee2e6',
              background: 'white',
              color: '#495057',
            }}
          >
            {cancelText}
          </Button>
          <Button
            variant={type === 'danger' ? 'danger' : 'primary'}
            size="medium"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
