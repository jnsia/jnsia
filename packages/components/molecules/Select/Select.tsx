import React, { useRef, useState, useEffect } from 'react';

import styles from './Select.module.css';
import Text from '../../atoms/Text';

type Option = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

interface SelectProps {
  value: string | null;
  options: Option[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  style?: React.CSSProperties;
}

export default function Select({
  value,
  options,
  onChange,
  placeholder = '선택',
  disabled = false,
  clearable = false,
  style,
}: SelectProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  const selected = options.find((option) => option.value === value);

  const toggleDropdown = () => {
    if (disabled) return;
    setOpened((prev) => !prev);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  useEffect(() => {
    if (!opened) return;

    const handler = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [opened]);

  useEffect(() => {
    if (!opened) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setHoverIndex((index) => Math.min(index + 1, options.length - 1));
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setHoverIndex((index) => Math.max(index - 1, 0));
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (hoverIndex >= 0) {
          onChange(options[hoverIndex].value);
          setOpened(false);
        }
      } else if (e.key === 'Escape') {
        setOpened(false);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [opened, hoverIndex, options, onChange]);

  return (
    <div className={styles.selectRoot} style={style}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.selectButton}
        aria-haspopup="listbox"
        aria-expanded={opened}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <div className={styles.selectContent}>
          <Text size={14} color={selected ? '' : 'secondary'}>
            {selected ? selected.label : placeholder}
          </Text>
        </div>
        <div className={styles.selectActions}>
          {clearable && value && (
            <div className={styles.clearButton} onClick={handleClear}>
              <ClearIcon />
            </div>
          )}
          <DropdownIcon />
        </div>
      </button>
      {opened && (
        <div
          ref={dropdownRef}
          className={styles.selectDropdown}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={styles.selectOption}
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setOpened(false);
              }}
              onMouseEnter={() => setHoverIndex(index)}
              disabled={option.disabled}
              style={
                hoverIndex === index ? { background: '#f3f4f6' } : undefined
              }
            >
              <Text size={14}>{option.label}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ClearIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DropdownIcon() {
  return (
    <svg
      className={styles.selectIcon}
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
