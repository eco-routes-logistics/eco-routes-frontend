import { api } from '@/lib/axios';
import { ApiResponse, PaginatedResponse } from '@/types/api';
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
  registrationNumber: string;
  estimatedMonthlyVolume: string;
}

export interface ClientAuthResponse {
  client: Client;
  token: string;
}

/** Order as returned by GET /client-auth/orders. `status` is a display label, e.g. "In Transit". */
export interface ClientOrder {
  id: string;
  trackingId: string;
  customerName: string;
  status: string;
  deliveryType: string;
  totalFee: number;
  createdAt: string;
  driver?: string;
}

export type DeliveryType = 'standard' | 'express' | 'same_day';
export type DeliveryModel = 'Standard' | 'Premium';

export interface CreateClientOrderData {
  pickupLocation: string;
  pickupContact: string;
  pickupPhone: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  landmark?: string;
  description: string;
  weight: number;
  value: number;
  deliveryType: DeliveryType;
  deliveryModel: DeliveryModel;
  specialInstructions?: string;
}

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  reference?: string;
  createdAt: string;
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

  getMe: async () => {
    return api.get<any, ApiResponse<{ client: Client; walletBalance: number }>>('/client-auth/me');
  },

  getOrders: async (params?: { status?: string; page?: number; limit?: number }) => {
    return api.get<any, PaginatedResponse<{ orders: ClientOrder[] }>>('/client-auth/orders', { params });
  },

  createOrder: async (data: CreateClientOrderData) => {
    return api.post<any, ApiResponse<{ order: { id: string; trackingId: string; totalFee: number } }>>('/client-auth/orders', data);
  },

  getWallet: async () => {
    return api.get<any, ApiResponse<{ wallet: Wallet }>>('/wallets/me');
  },

  getWalletTransactions: async (params?: { page?: number; limit?: number }) => {
    return api.get<any, PaginatedResponse<{ transactions: WalletTransaction[] }>>('/wallets/transactions', { params });
  },

  initializeFunding: async (amount: number) => {
    return api.post<any, ApiResponse<{ reference: string; authorizationUrl: string }>>('/wallets/fund/initialize', { amount });
  },
};
