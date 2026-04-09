import { api } from '@/lib/axios';
import { User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export const teamApi = {
  getUsers: async () => {
    return api.get<any, ApiResponse<{ users: User[] }>>('/team/users');
  },

  getUserById: async (id: string) => {
    return api.get<any, ApiResponse<{ user: User }>>(`/team/users/${id}`);
  },

  createUser: async (data: Partial<User>) => {
    return api.post<any, ApiResponse<{ user: User }>>('/team/users', data);
  },

  updateUser: async (id: string, data: Partial<User>) => {
    return api.put<any, ApiResponse<{ user: User }>>(`/team/users/${id}`, data);
  },

  toggleUserStatus: async (id: string) => {
    return api.patch<any, ApiResponse<{ user: User }>>(`/team/users/${id}/toggle-status`);
  },

  deleteUser: async (id: string) => {
    return api.delete<any, ApiResponse<void>>(`/team/users/${id}`);
  }
};
