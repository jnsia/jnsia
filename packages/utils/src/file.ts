export const downloadFileFromBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;

  document.body.appendChild(downloadLink);

  downloadLink.click();
  downloadLink.remove();

  window.URL.revokeObjectURL(url);
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const unit = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.floor(Math.log(bytes) / Math.log(unit));
  return `${parseFloat((bytes / Math.pow(unit, index)).toFixed(2))} ${sizes[index]}`;
};

export const isVideoFile = (fileName: string) => {
  const videoFileExtensions = [
    '.mp4',
    '.avi',
    '.mov',
    '.mkv',
    '.wmv',
    '.flv',
    '.webm',
  ];

  return videoFileExtensions.some((ext) =>
    fileName.toLowerCase().endsWith(ext),
  );
};

export const isImageFile = (fileName: string) => {
  const imageFileExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.svg',
    '.webp',
    '.ico',
    '.tiff',
    '.tif',
  ];

  return imageFileExtensions.some((ext) =>
    fileName.toLowerCase().endsWith(ext),
  );
};

export const extractFileName = (filePath: string) => {
  if (!filePath) return '';
  const parts = filePath.split('/');
  return parts[parts.length - 1];
};
