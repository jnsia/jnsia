import { StyleProps } from '@shared/types/style';
import React, { useState, useRef, useEffect } from 'react';

import styles from './Calendar.module.css';
import { Text } from '../../atoms';

export interface CalendarProps extends StyleProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  includeTime?: boolean;
  autoFocusNext?: () => void;
  timezone?: string; // 표시할 타임존 (예: 'Asia/Seoul', 'UTC', 'America/New_York')
}

export default function Calendar({
  value,
  onChange,
  placeholder = '날짜 선택',
  disabled = false,
  clearable = false,
  includeTime = false,
  autoFocusNext,
  style,
}: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  // 표시용: UTC 값을 로컬 타임존으로 변환
  const utcToLocal = (utcDateStr: string): { date: Date; time: string } => {
    try {
      const utcDate = new Date(utcDateStr);
      const localDate = new Date(
        utcDate.getTime() + utcDate.getTimezoneOffset() * 60000,
      );
      const timeStr = `${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}`;
      return { date: localDate, time: timeStr };
    } catch {
      return { date: new Date(), time: '00:00' };
    }
  };

  const [selectedTime, setSelectedTime] = useState(() => {
    if (!value || !includeTime) return '00:00';
    const { time } = utcToLocal(value);
    return time;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLButtonElement>(null);

  const today = new Date();
  const selectedDate = value
    ? (() => {
        const { date } = utcToLocal(value);
        return date;
      })()
    : null;

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';

    try {
      const { date, time } = utcToLocal(dateStr);
      const dateStr_formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      if (includeTime) {
        return `${dateStr_formatted} ${time}`;
      }

      return dateStr_formatted;
    } catch {
      return dateStr;
    }
  };

  const formatDateToString = (date: Date, time?: string) => {
    // 날짜는 로컬 날짜 그대로 사용, 시간만 조합
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    if (includeTime && time) {
      return `${dateStr}T${time}:00Z`;
    } else if (includeTime) {
      const defaultTime = placeholder?.includes('시작') ? '00:00' : '23:59';
      return `${dateStr}T${defaultTime}:59Z`;
    } else {
      return dateStr;
    }
  };

  const calculatePosition = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    const dropdownWidth = includeTime ? 450 : 280;
    const dropdownHeight = includeTime ? 380 : 350;
    const margin = 8;

    let top = rect.bottom + scrollY + 4;
    let left = rect.left + scrollX;

    // 오른쪽 화면 끝 체크
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - margin;
    }

    // 왼쪽 화면 끝 체크
    if (left < margin) {
      left = margin;
    }

    // 아래쪽 화면 끝 체크 (위로 표시)
    if (top + dropdownHeight > window.innerHeight + scrollY) {
      top = rect.top + scrollY - dropdownHeight - 4;
    }

    // 위쪽 화면 끝 체크 (아래로 표시)
    if (top < scrollY + margin) {
      top = rect.bottom + scrollY + 4;
    }

    setDropdownPosition({ top, left });
  };

  const handleDateClick = (date: Date) => {
    const newValue = formatDateToString(
      date,
      includeTime ? selectedTime : undefined,
    );
    onChange(newValue);

    if (!includeTime) {
      setIsOpen(false);
      if (autoFocusNext) {
        setTimeout(autoFocusNext, 100);
      }
    }
  };

  const handleToggleOpen = () => {
    if (disabled) return;
    if (!isOpen) {
      calculatePosition();
    }
    setIsOpen(!isOpen);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // 이전 달의 빈 날짜들
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className={styles.calendarRoot} style={style} ref={containerRef}>
      <button
        ref={inputRef}
        type="button"
        className={styles.calendarInput}
        onClick={handleToggleOpen}
        disabled={disabled}
      >
        <span className={value ? styles.selectedText : styles.placeholderText}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <div className={styles.inputActions}>
          {clearable && value && (
            <div className={styles.clearButton} onClick={handleClear}>
              <ClearIcon />
            </div>
          )}
          <CalendarIcon />
        </div>
      </button>

      {isOpen && (
        <div
          className={`${styles.calendarDropdown} ${includeTime ? styles.withTime : ''}`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <div className={styles.calendarContent}>
            <div className={styles.calendarSection}>
              <div className={styles.calendarHeader}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => navigateMonth('prev')}
                >
                  ‹
                </button>
                <Text size={16} weight={600}>
                  {currentMonth.getFullYear()}-
                  {String(currentMonth.getMonth() + 1).padStart(2, '0')}
                </Text>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => navigateMonth('next')}
                >
                  ›
                </button>
              </div>

              <div className={styles.calendarGrid}>
                {weekDays.map((day) => (
                  <div key={day} className={styles.weekDay}>
                    <Text size={12} color="secondary" weight={500}>
                      {day}
                    </Text>
                  </div>
                ))}
                {days.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dayButton} ${
                      date &&
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                        ? styles.selectedDay
                        : ''
                    } ${
                      date && date.toDateString() === today.toDateString()
                        ? styles.today
                        : ''
                    }`}
                    onClick={() => date && handleDateClick(date)}
                    disabled={!date}
                  >
                    {date && <Text size={14}>{date.getDate()}</Text>}
                  </button>
                ))}
              </div>
            </div>

            {includeTime && (
              <div className={styles.timeSection}>
                <div className={styles.timeHeader}>
                  <ClockIcon />
                  <Text size={13} weight={500} color="secondary">
                    시간
                  </Text>
                </div>

                <div className={styles.timeDisplay}>
                  <Text size={18} weight={600}>
                    {selectedTime}
                  </Text>
                </div>

                <div className={styles.timeScrollers}>
                  <div className={styles.timeScroller}>
                    <Text
                      size={12}
                      color="secondary"
                      style={{ marginBottom: 8 }}
                    >
                      시
                    </Text>
                    <div className={styles.scrollContainer}>
                      {Array.from({ length: 24 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${styles.scrollItem} ${
                            parseInt(selectedTime.split(':')[0]) === i
                              ? styles.selected
                              : ''
                          }`}
                          onClick={() => {
                            const hour = String(i).padStart(2, '0');
                            const minute = selectedTime.split(':')[1];
                            const newTime = `${hour}:${minute}`;
                            setSelectedTime(newTime);
                            if (selectedDate) {
                              onChange(
                                formatDateToString(selectedDate, newTime),
                              );
                            }
                          }}
                        >
                          <Text
                            size={14}
                            weight={
                              parseInt(selectedTime.split(':')[0]) === i
                                ? 600
                                : 400
                            }
                          >
                            {String(i).padStart(2, '0')}
                          </Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.timeScroller}>
                    <Text
                      size={12}
                      color="secondary"
                      style={{ marginBottom: 8 }}
                    >
                      분
                    </Text>
                    <div className={styles.scrollContainer}>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <button
                            key={minute}
                            type="button"
                            className={`${styles.scrollItem} ${
                              parseInt(selectedTime.split(':')[1]) === minute
                                ? styles.selected
                                : ''
                            }`}
                            onClick={() => {
                              const hour = selectedTime.split(':')[0];
                              const newMinute = String(minute).padStart(2, '0');
                              const newTime = `${hour}:${newMinute}`;
                              setSelectedTime(newTime);
                              if (selectedDate) {
                                onChange(
                                  formatDateToString(selectedDate, newTime),
                                );
                              }
                            }}
                          >
                            <Text
                              size={14}
                              weight={
                                parseInt(selectedTime.split(':')[1]) === minute
                                  ? 600
                                  : 400
                              }
                            >
                              {String(minute).padStart(2, '0')}
                            </Text>
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="12,6 12,12 16,14"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
      <line
        x1="3"
        y1="10"
        x2="21"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
