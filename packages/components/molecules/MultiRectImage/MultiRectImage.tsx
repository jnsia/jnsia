import React, { useRef, useState } from 'react';

interface MultiRectImageProps {
  imageUrl: string;
  width?: number | string;
  height?: number | string;
  rects: Array<{
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  altText?: string;
  style?: React.CSSProperties;
  selectedRect?: number | null;
  onClickRect?: (e: React.MouseEvent, index: number) => void;
}

export default function MultiRectImage({
  imageUrl,
  rects,
  altText,
  width = '100%',
  height = '100%',
  style,
  selectedRect,
  onClickRect,
}: MultiRectImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const [naturalSize, setNaturalSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = () => {
    if (imgRef.current) {
      setNaturalSize({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  };

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        alt={altText}
        style={{
          height: '100%',
          objectFit: 'contain',
          ...style,
        }}
        onLoad={handleImageLoad}
      />
      {naturalSize &&
        rects.map((rect, index) => {
          const image = imgRef.current;

          const imageWidth = image?.clientWidth ?? 0;
          const imageHeight = image?.clientHeight ?? 0;

          const scaleX = imageWidth / naturalSize.width;
          const scaleY = imageHeight / naturalSize.height;

          const scaledX = rect.x * scaleX + (image?.offsetLeft ?? 0);
          const scaledY = rect.y * scaleY + (image?.offsetTop ?? 0);
          const scaledWidth = rect.width * scaleX;
          const scaledHeight = rect.height * scaleY;

          const isSelected = selectedRect === rect.index;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: scaledX - 4,
                top: scaledY - 4,
                width: scaledWidth + 8,
                height: scaledHeight + 8,
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-secondary)'}`,
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
              onClick={(e) => onClickRect?.(e, rect.index)}
            />
          );
        })}
    </div>
  );
}
