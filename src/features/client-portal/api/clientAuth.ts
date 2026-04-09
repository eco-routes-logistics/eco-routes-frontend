import { api } from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { Client } from '@/types/client';

export interface ClientLoginData {
  email: string;
  password: string;
}

export interface ClientRegisterPayAsYouGoData {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface ClientRegisterCorporateData {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber?: string;
  estimatedMonthlyVolume?: string;
}

export interface ClientAuthResponse {
  client: Client;
  token: string;
}

export const clientAuthApi = {
  login: async (data: ClientLoginData) => {
    return api.post<any, ApiResponse<ClientAuthResponse>>('/client-auth/login', data);
  },

  registerPayAsYouGo: async (data: ClientRegisterPayAsYouGoData) => {
    return api.post<any, ApiResponse<{ client: Partial<Client> }>>('/client-auth/register/pay-as-you-go', data);
  },

  registerCorporate: async (data: ClientRegisterCorporateData) => {
    return api.post<any, ApiResponse<{ client: Partial<Client> }>>('/client-auth/register/corporate', data);
  },
};
