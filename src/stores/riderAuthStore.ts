import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RiderProfile } from '@/features/rider-portal/api/riderAuth';
import { queryClient } from '@/lib/queryClient';

interface RiderAuthState {
  loggedInRider: RiderProfile | null;
  isAuthenticated: boolean;

  logout: () => void;
  setRider: (rider: RiderProfile) => void;
}

export const useRiderAuthStore = create<RiderAuthState>()(
  persist(
    (set) => ({
      loggedInRider: null,
      isAuthenticated: false,

      logout: () => {
        localStorage.removeItem('rider_token');
        queryClient.clear();
        set({ loggedInRider: null, isAuthenticated: false });
      },

      setRider: (rider) => set({ loggedInRider: rider, isAuthenticated: true }),
    }),
    { name: 'rider-auth-storage' }
  )
);
