import { useMutation } from '@tanstack/react-query';
import { clientAuthApi } from '../api/clientAuth';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useClientLogin = () => {
  const store = useClientAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: clientAuthApi.login,
    onSuccess: (data) => {
      const { client, token } = data.data!;
      localStorage.setItem('client_token', token);
      // Update client auth store with real client data
      store.setClient(client as any);
      navigate('/client/dashboard');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
    },
  });
};

export const useClientRegisterPayAsYouGo = () => {
  return useMutation({
    mutationFn: clientAuthApi.registerPayAsYouGo,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Registration failed. Please try again.');
    },
  });
};

export const useClientRegisterCorporate = () => {
  return useMutation({
    mutationFn: clientAuthApi.registerCorporate,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Application failed. Please try again.');
    },
  });
};
