import { Rect } from '@shared/types/rect';
import { downloadFileFromBlob } from '@shared/utils';
import { RefObject } from 'react';

interface UseSelectionCaptureProps {
  overlayRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
  scale: number;
  position: { x: number; y: number };
}

export const useSelectionCapture = ({
  overlayRef,
  contentRef,
  scale,
  position,
}: UseSelectionCaptureProps) => {
  const captureSelection = async (rect: Rect) => {
    const element = contentRef.current?.querySelector('img, video') as
      | HTMLImageElement
      | HTMLVideoElement;
    if (element) {
      await captureElement(element, rect, scale, position);
    }
  };

  const captureElement = async (
    element: HTMLImageElement | HTMLVideoElement,
    rect: Rect,
    scale: number,
    panOffset: { x: number; y: number },
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (element instanceof HTMLVideoElement) {
        captureVideoFrame(element, rect, scale, panOffset, resolve);
      } else {
        captureImageElement(element, rect, scale, panOffset, resolve);
      }
    });
  };

  const calculateCoordinates = (
    element: HTMLImageElement | HTMLVideoElement,
    rect: Rect,
    scale: number,
    panOffset: { x: number; y: number },
    naturalWidth: number,
    naturalHeight: number,
  ) => {
    const containerRect = overlayRef.current?.getBoundingClientRect();
    if (!containerRect) return null;

    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;

    const containerCenterX = containerRect.width / 2;
    const containerCenterY = containerRect.height / 2;

    const scaledElementWidth = elementWidth * scale;
    const scaledElementHeight = elementHeight * scale;

    const elementLeft = containerCenterX - scaledElementWidth / 2 + panOffset.x;
    const elementTop = containerCenterY - scaledElementHeight / 2 + panOffset.y;

    const relativeX = rect.x - elementLeft;
    const relativeY = rect.y - elementTop;

    const originalX = relativeX / scale;
    const originalY = relativeY / scale;
    const originalWidth = rect.width / scale;
    const originalHeight = rect.height / scale;

    const naturalScaleX = naturalWidth / elementWidth;
    const naturalScaleY = naturalHeight / elementHeight;

    return {
      sourceX: originalX * naturalScaleX,
      sourceY: originalY * naturalScaleY,
      sourceWidth: originalWidth * naturalScaleX,
      sourceHeight: originalHeight * naturalScaleY,
    };
  };

  const downloadImage = (canvas: HTMLCanvasElement, filename: string) => {
    canvas.toBlob((blob) => {
      if (blob) {
        downloadFileFromBlob(blob, filename);
      }
    }, 'image/png');
  };

  const captureVideoFrame = (
    video: HTMLVideoElement,
    rect: Rect,
    scale: number,
    panOffset: { x: number; y: number },
    resolve: () => void,
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve();
      return;
    }

    canvas.width = rect.width;
    canvas.height = rect.height;

    const coords = calculateCoordinates(
      video,
      rect,
      scale,
      panOffset,
      video.videoWidth,
      video.videoHeight,
    );

    if (!coords) {
      resolve();
      return;
    }

    try {
      ctx.drawImage(
        video,
        coords.sourceX,
        coords.sourceY,
        coords.sourceWidth,
        coords.sourceHeight,
        0,
        0,
        rect.width,
        rect.height,
      );

      downloadImage(canvas, `video_frame_${Date.now()}.png`);
      resolve();
    } catch {
      resolve();
    }
  };

  const captureImageElement = (
    image: HTMLImageElement,
    rect: Rect,
    scale: number,
    panOffset: { x: number; y: number },
    resolve: () => void,
  ) => {
    const corsImage = new Image();
    corsImage.crossOrigin = 'anonymous';

    corsImage.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve();
        return;
      }

      canvas.width = rect.width;
      canvas.height = rect.height;

      const coords = calculateCoordinates(
        image,
        rect,
        scale,
        panOffset,
        corsImage.naturalWidth,
        corsImage.naturalHeight,
      );

      if (!coords) {
        resolve();
        return;
      }

      try {
        ctx.drawImage(
          corsImage,
          coords.sourceX,
          coords.sourceY,
          coords.sourceWidth,
          coords.sourceHeight,
          0,
          0,
          rect.width,
          rect.height,
        );

        downloadImage(canvas, `extracted_image_${Date.now()}.png`);
        resolve();
      } catch {
        resolve();
      }
    };

    corsImage.onerror = () => {
      resolve();
    };

    corsImage.src = image.src;
  };

  return {
    captureSelection,
  };
};
