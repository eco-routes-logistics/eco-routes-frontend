export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  LANDING: '/landing',
  TRACKING: '/track/:id',
  
  // Admin Dashboard
  DASHBOARD: '/',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:id',
  RIDERS: '/riders',
  RIDER_DETAILS: '/riders/:id',
  CLIENTS: '/clients',
  CLIENT_DETAILS: '/clients/:id',
  ANALYTICS: '/analytics',
  FINANCE: '/finance',
  BILLING: '/billing',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  TEAM: '/team',
  
  // Utilities
  WAYBILL: '/waybill/:id',
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  ASSIGN_ORDER: (id: string) => `/orders/${id}/assign`,
  UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  
  // Riders
  RIDERS: '/riders',
  RIDER_BY_ID: (id: string) => `/riders/${id}`,
  RIDER_AVAILABILITY: (id: string) => `/riders/${id}/availability`,
  
  // Clients
  CLIENTS: '/clients',
  CLIENT_BY_ID: (id: string) => `/clients/${id}`,
  
  // Analytics
  DASHBOARD_STATS: '/analytics/dashboard',
  ORDER_STATS: '/analytics/orders',
  RIDER_STATS: '/analytics/riders',
  
  // Finance
  INVOICES: '/finance/invoices',
  PAYMENTS: '/finance/payments',
} as const;
