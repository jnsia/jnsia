export const ROUTES = {
  DASHBOARD: '/',
  NODE_MANAGEMENT: '/node-management',
  ANALYSIS: (jobType: string) => `/analysis/${jobType}`,
  STORAGE_MANAGEMENT: '/storage-management',
  NOT_FOUND: '*',
};
