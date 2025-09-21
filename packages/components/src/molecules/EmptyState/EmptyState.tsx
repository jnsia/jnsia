import React, { ReactNode } from 'react';

import styles from './EmptyState.module.css';

interface EmptyStateProps {
  message: string | ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return <div className={styles.emptyState}>{message}</div>;
};
