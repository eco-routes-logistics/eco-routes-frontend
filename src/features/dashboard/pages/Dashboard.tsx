
import React, { useMemo } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import type { OrderStatus as OrderStatusType } from '@/types/order';
import { OrderStatus } from '@/types';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useDashboardAnalytics } from '../../analytics/hooks/useAnalytics';
import { useOrders } from '../../orders/hooks/useOrders';

const Dashboard: React.FC = () => {
  const { system } = useSettingsStore();

  // Live data from backend
  const { data: analyticsData, isLoading: analyticsLoading } = useDashboardAnalytics();
  const { data: ordersData, isLoading: ordersLoading } = useOrders({ limit: 5 });

  const metrics = analyticsData?.data?.metrics;
  const allOrders = ordersData?.data?.orders || [];

  const stats = useMemo(() => ({
    totalOrders: metrics?.totalOrders ?? 0,
    pendingOrders: metrics?.activeOrders ?? 0,
    inTransitOrders: 0,
    deliveredOrders: metrics?.completedOrders ?? 0,
    activeRiders: 0,
    totalRiders: 0,
    totalClients: 0,
    revenue: metrics?.totalRevenue ?? 0,
  }), [metrics]);

  const recentOrders = useMemo(() => allOrders.slice(0, 5), [allOrders]);

  // Get status badge color
  const getStatusColor = (status: OrderStatusType) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400';
      case OrderStatus.IN_TRANSIT:
        return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case OrderStatus.PENDING:
        return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400';
      case OrderStatus.CANCELLED:
        return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(system.currency === 'NGN' ? 'en-NG' : 'en-GB', {
      style: 'currency',
      currency: system.currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            Welcome back • <span className="text-green-600 font-bold">System Online</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/orders"
            className="h-10 px-4 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            <span className="material-symbols-outlined text-sm">visibility</span> View All Orders
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-white dark:bg-[#1a202c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#616f89] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Orders</p>
              <h3 className="text-[#111318] dark:text-white text-3xl font-black">{stats.totalOrders}</h3>
            </div>
            <div className="size-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">package_2</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[#616f89] dark:text-gray-500 text-xs">
              {stats.deliveredOrders} delivered • {stats.inTransitOrders} in transit
            </span>
          </div>
        </div>

        {/* Active Riders */}
        <div className="bg-white dark:bg-[#1a202c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#616f89] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Active Riders</p>
              <h3 className="text-[#111318] dark:text-white text-3xl font-black">{stats.activeRiders}/{stats.totalRiders}</h3>
            </div>
            <div className="size-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">two_wheeler</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {stats.activeRiders} Online
            </span>
          </div>
        </div>

        {/* Business Clients */}
        <div className="bg-white dark:bg-[#1a202c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#616f89] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Business Clients</p>
              <h3 className="text-[#111318] dark:text-white text-3xl font-black">{stats.totalClients}</h3>
            </div>
            <div className="size-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">business_center</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[#616f89] dark:text-gray-500 text-xs">All active partners</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white dark:bg-[#1a202c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#616f89] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Revenue</p>
              <h3 className="text-[#111318] dark:text-white text-3xl font-black">{formatCurrency(stats.revenue)}</h3>
            </div>
            <div className="size-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[#616f89] dark:text-gray-500 text-xs">From {stats.deliveredOrders} deliveries</span>
          </div>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase">Pending Orders</p>
              <h3 className="text-amber-900 dark:text-amber-300 text-4xl font-black mt-2">{stats.pendingOrders}</h3>
            </div>
            <span className="material-symbols-outlined text-5xl text-amber-300 dark:text-amber-700">pending_actions</span>
          </div>
          <p className="text-amber-700 dark:text-amber-500 text-xs mt-4">Awaiting rider assignment</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">In Transit</p>
              <h3 className="text-blue-900 dark:text-blue-300 text-4xl font-black mt-2">{stats.inTransitOrders}</h3>
            </div>
            <span className="material-symbols-outlined text-5xl text-blue-300 dark:text-blue-700">local_shipping</span>
          </div>
          <p className="text-blue-700 dark:text-blue-500 text-xs mt-4">Currently being delivered</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-xs font-bold uppercase">Delivered</p>
              <h3 className="text-green-900 dark:text-green-300 text-4xl font-black mt-2">{stats.deliveredOrders}</h3>
            </div>
            <span className="material-symbols-outlined text-5xl text-green-300 dark:text-green-700">check_circle</span>
          </div>
          <p className="text-green-700 dark:text-green-500 text-xs mt-4">Successfully completed</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 dark:text-white">Recent Orders</h2>
          <Link to="/orders" className="text-primary text-xs font-bold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] dark:bg-gray-800/50 border-b border-[#e5e7eb] dark:border-gray-700">
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Order ID</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Customer</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Client</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Status</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Rider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-primary text-sm">{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-bold">{order.customer}</div>
                      <div className="text-xs text-[#616f89] dark:text-gray-500">{order.customerLocation}</div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">{order.businessClient}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">{order.driver || 'Unassigned'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/orders"
          className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white hover:shadow-xl transition-all group"
        >
          <span className="material-symbols-outlined text-4xl mb-3 block group-hover:scale-110 transition-transform">package_2</span>
          <h3 className="font-black text-lg">Manage Orders</h3>
          <p className="text-white/80 text-xs mt-1">View and assign orders to riders</p>
        </Link>

        <Link
          to="/drivers"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all group"
        >
          <span className="material-symbols-outlined text-4xl mb-3 block group-hover:scale-110 transition-transform">two_wheeler</span>
          <h3 className="font-black text-lg">Manage Riders</h3>
          <p className="text-white/80 text-xs mt-1">Add and manage your delivery team</p>
        </Link>

        <Link
          to="/clients"
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all group"
        >
          <span className="material-symbols-outlined text-4xl mb-3 block group-hover:scale-110 transition-transform">business_center</span>
          <h3 className="font-black text-lg">Manage Clients</h3>
          <p className="text-white/80 text-xs mt-1">Onboard and manage business partners</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
