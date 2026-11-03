import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client } from '@/types';
import { queryClient } from '@/lib/queryClient';

interface ClientAuthState {
  loggedInClient: Client | null;
  isAuthenticated: boolean;

  logout: () => void;
  setClient: (client: Client) => void;
}

export const useClientAuthStore = create<ClientAuthState>()(
  persist(
    (set) => ({
      loggedInClient: null,
      isAuthenticated: false,

      logout: () => {
        localStorage.removeItem('client_token');
        queryClient.clear();
        set({ loggedInClient: null, isAuthenticated: false });
      },

      setClient: (client) => set({ loggedInClient: client, isAuthenticated: true }),
    }),
    { name: 'client-auth-storage' }
  )
);
