import { api } from '@/lib/axios';
import { LoginCredentials, RegisterData, User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return api.post<any, ApiResponse<{ user: User; token: string }>>('/auth/login', credentials);
  },
  
  register: async (data: RegisterData) => {
    return api.post<any, ApiResponse<{ user: User; token: string }>>('/auth/register', data);
  },

  getMe: async () => {
    return api.get<any, ApiResponse<{ user: User }>>('/auth/me');
  },

  logout: async () => {
    return api.post<any, ApiResponse<void>>('/auth/logout');
  }
};
