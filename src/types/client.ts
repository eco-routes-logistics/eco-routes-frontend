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
  status: 'pending' | 'active' | 'suspended';
  password?: string; // Plain text for demo; hashed in real backend
  createdAt?: string;
}
