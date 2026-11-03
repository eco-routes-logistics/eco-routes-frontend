import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clientAuthApi } from '../api/clientAuth';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const hasToken = () => !!localStorage.getItem('client_token');

export const useClientLogin = () => {
  const setClient = useClientAuthStore((s) => s.setClient);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: clientAuthApi.login,
    onSuccess: (data) => {
      const { client, token } = data.data!;
      localStorage.setItem('client_token', token);
      setClient(client);
      navigate('/client/dashboard');
    },
    // Errors are shown inline on the login screen
  });
};

// Registration errors are shown inline (with per-field messages) on the sign-up screen
export const useClientRegisterPayAsYouGo = () => useMutation({ mutationFn: clientAuthApi.registerPayAsYouGo });

export const useClientRegisterCorporate = () => useMutation({ mutationFn: clientAuthApi.registerCorporate });

export const useClientMe = () =>
  useQuery({
    queryKey: ['client-me'],
    queryFn: clientAuthApi.getMe,
    enabled: hasToken(),
  });

export const useClientPortalOrders = (params?: { status?: string; page?: number; limit?: number }) =>
  useQuery({
    queryKey: ['client-orders', params],
    queryFn: () => clientAuthApi.getOrders(params),
    enabled: hasToken(),
    // Delivery status changes while the client watches; keep it reasonably fresh
    refetchInterval: 60_000,
  });

export const useCreateClientOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientAuthApi.createOrder,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['client-orders'] });
      queryClient.invalidateQueries({ queryKey: ['client-me'] });
      queryClient.invalidateQueries({ queryKey: ['client-wallet'] });
      queryClient.invalidateQueries({ queryKey: ['client-wallet-transactions'] });
      toast.success(`Delivery booked · ${res.data?.order?.trackingId ?? ''}`);
    },
    // Errors (including insufficient balance) are shown inline on the booking page
  });
};

export const useClientWallet = (enabled = true) =>
  useQuery({
    queryKey: ['client-wallet'],
    queryFn: clientAuthApi.getWallet,
    enabled: enabled && hasToken(),
    retry: false,
  });

export const useWalletTransactions = (params: { page: number; limit: number }, enabled = true) =>
  useQuery({
    queryKey: ['client-wallet-transactions', params],
    queryFn: () => clientAuthApi.getWalletTransactions(params),
    enabled: enabled && hasToken(),
  });

export const useFundWallet = () =>
  useMutation({
    mutationFn: clientAuthApi.initializeFunding,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Could not start the payment. Please try again.');
    },
  });
