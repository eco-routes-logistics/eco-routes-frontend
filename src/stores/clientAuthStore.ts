import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client } from '@/types';
import { useClientStore } from './clientStore';

interface ClientAuthState {
  loggedInClient: Client | null;
  isAuthenticated: boolean;
  authError: string | null;

  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearError: () => void;
  setClient: (client: Client) => void;
}

export const useClientAuthStore = create<ClientAuthState>()(
  persist(
    (set) => ({
      loggedInClient: null,
      isAuthenticated: false,
      authError: null,

      login: (email, password) => {
        const clients = useClientStore.getState().clients;
        const client = clients.find(
          (c) => c.email.toLowerCase() === email.toLowerCase()
        );

        if (!client) {
          set({ authError: 'No account found with this email address.' });
          return false;
        }

        if (client.status === 'pending') {
          set({ authError: 'Your account is awaiting admin approval. You will be notified once approved.' });
          return false;
        }

        if (client.status === 'suspended') {
          set({ authError: 'Your account has been suspended. Please contact support.' });
          return false;
        }

        // Check password if set (for demo: if no password stored, any password works)
        if (client.password && client.password !== password) {
          set({ authError: 'Incorrect password. Please try again.' });
          return false;
        }

        set({ loggedInClient: client, isAuthenticated: true, authError: null });
        return true;
      },

      logout: () => {
        set({ loggedInClient: null, isAuthenticated: false, authError: null });
      },

      clearError: () => set({ authError: null }),

      setClient: (client) => set({ loggedInClient: client, isAuthenticated: true, authError: null }),
    }),
    {
      name: 'client-auth-storage',
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
