import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics';

export const useDashboardAnalytics = (params?: { period?: 'daily' | 'weekly' | 'monthly' }) => {
  return useQuery({
    queryKey: ['analytics', 'dashboard', params],
    queryFn: () => analyticsApi.getDashboard(params),
    // Refresh every 60 seconds for live dashboard feel
    refetchInterval: 60_000,
  });
};

export const useOrderAnalytics = (params?: { startDate?: string; endDate?: string; groupBy?: string }) => {
  return useQuery({
    queryKey: ['analytics', 'orders', params],
    queryFn: () => analyticsApi.getOrderAnalytics(params),
  });
};

export const useRiderAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'riders'],
    queryFn: () => analyticsApi.getRiderAnalytics(),
  });
};
