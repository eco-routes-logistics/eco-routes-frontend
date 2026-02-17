import { OrderStatus } from '@/types';
import type { Order } from '@/types';
import type { Rider } from '@/stores/riderStore';
import type { Client } from '@/stores/clientStore';

// Seed Clients
export const seedClients: Client[] = [
  {
    id: 'CLI-001',
    name: 'Farmchops Ltd',
    email: 'orders@farmchops.com',
    phone: '+234 801 234 5678',
    company: 'Farmchops',
    address: '15 Allen Avenue, Ikeja, Lagos',
    totalOrders: 145,
    activeOrders: 8,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 'CLI-002',
    name: 'TechSource Nigeria',
    email: 'logistics@techsource.ng',
    phone: '+234 802 345 6789',
    company: 'TechSource',
    address: '22 Admiralty Way, Lekki Phase 1, Lagos',
    totalOrders: 89,
    activeOrders: 5,
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: 'CLI-003',
    name: 'LogiTech Solutions',
    email: 'dispatch@logitech.com.ng',
    phone: '+234 803 456 7890',
    company: 'LogiTech',
    address: '8 Adeola Odeku Street, Victoria Island, Lagos',
    totalOrders: 234,
    activeOrders: 12,
    status: 'active',
    createdAt: '2023-11-10',
  },
];

// Seed Riders
export const seedRiders: Rider[] = [
  {
    id: 'RID-001',
    name: 'Mike Ross',
    phone: '+234 901 234 5678',
    email: 'mike.ross@ecoroutes.com',
    status: 'active',
    currentOrders: 2,
    totalDeliveries: 456,
    rating: 4.8,
    vehicleType: 'Motorcycle',
  },
  {
    id: 'RID-002',
    name: 'Sarah Connor',
    phone: '+234 902 345 6789',
    email: 'sarah.connor@ecoroutes.com',
    status: 'active',
    currentOrders: 1,
    totalDeliveries: 389,
    rating: 4.9,
    vehicleType: 'Van',
  },
  {
    id: 'RID-003',
    name: 'Bruce Banner',
    phone: '+234 903 456 7890',
    email: 'bruce.banner@ecoroutes.com',
    status: 'active',
    currentOrders: 3,
    totalDeliveries: 512,
    rating: 4.7,
    vehicleType: 'Motorcycle',
  },
  {
    id: 'RID-004',
    name: 'Diana Prince',
    phone: '+234 904 567 8901',
    status: 'inactive',
    currentOrders: 0,
    totalDeliveries: 234,
    rating: 4.6,
    vehicleType: 'Motorcycle',
  },
];

// Seed Orders
export const seedOrders: Order[] = [
  {
    id: 'ORD-3492',
    customer: 'Acme Corp',
    customerLocation: 'Springfield, IL',
    businessClient: 'Farmchops',
    status: OrderStatus.DELIVERED,
    driver: 'Mike Ross',
    driverId: 'RID-001',
    date: 'Oct 24, 2023',
    weight: '5kg',
    value: '₦12,500',
  },
  {
    id: 'ORD-3493',
    customer: 'Globex Inc.',
    customerLocation: 'Shelbyville, IL',
    businessClient: 'TechSource',
    status: OrderStatus.IN_TRANSIT,
    driver: 'Sarah Connor',
    driverId: 'RID-002',
    date: 'Oct 24, 2023',
    weight: '2kg',
    value: '₦8,000',
  },
  {
    id: 'ORD-3494',
    customer: 'Stark Industries',
    customerLocation: 'New York, NY',
    businessClient: 'LogiTech',
    status: OrderStatus.PENDING,
    date: 'Oct 25, 2023',
    weight: '10kg',
    value: '₦50,000',
  },
  {
    id: 'ORD-3495',
    customer: 'Wayne Enterprises',
    customerLocation: 'Gotham City',
    businessClient: 'Farmchops',
    status: OrderStatus.IN_TRANSIT,
    driver: 'Bruce Banner',
    driverId: 'RID-003',
    date: 'Oct 25, 2023',
    weight: '1.5kg',
    value: '₦12,500',
  },
  {
    id: 'ORD-3496',
    customer: 'Cyberdyne Systems',
    customerLocation: 'Sunnyvale, CA',
    businessClient: 'TechSource',
    status: OrderStatus.CANCELLED,
    date: 'Oct 23, 2023',
    weight: '3.2kg',
    value: '₦15,000',
  },
];

// Helper function to generate new order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp.toString().slice(-4)}${random}`;
};

// Helper function to format date
export const formatDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
