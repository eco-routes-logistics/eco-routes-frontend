export interface Client {
  id: string;
  name?: string; // Optional as per store usage
  contactName: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  totalOrders: number;
  activeOrders: number;
  status?: 'active' | 'inactive';
  createdAt?: string;
}
