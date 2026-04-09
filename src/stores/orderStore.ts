import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '@/types';
import type { OrderStatus } from '@/types/order';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  setSelectedOrder: (order: Order | null) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  assignRider: (orderId: string, riderId: string, riderName: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      selectedOrder: null,
      isLoading: false,
      error: null,

      setOrders: (orders) => set({ orders }),

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      updateOrder: (id, updates) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updates } : order
          ),
        })),

      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        })),

      setSelectedOrder: (order) => set({ selectedOrder: order }),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),

      assignRider: (orderId, riderId, riderName) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, driver: riderName, driverId: riderId }
              : order
          ),
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
