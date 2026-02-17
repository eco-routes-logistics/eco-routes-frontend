/**
 * App-wide constants
 */

export const APP_NAME = 'EcoRoutes';
export const APP_VERSION = '1.0.0';

export const ORDER_STATUSES = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
} as const;

export const RIDER_STATUSES = {
  AVAILABLE: 'Available',
  ON_DELIVERY: 'On Delivery',
  OFFLINE: 'Offline',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  LOGISTICS_STAFF: 'logistics_staff',
  BUSINESS_OWNER: 'business_owner',
  BUSINESS_STAFF: 'business_staff',
  RIDER: 'rider',
} as const;

export const DELIVERY_TYPES = {
  STANDARD: 'Standard',
  EXPRESS: 'Express',
  SCHEDULED: 'Scheduled',
} as const;

export const VEHICLE_TYPES = {
  BICYCLE: 'Bicycle',
  MOTORCYCLE: 'Motorcycle',
  CAR: 'Car',
  VAN: 'Van',
} as const;

export const REGIONS = {
  NIGERIA: {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    timezone: 'Africa/Lagos',
    phoneFormat: '+234',
  },
  UK: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    timezone: 'Europe/London',
    phoneFormat: '+44',
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const QUERY_KEYS = {
  ORDERS: 'orders',
  ORDER: 'order',
  RIDERS: 'riders',
  RIDER: 'rider',
  CLIENTS: 'clients',
  CLIENT: 'client',
  DASHBOARD_STATS: 'dashboard-stats',
  ANALYTICS: 'analytics',
  INVOICES: 'invoices',
  NOTIFICATIONS: 'notifications',
} as const;
