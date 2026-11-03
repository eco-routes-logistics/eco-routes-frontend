import { api } from '@/lib/axios';
import { LoginCredentials, User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return api.post<any, ApiResponse<{ user: User; token: string }>>('/auth/login', credentials);
  },
  
  getMe: async () => {
    return api.get<any, ApiResponse<{ user: User }>>('/auth/me');
  },

  logout: async () => {
    return api.post<any, ApiResponse<void>>('/auth/logout');
  }
};
