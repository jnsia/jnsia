export async function waitForAsync<T>(
  checkCondition: () => T | null,
  timeoutMs = 5000,
  intervalMs = 100,
): Promise<T | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      resolve(null);
    }, timeoutMs);

    const interval = setInterval(() => {
      const result = checkCondition();
      if (result) {
        clearTimeout(timeout);
        clearInterval(interval);
        resolve(result);
      }
    }, intervalMs);
  });
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
