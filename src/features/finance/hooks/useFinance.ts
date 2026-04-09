import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi, GetTransactionsParams } from '../api/finance';
import toast from 'react-hot-toast';

export const useTransactions = (params?: GetTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => financeApi.getTransactions(params),
  });
};

export const useRevenueStats = (params?: { period?: 'daily' | 'weekly' | 'monthly' | 'yearly' }) => {
  return useQuery({
    queryKey: ['revenueStats', params],
    queryFn: () => financeApi.getRevenueStats(params),
  });
};

export const useProcessTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: financeApi.processTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction processed successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to process transaction');
    },
  });
};

export const useDisputeTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => financeApi.disputeTransaction(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction disputed successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to dispute transaction');
    },
  });
};
