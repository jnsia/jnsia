import React, { useRef, useState } from 'react';

import styles from './DragDropArea.module.css';

export default function DragDropArea({
  handleDrop,
  children,
}: {
  handleDrop: (files: File[]) => void;
  children: React.ReactNode;
}) {
  const dragCounter = useRef(0);
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className={`${styles.uploadArea} ${isDragOver ? styles.dragover : ''}`}
      onDragEnter={(e) => {
        e.preventDefault();
        dragCounter.current += 1;
        if (dragCounter.current > 0) setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current === 0) setIsDragOver(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragOver(false);
        handleDrop(Array.from(e.dataTransfer.files));
      }}
    >
      {children}
    </div>
  );
}
