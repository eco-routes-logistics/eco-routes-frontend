import React, { useState, useMemo } from 'react';
import { useRiderStore } from '@/stores/riderStore';
import type { OrderStatus as OrderStatusType, Order } from '@/types/order';
import { OrderStatus } from '@/types';
// @ts-ignore
import { Link } from 'react-router-dom';
import { useSettingsStore } from '@/stores/settingsStore';
import { useOrders, useUpdateOrderStatus, useAssignRider } from '../hooks/useOrders';

const Orders: React.FC = () => {
  const { data: orderResponse, isLoading } = useOrders();
  const orders = orderResponse?.data?.orders || [];
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: assignRiderMutation } = useAssignRider();
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { riders, getAvailableRiders } = useRiderStore();
  const { system } = useSettingsStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const currencySymbol = system.currency === 'NGN' ? '₦' : '£';

  // Filter orders based on search and status
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.businessClient.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // Handle rider assignment
  const handleAssignRider = (orderId: string, riderId: string) => {
    assignRiderMutation({ orderId, riderId });
  };

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

  const availableRiders = getAvailableRiders();

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Order Management</h1>
              <p className="text-sm text-slate-500 mt-1">
                {filteredOrders.length} of {orders.length} orders • Manage orders from all business partners
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span className="font-bold">Orders are created by business partners</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
            {/* Filters Toolbar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
                {['All', OrderStatus.PENDING, OrderStatus.IN_TRANSIT, OrderStatus.DELIVERED, OrderStatus.CANCELLED].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200
                      ${statusFilter === tab ? 'bg-primary text-white' : 'text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </span>
                  <input
                    className="w-full h-10 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50"
                    placeholder="Search by ID, customer, or client..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] dark:bg-gray-800/50 border-b border-[#e5e7eb] dark:border-gray-700">
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Order ID</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Customer</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Client</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Rider</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Date</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                        <span className="material-symbols-outlined text-4xl mb-2 block text-slate-300">inbox</span>
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors cursor-pointer group"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="py-4 px-6 font-bold text-primary text-sm group-hover:underline">{order.id}</td>
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
                        <td className="py-4 px-6">
                          {order.driver ? (
                            <div className="flex items-center gap-2">
                              <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${order.driver}/100/100')` }}></div>
                              <span className="text-sm font-medium">{order.driver}</span>
                            </div>
                          ) : (
                            <select
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleAssignRider(order.id, e.target.value)}
                              className="text-xs px-2 py-1 rounded border border-primary text-primary bg-primary/5 font-bold hover:bg-primary/10"
                            >
                              <option value="">Assign Rider</option>
                              {availableRiders.map(rider => (
                                <option key={rider.id} value={rider.id}>{rider.name}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#616f89]">{order.date}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="p-2 text-[#616f89] hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20">
              <span className="text-xs text-slate-500">Showing {filteredOrders.length} of {orders.length} orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail View */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-5 border-b border-[#dbdfe6] dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-3">
                  Order Details <span className="text-primary font-normal">{selectedOrder.id}</span>
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Created {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Order Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Status</span>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        updateStatus({ id: selectedOrder.id, data: { status: e.target.value as OrderStatusType } });
                        setSelectedOrder({ ...selectedOrder, status: e.target.value as OrderStatusType });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-bold focus:ring-2 focus:ring-primary/50"
                    >
                      <option value={OrderStatus.PENDING}>{OrderStatus.PENDING}</option>
                      <option value={OrderStatus.IN_TRANSIT}>{OrderStatus.IN_TRANSIT}</option>
                      <option value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</option>
                      <option value={OrderStatus.CANCELLED}>{OrderStatus.CANCELLED}</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Customer</span>
                    <span className="text-sm font-bold">{selectedOrder.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Location</span>
                    <span className="text-sm font-medium">{selectedOrder.customerLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Client</span>
                    <span className="text-sm font-bold">{selectedOrder.businessClient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Weight</span>
                    <span className="text-sm font-medium">{selectedOrder.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Value</span>
                    <span className="text-sm font-bold text-primary">{selectedOrder.value.replace('₦', currencySymbol)}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.driver && (
                <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Assigned Rider</h4>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${selectedOrder.driver}/100/100')` }}></div>
                    <div>
                      <p className="font-bold">{selectedOrder.driver}</p>
                      <p className="text-xs text-slate-500">Active Delivery</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-[#1a202c] flex gap-4">
              <Link
                to={`/waybill/${selectedOrder.id}`}
                className="flex-1 py-4 font-black text-sm text-slate-700 dark:text-white border-2 border-slate-200 dark:border-gray-700 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <span className="material-symbols-outlined">print</span> Print Waybill
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
