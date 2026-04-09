import { api } from '@/lib/axios';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface AvailableJob {
  id: string;
  trackingId: string;
  pickupLocation: string;
  deliveryLocation: string;
  description: string;
  weight: number;
  deliveryType: string;
  totalFee: number;
  estimatedRiderEarnings: number;
  createdAt: string;
}

export interface RiderOrder {
  id: string;
  trackingId: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: string;
  deliveryType: string;
  totalFee: number;
  assignedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  otp?: string;
  createdAt: string;
}

export interface EarningsSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  allTime: number;
}

export interface Payout {
  orderId: string;
  trackingId: string;
  deliveredAt: string;
  pickupLocation: string;
  deliveryLocation: string;
  deliveryType: string;
  totalFee: number;
  riderEarnings: number;
  status: string;
}

export const riderSelfApi = {
  getAvailableJobs: async (params?: { deliveryType?: string; page?: number; limit?: number }) => {
    return api.get<any, PaginatedResponse<{ jobs: AvailableJob[] }>>('/rider/available-jobs', { params });
  },

  acceptJob: async (orderId: string) => {
    return api.post<any, ApiResponse<{ order: RiderOrder }>>(`/rider/jobs/${orderId}/accept`);
  },

  markPickedUp: async (orderId: string) => {
    return api.patch<any, ApiResponse<{ order: Partial<RiderOrder> }>>(`/rider/jobs/${orderId}/pickup`);
  },

  markDelivered: async (orderId: string, note?: string) => {
    return api.patch<any, ApiResponse<{ order: Partial<RiderOrder>; earnings: any }>>(`/rider/jobs/${orderId}/deliver`, { note });
  },

  getMyOrders: async (params?: { status?: string; page?: number; limit?: number }) => {
    return api.get<any, PaginatedResponse<{ orders: RiderOrder[] }>>('/rider/me/orders', { params });
  },

  getEarnings: async () => {
    return api.get<any, ApiResponse<{ summary: EarningsSummary; commissionRate: number; payouts: Payout[] }>>('/rider/me/earnings');
  },
};
