import React, { createContext, useCallback, useContext, useState } from 'react';

import { ToastProps, ToastType } from './Toast';
import ToastContainer from './ToastContainer';

interface ToastContextType {
  showToast: (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => string;
  removeToast: (id: string) => void;
  success: (title: string, message?: string, duration?: number) => string;
  error: (title: string, message?: string, duration?: number) => string;
  warning: (title: string, message?: string, duration?: number) => string;
  info: (title: string, message?: string, duration?: number) => string;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const showToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      duration?: number
    ): string => {
      const id = generateId();
      const toast: ToastProps = {
        id,
        type,
        title,
        message,
        duration,
        onClose: removeToast,
      };

      setToasts((prev) => [...prev, toast]);
      return id;
    },
    [generateId]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message?: string, duration?: number) => 
      showToast('success', title, message, duration),
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => 
      showToast('error', title, message, duration),
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => 
      showToast('warning', title, message, duration),
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => 
      showToast('info', title, message, duration),
    [showToast]
  );

  const value: ToastContextType = {
    showToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}