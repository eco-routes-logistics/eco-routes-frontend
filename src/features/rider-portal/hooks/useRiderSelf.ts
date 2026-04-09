import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { riderSelfApi } from '../api/riderSelf';
import toast from 'react-hot-toast';

export const useAvailableJobs = (params?: { deliveryType?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['rider-available-jobs', params],
    queryFn: () => riderSelfApi.getAvailableJobs(params),
    enabled: !!localStorage.getItem('rider_token'),
    refetchInterval: 30000,
  });
};

export const useAcceptJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => riderSelfApi.acceptJob(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider-available-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['rider-orders'] });
      toast.success('Job accepted!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to accept job');
    },
  });
};

export const useMarkPickedUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => riderSelfApi.markPickedUp(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider-orders'] });
      toast.success('Order marked as picked up');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update order');
    },
  });
};

export const useMarkDelivered = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, note }: { orderId: string; note?: string }) =>
      riderSelfApi.markDelivered(orderId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider-orders'] });
      queryClient.invalidateQueries({ queryKey: ['rider-earnings'] });
      toast.success('Delivery confirmed!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to confirm delivery');
    },
  });
};

export const useRiderOrders = (params?: { status?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['rider-orders', params],
    queryFn: () => riderSelfApi.getMyOrders(params),
    enabled: !!localStorage.getItem('rider_token'),
  });
};

export const useRiderEarnings = () => {
  return useQuery({
    queryKey: ['rider-earnings'],
    queryFn: riderSelfApi.getEarnings,
    enabled: !!localStorage.getItem('rider_token'),
  });
};
