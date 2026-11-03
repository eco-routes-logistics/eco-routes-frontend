import { api } from '@/lib/axios';
import { AssignOrderData } from '@/types/order';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export type OrderStatusValue = 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';

/** Order as returned by the backend (order.controller.ts buildOrderResponse). */
export interface ApiOrder {
  id: string;
  trackingId: string;
  status: OrderStatusValue;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerLocation: string;
  pickupLocation: string;
  pickupContact: string;
  pickupPhone: string;
  deliveryLocation: string;
  landmark?: string;
  description: string;
  specialInstructions?: string;
  weight: number;
  value: number;
  deliveryType: string;
  serviceTier?: string;
  deliveryFee: number;
  adminFee: number;
  totalFee: number;
  otp?: string;
  /** Rider full name, set when a rider is assigned */
  driver?: string;
  driverId?: string;
  /** Business client company name */
  businessClient?: string;
  businessClientId: string;
  assignedAt?: string;
  scheduledFor?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrdersParams {
  status?: string;
  clientId?: string;
  riderId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const ordersApi = {
  getOrders: async (params?: GetOrdersParams) => {
    return api.get<any, PaginatedResponse<{ orders: ApiOrder[] }>>('/orders', { params });
  },

  getOrderById: async (id: string) => {
    return api.get<any, ApiResponse<{ order: ApiOrder }>>(`/orders/${id}`);
  },

  createOrder: async (data: Record<string, unknown>) => {
    return api.post<any, ApiResponse<{ order: ApiOrder }>>('/orders', data);
  },

  updateOrder: async (id: string, data: Partial<ApiOrder>) => {
    return api.put<any, ApiResponse<{ order: ApiOrder }>>(`/orders/${id}`, data);
  },

  updateOrderStatus: async (id: string, data: { status: OrderStatusValue; notes?: string }) => {
    return api.patch<any, ApiResponse<{ order: ApiOrder }>>(`/orders/${id}/status`, data);
  },

  assignRider: async (data: AssignOrderData) => {
    return api.patch<any, ApiResponse<{ order: ApiOrder }>>(`/orders/${data.orderId}/assign`, { riderId: data.riderId });
  },

  deleteOrder: async (id: string) => {
    return api.delete<any, ApiResponse<void>>(`/orders/${id}`);
  }
};
