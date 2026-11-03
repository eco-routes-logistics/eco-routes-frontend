/** Business client as returned by the backend (client.model.ts). */
export interface Client {
  id: string;
  contactName: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  accountType?: 'pay_as_you_go' | 'corporate';
  registrationNumber?: string;
  estimatedMonthlyVolume?: string;
  totalOrders: number;
  activeOrders: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt?: string;
}
