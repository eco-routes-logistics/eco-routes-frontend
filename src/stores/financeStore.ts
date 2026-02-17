import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, RevenueStats, OrderStatus } from '../types';
import { useOrderStore } from './orderStore';

interface FinanceState {
  transactions: Transaction[];
  generateTransactions: () => void;
  getRevenueStats: (period: 'daily' | 'weekly' | 'monthly') => RevenueStats;
  processPayout: (transactionId: string) => void;
  markAsDisputed: (transactionId: string) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [],

      generateTransactions: () => {
        // In a real app, this would happen on backend when order is delivered.
        // Here we simulate it by pulling delivered orders from orderStore.
        const orders = useOrderStore.getState().orders;
        const deliveredOrders = orders.filter(o => o.status === OrderStatus.DELIVERED);
        
        const currentTransactions = get().transactions;
        const newTransactions: Transaction[] = [];

        deliveredOrders.forEach(order => {
          if (!currentTransactions.find(t => t.orderId === order.id)) {
            // Randomly assign delivery model for simulation if not present
            // In real app, this comes from the order/rider type
            const isPremium = Math.random() > 0.5; 
            const totalFee = order.totalFee || 2500; // Default if not set
            
            newTransactions.push({
              id: `TRX-${Math.floor(Math.random() * 1000000)}`,
              orderId: order.id,
              clientId: order.businessClientId,
              clientName: order.businessClient,
              riderId: order.driverId || 'UNASSIGNED',
              riderName: order.driver || 'Unassigned',
              deliveryModel: isPremium ? 'Premium' : 'Standard',
              totalFee: totalFee,
              platformCommission: isPremium ? totalFee * 0.25 : totalFee, // 25% for premium, 100% revenue for standard
              riderPayout: isPremium ? totalFee * 0.75 : 0, // 75% for premium, 0 for standard (salary)
              status: 'Pending',
              date: new Date().toISOString().split('T')[0], // Today
            });
          }
        });

        if (newTransactions.length > 0) {
          set(state => ({
            transactions: [...state.transactions, ...newTransactions]
          }));
        }
      },

      getRevenueStats: (period) => {
        const transactions = get().transactions;
        // Filter by period logic would go here (omitted for MVP simplicity - using all time)
        
        const stats: RevenueStats = {
          totalRevenue: 0,
          standardRevenue: 0,
          premiumRevenue: 0,
          platformEarnings: 0,
          riderPayouts: 0,
          operationalExpenses: 0,
          netProfit: 0
        };

        transactions.forEach(t => {
          stats.totalRevenue += t.totalFee;
          
          if (t.deliveryModel === 'Standard') {
            stats.standardRevenue += t.totalFee;
            // Est. Standard model expenses (fuel, vehicle) ~ 40% of revenue
            stats.operationalExpenses += t.totalFee * 0.4; 
            stats.platformEarnings += t.totalFee;
          } else {
            stats.premiumRevenue += t.totalFee;
            stats.riderPayouts += t.riderPayout;
            stats.platformEarnings += t.platformCommission;
          }
        });

        stats.netProfit = stats.platformEarnings - stats.operationalExpenses;

        return stats;
      },

      processPayout: (transactionId) => {
        set(state => ({
          transactions: state.transactions.map(t => 
            t.id === transactionId ? { ...t, status: 'Processed', processedAt: new Date().toISOString() } : t
          )
        }));
      },

      markAsDisputed: (transactionId) => {
        set(state => ({
          transactions: state.transactions.map(t => 
            t.id === transactionId ? { ...t, status: 'Disputed' } : t
          )
        }));
      }
    }),
    {
      name: 'finance-storage',
    }
  )
);
