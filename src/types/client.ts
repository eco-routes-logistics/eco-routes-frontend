export interface Client {
  id: string;
  name?: string; // Optional as per store usage
  contactName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  accountType?: 'pay_as_you_go' | 'corporate';
  totalOrders: number;
  activeOrders: number;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  password?: string; // Plain text for demo; hashed in real backend
  createdAt?: string;
}
