export const formatTime = (second: number) => {
  if (isNaN(second)) return '00:00';

  const h = Math.floor(second / 3600);
  const m = Math.floor((second % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(second % 60)
    .toString()
    .padStart(2, '0');

  if (h > 0) {
    return `${h}:${m}:${s}`;
  }

  return `${m}:${s}`;
};

export const formatTimeWithMs = (second: number) => {
  if (isNaN(second)) return '00:00:00.000';

  const h = Math.floor(second / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((second % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(second % 60)
    .toString()
    .padStart(2, '0');
  const ms = Math.floor((second % 1) * 1000)
    .toString()
    .padStart(3, '0');

  return `${h}:${m}:${s}.${ms}`;
};

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}초`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
