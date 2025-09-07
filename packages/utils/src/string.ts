export const includesIgnoreCase = (source: string, query: string) => {
  return source.toLowerCase().includes(query.toLowerCase());
};

export const compareWithNull = (
  value1: string | null,
  value2: string | null,
): number => {
  if (value1 === null && value2 === null) return 0;

  if (!value1) return 1;
  if (!value2) return -1;

  return value2.localeCompare(value1);
};
