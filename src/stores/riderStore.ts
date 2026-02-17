import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Rider {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'active' | 'inactive' | 'busy';
  currentOrders: number;
  totalDeliveries: number;
  rating: number;
  vehicleType?: string;
}

interface RiderState {
  riders: Rider[];
  selectedRider: Rider | null;
  
  // Actions
  setRiders: (riders: Rider[]) => void;
  addRider: (rider: Rider) => void;
  updateRider: (id: string, updates: Partial<Rider>) => void;
  deleteRider: (id: string) => void;
  setSelectedRider: (rider: Rider | null) => void;
  getAvailableRiders: () => Rider[];
}

export const useRiderStore = create<RiderState>()(
  persist(
    (set, get) => ({
      riders: [],
      selectedRider: null,

      setRiders: (riders) => set({ riders }),

      addRider: (rider) =>
        set((state) => ({
          riders: [...state.riders, rider],
        })),

      updateRider: (id, updates) =>
        set((state) => ({
          riders: state.riders.map((rider) =>
            rider.id === id ? { ...rider, ...updates } : rider
          ),
        })),

      deleteRider: (id) =>
        set((state) => ({
          riders: state.riders.filter((rider) => rider.id !== id),
        })),

      setSelectedRider: (rider) => set({ selectedRider: rider }),

      getAvailableRiders: () => {
        const { riders } = get();
        return riders.filter((rider) => rider.status === 'active' && rider.currentOrders < 5);
      },
    }),
    {
      name: 'rider-storage',
    }
  )
);
