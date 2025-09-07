import { StyleProps } from '@shared/types/style';
import { useRef } from 'react';

import styles from './DateRangeInput.module.css';
import { Text } from '../../atoms';
import DateInput from '../DateInput/DateInput';

export interface DateRange {
  from: string;
  to: string;
}

export interface DateRangeInputProps extends StyleProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  disabled?: boolean;
  clearable?: boolean;
  label?: string;
  includeTime?: boolean;
  timezone?: string;
}

export default function DateRangeInput({
  value,
  onChange,
  disabled = false,
  clearable = false,
  label,
  includeTime = false,
  timezone,
  style,
}: DateRangeInputProps) {
  const toInputRef = useRef<HTMLDivElement>(null);

  const handleFromChange = (from: string) => {
    const newValue = { ...value, from };

    if (from && value.to && new Date(from) > new Date(value.to)) {
      newValue.to = from;
    }

    onChange(newValue);
  };

  const handleToChange = (to: string) => {
    const newValue = { ...value, to };

    if (to && value.from && new Date(to) < new Date(value.from)) {
      return;
    }

    onChange(newValue);
  };

  const focusToInput = () => {
    if (toInputRef.current) {
      const button = toInputRef.current.querySelector('button');
      if (button) {
        button.click();
      }
    }
  };

  return (
    <div className={styles.dateRangeRoot} style={style}>
      {label && (
        <Text size={14} weight={500} style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <div className={styles.dateRangeInputs}>
        <DateInput
          value={value.from}
          onChange={handleFromChange}
          disabled={disabled}
          clearable={clearable}
          placeholder="시작 날짜"
          includeTime={includeTime}
          autoFocusNext={includeTime ? undefined : focusToInput}
          timezone={timezone}
          style={{ width: includeTime ? '200px' : '150px' }}
        />
        <Text size={14} className={styles.separator}>
          ~
        </Text>
        <div ref={toInputRef}>
          <DateInput
            value={value.to}
            onChange={handleToChange}
            disabled={disabled}
            clearable={clearable}
            placeholder="종료 날짜"
            includeTime={includeTime}
            timezone={timezone}
            style={{ width: includeTime ? '200px' : '150px' }}
          />
        </div>
      </div>
    </div>
  );
}
