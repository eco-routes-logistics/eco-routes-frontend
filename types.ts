
export enum OrderStatus {
  PENDING = 'Pending',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  ACCEPTED = 'Accepted'
}

export interface Order {
  id: string;
  customer: string;
  customerEmail?: string;
  customerPhone?: string;
  customerLocation: string;
  businessClient: string;
  status: OrderStatus;
  driver?: string;
  driverAvatar?: string;
  date: string;
  weight: string;
  value: string;
  landmark?: string;
  otp?: string;
  trackingId?: string;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  status: 'Available' | 'On Delivery' | 'Offline';
  rating: number;
  activeOrders: number;
  location?: string;
  vehicleType?: 'Bicycle' | 'Motorcycle' | 'Car' | 'Van';
  distance?: string;
}

export interface Settlement {
  id: string;
  orderId: string;
  client: string;
  dropper: string;
  totalFee: number;
  adminFee: number;
  riderPayout: number;
  date: string;
  status: 'Pending' | 'Processed' | 'Disputed';
}
