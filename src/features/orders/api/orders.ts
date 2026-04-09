import { api } from '@/lib/axios';
import { Order, CreateOrderData, UpdateOrderStatusData, AssignOrderData } from '@/types/order';
import { ApiResponse, PaginatedResponse } from '@/types/api';

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
    return api.get<any, PaginatedResponse<{ orders: Order[] }>>('/orders', { params });
  },

  getOrderById: async (id: string) => {
    return api.get<any, ApiResponse<{ order: Order }>>(`/orders/${id}`);
  },

  createOrder: async (data: CreateOrderData & { businessClientId?: string; deliveryModel?: string }) => {
    return api.post<any, ApiResponse<{ order: Order }>>('/orders', data);
  },

  updateOrder: async (id: string, data: Partial<Order>) => {
    return api.put<any, ApiResponse<{ order: Order }>>(`/orders/${id}`, data);
  },

  updateOrderStatus: async (id: string, data: UpdateOrderStatusData) => {
    return api.patch<any, ApiResponse<{ order: Order }>>(`/orders/${id}/status`, data);
  },

  assignRider: async (data: AssignOrderData) => {
    return api.patch<any, ApiResponse<{ order: Order }>>(`/orders/${data.orderId}/assign`, { riderId: data.riderId });
  },

  deleteOrder: async (id: string) => {
    return api.delete<any, ApiResponse<void>>(`/orders/${id}`);
  }
};
