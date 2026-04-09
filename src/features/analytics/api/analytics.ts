import { api } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

export interface DashboardMetrics {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  averageDeliveryTime: number;
  successRate: number;
  onTimeRate: number;
}

export interface VolumeByTime {
  hour: string;
  count: number;
}

export interface TopRider {
  id: string;
  name: string;
  orders: number;
  rating: number;
}

export interface TopClient {
  id: string;
  name: string;
  orders: number;
}

export interface DashboardAnalytics {
  metrics: DashboardMetrics;
  charts: {
    volumeByTime: VolumeByTime[];
    volumeByDay: Array<{ day: string; count: number }>;
    deliveryPerformance: Array<{ date: string; onTime: number; late: number }>;
  };
  rankings: {
    topRiders: TopRider[];
    topClients: TopClient[];
  };
}

export interface OrderAnalytics {
  statusDistribution: Record<string, number>;
  deliveryTypeDistribution: Record<string, number>;
  volumeTrend: Array<{ period: string; count: number }>;
}

export interface RiderAnalytics {
  totalRiders: number;
  activeRiders: number;
  averageRating: number;
  performanceByRider: Array<{
    riderId: string;
    riderName: string;
    totalDeliveries: number;
    completedOrders: number;
    averageDeliveryTime: number;
    rating: number;
  }>;
}

export const analyticsApi = {
  getDashboard: async (params?: { period?: 'daily' | 'weekly' | 'monthly' }) => {
    return api.get<any, ApiResponse<DashboardAnalytics>>('/analytics/dashboard', { params });
  },

  getOrderAnalytics: async (params?: { startDate?: string; endDate?: string; groupBy?: string }) => {
    return api.get<any, ApiResponse<OrderAnalytics>>('/analytics/orders', { params });
  },

  getRiderAnalytics: async () => {
    return api.get<any, ApiResponse<RiderAnalytics>>('/analytics/riders');
  },
};
