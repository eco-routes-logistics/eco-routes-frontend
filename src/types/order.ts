import { ORDER_STATUSES, DELIVERY_TYPES } from '@/utils/constants';
import { Address } from './common';

export type OrderStatus = typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES];
export type DeliveryType = typeof DELIVERY_TYPES[keyof typeof DELIVERY_TYPES];

export interface Order {
  id: string;
  trackingId: string;
  
  // Customer details
  customer: string;
  customerEmail?: string;
  customerPhone: string;
  customerLocation: string;
  customerAddress?: Address;
  
  // Business client
  businessClient: string;
  businessClientId: string;
  
  // Order details
  status: OrderStatus;
  deliveryType: DeliveryType;
  weight: string;
  value: string;
  description?: string;
  specialInstructions?: string;
  
  // Delivery details
  pickupLocation: string;
  pickupAddress?: Address;
  deliveryLocation: string;
  deliveryAddress?: Address;
  landmark?: string;
  
  // Assignment
  driver?: string;
  driverId?: string;
  driverAvatar?: string;
  assignedAt?: string;
  
  // Security
  otp?: string;
  deliveryProof?: string;
  
  // Timestamps
  date: string;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  
  // Pricing
  deliveryFee?: number;
  adminFee?: number;
  totalFee?: number;
}

export interface CreateOrderData {
  // Pickup
  pickupLocation: string;
  pickupContact: string;
  pickupPhone: string;
  
  // Delivery
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  landmark?: string;
  
  // Package
  description: string;
  weight: number;
  value: number;
  deliveryType: DeliveryType;
  specialInstructions?: string;
  
  // Scheduling
  scheduledFor?: string;
}

export interface UpdateOrderStatusData {
  status: OrderStatus;
  notes?: string;
  location?: {
    lat: number;
    lng: number;
  };
  deliveryProof?: File;
}

export interface AssignOrderData {
  orderId: string;
  riderId: string;
}
