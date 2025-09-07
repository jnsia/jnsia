import { StyleProps } from '@shared/types/style';
import React from 'react';

import styles from './DateInput.module.css';
import Calendar from '../Calendar/Calendar';

export interface DateInputProps extends StyleProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  useCustomCalendar?: boolean;
  includeTime?: boolean;
  autoFocusNext?: () => void;
  timezone?: string;
}

export default function DateInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  clearable = false,
  useCustomCalendar = true,
  includeTime = false,
  autoFocusNext,
  timezone = 'Asia/Seoul',
  style,
}: DateInputProps) {
  if (useCustomCalendar) {
    return (
      <Calendar
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        clearable={clearable}
        includeTime={includeTime}
        autoFocusNext={autoFocusNext}
        timezone={timezone}
        style={style}
      />
    );
  }

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={styles.dateInputRoot} style={style}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.dateInput}
      />
      {clearable && value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          <ClearIcon />
        </button>
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
