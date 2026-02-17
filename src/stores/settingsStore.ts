import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PricingRule {
  baseFare: number;
  perKmRate: number;
  weightMultiplier: number;
  surgeMultiplier: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  baseFare: number;
  isActive: boolean;
}

export interface VehicleType {
  id: string;
  name: string;
  baseFare: number;
  capacityKg: number;
  icon: string;
}

export interface SystemSettings {
  currency: 'NGN' | 'GBP';
  dateFormat: string;
  autoDispatch: boolean;
  platformCommission: number;
}

interface SettingsState {
  pricing: PricingRule;
  zones: DeliveryZone[];
  vehicleTypes: VehicleType[];
  system: SystemSettings;
  
  // Actions
  updatePricing: (updates: Partial<PricingRule>) => void;
  addZone: (zone: Omit<DeliveryZone, 'id'>) => void;
  updateZone: (id: string, updates: Partial<DeliveryZone>) => void;
  deleteZone: (id: string) => void;
  updateSystem: (updates: Partial<SystemSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      pricing: {
        baseFare: 1000,
        perKmRate: 150,
        weightMultiplier: 50,
        surgeMultiplier: 1.0,
      },
      zones: [
        { id: '1', name: 'Lagos Island', baseFare: 1500, isActive: true },
        { id: '2', name: 'Lagos Mainland', baseFare: 1000, isActive: true },
      ],
      vehicleTypes: [
        { id: 'v1', name: 'Bike', baseFare: 1000, capacityKg: 20, icon: 'two_wheeler' },
        { id: 'v2', name: 'Car', baseFare: 2500, capacityKg: 100, icon: 'directions_car' },
        { id: 'v3', name: 'Van', baseFare: 5000, capacityKg: 500, icon: 'local_shipping' },
      ],
      system: {
        currency: 'NGN',
        dateFormat: 'DD/MM/YYYY',
        autoDispatch: true,
        platformCommission: 25,
      },

      updatePricing: (updates) => 
        set((state) => ({ pricing: { ...state.pricing, ...updates } })),

      addZone: (zone) =>
        set((state) => ({
          zones: [...state.zones, { ...zone, id: Math.random().toString(36).substr(2, 9) }]
        })),

      updateZone: (id, updates) =>
        set((state) => ({
          zones: state.zones.map(z => z.id === id ? { ...z, ...updates } : z)
        })),

      deleteZone: (id) =>
        set((state) => ({
          zones: state.zones.filter(z => z.id !== id)
        })),

      updateSystem: (updates) =>
        set((state) => ({ system: { ...state.system, ...updates } })),
    }),
    {
      name: 'settings-storage',
    }
  )
);
