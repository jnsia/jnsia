import { useEffect } from 'react';

export default function useNavigationGuard({
  active,
  message,
}: {
  active: boolean;
  message?: string;
}) {
  const safeNavigate = (navigate: () => void) => {
    if (active) {
      console.warn(message || '작업 처리 중에는 페이지를 이동할 수 없습니다.');
      return;
    }

    navigate();
  };

  useEffect(() => {
    if (!active) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [active]);

  return {
    safeNavigate,
  };
}
