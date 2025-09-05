import { useEffect } from 'react';

import { supabase } from '../../shared/lib/supabase/supabase';

// 사용자 인증 상태를 감시하는 프로세스
export const useAuthWatcher = (onAuthChange: (session: any) => void) => {
  useEffect(() => {
    // 현재 세션 가져오기
    const getCurrentSession = async () => {
      const { data } = await supabase.auth.getSession();
      onAuthChange(data.session);
    };

    // 초기 세션 확인
    getCurrentSession();

    // 인증 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      onAuthChange(session);
    });

    // 클린업 함수
    return () => {
      subscription.unsubscribe();
    };
  }, [onAuthChange]);
};
