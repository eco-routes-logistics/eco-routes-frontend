import { RIDER_STATUSES, VEHICLE_TYPES } from '@/utils/constants';

export type RiderStatus = 'active' | 'inactive' | 'busy' | 'pending' | 'rejected' | typeof RIDER_STATUSES[keyof typeof RIDER_STATUSES];
export type VehicleType = typeof VEHICLE_TYPES[keyof typeof VEHICLE_TYPES] | string;

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  
  // Status
  status: RiderStatus;
  isActive: boolean;
  
  // KYC Info
  nin?: string;
  idType?: string;
  passportPhotoUrl?: string;
  idDocumentUrl?: string;
  
  // Vehicle
  vehicleType: VehicleType;
  vehicleNumber?: string;
  vehicleColor?: string;
  
  // Performance
  rating: number;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  currentOrders: number;
  
  // Location
  currentLocation?: {
    lat: number;
    lng: number;
  };
  lastLocationUpdate?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

export interface CreateRiderData {
  name: string;
  email: string;
  phone: string;
  vehicleType: VehicleType;
  vehicleNumber?: string;
  vehicleColor?: string;
}

export interface UpdateRiderData {
  name?: string;
  phone?: string;
  vehicleType?: VehicleType;
  vehicleNumber?: string;
  vehicleColor?: string;
  status?: RiderStatus;
  isActive?: boolean;
}
