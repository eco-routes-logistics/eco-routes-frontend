import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Rider, useRiderStore } from './riderStore';

interface RiderAuthState {
  loggedInRider: Rider | null;
  isAuthenticated: boolean;
  authError: string | null;

  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearError: () => void;
}

export const useRiderAuthStore = create<RiderAuthState>()(
  persist(
    (set) => ({
      loggedInRider: null,
      isAuthenticated: false,
      authError: null,

      login: (email, password) => {
        const riders = useRiderStore.getState().riders;
        const rider = riders.find(
          (r) => r.email && r.email.toLowerCase() === email.toLowerCase()
        );

        if (!rider) {
          set({ authError: 'No account found with this email address.' });
          return false;
        }

        if (rider.status === 'pending') {
          set({ authError: 'Your application is under review. You will be notified once approved.' });
          return false;
        }

        if (rider.status === 'rejected') {
          const reason = rider.rejectionReason ? ` Reason: ${rider.rejectionReason}` : '';
          set({ authError: `Your application was not approved.${reason}` });
          return false;
        }

        if (rider.status === 'inactive') {
          set({ authError: 'Your account is inactive. Please contact the EcoRoutes team.' });
          return false;
        }

        if (rider.password && rider.password !== password) {
          set({ authError: 'Incorrect password. Please try again.' });
          return false;
        }

        set({ loggedInRider: rider, isAuthenticated: true, authError: null });
        return true;
      },

      logout: () => {
        set({ loggedInRider: null, isAuthenticated: false, authError: null });
      },

      clearError: () => set({ authError: null }),
    }),
    {
      name: 'rider-auth-storage',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
