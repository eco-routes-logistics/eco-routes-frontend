import { api } from '@/lib/axios';
import { Rider, CreateRiderData, UpdateRiderData } from '@/types/rider';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface GetRidersParams {
  status?: string;
  available?: boolean;
}

export const ridersApi = {
  getRiders: async (params?: GetRidersParams) => {
    return api.get<any, ApiResponse<{ riders: Rider[] }>>('/riders', { params });
  },

  getRiderById: async (id: string) => {
    return api.get<any, ApiResponse<{ rider: Rider }>>(`/riders/${id}`);
  },

  createRider: async (data: CreateRiderData) => {
    return api.post<any, ApiResponse<{ rider: Rider }>>('/riders', data);
  },

  updateRider: async (id: string, data: Partial<UpdateRiderData>) => {
    return api.put<any, ApiResponse<{ rider: Rider }>>(`/riders/${id}`, data);
  },

  deleteRider: async (id: string) => {
    return api.delete<any, ApiResponse<void>>(`/riders/${id}`);
  },

  getRiderOrders: async (id: string, params?: { status?: string }) => {
    // Re-typing generic response.
    return api.get<any, ApiResponse<{ riderId: string; riderName: string; orders: any[] }>>(`/riders/${id}/orders`, { params });
  }
};
