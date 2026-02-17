export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:5000',
  GOOGLE_MAPS_KEY: import.meta.env.VITE_GOOGLE_MAPS_KEY || '',
  ENVIRONMENT: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
