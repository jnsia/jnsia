export const isProductionEnvironment = () => {
  return import.meta.env.PROD;
};

export const WASUrl = import.meta.env.VITE_BASE_URL;
