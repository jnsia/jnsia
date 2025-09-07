import { Button, ButtonProps } from '@shared/ui';
import React, { useRef } from 'react';

interface FileUploadButtonProps extends ButtonProps {
  selectFiles: (files: File[] | null) => void | Promise<void>;
  accept?: string;
}

export default function FileUploadButton({
  selectFiles,
  accept,
  size,
  children,
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) selectFiles(Array.from(files));
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        id="fileInput"
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
      <Button variant="primary" size={size} onClick={handleButtonClick}>
        {children}
      </Button>
    </>
  );
}
