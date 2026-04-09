import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ridersApi, GetRidersParams } from '../api/riders';
import toast from 'react-hot-toast';

export const useRiders = (params?: GetRidersParams) => {
  return useQuery({
    queryKey: ['riders', params],
    queryFn: () => ridersApi.getRiders(params),
  });
};

export const useRiderDetails = (id: string) => {
  return useQuery({
    queryKey: ['rider', id],
    queryFn: () => ridersApi.getRiderById(id),
    enabled: !!id,
  });
};

export const useCreateRider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ridersApi.createRider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riders'] });
      toast.success('Rider created successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create rider');
    },
  });
};

export const useUpdateRider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => ridersApi.updateRider(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['riders'] });
      queryClient.invalidateQueries({ queryKey: ['rider', variables.id] });
      toast.success('Rider updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update rider');
    },
  });
};

export const useDeleteRider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ridersApi.deleteRider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riders'] });
      toast.success('Rider deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete rider');
    },
  });
};

export const useRiderOrders = (id: string, params?: { status?: string }) => {
  return useQuery({
    queryKey: ['rider', id, 'orders', params],
    queryFn: () => ridersApi.getRiderOrders(id, params),
    enabled: !!id,
  });
};
