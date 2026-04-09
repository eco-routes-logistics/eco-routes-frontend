import { api } from '@/lib/axios';
import { Client } from '@/types/client';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface GetClientsParams {
  status?: string;
  page?: number;
  limit?: number;
}

export const clientsApi = {
  getClients: async (params?: GetClientsParams) => {
    return api.get<any, PaginatedResponse<{ clients: Client[] }>>('/clients', { params });
  },

  getClientById: async (id: string) => {
    return api.get<any, ApiResponse<{ client: Client }>>(`/clients/${id}`);
  },

  createClient: async (data: Partial<Client>) => {
    return api.post<any, ApiResponse<{ client: Client }>>('/clients', data);
  },

  updateClient: async (id: string, data: Partial<Client>) => {
    return api.put<any, ApiResponse<{ client: Client }>>(`/clients/${id}`, data);
  },

  deleteClient: async (id: string) => {
    return api.delete<any, ApiResponse<void>>(`/clients/${id}`);
  }
};
