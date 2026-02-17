import { useEffect } from 'react';
import { useOrderStore } from '@/stores/orderStore';
import { useRiderStore } from '@/stores/riderStore';
import { useClientStore } from '@/stores/clientStore';
import { seedOrders, seedRiders, seedClients } from '@/utils/seedData';

/**
 * Hook to initialize stores with seed data on first load
 * Only runs once when stores are empty
 */
export const useInitializeStores = () => {
  const { orders, setOrders } = useOrderStore();
  const { riders, setRiders } = useRiderStore();
  const { clients, setClients } = useClientStore();

  useEffect(() => {
    // Initialize orders if empty
    if (orders.length === 0) {
      setOrders(seedOrders);
    }

    // Initialize riders if empty
    if (riders.length === 0) {
      setRiders(seedRiders);
    }

    // Initialize clients if empty
    if (clients.length === 0) {
      setClients(seedClients);
    }
  }, []); // Run only once on mount
};
