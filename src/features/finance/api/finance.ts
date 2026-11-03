import { api } from '@/lib/axios';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface Transaction {
  id: string;
  orderId: string;
  clientId: string;
  clientName: string;
  riderId: string;
  riderName: string;
  deliveryModel: 'Standard' | 'Premium';
  totalFee: number;
  platformCommission: number;
  riderPayout: number;
  status: 'Pending' | 'Processed' | 'Disputed';
  date: string;
  processedAt?: string;
  createdAt: string;
}

export interface RevenueStats {
  totalRevenue: number;
  standardRevenue: number;
  premiumRevenue: number;
  platformEarnings: number;
  riderPayouts: number;
  operationalExpenses: number;
  netProfit: number;
}

export interface RevenueTrend {
  period: string;
  revenue: number;
  profit: number;
}

export interface GetTransactionsParams {
  status?: 'Pending' | 'Processed' | 'Disputed';
  deliveryModel?: 'Standard' | 'Premium';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const financeApi = {
  getTransactions: async (params?: GetTransactionsParams) => {
    return api.get<any, PaginatedResponse<{ transactions: Transaction[] }>>('/finance/transactions', { params });
  },

  getRevenueStats: async (params?: { period?: 'daily' | 'weekly' | 'monthly' | 'yearly' }) => {
    return api.get<any, ApiResponse<{ stats: RevenueStats; trend: RevenueTrend[] }>>('/finance/revenue-stats', { params });
  },

  processTransaction: async (id: string) => {
    return api.patch<any, ApiResponse<{ transaction: Transaction }>>(`/finance/transactions/${id}/process`);
  },

  disputeTransaction: async (id: string, reason: string) => {
    return api.patch<any, ApiResponse<{ transaction: Transaction }>>(`/finance/transactions/${id}/dispute`, { reason });
  }
};
