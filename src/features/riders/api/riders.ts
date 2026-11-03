import { api } from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import type { ApiOrder } from '@/features/orders/api/orders';

/** Rider as returned by the backend (rider.model.ts toJSON adds `name`). */
export interface ApiRider {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  status: 'active' | 'inactive' | 'busy' | 'pending' | 'rejected';
  riderType: 'standard' | 'premium';
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber?: string;
  nin?: string;
  idType?: string;
  idDocumentUrl?: string;
  passportPhotoUrl?: string;
  rejectionReason?: string;
  rating: number;
  totalDeliveries: number;
  completedOrders: number;
  currentOrders: number;
  createdAt: string;
}

export interface RiderInput {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  vehicleType: string;
  vehicleNumber: string;
  status?: ApiRider['status'];
}

export interface GetRidersParams {
  status?: string;
  available?: boolean;
  riderType?: string;
}

export const ridersApi = {
  getRiders: async (params?: GetRidersParams) => {
    return api.get<any, ApiResponse<{ riders: ApiRider[] }>>('/riders', { params });
  },

  getRiderById: async (id: string) => {
    return api.get<any, ApiResponse<{ rider: ApiRider }>>(`/riders/${id}`);
  },

  createRider: async (data: RiderInput) => {
    return api.post<any, ApiResponse<{ rider: ApiRider }>>('/riders', data);
  },

  updateRider: async (id: string, data: Partial<RiderInput>) => {
    return api.put<any, ApiResponse<{ rider: ApiRider }>>(`/riders/${id}`, data);
  },

  deleteRider: async (id: string) => {
    return api.delete<any, ApiResponse<void>>(`/riders/${id}`);
  },

  approveRider: async (id: string) => {
    return api.patch<any, ApiResponse<{ rider: Partial<ApiRider> }>>(`/riders/${id}/approve`);
  },

  rejectRider: async (id: string, reason: string) => {
    return api.patch<any, ApiResponse<{ rider: Partial<ApiRider> }>>(`/riders/${id}/reject`, { reason });
  },

  getRiderOrders: async (id: string, params?: { status?: string }) => {
    return api.get<any, ApiResponse<{ riderId: string; riderName: string; orders: ApiOrder[] }>>(`/riders/${id}/orders`, { params });
  }
};
