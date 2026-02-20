import { useOrderStore } from '@/stores/orderStore';
import { useRiderStore } from '@/stores/riderStore';
import { useClientStore } from '@/stores/clientStore';
import { seedOrders, seedRiders, seedClients } from '@/utils/seedData';

/**
 * Hook to initialize stores with seed data on first load.
 * Runs synchronously so data is available on the very first render,
 * even when navigating directly to a deep admin route like /clients.
 */
export const useInitializeStores = () => {
  const { orders, setOrders } = useOrderStore();
  const { riders, setRiders } = useRiderStore();
  const { clients, setClients } = useClientStore();

  // Synchronous initialization — runs before first paint
  if (orders.length === 0) {
    setOrders(seedOrders);
  }
  if (riders.length === 0) {
    setRiders(seedRiders);
  }
  if (clients.length === 0) {
    setClients(seedClients);
  }
};
