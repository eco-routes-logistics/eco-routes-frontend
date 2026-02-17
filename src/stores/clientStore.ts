import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client } from '@/types';

interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  
  // Actions
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  setSelectedClient: (client: Client | null) => void;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      clients: [],
      selectedClient: null,

      setClients: (clients) => set({ clients }),

      addClient: (client) =>
        set((state) => ({
          clients: [...state.clients, client],
        })),

      updateClient: (id, updates) =>
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === id ? { ...client, ...updates } : client
          ),
        })),

      deleteClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
        })),

      setSelectedClient: (client) => set({ selectedClient: client }),
    }),
    {
      name: 'client-storage',
    }
  )
);
