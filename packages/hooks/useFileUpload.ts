import { storageApi } from '@entities/file/api/storage.api';
import { FileUploadResponse } from '@entities/file/model/file';
import { useState } from 'react';

export default function useFileUpload() {
  const [fileProgress, setFileProgress] = useState<Record<string, number>>({});
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const attachFiles = (files: File[] | null) => {
    if (files && files.length > 0) {
      setAttachedFiles((prev) => [...prev, ...files]);
    }
  };

  const detachFile = (fileName: string) => {
    setAttachedFiles((prev) =>
      prev.filter((file) => !fileName.includes(file.name)),
    );
  };

  const removeFileProgress = (fileName: string) => {
    setFileProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  const uploadFiles = async (
    files: File[],
    path: string,
  ): Promise<FileUploadResponse[]> => {
    return await storageApi.uploadFiles(files, path, (file, event) => {
      if (event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setFileProgress((prev) => ({ ...prev, [file.name]: percent }));
      }
    });
  };

  return {
    files: attachedFiles,
    fileProgress,
    attachFiles,
    detachFile,
    uploadFiles,
    removeFileProgress,
  };
}
