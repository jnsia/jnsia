import { StyleProps } from '@shared/types/style';
import { ButtonVariant } from '@shared/ui/atoms/Button/Button';
import React from 'react';

import styles from './SearchBar.module.css';
import Button from '../../atoms/Button';

export interface SearchBarProps extends StyleProps {
  value: string;
  onChange: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: ButtonVariant;
  placeholder?: string;
  searchText?: string;
  onClear?: () => void;
  onSearch?: () => void;
}

export default function SearchBar({
  placeholder,
  value,
  size = 'medium',
  variant = 'primary',
  searchText = '검색',
  onChange,
  onClear,
  onSearch,
  style,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    onClear && onClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={styles.searchInput} style={style}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {value && onClear && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          type="button"
        >
          ✕
        </button>
      )}
      {onSearch && (
        <Button variant={variant} size={size} onClick={onSearch}>
          {searchText}
        </Button>
      )}
    </div>
  );
}
