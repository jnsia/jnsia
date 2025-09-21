import React, { RefObject, useCallback, useEffect, useState } from 'react';

const MIN_SCALE = 1;

export default function useZoom({ ref }: { ref: RefObject<HTMLElement> }) {
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) return;
    e.preventDefault();

    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y,
      });

      // 글로벌 마우스 이벤트 등록
      const handleGlobalMouseMove = (globalE: MouseEvent) => {
        handleMouseMove(globalE as any);
      };

      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (isDragging && scale > 1) {
      if ('preventDefault' in e) {
        e.preventDefault();
      }

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      if (ref.current && ref.current.parentElement) {
        const container = ref.current.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // 이미지의 실제 크기 (scale 적용된 크기)
        const imageWidth = ref.current.clientWidth;
        const imageHeight = ref.current.clientHeight;
        const scaledImageWidth = imageWidth * scale;
        const scaledImageHeight = imageHeight * scale;

        // 이미지가 컨테이너보다 클 때만 드래그 제한
        let clampedX = newX;
        let clampedY = newY;

        if (scaledImageWidth > containerWidth) {
          const maxX = (scaledImageWidth - containerWidth) / 2;
          clampedX = Math.min(maxX, Math.max(-maxX, newX));
        } else {
          clampedX = 0; // 이미지가 컨테이너보다 작으면 중앙 고정
        }

        if (scaledImageHeight > containerHeight) {
          const maxY = (scaledImageHeight - containerHeight) / 2;
          clampedY = Math.min(maxY, Math.max(-maxY, newY));
        } else {
          clampedY = 0; // 이미지가 컨테이너보다 작으면 중앙 고정
        }

        setPanOffset({
          x: clampedX,
          y: clampedY,
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetPosition = () => {
    setPanOffset({ x: 0, y: 0 });
  };

  const updateScale = (scale: number) => {
    setScale(Math.max(MIN_SCALE, scale));
  };

  const clampPan = useCallback(
    (offset: { x: number; y: number }) => {
      const element = ref.current;
      if (!element || !element.parentElement) return { x: 0, y: 0 };

      const container = element.parentElement;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const imageWidth = element.clientWidth;
      const imageHeight = element.clientHeight;
      const scaledImageWidth = imageWidth * scale;
      const scaledImageHeight = imageHeight * scale;

      let clampedX = offset.x;
      let clampedY = offset.y;

      if (scaledImageWidth > containerWidth) {
        const maxX = (scaledImageWidth - containerWidth) / 2;
        clampedX = Math.max(-maxX, Math.min(maxX, offset.x));
      } else {
        clampedX = 0;
      }

      if (scaledImageHeight > containerHeight) {
        const maxY = (scaledImageHeight - containerHeight) / 2;
        clampedY = Math.max(-maxY, Math.min(maxY, offset.y));
      } else {
        clampedY = 0;
      }

      return { x: clampedX, y: clampedY };
    },
    [scale],
  );

  const getPanMouseDown = useCallback(() => {
    return (e: React.MouseEvent<HTMLElement>) => {
      if (e.button !== 0) return;
      const startX = e.clientX;
      const startY = e.clientY;
      const origin = { ...panOffset };

      const onMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        const next = { x: origin.x + dx, y: origin.y + dy };
        setPanOffset(clampPan(next));
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    };
  }, [scale, panOffset]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY * -0.002;
    const newScale = Math.min(Math.max(1, scale + delta), 5);

    if (newScale < scale) {
      const scaleRatio = newScale / scale;
      const newOffset = {
        x: panOffset.x * scaleRatio,
        y: panOffset.y * scaleRatio,
      };

      setScale(newScale);
      setPanOffset(clampPan(newOffset));
    } else {
      setScale(newScale);
      setPanOffset((prev) => clampPan(prev));
    }

    if (newScale <= 1.1) {
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const updatePanOffset = () => {
    const element = ref.current;
    if (!element) return;

    const width = element.clientWidth;
    const height = element.clientHeight;

    const maxX = Math.max(0, (width * scale - width) / 2);
    const maxY = Math.max(0, (height * scale - height) / 2);

    if (panOffset) {
      const clamped = {
        x: Math.max(-maxX, Math.min(maxX, panOffset.x)),
        y: Math.max(-maxY, Math.min(maxY, panOffset.y)),
      };

      if (clamped.x !== panOffset.x || clamped.y !== panOffset.y) {
        setPanOffset(clamped);
      }
    }
  };

  useEffect(() => {
    updatePanOffset();
  }, [scale, panOffset]);

  return {
    scale,
    panOffset,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetPosition,
    updateScale,
    setPanOffset,
    handleWheel,
    getPanMouseDown,
  };
}
