import { create } from 'zustand';
import { useOrderStore } from './orderStore';
import { useRiderStore } from './riderStore';
import { useClientStore } from './clientStore';
import { OrderStatus } from '@/types';

interface AnalyticsState {
  // Metrics
  averageDeliveryTime: number; // in minutes
  successRate: number; // percentage
  onTimeRate: number; // percentage
  totalDistance: number; // km
  
  // Charts Data
  volumeByTime: { hour: string; count: number }[];
  volumeByDay: { day: string; count: number }[];
  deliveryPerformance: { date: string; onTime: number; late: number }[];
  
  // Rankings
  topRiders: { id: string; name: string; orders: number; rating: number }[];
  topClients: { id: string; name: string; orders: number }[];

  // Actions
  calculateMetrics: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  averageDeliveryTime: 0,
  successRate: 0,
  onTimeRate: 0,
  totalDistance: 0,
  volumeByTime: [],
  volumeByDay: [],
  deliveryPerformance: [],
  topRiders: [],
  topClients: [],

  calculateMetrics: () => {
    const orders = useOrderStore.getState().orders;
    const riders = useRiderStore.getState().riders;
    const clients = useClientStore.getState().clients;

    const deliveredOrders = orders.filter(o => o.status === OrderStatus.DELIVERED);
    const totalOrders = orders.length;

    // 1. Success Rate
    const successRate = totalOrders > 0 ? (deliveredOrders.length / totalOrders) * 100 : 0;

    // 2. Average Delivery Time (Simulated if timestamps missing)
    let totalDuration = 0;
    deliveredOrders.forEach(order => {
      // Simulate durations between 30-90 mins if real data missing
      // In real app: new Date(order.deliveredAt).getTime() - new Date(order.pickedUpAt).getTime()
      const duration = Math.floor(Math.random() * (90 - 30 + 1)) + 30; 
      totalDuration += duration;
    });
    const avgTime = deliveredOrders.length > 0 ? Math.round(totalDuration / deliveredOrders.length) : 0;

    // 3. Volume by Time (Peak Hours)
    const hours = Array(24).fill(0);
    orders.forEach(order => {
        const date = new Date(order.date); // Assuming date string handles roughly
        // For mock data, just randomizing or using created time if available
        // Using a pseudo-random distribution for demo if date is just YYYY-MM-DD
        const hour = Math.floor(Math.random() * 14) + 8; // 8 AM to 10 PM
        hours[hour]++;
    });
    const volumeByTime = hours.map((count, i) => ({
        hour: `${i}:00`,
        count
    })).filter((_, i) => i >= 8 && i <= 22); // Show 8am - 10pm

    // 4. Top Riders
    const sortedRiders = [...riders]
        .sort((a, b) => ((b as any).completedOrders ?? b.totalDeliveries) - ((a as any).completedOrders ?? a.totalDeliveries))
        .slice(0, 5)
        .map(r => ({
            id: r.id,
            name: (r as any).firstName ? `${(r as any).firstName} ${(r as any).lastName}` : r.name,
            orders: (r as any).completedOrders ?? r.totalDeliveries,
            rating: r.rating
        }));

    set({
      averageDeliveryTime: avgTime,
      successRate: Math.round(successRate),
      onTimeRate: 92, // Mocked for now
      totalDistance: deliveredOrders.length * 12.5, // Avg 12.5km per order
      volumeByTime,
      volumeByDay: [
          { day: 'Mon', count: 45 }, { day: 'Tue', count: 52 }, 
          { day: 'Wed', count: 49 }, { day: 'Thu', count: 60 }, 
          { day: 'Fri', count: 85 }, { day: 'Sat', count: 70 }, 
          { day: 'Sun', count: 35 }
      ], // Mocked weekly trend
      topRiders: sortedRiders,
      topClients: clients.slice(0, 5).map(c => ({ id: c.id, name: c.company, orders: c.totalOrders })),
    });
  }
}));
