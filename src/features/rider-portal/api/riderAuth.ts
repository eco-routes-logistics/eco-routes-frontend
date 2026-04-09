import { api } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

export interface RiderLoginData {
  email: string;
  password: string;
}

export interface RiderProfile {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'busy' | 'inactive';
  riderType: 'standard' | 'premium';
  vehicleType: string;
  vehicleNumber?: string;
  rating: number;
  totalDeliveries: number;
  completedOrders: number;
  currentOrders: number;
  passportPhotoUrl?: string;
}

export interface RiderLoginResponse {
  rider: RiderProfile;
  token: string;
}

export interface RiderRegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  vehicleType: string;
  vehicleNumber: string;
  nin: string;
  idType: string;
  idDocument: File;
  passportPhoto: File;
}

export const riderAuthApi = {
  register: async (data: RiderRegisterData) => {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('phone', data.phone);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('vehicleType', data.vehicleType);
    fd.append('vehicleNumber', data.vehicleNumber);
    fd.append('nin', data.nin);
    fd.append('idType', data.idType);
    fd.append('idDocument', data.idDocument);
    fd.append('passportPhoto', data.passportPhoto);
    return api.post<any, ApiResponse<{ rider: Partial<RiderProfile> }>>('/rider-auth/register', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  login: async (data: RiderLoginData) => {
    return api.post<any, ApiResponse<RiderLoginResponse>>('/rider-auth/login', data);
  },

  getMe: async () => {
    return api.get<any, ApiResponse<{ rider: RiderProfile }>>('/rider/me');
  },

  updateMe: async (data: { name?: string; phone?: string; vehicleType?: string }) => {
    return api.patch<any, ApiResponse<{ rider: Partial<RiderProfile> }>>('/rider/me', data);
  },

  updateStatus: async (status: 'active' | 'busy' | 'inactive') => {
    return api.patch<any, ApiResponse<{ status: string }>>('/rider/me/status', { status });
  },

  logout: () => {
    localStorage.removeItem('rider_token');
  },
};
