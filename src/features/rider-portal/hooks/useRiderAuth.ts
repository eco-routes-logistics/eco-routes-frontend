import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { riderAuthApi, RiderProfile, withRiderName } from '../api/riderAuth';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useRiderRegister = () => {
  return useMutation({
    mutationFn: riderAuthApi.register,
    onSuccess: () => {
      toast.success('Application submitted successfully!');
    },
    onError: (error: any) => {
      const status = error?.response?.status;
      const msg = status === 409
        ? 'An account with this email already exists. Please log in instead.'
        : error?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    },
  });
};

export const useRiderLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: riderAuthApi.login,
    onSuccess: (data) => {
      const { rider, token } = data.data!;
      localStorage.setItem('rider_token', token);
      useRiderAuthStore.getState().setRider(withRiderName(rider));
      navigate('/rider/dashboard');
    },
    // Errors are shown inline on the login screen
  });
};

export const useRiderMe = () => {
  return useQuery({
    queryKey: ['rider-me'],
    queryFn: riderAuthApi.getMe,
    enabled: !!localStorage.getItem('rider_token'),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateRiderProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: riderAuthApi.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider-me'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    },
  });
};

export const useUpdateRiderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: riderAuthApi.updateStatus,
    // Optimistic: flip the status immediately so the toggle feels instant
    onMutate: async (status) => {
      await queryClient.cancelQueries({ queryKey: ['rider-me'] });
      const previous = queryClient.getQueryData<any>(['rider-me']);
      if (previous?.data?.rider) {
        queryClient.setQueryData(['rider-me'], {
          ...previous,
          data: { ...previous.data, rider: { ...previous.data.rider, status } },
        });
      }
      return { previous };
    },
    onError: (error: any, _status, context) => {
      if (context?.previous) queryClient.setQueryData(['rider-me'], context.previous);
      toast.error(error?.response?.data?.message || 'Failed to update status');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rider-me'] });
    },
  });
};
