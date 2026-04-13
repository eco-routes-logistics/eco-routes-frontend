import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { riderAuthApi, RiderProfile } from '../api/riderAuth';
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
      useRiderAuthStore.getState().setRider(rider as any);
      navigate('/rider/dashboard');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
    },
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider-me'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    },
  });
};
