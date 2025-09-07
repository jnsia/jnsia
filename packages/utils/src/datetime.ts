export const formatDatetime = (dateString: string | null) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export const compareDatetime = (
  datetime1: string | null,
  datetime2: string | null,
): number => {
  if (!datetime1 && !datetime2) return 0;
  if (!datetime1) return 1;
  if (!datetime2) return -1;
  return new Date(datetime1).getTime() - new Date(datetime2).getTime();
};

export const convertToUTC = (
  dateString: string,
  targetTimezone: string = 'Asia/Seoul',
): string => {
  if (!dateString) return dateString;

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const tempDate = new Date(year, month, day, hours, minutes, seconds);
    const utcTime = tempDate.getTime();
    const timezoneOffsetMs = new Date().getTimezoneOffset() * 60000;

    const targetDate = new Date(
      tempDate.toLocaleString('en-US', { timeZone: targetTimezone }),
    );
    const localDate = new Date(tempDate.toLocaleString('en-US'));
    const targetOffsetMs = localDate.getTime() - targetDate.getTime();

    const utcDate = new Date(utcTime + timezoneOffsetMs - targetOffsetMs);
    return utcDate.toISOString();
  } catch {
    return dateString;
  }
};

export const getSystemTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
