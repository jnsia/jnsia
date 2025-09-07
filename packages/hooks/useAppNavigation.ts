import { ROUTES } from '@shared/config/routes';
import { useNavigate } from 'react-router-dom';

export default function useAppNavigation() {
  const navigate = useNavigate();

  return {
    goToDashboard: () => {
      navigate(ROUTES.DASHBOARD);
    },
    goToAnalysis: (jobType: string, jobId?: string | null) => {
      const route = ROUTES.ANALYSIS(jobType) + (jobId ? `?jobId=${jobId}` : '');
      navigate(route);
    },
    goToNodeManagement: (nodeId?: string) => {
      const route = nodeId ? `${ROUTES.NODE_MANAGEMENT}?nodeId=${nodeId}` : ROUTES.NODE_MANAGEMENT;
      navigate(route);
    },
    goToStorageManagement: () => {
      navigate(ROUTES.STORAGE_MANAGEMENT);
    },
  };
}
